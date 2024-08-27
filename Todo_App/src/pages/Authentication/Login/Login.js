import React, { useState } from 'react';
import { Link, useNavigate } from '../../../../node_modules/react-router-dom/dist/index';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from 'config/firebase';

const initialState = { email: '', password: '' }
function Login() {
  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)
  const navigate = useNavigate()


  // Handle Onchange for Login Form

  const handleChange = (e) => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))
  }

  // Handle Login Button

  const handleLogin = (e) => {
    e.preventDefault()
    const { email, password } = state
    setIsProcessing(true)

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        navigate('/dashboard')
        window.notify(`Welcome Dear ${user.displayName}`, 'success');

        setIsProcessing(false)
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;

        switch (errorCode) {
          case 'auth/invalid-email':
            console.log("Please Enter a Valid Email Address")
            break;
          default:
            console.log("Something Went Wrong...");
        }
        setIsProcessing(false)
      });



    setInterval(() => {
      setIsProcessing(false)
    }, 1000)
    // setState(initialState)
  }

  return (
    <div className="Main_container">
      <div className="content_container d-flex flex-row justify-content-between align-items-center ">

        <div className="container_left">
          <h2 className='text-white fw-bolder'>Hello!</h2>
          {/* <p className='text-white mb-1 mt-0'>Dont't Have An Account?</p> */}
          <Link to={"/authentication/register"} className='btn w-50 m-2 btn-light'>Sign Up</Link>
        </div>

        <div className="container_right rounded-4">
          <h2 className='text-center mb-3'>Login Form</h2>
          <form className='w-100'>
            <input type="email" className='form-control mb-3 ' value={state.email} name='email' required placeholder='Enter Your Email' onChange={handleChange} />
            <input type="password" className='form-control' value={state.password} name='password' required placeholder='Enter Your Password' onChange={handleChange} />
            <div className="d-grid gap-2 col-6 mx-auto">
              <button className='btn text-white mt-2 border-0' id='login_btn' disabled={isProcessing} onClick={handleLogin}>
                {!isProcessing ? 'Login' : <div className='spinner-border spinner-border-sm'></div>}
              </button>
            </div>
          </form>
        </div>

      </div>

    </div>
  );
}

export default Login;
