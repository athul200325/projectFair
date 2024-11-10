
import React from 'react'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <div style={{ height: '300px' }} className='container-fluid mt-5 p-5 shadow-lg'>
      <div className='d-flex justify-content-between'>
        <div style={{ width: '400px' }} className='text-light intro'>
          <h5><i>Project Fair</i></h5>
          <h6>Designed and built with all the love in the world by the Luminar team with the help of our contribution.</h6>
          <h6>Code licensed Luminar, docs CC BY 3.0</h6>
          <h6>Currently v5.3.2.</h6>
        </div>
        <div className="d-flex text-light flex-column">
          <h5>Links</h5>
          <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>Home</Link>
          <Link to={'/login'} style={{ textDecoration: 'none', color: 'white' }}>Login</Link>
          <Link to={'/register'} style={{ textDecoration: 'none', color: 'white' }}>Register</Link>
        </div>  
        <div className="d-flex text-light flex-column">
          <h5>Guides</h5>
          <a href="https://react.dev/" style={{ textDecoration: 'none', color: 'white' }} target='_blank'>React</a>
          <a href="https://react-bootstrap.github.io/" style={{ textDecoration: 'none', color: 'white' }} target='_blank'>React Bootstrap</a>
          <a href="https://reactrouter.com/en/main" style={{ textDecoration: 'none', color: 'white' }} target='_blank'>React Router</a>
         
        </div>
        <div className="d-flex text-light flex-column justify-content-between mt-3"> 
          <h5>Contact Us</h5>
          <div className='d-flex'>
            <input placeholder='Enter your email here' type="text" className='form-control' />
            <button className='btn btn-warning ms-2'><i className='fa-solid fa-arrow-right'></i></button>
          </div>
          <div className='icons d-flex justify-content-between mt-3'>
          <a href="" style={{ textDecoration: 'none', color: 'white' }} target='_blank'><i className='fa-brands fa-twitter'></i></a>
          <a href="" style={{ textDecoration: 'none', color: 'white' }} target='_blank'><i className='fa-brands fa-instagram'></i></a>
          <a href="" style={{ textDecoration: 'none', color: 'white' }} target='_blank'><i className='fa-brands fa-facebook'></i></a>
          <a href="" style={{ textDecoration: 'none', color: 'white' }} target='_blank'><i className='fa-brands fa-twitter'></i></a>
          <a href="" style={{ textDecoration: 'none', color: 'white' }} target='_blank'><i className='fa-brands fa-github'></i></a>
          <a href="" style={{ textDecoration: 'none', color: 'white' }} target='_blank'><i className='fa-brands fa-instagram'></i></a>
          </div>
        </div>
      </div>
      <h6 className='text-center text-light px-2'> Copyright &copy; June 2024 Batch, Media Player. Built with React.</h6>
    </div>
  )
}

export default Footer