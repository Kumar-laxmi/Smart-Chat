import React, { useEffect, useState, Component } from 'react';
import styles from "./style.css";

import classNames from 'classnames'
import Layout from '../../components/Layout';
import Card from '../../components/UI/Card';
import { signin, isLoggedInUser } from '../../actions';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

/**
* @author
* @function LoginPage
**/

const bg = require('./sign_in_and_up_gb.png');

const LoginPage = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();
	const auth = useSelector(state => state.auth);

	const userLogin = (e) => {
		e.preventDefault();
	
		if(email == ""){
		  alert("Email is required");
		  return;
		}
		if(password == ""){
		  alert("Password is required");
		  return;
		}
	
		dispatch(signin({ email, password }));
	}

	if(auth.authenticated){
		return <Redirect to={`/`} />
	}

	return (
		<section class="vh-100">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-6 text-black">

              <div class="px-5 ms-xl-4">
                <i class="fas fa-crow fa-2x me-3 pt-5 mt-xl-4" style={{color: '#709085'}}></i>
                <span class="h1 fw-bold mb-0">Smart Chat</span>
              </div>

              <div class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">

                <form style={{width: '23rem'}} onSubmit={userLogin}>

                  <h3 class="fw-normal mb-3 pb-3" style={{letterSpacing: '1px'}}>Sign In</h3>

                  <div class="form-outline mb-4">
                    <input name="email" type="text" id="emailid" class="form-control form-control-lg" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label class="form-label" for="emailid">Email address</label>
                  </div>

                  <div class="form-outline mb-4">
                    <input name="password" type="password" id="pass" class="form-control form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <label class="form-label" for="pass">Password</label>
                  </div>

                  <div class="pt-1 mb-4">
                    <button class="btn btn-info btn-lg btn-block" type="submit">Login</button>
                  </div>

                  <p>Don't have an account? <a href="/signup" class="link-info">Register here</a></p>

                </form>

              </div>

            </div>
            <div class="col-sm-6 px-0 d-none d-sm-block">
              <img src={bg} alt="Login image" class="w-100 vh-100" style={{objectFit: 'cover', objectPosition: 'left'}} />
            </div>
          </div>
        </div>
      </section>
	)
}

export default LoginPage;