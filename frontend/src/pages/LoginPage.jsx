import React from 'react'
import {Link} from "react-router-dom"

const LoginPage = () => {
  return (
    <div className="d-flex align-items-center justify-content-center bg-info-subtle" style={{height:"100vh"}}>
      <div className="bg-white p-5 rounded shadow-lg" style={{width: "100%", maxWidth: "500px"}}>
        <h2 className='fw-semibold text-center mb-4'>Login Page</h2>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-semibold">Email</label>
          <input type="email" id="email" className="form-control" placeholder="Enter your email" required />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label fw-semibold">Password</label>
          <input type="password" id="password" className="form-control" placeholder="Enter your password" required />
        </div>

        {/* Sign In Button */}
        <button type='submit' className='btn btn-primary w-100 fw-semibold mb-3'>Login</button>

        {/* Link to Login Page */}
        <Link to='/register'>
          <p className='text-center text-decoration-underline text-primary cursor-pointer'>
            Dont have an account? Click here to Register
          </p>
        </Link>
      </div>
    </div>
  )
}

export default LoginPage