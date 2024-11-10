import React, { useContext } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import logo from '../assets/mainLogo.png'
import { Link, useNavigate } from 'react-router-dom'
import { tokenAuthContex } from '../../context/AuthContextAPI'

const Header = ({insideDashboard}) => {
  const {isAutherized,setIsAutherized}=useContext(tokenAuthContex)

  const navigate=useNavigate()

const  logout=()=>{
  sessionStorage.clear()
  setIsAutherized(false)
  navigate('/')
}
  return (
    
    <Navbar style={{zIndex:'1'}} className="position-fixed w-100 p-3 bg-transparent ">
        <Container>
          <Link style={{textDecoration:'none'}} to={'/'}>
              <Navbar.Brand className='text-white' href="#home">
                <img
                style={{margin:'0'}}
                  alt=""
                  src={logo}
                  width="48"
                  height="40"
                  className="d-inline-block align-top"
                />{' '}
                React Bootstrap
              </Navbar.Brand>
          </Link>
          {
            insideDashboard &&
            <div className="ms-auto">
                <button onClick={logout} className='btn border fw-bolder rounded text-light'>Logout <i className="fa-solid fa-right-from-bracket"></i></button>
            </div>
          }
        </Container>
      </Navbar>
  )
}

export default Header