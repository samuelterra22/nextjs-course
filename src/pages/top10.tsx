import {Title} from "../styles/pages/Home";
import React from "react";
import {GetStaticProps} from "next";

interface IProduct {
    id: string;
    title: string;
}

interface Top10Props {
    products: IProduct[];
}

export default function Top10({products} : Top10Props) {
    return (
        <div>
            <section>
                <Title>Top 10</Title>

                <ul>
                    {products.map(product => {
                        return (
                            <li key={product.id}>
                                {product.title}
                            </li>
                        )
                    })}
                </ul>
            </section>
        </div>
    )
}

export const getStaticProps: GetStaticProps<Top10Props> = async (context) => {
    const response = await fetch('http://localhost:3333/products');
    const products = await response.json();

    return {
        props: {
            products
        },
        revalidate: 5
    }
}
