import Header from "./header";
import {useState} from 'react';
import firebase from "firebase/app";
import 'firebase/firestore';
import {ModelViewerElement} from '@google/model-viewer'
// import { CLickProd } from "./productList";

const ProductDet = () =>{
    const productInfoPassDets = JSON.parse(localStorage.getItem('ProductInfoPassDets'));
    const prodid = productInfoPassDets.prodId;
    const [title,setTitle] = useState(productInfoPassDets.prodTitle);
    const [desc,setDesc] = useState(productInfoPassDets.prodDesc);
    const [price,setPrice] = useState(productInfoPassDets.prodPrice);
    const [image,setImage] = useState(productInfoPassDets.img);
    const [proQuan,setProQuan] = useState('1');
    function handleIncrementValue(e) {
        const proPrice = e.target.parentElement.nextElementSibling.getAttribute('data-value');
        // console.log(proPrice);
        const totalPrice = proPrice * parseInt(e.target.value === "" ? 1 : e.target.value);
        (e.target.parentElement.nextElementSibling.children[0].textContent) = totalPrice;
        setPrice(totalPrice);
        setProQuan(e.target.value);
    };
    var productDet = { title: title, desc: desc, price: price, proQuan: proQuan, image: image};
    const handleCartbutton = () => {
        // let hey = JSON.parse(localStorage.getItem('ProductDets'))
        // console.log(hey);
        // let names = [];
        // if(hey){
        //     names = Object.entries(hey).map(([key, value]) => ({ [key]: value }))
        //     names = [...names,productDet];
        // }
        // else{
        //     names.push(productDet)
        // }
        // // names = [pproductDet];
        // localStorage.setItem(`ProductDets`, JSON.stringify(names));

        var users = JSON.parse(localStorage.getItem("ProductDets") || "[]");
        console.log("# of users: " + users.length);
        users.forEach(function(user, index) {
            console.log("[" + index + "]: " + user);
        });
    
        // Modifying
        var user = productDet;
        users.push(user);
        console.log("Added user #" + user);
    
        // Saving
        localStorage.setItem(`ProductDets`, JSON.stringify(users));
    }

    function isMobile() {
        const isAndroid = /Android/i.test(navigator.userAgent);
        const isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
        return isAndroid || isiOS;
    }
    const mobile = isMobile();

    const mv = document.querySelector('#mv');
    const arButton = document.querySelector('#ar-btn');
    
    if(mv){
        arButton.addEventListener('click', (e)=>{
            e.preventDefault();
            mv.activateAR();
            
            if(!mobile){
                arButton.textContent = 'AR MODE ONLY IN MOBILE'
            }
        })
    }
    // if(arButton){
    //     arButton.addEventListener('click', () => {
    //         window.location.pathname = "/modelview";
    //     })
    // }

    return (
    <div className="sectionproduct">
        <Header color="#683E2D"/>
        <div className="productinfo">
            <div className="productimages">
                {/* <img src={productInfoPassDets.img} className="imgmain"/> */}
                <model-viewer 
                    id="mv"
                    ar ar-modes="webxr scene-viewer quick-look" 
                    ar-scale="auto" 
                    camera-controls 
                    autoplay
                    quick-look-browsers="safari chrome"
                    src={productInfoPassDets.prodAndr}
                    ios-src={productInfoPassDets.prodIos}
                    auto-rotate
                    exposure="1"
                >
                <button slot="ar-button" className="ar-none"></button> 
                </model-viewer>
                <div className="imgsec">
                    <img src={productInfoPassDets.img} className="imgmain"/>
                    <img src={productInfoPassDets.img} className="imgmain"/>
                    <img src={productInfoPassDets.img} className="imgmain"/>
                </div>
            </div>
            <div className="productdet">
                <p className="heading">{productInfoPassDets.prodTitle}</p>
                <p className="productdesc">{desc}</p>
                <div className="product-quan-info">
                    <input type="number" min="1" class="product-quan-info-inner" placeholder="1" defaultValue={proQuan} onChange={handleIncrementValue} /><label>  no. of items</label>
                </div>
                <div className="product-price"  data-value={productInfoPassDets.prodPrice}>₹<span>{productInfoPassDets.prodPrice}</span></div>
                <button className="AR ar-view" id="ar-btn" slot="ar-button">
                        VIEW IN AR
                </button> 
                <button className="addtocart" onClick={handleCartbutton}>ADD TO CART</button>
            </div>
        </div>
    </div>
    )
}
export default ProductDet;