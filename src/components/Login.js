import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';

const Login = () => {
  // 2. Add whatever state nessiary for form functioning.
  const [user, setUser] = useState({
    username: '',
    password: ''
  })
  const [errors, setErrors] = useState({error: 'Username or Password not valid.'})
  const { push } = useHistory();

  
  
  
  const changeHandler = e => {
    e.preventDefault();
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

 

  const submit = e => {
    e.preventDefault();
    // 4. If either the username or password is not displaied display EXACTLY the following words: Username or Password not valid.
    if(user.username !== 'Lambda School' || user.password !== 'i<3Lambd4' ) {
      return {errors}
    } else {
      // 5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.
      // make a post request to retrieve a token from the api
      axios.post('http://localhost:5000/api/login', user)
      .then(res => {
        localStorage.setItem('token', res.data.payload)
        // when you have handled the token, navigate to the BubblePage route
        push('/bubbles')

      })
      .catch(err => {
        console.log('login error: ', err)
      })
    }
  }


  return (
    <>
      <h1>
        Welcome to the Bubble App!
        <p>Build a login page here</p>
      </h1>
      {/* 1. Build a form containing a username and password field. */}
      <form onSubmit={submit}>
      {/* 3. MAKE SURE THAT FORM INPUTS INCLUDE THE LABEL TEST "username" and "password" RESPECTIVELY. */}
        <label for='username' test-id='username'>Username</label>
        <input
        name='username'
        value={user.username}
        type='text'
        onChange={changeHandler}
        placeholder='enter your username'
        />
        <label for='password' test-id='password'>Password</label>
        <input
        name='password'
        value={user.password}
        type='password'
        onChange={changeHandler}
        placeholder='enter your password'
        />
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;





