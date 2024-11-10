import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import landingPage from '../assets/landingPage.png'
import ProjectCard from '../components/ProjectCard'
import { Card } from 'react-bootstrap'
import logo from '../assets/mainLogo.png'
import { getHomeprojectAPI } from '../services/allAPI'



const Home = () => {

const [allHomeprojects,setAllHomeProjects]=useState()
const navigate=useNavigate()

useEffect(()=>{
  getAllHomeProjects()
},[])

const getAllHomeProjects=async ()=>{
    try{
      const result=await getHomeprojectAPI()
      if(result.status==200){
        setAllHomeProjects(result.data)
      }
    }catch(err){
      console.log(err);
      
    }
}
console.log(allHomeprojects);


  const handleProjects=()=>{

    if(sessionStorage.getItem("token")){
      navigate('/projects')
    }else{
      alert("Please login to get full access")
    }
  }

  return (
    <>
      <div style={{ minHeight: '100vh' }} className="d-flex text-light justify-content-center align-items-center rounded-shadow w-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="text-light col-lg-6">
              <h1 style={{ fontsize: '80px0' }}> <img
                style={{margin:'0'}}
                  alt=""
                  src={logo}
                  width="48"
                  height="40"
                  className="d-inline-block me-3 align-top"
                />Project Fair</h1>
              <h5 style={{ textAlign: 'justify' }}> One stop Destination for all Software Development Projects.Where User can add and manage their projects. As well as access all projects available in our website...What are you waiting for!!! </h5>
              {
                sessionStorage.getItem("token")?
                <Link to={'/dashboard'} className='btn fw-bold mt-3 btn-warning'>GO TO YOUR DASHBOARD <i class="ms-2 fs-6 fa-solid fa-circle"></i></Link>:

                <Link to={'/login'} className='btn fw-bold mt-3 btn-warning'>START TO EXPLORE <i class="ms-2 fs-6 fa-solid fa-arrow-right"></i></Link>
              }
            </div>
            <div  className=" col-lg-6">
            <img  className='img-fluid' width={'1000px'} src={landingPage} alt="landing" />
          </div>
          </div>
          
        </div>
      </div>
      <div className="mt-5 text-light text-center">
        <h1 className="mb-5">Explore Our Project</h1>
        <marquee behavior="" direction="">
          <div className="d-flex">
            {
              allHomeprojects?.map(project=>(
                <div key={project?._id} className="me-5">
                  <ProjectCard displayData={project} />
                </div>
              ))
              }
          </div>
        </marquee>
        <button onClick={handleProjects} className="btn fw-bold mt-3 btn-warning  mt-5">CLICK HERE TO VIEW MORE PROJECTS </button>
        <br /> <i class="fa-solid fs-2 fa-sort-down"></i>
      </div>
      <div className="d-flex justify-content-center text-light align-items-center mt-5 flex-column">
        <h1>Our Testimonials</h1>
        <div className="d-flex align-items-center justify-content-evenly mt-3 w-100">
          <Card style={{backgroundColor:'rgba(255, 255, 255, 0.209)', width: '18rem' }}>
            <Card.Body>
              <Card.Title className="d-flex text-light justify-content-center align-items-center flex-column"><img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw-K-ZRGsHZeNw-Dq8b1-uiyWFvWF9PRxyWA&s" alt="no image" />Max Miller</Card.Title>
              <Card.Text>
               <div className='d-flex my-3 justify-content-center '>
                <i className='fa-solid mx-2 fa-star text-warning'></i>
                <i className='fa-solid mx-2 fa-star text-warning'></i>
                <i className='fa-solid mx-2 fa-star text-warning'></i>
                <i className='fa-solid mx-2 fa-star text-warning'></i>
                <i className='fa-solid mx-2 fa-star text-warning'></i>
               </div>
               <h6 style={{textAlign:'justify',color:'white'}}> Lorem ipsum dolor sit amet consectetur adipeniti iusto eveniet! Illo aut rerum sunt perspiciatis necessitatibus odio! Praesentium adipisci recusandae quidem?</h6>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{backgroundColor:'rgba(255, 255, 255, 0.209)', width: '18rem' }}>
            <Card.Body>
              <Card.Title className="d-flex text-light justify-content-center align-items-center flex-column"><img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAEqtqaKui0HMqeIsHdfdZBQw3W562oAbQ1A&s" alt="no image" />Emma</Card.Title>
              <Card.Text>
               <div className='d-flex my-3 justify-content-center '>
                <i className='fa-solid mx-2 fa-star text-warning'></i>
                <i className='fa-solid mx-2 fa-star text-warning'></i>
                <i className='fa-solid mx-2 fa-star text-warning'></i>
                <i className='fa-solid mx-2 fa-star text-warning'></i>
                <i className='fa-solid mx-2 fa-star text-warning'></i>
               </div>
               <h6 style={{textAlign:'justify',color:'white'}}> Lorem ipsum dolor sit amet consectetur adipeniti iusto eveniet! Illo aut rerum sunt perspiciatis necessitatibus odio! Praesentium adipisci recusandae quidem?</h6>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{backgroundColor:'rgba(255, 255, 255, 0.209)', width: '18rem' }}>
            <Card.Body>
              <Card.Title className="d-flex text-light justify-content-center align-items-center flex-column"><img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTxrBqk3jhm1r8Dgv6xY9mo3bRu29WtAUf_A&s" alt="no image" />Agnes</Card.Title>
              <Card.Text>
               <div className='d-flex my-3 justify-content-center '>
                <i className='fa-solid mx-2 fa-star text-warning'></i>
                <i className='fa-solid mx-2 fa-star text-warning'></i>
                <i className='fa-solid mx-2 fa-star text-warning'></i>
                <i className='fa-solid mx-2 fa-star text-warning'></i>
                <i className='fa-solid mx-2 fa-star text-warning'></i>
               </div>
               <h6 style={{textAlign:'justify',color:'white'}}> Lorem ipsum dolor sit amet consectetur adipeniti iusto eveniet! Illo aut rerum sunt perspiciatis necessitatibus odio! Praesentium adipisci recusandae quidem?</h6>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>

    </>
  )
}

export default Home