import React from 'react'
import { Link } from '../../../node_modules/react-router-dom/dist/index'

export default function Home() {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="card rounded-5 my-5 p-3 pt-5" id='card_dash'>
                            <h1 className='text-center pt-5 pb-5'>Welcome To Dashboard</h1>
                            <h1 className='text-center'><Link className='btn btn-success' to='/'>Continue to Home</Link></h1>
                        </div>
                    </div>
                </div>
            </div>





        </>
    )
}
