import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import './Projects.css'
import ProjectCard from '../components/ProjectCard'
import { Col, Row } from 'react-bootstrap'
import { allProjectAPI } from '../services/allAPI'

const Projects = () => {

  const [searchKey,setSearchKey]=useState("")
  const [allProjects,setAllProjects]=useState([])
  console.log(allProjects);

  useEffect(()=>{
    getAllProjects()
  },[searchKey])

  const getAllProjects=async ()=>{
    const token =sessionStorage.getItem("token")
    if(token){
      const reqHeader={
          "Authorization":`Bearer ${token}`
      }
      try{
        const result=await allProjectAPI(searchKey,reqHeader)
        if(result.status==200){
          setAllProjects(result.data)
        }
      }catch(err){
        console.log(err);
        
      }
    }
  }
  

  return (
    <>
    <Header/>
        <div style={{paddingTop:'100px'}} className='container-fluid'>
            <div className="d-flex text-white justify-content-between">
                <h1>All Products</h1>
                <input onChange={e=>setSearchKey(e.target.value)} style={{backgroundColor:'rgba(255, 255, 255, 0.109)'}} placeholder='Search products by their Language' type="text" className="form-control w-25 text-white" />
            </div>
                <Row className='mt-3'>
                    {
                      allProjects?.length>0?
                      allProjects?.map(project=>(
                        <Col key={project?._id} className='my-4' sm={12} md={6} lg={4}>
                        <ProjectCard displayData={project}/>
                        </Col>
                      ))
                      :
                      <div className="text-danger fw-bolder">Projects not found</div>
                    }
                </Row>
                
        </div>
        
    </>
  )
}

export default Projects