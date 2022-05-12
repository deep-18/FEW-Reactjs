import { useEffect, useRef, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Header from './header';
import {useAuth} from '../context/AuthContext';
import firebase from "firebase/app";
import 'firebase/firestore';
const Register = () => {

    //WEBDEV CODE
    const emailRef = useRef();
    const passwordRef = useRef();
    const usernameRef = useRef();
    const addRef = useRef();
    const cityRef = useRef();
    const stateRef = useRef();
    // const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault()
        const db = firebase.firestore();
        console.log(db);

        try {
          setError("")
          setLoading(true)
          await signup(emailRef.current.value, passwordRef.current.value).then(cred => {
            const id = `p${cred.user.uid}`;
            console.log(id);
            return db.collection('registerData').doc(id).set({
                  email: emailRef.current.value,
                  username: usernameRef.current.value,
                  address: addRef.current.value,
                  city: cityRef.current.value,
                  state: stateRef.current.value,
              })
          })
          history.push("/shop-all")
        } catch {
          setError("Failed to create an account")
        }

        setLoading(false)
    }

    return (
        <div className="sectionregister">
            <Header color="white"/>
            <div className="registerform">
            <p className="registername">SIGN UP<br/> {error} </p>
            <form id="registerform">
                <div className="info registerusername">
                    <label>Name</label>
                    <input type="text" name="name" ref={usernameRef} />
                </div>
                <div className="info registeremail">
                    <label>E-mail</label>
                    <input type="email" name="email" ref={emailRef} />
                </div>
                <div className="info registerpass">
                    <label>Password</label>
                    <input type="password" name="name" ref={passwordRef} minLength="6"  />
                </div>
                {/* <div className="info registerpassCheck">
                    <label>Confirm Password</label>
                    
                </div> */}
                <div className="info registerAdd">
                    <label>Address</label>
                    <textarea  ref={addRef} name="add" />
                </div>
                <div className="info registercity">
                    <label>City</label>
                    <input type="text" name="city" ref={cityRef} />
                </div>
                <div className="info registerstate">
                    <label>State</label>
                    <input type="text" name="state" ref={stateRef} />
                </div>
                <button type="submit" onClick={handleSubmit} className="signupbutton">SIGN UP</button>
                <NavLink to="/login" className="login">LOGIN</NavLink>
            </form>
            </div>
        </div>
    )
}
export default Register;