import React, { useState } from 'react';
import { Link } from '../../../../node_modules/react-router-dom/dist/index';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from '../../../config/firebase';
import { useAuthContext } from 'context/AuthContext';
import { useNavigate } from '../../../../node_modules/react-router-dom/dist/index';

const initialState = { username: '', email: '', password: '' }
function Signup() {
  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)
  const { dispatch } = useAuthContext();
  const navigate = useNavigate()

  // Onchange Handle

  const handleChange = (e) => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))
  }

  // Registration Handle

  const handleRegister = (e) => {
    e.preventDefault()
    setIsProcessing(true)

    const { username, email, password } = state


    // Creating User in Firebase

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, { displayName: username })
        addDocument(user)
        setState(initialState)
        console.log("userCredential.user: ", userCredential.user);
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
      })

  }

  // Creating document for user in firebase

  const addDocument = async (user) => {
    try {
      await setDoc(doc(firestore, "users", user.uid), {
        firstName: "",
        lastName: "",
        uid: user.uid
      });

      console.log("User Document created with ID: ", user.uid);
      dispatch({ type: 'LOGIN' })
    } catch (err) {
      console.error("Error adding document: ", err);
    }
    setIsProcessing(false)
    window.notify("User Registered Succefully!!", 'success');
    setInterval(() => {
      navigate("/authentication/login")
    }, 500)
  }



  return (
    <div className="Main_container" id='main_reg'>
      <div className="content_container d-flex flex-row justify-content-between align-items-center ">

        <div className="container_left ">
          <h2 className='text-white fw-bolder'>Hello!</h2>
          {/* <p className='text-white mb-1 mt-0'>Already Have An Account?</p> */}
          <Link to={"/authentication/login"} className='btn w-50 m-2 btn-light'>Login</Link>
        </div>

        <div className="container_right rounded-4">
          <h2 className='text-center mb-3'>Registration Form</h2>
          <form className='w-100'>
            <input type="text" className='form-control mb-3 ' disabled={isProcessing} name='username' required placeholder='Full Name' value={state.username} onChange={handleChange} />
            <input type="email" className='form-control mb-3 ' disabled={isProcessing} name='email' required placeholder='Email' value={state.email} onChange={handleChange} />
            <input type="password" className='form-control' disabled={isProcessing} name='password' required placeholder='Password' value={state.password} onChange={handleChange} />
            <div className="d-grid gap-2 col-6 mx-auto">
              <button className='btn text-white mt-2 border-0' id='reg_btn' disabled={isProcessing} onClick={handleRegister}>
                {!isProcessing ? 'SignUp' : <div className='spinner-border spinner-border-sm'></div>}
              </button>
            </div>
          </form>
        </div>

      </div>

    </div>
  );
}

export default Signup;
