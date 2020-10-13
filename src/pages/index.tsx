import React from "react";
import {Title} from '../styles/pages/Home';
import {GetServerSideProps} from "next";

interface IProduct {
    id: string;
    title: string;
}

interface HomeProps {
    recommendedProducts: IProduct[];
}

export default function Home({recommendedProducts}: HomeProps) {
    async function handleSum() {
        const math = (await import("../lib/math")).default;
        alert(math.sum(3, 5));
    }

    // handleSum()

    return (
        <div>
            <section>
                <Title>Products</Title>

                <ul>
                    {recommendedProducts.map(recommendedProduct => {
                        return (
                            <li key={recommendedProduct.id}>
                                {recommendedProduct.title}
                            </li>
                        )
                    })}
                </ul>
            </section>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
    const response = await fetch('http://localhost:3333/recommended');
    const recommendedProducts = await response.json();

    return {
        props: {
            recommendedProducts
        }
    }
}
