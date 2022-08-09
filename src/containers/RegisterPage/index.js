import React, { useState } from 'react';
import Layout from '../../components/Layout';
import Card from '../../components/UI/Card';
import { signup } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './style.css';

/**
* @author
* @function RegisterPage
**/

const bg = require('./sign_in_and_up_gb.png');

const RegisterPage = (props) => {


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
  
  
    const registerUser = (e) => {
      
      e.preventDefault();
  
      const user = {
        firstName, lastName, email, password
      }
      
      dispatch(signup(user))
    }
  
  
    if(auth.authenticated){
      return <Redirect to={`/`} />
    }
  
    return(
      <section class="vh-100">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-6 px-0 d-none d-sm-block">
              <img src={bg} alt="Login image" class="w-100 vh-100" style={{objectFit: 'cover', objectPosition: 'left'}} />
            </div>

            <div class="col-sm-6 text-black">

              <div class="px-5 ms-xl-4">
                <i class="fas fa-crow fa-2x me-3 pt-5 mt-xl-4" style={{color: '#709085'}}></i>
                <span class="h1 fw-bold mb-0">Smart Chat</span>
              </div>

              <div class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">

                <form style={{width: '23rem'}} onSubmit={registerUser}>

                  <h3 class="fw-normal mb-3 pb-3" style={{letterSpacing: '1px'}}>Sign Up</h3>

                  <div class="form-outline mb-4">
                    <input name="firstName" type="text" id="firstname" class="form-control form-control-lg" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <label class="form-label" for="firstname">First Name</label>
                  </div>

                  <div class="form-outline mb-4">
                    <input name="lastName" type="text" id="lastname" class="form-control form-control-lg" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <label class="form-label" for="lastname">Last Name</label>
                  </div>

                  <div class="form-outline mb-4">
                    <input name="email" type="text" id="emailid" class="form-control form-control-lg" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label class="form-label" for="emailid">Email address</label>
                  </div>

                  <div class="form-outline mb-4">
                    <input name="password" type="password" id="pass" class="form-control form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <label class="form-label" for="pass">Password</label>
                  </div>

                  <div class="pt-1 mb-4">
                    <button class="btn btn-info btn-lg btn-block" type="submit">Sign Up</button>
                  </div>

                  <p>Already a member? <a href="/login" class="link-info">Login here</a></p>

                </form>

              </div>

            </div>
          </div>
        </div>
      </section>
    );
  
}
  
export default RegisterPage;