import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Header from './header';
import firebase from "firebase/app";
import 'firebase/firestore';
import {useAuth} from '../context/AuthContext';

const Cart = () =>{
    const [products,setProducts] = useState([]);
    const history = useHistory()
    const { currentUser } = useAuth();
    // useEffect(() => {
    const handleBuyButton = async (e) => {
        e.preventDefault()
        if(currentUser){
            const db = firebase.firestore();
            const id = `${currentUser.uid}`;
            for(let i =0; i <products.length; i++){
                const title = products[i].props.children[1].props.children[1];
                const img = products[i].props.children[0].props.src;
                db.collection('orders').doc(id).collection('OrderedProducts').add({
                    productTitle: title,
                    productImg: img
                })
            }
            localStorage.clear();
            history.push("/updateprofile")
        }else{
            history.push("/login")
        }
    }

    //Removal of Item
    const productAll = document.querySelector('.products-sel');
    const productdets = JSON.parse(localStorage.getItem('ProductDets'));
    
    let cartL = [];
    useEffect(() => {
        if(productdets){
            const noP = (productdets.length);
            for(var i=0;i<= noP - 1; i++ ){
                const productTitle = productdets[i].title;
                const productPrice = productdets[i].price;
                const productImage = productdets[i].image;
                const productQuantity = productdets[i].proQuan
                cartL.push(<div id="001" key={i} className="product-sel">
                                <img className="product-img" key={i} src={productImage} />
                                <p key={`t${i}`}> {productTitle}</p>
                                <div className="product-quan">
                                    <input type="number" min="1" placeholder="1" key={`quan${i}`}defaultValue={productQuantity} onChange={handleIncrementValue} />
                                </div>
                                <div className="product-price" key={`price${i}`}  data-value={productPrice/productQuantity}>₹<span>{productPrice}</span></div>
                                <button className="product-cancel" onClick={handleCancelClick}>x</button>
                            </div>)
            }
        }
        setProducts(cartL);
    },[])
    if(products.length == 0){
        if(productAll){
            productAll.textContent = "Please Add Items In Cart"
        }

    }
    function handleCancelClick(e) {
        e.target.parentElement.remove();
        localStorage.removeItem('ProductDets')
        totalAmount();  
    }
    let totOrdPri = 0;
    let pFinal = {};
    //Increment of Amount
    function totalAmount() {
        const prodPrices = document.querySelectorAll('.product-price span');
        const orderTotal = document.querySelector('.order-price span');
        const subTotal = document.querySelector('.total-price');
        const shippingTotal = document.querySelector('.shipping-price');
        if(orderTotal){
            if(prodPrices.length === 0){    
                orderTotal.textContent = 0;
                shippingTotal.children[0].textContent = 0;
            }
            prodPrices.forEach((pp = {}) => {
                pFinal.pp = (pp);
                // console.log(pp);
                totOrdPri = totOrdPri + parseInt(pp.textContent);
                orderTotal.textContent = totOrdPri;
            });
            totOrdPri = 0;
            subTotal.children[0].textContent =  parseInt(orderTotal.textContent) + parseInt(shippingTotal.children[0].textContent);
        }
    };
    const prodPrices = document.querySelectorAll('.product-price span');
        const orderTotal = document.querySelector('.order-price span');
        const subTotal = document.querySelector('.total-price');
        const shippingTotal = document.querySelector('.shipping-price');
        if(orderTotal){
            if(prodPrices.length === 0){    
                orderTotal.textContent = 0;
                shippingTotal.children[0].textContent = 0;
            }
            prodPrices.forEach((pp = {}) => {
                pFinal.pp = (pp);
                // console.log(pp);
                totOrdPri = totOrdPri + parseInt(pp.textContent);
                orderTotal.textContent = totOrdPri;
            });
            totOrdPri = 0;
            subTotal.children[0].textContent =  parseInt(orderTotal.textContent) + parseInt(shippingTotal.children[0].textContent);
        }     
    function handleIncrementValue(e) {
        const proPrice = e.target.parentElement.nextElementSibling.getAttribute('data-value');
        // console.log(proPrice);
        const totalPrice = proPrice * parseInt(e.target.value === "" ? 1 : e.target.value);
        (e.target.parentElement.nextElementSibling.children[0].textContent) = totalPrice;
        totalAmount();
    };
    
    window.addEventListener('DOMContentLoaded', totalAmount);

    return(
        <div className="section">
            <div className="overlay">
            <Header color="#683E2D" totalAmount={totalAmount}/>
                <div className="cart-content">
                    <div className="product-detail">
                        <p className="name-cart">CART</p>
                        <div className="products-sel">
                            {products}                                                                               
                        </div>
                    </div>
                    <div className="bill-card">
                        <div className="bill-categories">
                            <p className="bill-summ">SUMMARY</p>
                            <div className="bill-prop bill-order">
                                <p>Order Total</p>
                                <div className="order-price">₹<span>10000</span></div>
                            </div>
                            <div className="bill-prop bill-promo">
                                <p>Promo Code</p>
                                <div className="promo-code"><span>-</span></div>
                            </div>
                            <div className="bill-prop bill-shipping">
                                <p>Shipping Charge</p>
                                <div className="shipping-price">₹<span>1000</span></div>
                            </div>
                            <div className="bill-prop bill-total">
                                <p>Subtotal</p>
                                <div className="total-price">₹<span>11000</span></div>
                            </div>
                        </div>
                        <button className="buynow" onClick={handleBuyButton}>BUY NOW</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Cart;