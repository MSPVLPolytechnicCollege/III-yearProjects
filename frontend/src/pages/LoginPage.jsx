import React from 'react'
import {Link} from "react-router-dom"

const LoginPage = () => {
  return (
    <div className="d-flex flex-wrap align-items-center justify-content-center bg-info-subtle" style={{height:"100vh"}}>

      <div className="d-flex flex-wrap flex-column gap-4">

        <h2 className='fw-semibold text-center'>Login Page</h2>

        {/* Email */}
        <div className="row g-3 align-items-center">
          <div className="col-auto">
            <label htmlFor="inputPassword6" className="col-form-label fw-semibold">Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
          </div>
          <div className="col-auto">
            <input type="text" id="inputPassword6" style={{width:"110%"}} className="form-control" aria-describedby="passwordHelpInline" />
          </div>
        </div>

        {/* Password */}
        <div className="row g-3 align-items-center">
          <div className="col-auto">
            <label htmlFor="inputPassword6" className="col-form-label fw-semibold">Password:</label>
          </div>
          <div className="col-auto">
            <input type="password" id="inputPassword6" style={{width:"110%"}} className="form-control" aria-describedby="passwordHelpInline" />
          </div>
        </div>

        <button className='btn btn-light fw-semibold'>Login</button>

        <Link to='/register'>
          <p className=' text-decoration-underline text-primary cursor-pointer'>Dont Your Have Account? Click Here To Register</p>
        </Link>
      </div>
      
    </div>
  )
}

export default LoginPage