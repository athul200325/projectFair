import React, { useContext, useState } from 'react'
import loginImg from '../assets/loginImg.png'
import { Form,FloatingLabel,Spinner } from 'react-bootstrap'
import {  Link, useNavigate } from 'react-router-dom'
import logo from '../assets/mainLogo.png'
import { loginAPI, registerAPI } from '../services/allAPI'
import { tokenAuthContex } from '../../context/AuthContextAPI'



const Auth = ({insideRegister}) => {
  const {isAutherized,setIsAutherized}=useContext(tokenAuthContex)
  const [islogined,setIsLogin]=useState(false)

  const navigate=useNavigate()
  const [inputData,setInputData]=useState({
    username:"",email:"",password:""
  })
  console.log(inputData);

  const handleRegister= async(e)=>{
    e.preventDefault()
    console.log("Inside handleRegister");
    if(inputData.username&&inputData.email&&inputData.password){
      try{
        const result =await registerAPI(inputData)
        console.log(result);

        if(result.status==200){
          alert(`Register success....HI ${result?.data.username} Please login`)
          navigate('/login')
          setInputData({username:"",email:"",password:""})

        }else{
          if(result.response.status==406){
            alert(result.response.data)
            setInputData({username:"",email:"",password:""})
          }
        }
        
      }catch(err){
        console.log(err);
        
      }
    }else{
      alert("please fill the form")
    }
    
  }

  const handleLogin=async(e)=>{
    e.preventDefault()
    if(inputData.email && inputData.password){
      try{
        const result=await loginAPI(inputData)
        if(result.status==200){
          sessionStorage.setItem("user",JSON.stringify(result.data.user))
          sessionStorage.setItem("token",result.data.token)
          setIsAutherized(true)
          setIsLogin(true)
          setTimeout(() => {
            alert("LETS GOOO>>>>")
            setInputData({username:"",email:"",password:""})
            navigate('/')
            setIsLogin(true)
          }, 2000);
        }else{
          if(result.response.status==404){
            alert(result.response.data)
          }
        }
      }catch(err){
        console.log(err);
      }
    }else{
      alert("Please fill the form completely")
    }
  }
  
  return (
    <div className='d-flex justify-content-center align-items-center' style={{minHeight:'100vh',width:'100%'}}>
      <div  className="container  w-75">
          <div style={{backgroundColor:'rgba(255, 255, 255, 0.109)'}} className="shadow card p-2">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <img src={loginImg} alt="" className="img-fluid" />
              </div>
              <div className="text-light  col-lg-6">
                  <h2 className='m-3 ms-4'> <img
                style={{margin:'0'}}
                  alt=""
                  src={logo}
                  width="48"
                  height="40"
                  className="d-inline-block me-2 align-top"
                /> Project Fair</h2>
                  <h5 className='m-3 ms-4'>Sing {insideRegister?"Up":"In"} to your Account</h5>

                 <Form>
                    {
                      insideRegister && 
                      <FloatingLabel  className='mb-5 mx-4 ' controlId="floatingUsername" label="Username">
                  <Form.Control onChange={e=>setInputData({...inputData,username:e.target.value})} className='my-5 w-75' style={{backgroundColor:'rgba(255, 255, 255, 0.109)',color:'white'}} type="username" placeholder="Username" />
                  </FloatingLabel>
  
                  }
                    
                      <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-3 mx-4"
                >
                  
                  <Form.Control onChange={e=>setInputData({...inputData,email :e.target.value})}  className='my-5 w-75' style={{backgroundColor:'rgba(255, 255, 255, 0.109)',color:'white'}} type="email" placeholder="name@example.com" />
                </FloatingLabel>
                <FloatingLabel className='mb-5 mx-4 ' controlId="floatingPassword" label="Password">
                  <Form.Control onChange={e=>setInputData({...inputData,password:e.target.value})}  className='my-5 w-75' style={{backgroundColor:'rgba(255, 255, 255, 0.109)',color:'white'}} type="password" placeholder="Password" />
                </FloatingLabel>
                    {
                      insideRegister?
                      <div className="mt-3">
                        <button onClick={handleRegister} className="ms-4 btn btn-primary mb-2">Register</button>
                        <p className="ms-4 mt-2">Alredy a user? Please Click here to <Link to={'/login'}>Login</Link></p>
                      </div>
                      :
                      <div className="mt-3">
                        <button onClick={handleLogin} className="ms-4 btn btn-primary mb-2 d-flex">Login
                        {islogined &&
                          <Spinner className='ms-2' animation="border" variant="light" />}
                        </button>
                        <p className="ms-4 mt-2">New user? Please Click here to <Link to={'/register'}>Register</Link></p>
                      </div>
                    }

                 </Form>
              </div>
            </div>
          </div>      
          </div>
    </div>
  )
}

export default Auth