import {useRouter} from "next/router";
import React, {useState} from "react";
import dynamic from "next/dynamic";

const AddToCartModal = dynamic(
    () => import('../../../components/AddToCartModal'),
    {loading: () => <p>Carregando...</p>}
);

export default function Product() {
    const router = useRouter();
    const [isAddToCartModalVisible, setIsAddToCartModalVisible] = useState(false)

    function handleAddToCard() {
        setIsAddToCartModalVisible(true)
    }

    return (<div>
        <h1>{router.query.slug}</h1>

        <button onClick={handleAddToCard}>Add to card</button>

        {isAddToCartModalVisible && <AddToCartModal/>}
    </div>)
}
