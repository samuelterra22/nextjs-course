import {useRouter} from "next/router";
import React, {useState} from "react";
import dynamic from "next/dynamic";
import {GetStaticPaths, GetStaticProps} from "next";
import {client} from "@/lib/prismic";
import Prismic from "prismic-javascript";
import {Document} from "prismic-javascript/types/documents";
import PrismicDOM from "prismic-dom";

interface ProductProps {
    product: Document;
}

const AddToCartModal = dynamic(
    () => import('@/components/AddToCartModal'),
    {loading: () => <p>Carregando...</p>}
);

export default function Product({product} : ProductProps) {
    const router = useRouter();
    const [isAddToCartModalVisible, setIsAddToCartModalVisible] = useState(false)

    function handleAddToCard() {
        setIsAddToCartModalVisible(true)
    }

    if (router.isFallback) {
        return <p>Carregando...</p>
    }

    return (<div>
        <h1>{PrismicDOM.RichText.asText(product.data.title)}</h1>

        <img src={product.data.thumbnail.url} width="300" alt=""/>

        <div dangerouslySetInnerHTML={{__html: PrismicDOM.RichText.asHtml(product.data.description)}}></div>

        <p>Price: ${product.data.price}</p>

        <button onClick={handleAddToCard}>Add to card</button>

        {isAddToCartModalVisible && <AddToCartModal/>}
    </div>)
}


export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true
    }
}

export const getStaticProps: GetStaticProps<ProductProps> = async (context) => {
    const {slug} = context.params

    const product = await client().getByUID('product', String(slug), {});

    return {
        props: {
            product,
        },
        revalidate: 5
    }
}
