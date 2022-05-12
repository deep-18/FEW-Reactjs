import { useEffect, useState } from 'react';
import {useSpring,animated} from 'react-spring';
import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/storage';
import axios from 'axios';

const ProductList = ({name,colorR}) => {
    const[wid,setWid] = useState('');
    const [titleProd,setTitleProd] = useState([]);
    const [priceProd,setPriceProd] = useState([]);
    const [descProd,setDescProd] = useState([]);
    const [imgProd,setImgProd] = useState({});

    const [heystr, setHeyStr] = useState([]);
    const [heystrT, setHeyStrT] = useState([]);
    const [heystrC, setHeyStrC] = useState([]);
    const [heystrB, setHeyStrB] = useState([]);
    const [heystrS, setHeyStrS] = useState([]);        
    const props = useSpring({
        from: {width: 0},
        to: {width: wid}
    })

    const handleClick = (e) => {
        const prodId = (e.target.parentElement.parentElement.id)
        const clickProdImg =  (e.target.parentElement.parentElement.children[0].children[0].src)
        const clickProdTitle =  (e.target.parentElement.parentElement.children[1].children[0].textContent)
        const clickPrice =  (e.target.parentElement.parentElement.children[1].children[1]);
        const clickProdPrice = clickPrice.querySelector('span').textContent;
        const clickDesc = e.target.parentElement.parentElement.children[1].children[2].textContent;
        const clickIos = e.target.parentElement.parentElement.children[1].children[3].textContent;
        const clickAndr = e.target.parentElement.parentElement.children[1].children[4].textContent;
        var productInfoPassDet = { img: clickProdImg, prodTitle: clickProdTitle, prodPrice: clickProdPrice, prodDesc: clickDesc,prodId: prodId, prodIos: clickIos, prodAndr: clickAndr};
        localStorage.setItem(`ProductInfoPassDets`, JSON.stringify(productInfoPassDet));
        window.location.pathname = (`/productinfo`);
    };
    var storage = firebase.storage();
    var storageRef = storage.ref();
    let valueTitle = [];
    let valueDesc = [];
    let valueImg = [];
    let valuePrice = [];
    let hey = [];
    let heyT = [];
    let heyC = [];
    let heyS = [];
    let heyB = [];
    const table = document.querySelector('.col-spread')
    useEffect((e) => {
        axios.get(`https://firestore.googleapis.com/v1/projects/furniture-ecomm-website-49470/databases/(default)/documents/products/chaircollection/chairList`)
        .then(response => response).then(data => {
            for(let i=0;i<5;i++){
                const fieldvalues =  data.data.documents[i].fields; 
                const fieldTitle = fieldvalues.Title.stringValue
                const fieldDesc = fieldvalues.desc.stringValue
                const fieldImg = fieldvalues.img.stringValue
                const fieldPrice = fieldvalues.price.integerValue
                const iosSource = fieldvalues['ios-src'].stringValue;
                const andrSource = fieldvalues['andr-src'].stringValue;
                
                hey.push(<animated.div key={`chair${i}`} id={`chair${i}`} className={`product ${name==="chair" || name==="product"? "chair" : "chair hidden"}`}  style={{width: props.width}}>
                <div className="outer">
                    <img key={i} src={fieldImg}/> 
                </div>
                <div className="inner" style={{backgroundColor: colorR}}>
                    <p key={i}>{fieldTitle}</p>                    
                    <div>₹<span key={i}>{fieldPrice}</span></div>
                    <div className="desc-hidden">{fieldDesc}</div>
                    <div className="desc-hidden">{iosSource}</div>
                    <div className="desc-hidden">{andrSource}</div>
                </div>
                </animated.div>)
            }
            setHeyStr(hey)
        })
        .catch(error => { 
            console.log(error); 
        });
    },[])
    useEffect((e) => {
        axios.get(`https://firestore.googleapis.com/v1/projects/furniture-ecomm-website-49470/databases/(default)/documents/products/tablecollection/tableList`)
        .then(response => response).then(data => {
            for(let i=0;i<5;i++){
                const fieldvalues =  data.data.documents[i].fields; 
                const fieldTitle = fieldvalues.Title.stringValue
                const fieldDesc = fieldvalues.desc.stringValue
                const fieldImg = fieldvalues.img.stringValue
                const fieldPrice = fieldvalues.price.integerValue
                const iosSource = fieldvalues['ios-src'].stringValue;
                const andrSource = fieldvalues['andr-src'].stringValue;
                heyT.push(<animated.div key={`table${i}`} id={`table${i}`} className={`product ${name==="table" || name==="product" ? "table" : "table hidden"}`}  style={{width: props.width}}>
                <div className="outer">
                    <img key={i} src={fieldImg}/> 
                </div>
                <div className="inner" style={{backgroundColor: colorR}}>
                    <p key={i}>{fieldTitle}</p>                    
                    <div>₹<span key={i}>{fieldPrice}</span></div>
                    <div className="desc-hidden">{fieldDesc}</div>
                    <div className="desc-hidden">{iosSource}</div>
                    <div className="desc-hidden">{andrSource}</div>
                </div>
                </animated.div>)
            }
            setHeyStrT(heyT)
        })
        .catch(error => { 
            console.log(error); 
        });
    },[])
    useEffect((e) => {
        axios.get(`https://firestore.googleapis.com/v1/projects/furniture-ecomm-website-49470/databases/(default)/documents/products/sofacollection/sofaList`)
        .then(response => response).then(data => {
            for(let i=0;i<5;i++){
                const fieldvalues =  data.data.documents[i].fields; 
                const fieldTitle = fieldvalues.Title.stringValue
                const fieldDesc = fieldvalues.desc.stringValue
                const fieldImg = fieldvalues.img.stringValue
                const fieldPrice = fieldvalues.price.integerValue
                const iosSource = fieldvalues['ios-src'].stringValue;
                const andrSource = fieldvalues['andr-src'].stringValue;
                heyS.push(<animated.div key={`sofa${i}`} id={`sofa${i}`} className={`product ${name==="sofa" || name==="product" ? "sofa" : "sofa hidden"}`}  style={{width: props.width}}>
                <div className="outer">
                    <img key={i} src={fieldImg}/> 
                </div>
                <div className="inner" style={{backgroundColor: colorR}}>
                    <p key={i}>{fieldTitle}</p>                    
                    <div>₹<span key={i}>{fieldPrice}</span></div>
                    <div className="desc-hidden">{fieldDesc}</div>
                    <div className="desc-hidden">{iosSource}</div>
                    <div className="desc-hidden">{andrSource}</div>
                </div>
                </animated.div>)
            }
            setHeyStrS(heyS)
        })
        .catch(error => { 
            console.log(error); 
        });
    },[])
    useEffect((e) => {
        axios.get(`https://firestore.googleapis.com/v1/projects/furniture-ecomm-website-49470/databases/(default)/documents/products/cabinetcollection/cabinetList`)
        .then(response => response).then(data => {
            for(let i=0;i<5;i++){
                const fieldvalues =  data.data.documents[i].fields; 
                const fieldTitle = fieldvalues.Title.stringValue
                const fieldDesc = fieldvalues.desc.stringValue
                const fieldImg = fieldvalues.img.stringValue
                const fieldPrice = fieldvalues.price.integerValue
                const iosSource = fieldvalues['ios-src'].stringValue;
                const andrSource = fieldvalues['andr-src'].stringValue;
                heyC.push(<animated.div key={`cabinet${i}`} id={`cabinet${i}`} className={`product ${name==="cabinet" || name==="product" ? "cabinet" : "cabinet hidden"}`}  style={{width: props.width}}>
                <div className="outer">
                    <img key={i} src={fieldImg}/> 
                </div>
                <div className="inner" style={{backgroundColor: colorR}}>
                    <p key={i}>{fieldTitle}</p>                    
                    <div>₹<span key={i}>{fieldPrice}</span></div>
                    <div className="desc-hidden">{fieldDesc}</div>
                    <div className="desc-hidden">{iosSource}</div>
                    <div className="desc-hidden">{andrSource}</div>
                </div>
                </animated.div>)
            }
            setHeyStrC(heyC)
        })
        .catch(error => { 
            console.log(error); 
        });
    },[])
    useEffect((e) => {
        axios.get(`https://firestore.googleapis.com/v1/projects/furniture-ecomm-website-49470/databases/(default)/documents/products/bedcollection/bedList`)
        .then(response => response).then(data => {
            for(let i=0;i<5;i++){
                const fieldvalues =  data.data.documents[i].fields; 
                const fieldTitle = fieldvalues.Title.stringValue
                const fieldDesc = fieldvalues.desc.stringValue
                const fieldImg = fieldvalues.img.stringValue
                const fieldPrice = fieldvalues.price.integerValue
                const iosSource = fieldvalues['ios-src'].stringValue;
                const andrSource = fieldvalues['andr-src'].stringValue;
                heyB.push(<animated.div key={`bed${i}`} id={`bed${i}`} className={`product ${name==="bed" || name==="product" ? "bed" : "bed hidden"}`}  style={{width: props.width}}>
                <div className="outer">
                    <img key={i} src={fieldImg}/> 
                </div>
                <div className="inner" style={{backgroundColor: colorR}}>
                    <p key={i}>{fieldTitle}</p>                    
                    <div>₹<span key={i}>{fieldPrice}</span></div>
                    <div className="desc-hidden">{fieldDesc}</div>
                    <div className="desc-hidden">{iosSource}</div>
                    <div className="desc-hidden">{andrSource}</div>
                </div>
                </animated.div>)
            }
            setHeyStrB(heyB)
        })
        .catch(error => { 
            console.log(error); 
        });
    },[])
      
    return (
        <div className="products" onClick={handleClick}>
            {/* <div className="col-spread"> */}
                {heystr[0]}
                {heystr[1]}
                {heystr[2]}
                {heystr[3]}
            {/* </div> */}
            {/* <div className="col-spread"> */}
                {heystr[4]}
                {heystrT[0]}
                {heystrT[1]}
                {heystrT[2]}
            {/* </div> */}
            {/* <div className="col-spread"> */}
                {heystrT[3]}
                {heystrT[4]}
                {heystrB[0]}
                {heystrB[1]}
            {/* </div> */}
            {/* <div className="col-spread"> */}
                {heystrB[2]}
                {heystrB[3]}
                {heystrB[4]}
                {heystrC[0]}
            {/* </div>                  */}
            {/* <div className="col-spread"> */}
                {heystrC[1]}
                {heystrC[2]}
                {heystrC[3]}
                {heystrC[4]}
             {/* </div>                  */}
            {/* <div className="col-spread"> */}
                {heystrS[0]}
                {heystrS[1]}
                {heystrS[2]}
                {heystrS[3]}
                {heystrS[4]}
            {/* </div>                  */}
        </div>
    )
}

export default ProductList;