import {useRouter} from "next/router";
import {GetStaticPaths, GetStaticProps} from "next";
import {Title} from "@/styles/pages/Home";
import React from "react";
import {client} from "@/lib/prismic";
import Prismic from "prismic-javascript";
import {Document} from "prismic-javascript/types/documents";
import PrismicDOM from "prismic-dom";
import Link from "next/link";

interface CategoryProps {
    category: Document;
    products: Document[];
}

export default function Category({category, products}: CategoryProps) {
    const router = useRouter();

    if (router.isFallback) {
        return <p>Carregando...</p>
    }

    return (<div>
            <section>
                <Title>{PrismicDOM.RichText.asText(category.data.title)}</Title>

                <ul>
                    {products.map(product => {
                        return (
                            <li key={product.id}>
                                <Link href={`/products/${product.uid}`}>
                                    <a>
                                        {PrismicDOM.RichText.asText(product.data.title)}
                                    </a>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </section>
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    // const response = await fetch(`http://localhost:3333/categories`);
    // const categories = await response.json();

    const categories = await client().query([
        Prismic.Predicates.at('document.type', 'category')
    ]);

    const paths = categories.results.map(category => {
        return {
            params: {slug: category.uid}
        }
    })

    return {
        paths,
        fallback: true
    }
}

export const getStaticProps: GetStaticProps<CategoryProps> = async (context) => {
    const {slug} = context.params

    // const response = await fetch(`http://localhost:3333/products?category_id=${slug}`);
    // const products = await response.json();

    const category = await client().getByUID('category', String(slug), {});
    const products = await client().query([
        Prismic.Predicates.at('document.type', 'product'),
        Prismic.Predicates.at('my.product.category', category.id)
    ]);

    return {
        props: {
            category,
            products: products.results
        },
        revalidate: 60
    }
}
