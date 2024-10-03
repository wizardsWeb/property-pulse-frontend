import { useState } from "react";
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import apiRequest from "../../lib/apiRequest";

function Register() {

  const [ error, setError ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsLoading(true);
    setError('');
    const formData = new FormData(e.target); // a constructor which will save all the form value with the name
    console.log(formData.get('username'));

    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');

    // console.log(username, email, password)

    try { 
      const res = await apiRequest.post("/auth/signup", {
        username, 
        email,
        password
      })
      navigate('/login')

    } catch ( err ) {
        console.log(err);
        setError(err.response.data.message); 
    } finally {
      setIsLoading(true);
    }

  };

  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isLoading}>Register</button>
          {error && <span>{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
