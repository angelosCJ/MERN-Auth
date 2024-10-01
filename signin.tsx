import './App.css';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {

    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const logIn = async (e:any) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/login',{email,password});
            navigate("/page");
            console.log("Login successful");
        } catch (error) {
            console.log("unable to login");
        }
    }

    const goToRegister = () =>{
        navigate("/signup");
    }

    return(
    <div className="frame-one">
        <h1>Sign in</h1>
        <div className="panel">
           <label htmlFor="">Email</label>
            <input type="text" onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="">Password</label>
            <input type="password"  onChange={(e) => setPassword(e.target.value)} />
            <div className="buttons">
                <button className='b1' onClick={logIn}>Log in</button>
                <button className='b2' onClick={goToRegister} >Register</button>
            </div>
        </div>
    </div>
    );
}
