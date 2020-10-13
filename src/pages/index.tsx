import React from "react";
import {Title} from '@/styles/pages/Home';
import {GetServerSideProps} from "next";
import Link from "next/link";
import SEO from "@/components/SEO";
import {client} from "@/lib/prismic";
import Prismic from 'prismic-javascript'
import PrismicDOM from 'prismic-dom'
import {Document} from 'prismic-javascript/types/documents'

interface HomeProps {
    recommendedProducts: Document[];
}

export default function Home({recommendedProducts}: HomeProps) {
    async function handleSum() {
        const math = (await import("@/lib/math")).default;
        alert(math.sum(3, 5));
    }

    return (
        <div>
            <section>
                <SEO title="DevCommerce, your best e-commerce!" shouldExcludeTitleSuffix/>

                <Title>Products</Title>

                <ul>
                    {recommendedProducts.map(recommendedProduct => {
                        return (
                            <li key={recommendedProduct.id}>
                                <Link href={`/catalog/products/${recommendedProduct.uid}`}>
                                    <a>
                                        {PrismicDOM.RichText.asText(recommendedProduct.data.title)}
                                    </a>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </section>

            <button onClick={handleSum}>Sum</button>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommended`);
    // const recommendedProducts = await response.json();

    const recommendedProducts = await client().query([
        Prismic.Predicates.at('document.type', 'product')
    ]);

    return {
        props: {
            recommendedProducts: recommendedProducts.results
        }
    }
}
