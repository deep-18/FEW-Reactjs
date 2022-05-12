import React, { useEffect } from 'react';
import {NavLink,useHistory } from 'react-router-dom';
import { useState} from 'react';
import {auth} from '../firebase';
import {useAuth} from '../context/AuthContext';
import firebase from "firebase/app";
import 'firebase/firestore';

const Header = ({colorB,color,totalAmount}) => {
    const [path,setPath] = useState("/login");
    const [nameP,setNameP] = useState("login")
    const history = useHistory()
    const { currentUser } = useAuth();
    useEffect(() => {
        if(currentUser){
            setPath("/updateprofile");
            setNameP("profile");
        }
    },[]);

    function handleLogoButton() {
        history.push("/");
    }
    

    return(
        <div className="header" style={{ color: color}}>
            <h4 className="logo" onClick={handleLogoButton}>FEW</h4>
            <div className="header-content">
                <NavLink to="/shop-all" className="shop" style={{ color: color}}>shop</NavLink>
                <NavLink to={path} className="profile" id="" style={{ color: color}}>{nameP}</NavLink>
                <NavLink className="svg" onClick={totalAmount} exact to="/cart">
                    <svg  xmlns="http://www.w3.org/2000/svg" width="30.686" height="33.762" viewBox="0 0 30.686 33.762">
                      <g id="Icon_feather-shopping-bag" data-name="Icon feather-shopping-bag" transform="translate(-3 -1.5)">
                        <path id="Path_1" data-name="Path 1" d="M9.114,3,4.5,9.152V30.686a3.076,3.076,0,0,0,3.076,3.076H29.109a3.076,3.076,0,0,0,3.076-3.076V9.152L27.571,3Z" transform="translate(0 0)" fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                        <path id="Path_2" data-name="Path 2" d="M4.5,9H32.186" transform="translate(0 0.152)" fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                        <path id="Path_3" data-name="Path 3" d="M24.3,15A6.152,6.152,0,0,1,12,15" transform="translate(0.19 0.305)" fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                      </g>
                    </svg>
                </NavLink>
            </div>
        </div>
    )
}
export default Header;