import axios from 'axios';
import './App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {

    const navigate = useNavigate();
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    

    const goToLogIn = () => {
        navigate('/signin');
    }

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/auth',{name,email,password});
            console.log("Registretion was successful");
        } catch (error) {
            console.log("unsuccessful registration");
        }
    }

    return(
        <div className="frame-two">
        <h1>Sign up</h1>
        <div className="panel">
           <label htmlFor="">Name</label>
            <input type="text" onChange={(e)=> setName(e.target.value)} />
           <label htmlFor="">Email</label>
            <input type="text" onChange={(e)=> setEmail(e.target.value)}/>
            <label htmlFor="">Password</label>
            <input type="password" onChange={(e)=> setPassword(e.target.value)} />
            <div className="buttons-two">
                <button className='b1'  onClick={handleSubmit} >Sign up</button>
                <button className='b2' onClick={goToLogIn} >back to sign in</button>
            </div>
        </div>
    </div>
    );
}
