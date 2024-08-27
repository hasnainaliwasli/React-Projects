import { Link } from 'react-router-dom'
import { useAuthContext } from '../../../../context/AuthContext.jsx';
import { signOut } from "firebase/auth";
import { auth } from 'config/firebase.js';

export default function Navbar() {

  const { isAuthenticated, dispatch } = useAuthContext();


  const handleLogout = () => {
    signOut(auth).then(() => {
      dispatch({ type: 'LOGOUT' })

      window.notify("Your are Logged out", 'info')
    }).catch((err) => {
      console.error(err);
    });
  }

  return (

    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">TODO APP</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="/todo">Todo</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>


              {/* <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/">Action</Link></li>
                  <li><Link className="dropdown-item" to="/">Another action</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/">Something else here</Link></li>
                </ul>
              </li> 
               <li className="nav-item">
                <Link className="nav-link disabled" aria-disabled="true">Disabled</Link>
              </li> */}
            </ul>
            <div className="d-flex" >
              {!isAuthenticated ? <Link to='/authentication/login' className="btn btn-primary text-white">Login</Link> :
                <>
                  <Link to='/dashboard' className="btn btn-sm btn-primary text-white me-3">Dashboard</Link>
                  <button className="btn btn-sm btn-danger text-white" onClick={handleLogout}>Logout</button>
                </>
              }


            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
