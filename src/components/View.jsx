import React, {  useEffect, useState } from 'react'
import Add from './Add'
import Edit from './Edit'
import { userProjectAPI, userProjectRemoveAPI } from '../services/allAPI'
import { addProjectResponseContext, editProjectResponseContext } from '../../context/ContextAPI'
import { useContext } from 'react'

const View = () => {
  

  const { editProjectResponse, setEditProjectResponse } = useContext(editProjectResponseContext);
 
  const {addProjectResponse,setAddProjectResponse} =useContext(addProjectResponseContext)

  
  const [userProject,setUserProject]=useState([])

  useEffect(()=>{
    getUserProject()
  },[addProjectResponse,editProjectResponse])

  console.log(userProject);
  
  const getUserProject=async()=>{
    const token=sessionStorage.getItem("token")
    if(token){
      const reqHeader={
        "Authorization":`Bearer ${token}`
    }
      try{
        const result=await userProjectAPI(reqHeader)
        console.log(result);
        if (result.status==200) {
          setUserProject(result.data)
        }
        
      }catch(err){
        console.log(err);
        
      }
      
    }
  }

  const deleteProject=async (id)=>{
    const token=sessionStorage.getItem("token")
    if(token){
      const reqHeader={
        "Authorization":`Bearer ${token}`
      }
      try{
        await userProjectRemoveAPI(id,reqHeader)
        getUserProject()
      }catch(err){
        console.log(err);
      }
    }
  }
  return (
    <>
    <div className="d-flex justify-content-between">
        <h2 className="text-warning">All Projects</h2>
        <div><Add/></div>
        </div>
        <div className="mt-2 allProjects">
            {
              userProject?.length>0?
              userProject?.map(project=>(
                <div key={project?._id} className="border text-light rounded p-2 d-flex justify-content-between mb-3 ">
                <h4>{project?.title}</h4>
                <div className="d-flex align-items-center">
                    <div><Edit project={project}/></div>
                    <div className="btn"><a target='_blank' href={project?.github} className="fa-brands fa-github"></a></div>
                    <button onClick={()=>deleteProject(project?._id)} className="btn text-warning"><i className="fa-solid fa-trash"></i></button>
                </div>
            </div>
              ))
              :
              <div className="text-danger fw-bolder">User not uploaded any project yet</div>
            }
        </div>
    
    </>
  )
}

export default View