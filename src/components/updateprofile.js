import { NavLink,useHistory } from 'react-router-dom';
import Header from './header';
import { useAuth } from "../context/AuthContext";
import { useState } from 'react';
import firebase from "firebase/app";
import 'firebase/firestore';

const Updateprofile = () => {
    const [error, setError] = useState("");
    const [address,setAddress] = useState("")
    const [city,setCity] = useState("")
    const [state,setState] = useState("")
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const { currentUser,logout} = useAuth();
    const history = useHistory();
    if(currentUser){
        const userInfoId = (`p${currentUser.uid}`)
        const db = firebase.firestore();
        var docRef = db.collection("registerData").doc(userInfoId);
        docRef.get().then(async (doc) => {
            if (doc.exists) {
                setAddress(doc.data().address);
                setCity(doc.data().city);
                setState(doc.data().state);
                setUsername(doc.data().username);
                setEmail(doc.data().email)
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    async function handleLogout() {
      setError("")

      try {
        await logout()
        history.push("/shop-all")
      } catch {
        setError("Failed to log out")
      }
    }
    
    
    const userName = document.querySelector('.username');
    const userCity = document.querySelector('.city');
    const userState = document.querySelector('.state');
    const userAddress = document.querySelector('.address');
    if(userState){
        console.log(userState.value);
    }
    const editButton = document.querySelector('.editbutton');
    if(editButton){
        editButton.addEventListener('click', () => {
            editButton.textContent = "UPDATE PROFILE";
            editButton.classList.add('updatebutton');
            editButton.classList.remove('editbutton');
            const textareaA = document.querySelector('.profile-info textarea');
            textareaA.disabled = false
            userName.disabled = false
            userCity.disabled = false
            userState.disabled = false
            const userInfoId = (`p${currentUser.uid}`);
            const updateButton = document.querySelector('.updatebutton');
            updateButton.addEventListener('click', () => {
                const db = firebase.firestore();
                db.collection("registerData").doc(userInfoId).update({
                    username: userName.value,
                    address: userAddress.value,
                    city: userCity.value,
                    state: userState.value,
                });
                updateButton.textContent = "EDIT PROFILE";
                updateButton.classList.add('editbutton');
                updateButton.classList.remove('updatebutton');
                textareaA.disabled = true
                userName.disabled = true
                userCity.disabled = true
                userState.disabled = true
            });
        });
    }

    function handleBuyNowClick() {
        history.push('/orders')
    }
    return (    
    <div className="sectionprofile">
        <Header color="white"/>
        <div className="profileform">
            <p className="profilename">PROFILE<br/>{error}</p>
            <form id="profileform">
                <div className="info profile-info profileusername">
                    <label className="profile-label">Name</label>
                    <input type="text" className="username" name="name" defaultValue={username} disabled placeholder="enter name"/>
                </div>
                <div className="info profile-info profileemail">
                    <label>E-mail</label>
                    <input type="email" name="email" defaultValue={email} disabled placeholder="enter email"/>
                </div>
                {/* <div className="info profile-info profilepass">
                    <label>Password</label>
                    <input type="text" name="name" value={currentUser.password} placeholder="enter password"/>
                </div> */}
                <div className="info profile-info profileAdd">
                    <label>Address</label>
                    <textarea placeholder="enter address" className="address" defaultValue={address} disabled name="add" rows="3"/>
                </div>
                <div className="info profile-info profilecity">
                    <label>City</label>
                    <input type="text" name="city" className="city" defaultValue={city} disabled placeholder="enter city"/>
                </div>
                <div className="info profile-info profilestate">
                    <label>State</label>
                    <input type="text" name="state" className="state" defaultValue={state} disabled placeholder="enter state"/>
                </div>
                <div className="buttons">
                    <button type="button" className="buynowbutton" onClick={handleBuyNowClick}>ORDERS</button>
                    <button type="button" className="editbutton">EDIT PROFILE</button>
                    <button type="button" className="logoutbutton" onClick={handleLogout}>LOG OUT</button>
                </div>
            </form>
            </div>
    </div>)
}
export default Updateprofile;