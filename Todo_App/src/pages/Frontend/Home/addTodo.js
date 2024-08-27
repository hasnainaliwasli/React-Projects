import React, { useState } from 'react'
import { useAuthContext } from 'context/AuthContext'
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { firestore } from 'config/firebase';


const initialState = {
  title: '',
  location: '',
  description: ''
}
const randomId = () => Math.random().toString(36).slice(2)
export default function Hero() {

  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)
  const { isAuthenticated } = useAuthContext()
  const { user } = useAuthContext()


  // Handle onChange

  const handleChange = (e) => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))
  }

  const formSubmit = (e) => {
    e.preventDefault()

    if (!isAuthenticated) {
      return window.notify("You need to Login first to Add Todo", 'warning')
    }

    var { title, location, description } = state;

    title = title.trim()
    location = location.trim()
    description = description.trim()

    if (title.length < 3) {
      return window.notify("Title length must be greater than 3 characters", 'error')
    }
    if (location.length < 3) {
      return window.notify("Location length must be greater than 3 characters", 'error')
    }
    if (description.length < 10) {
      return window.notify("Please Enter Complete Description", 'error')
    }

    let formData = { title, location, description, }

    formData.createdAt = serverTimestamp()
    formData.id = randomId()
    formData.status = 'Active'
    formData.createdBy = {
      email: user.user.email,
      userName: user.user.displayName,
      uid: user.user.uid
    }

    console.log('formDat', formData);


    setDocument(formData)

  }

  const setDocument = async (formData) => {
    setIsProcessing(true)
    try {
      await setDoc(doc(firestore, "todos", formData.id), formData)
      window.notify("New TODO Added successfully!", 'success');
      setState(initialState)
    }
    catch (err) {
      console.log("Todo Error:", err);
      window.notify("Something went wrong,TODO not added", 'error');
    }

    setIsProcessing(false)
  }


  return (
    <div className='container my-5'>
      <div className="row ">
        <div className="col ">
          <div className="card p-3 p-md-4 p-lg-5" id='hero_card'>
            <form onSubmit={formSubmit}>
              <div className="row">
                <div className="col">
                  <h2 className='text-center fw-bolder text-dark pb-2'>ADD TODO</h2>
                </div>

                <div className="row">
                  <div className="col-12 col-md-6 mb-2">
                    <input type="text" className='form-control fs-5' value={state.title} placeholder='Enter Title' name='title' onChange={handleChange} />
                  </div>
                  <div className="col-12 col-md-6 mb-2">
                    <input type="text" className='form-control fs-5' value={state.location} placeholder='Enter Location' name='location' onChange={handleChange} />
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col">
                    <textarea type="text" rows='5' name='description' value={state.description} className='form-control fs-5' placeholder='Enter Full Description' onChange={handleChange} />
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col">
                    <button disabled={isProcessing} className='btn btn-success border-0 w-100'>
                      {!isProcessing ? " ADD TODO" : <div className='spinner-border spinner-border-sm'></div>}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>


    </div>
  )
}
