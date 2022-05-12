import { NavLink, useHistory } from 'react-router-dom';
import { useRef, useState } from 'react';
import Header from './header';
import '../utils/util.css';
import {useAuth} from '../context/AuthContext';
import firebase from 'firebase';
import {auth} from '../firebase';
import Register from './register';

const Login = () => {   
  const emailValue = document.querySelector('.emaillogin');
  const [success, setSuccess] = useState("");
  const [errorReset, setErrorReset] = useState("")


  function handleFP(e) {
    if(emailValue.value){
      e.preventDefault();
      firebase.auth().sendPasswordResetEmail(emailValue.value).then(() => {
        setSuccess("Password Reset Link Sent!")
      }).catch(() => {
        setErrorReset("Failed! User not Exist")
      });
    }else{
      alert('ADD YOUR EMAIL')
    }
  }
    //WEBDEV
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
      e.preventDefault()

      try {
        setError("")
        setLoading(true)
        await login(emailRef.current.value, passwordRef.current.value)
        history.push("/shop-all")
      } catch {
        setError("Failed to log in")
      }

      setLoading(false)
    }



    return (
        <div className="sectionlogin">
                <Header colorB="red" color="white"/>
                <div className="loginform">
                    <p className="loginname">LOGIN<br/> {error}{success}{errorReset}</p>
                    <form id="loginform">
                        <div className="info email-main">
                            <label>E-mail</label>
                            <input type="email" name="email" className="emaillogin" ref={emailRef} required/>
                        </div>
                        <div className="info pass-main">
                            <label>Password</label>
                            <input type="password" name="password" className="passlogin" ref={passwordRef} required/>
                        </div>
                        <button type="submit" className="loginbutton" onClick={handleSubmit}>Log-in</button>
                        <button className="forPass" onClick={handleFP} style={{border: "none", textAlign: "right"}}>forgot password</button>
                        <NavLink className="register" to="/register">create account</NavLink>
                    </form>
                </div>
        </div>
    );
}
export default Login;