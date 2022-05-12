import React, { useEffect, useState } from 'react';
import Header from './header';
import firebase from "firebase/app";
import 'firebase/firestore';
import {useAuth} from '../context/AuthContext';
import axios from 'axios';

const Order = () => {
    let cartL = [];
    const { currentUser } = useAuth();
    const [products,setProducts] = useState([]);
    useEffect(() => {
        if(currentUser){
            const db = firebase.firestore();
            const id = `${currentUser.uid}`;
            axios.get(`https://firestore.googleapis.com/v1/projects/furniture-ecomm-website-49470/databases/(default)/documents/orders/${id}/OrderedProducts`)
            .then(response => response).then(data => {
                for(let i=0;i<data.data.documents.length;i++){
                    const productImg = (data.data.documents[i].fields.productImg.stringValue)
                    const productTitle = (data.data.documents[i].fields.productTitle.stringValue)
                    cartL.push(<div key={i} className="product-sel">
                                    <img className="product-img" key={i} src={productImg} />
                                    <p key={`t${i}`}> {productTitle}</p>
                                </div>
                            )
                        }   
                    setProducts(cartL);
            })                   
        }
    },[])
    // console.log(products[0])
    return(
        <div className="section">
            <div className="overlay">
            <Header color="#683E2D"/>
                <div className="order-content">
                    <div className="order-detail">
                        <p className="name-cart">ORDERS</p>
                        <div className="products-order">
                            {products}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Order;