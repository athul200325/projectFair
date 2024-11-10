import React, {  useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import placeImg from '../assets/placeImg.jpg'
import SERVER_URL from '../services/serverUrl'
import { updateProjectAPI } from '../services/allAPI'
import { editProjectResponseContext } from '../../context/ContextAPI'
import { useContext } from 'react'


const Edit = ({project}) => {
  const { editProjectResponse, setEditProjectResponse } = useContext(editProjectResponseContext);

  const [preview,setPreview]=useState("")

  const [imageFileStatus,setImageFileStatus]=useState(false)
  const [projectDetails,setProjectDetails]=useState({
    id: project._id,
    title: project.title,
    lang: project.lang,
    overview: project.overview,
    github: project.github,
    website: project.website,
    projectImg:""
  })

  console.log(projectDetails);

  useEffect(()=>{
    if (projectDetails.projectImg && ["image/png", "image/jpg", "image/jpeg"].includes(projectDetails.projectImg.type)) 
      {
      setImageFileStatus(true);
      setPreview(URL.createObjectURL(projectDetails.projectImg))
    }else{
      setImageFileStatus(false);
      setPreview("")
      if(projectDetails.projectImg){
        setProjectDetails({ ...projectDetails, projectImg: "" });
      }
    }
  },[projectDetails.projectImg]);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
    setProjectDetails(
      {
        id: project._id,
        title: project.title,
        lang: project.lang,
        overview: project.overview,
        github: project.github,
        website: project.website,
        projectImg:""
      }
    )
  };
  const handleShow = () => {
    setShow(true)
    setProjectDetails(
      {
        id: project._id,
        title: project.title,
        lang: project.lang,
        overview: project.overview,
        github: project.github,
        website: project.website,
        projectImg:""
      }
    )
  };

  const handleUpdateProject=async()=>{
    const {id,title,lang,overview,github,website,projectImg}=projectDetails
    if (title && lang && overview && github && website) {
      const reqBody=new FormData()
      
      reqBody.append("title",title)
      reqBody.append("lang",lang)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      preview? reqBody.append("projectImg",projectImg) : reqBody.append("projectImg",project.projectImg)
      const token=sessionStorage.getItem("token")
      if(token){
        const reqHeader={
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }

        try{
          const result = await updateProjectAPI(id,reqBody,reqHeader)
          if(result.status==200){
          alert("Project Update successfully!!")
          handleClose()
          setEditProjectResponse(result)
          }
        }
        catch(err){
          console.log(err);
          
        }
      }

    }else{
      alert("Please fill the form completely")
    }
  }
  return (
    <>
    <button onClick={handleShow} className='btn'><i className="fa-solid fa-edit"></i></button>


    <Modal 
        size='lg'
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className='text-black' closeButton>
          <Modal.Title>Update Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-black'>
        <div className="row align-items-center">
            <div className="col-lg-4">
              <label>
                <input onChange={e=>setProjectDetails({...projectDetails,projectImg:e.target.files[0]})} type="file" style={{display:'none'}} />
                <img height={'200px'} className='img-fluid' src={preview?preview:`${SERVER_URL}/uploads/${project.projectImg}`} alt="" />
              </label>
              { !imageFileStatus &&
                <div className="text-danger">*upload only the following file(jpeg,jpg,png)</div>
                }
            </div>
            <div className="col-lg-8">
              <div className="mb-3">
                <input value={projectDetails.title} onChange={e=>setProjectDetails({...projectDetails,title:e.target.value})} placeholder='Project title' type="text" className="form-control" />
              </div>
              <div className="mb-3">
              <input value={projectDetails.lang} onChange={e=>setProjectDetails({...projectDetails,lang:e.target.value})} placeholder='Lang used in Project' type="text" className="form-control" />
              </div>
              <div className="mb-3">
              <input value={projectDetails.overview} onChange={e=>setProjectDetails({...projectDetails,overview:e.target.value})} placeholder='Project overview' type="text" className="form-control" />
              </div>
              <div className="mb-3">
              <input value={projectDetails.github} onChange={e=>setProjectDetails({...projectDetails,github:e.target.value})} placeholder='Project Github link' type="text" className="form-control" />
              </div>
              <div className="mb-3">
              <input value={projectDetails.website} onChange={e=>setProjectDetails({...projectDetails,website:e.target.value})} placeholder='Project wbsite link' type="text" className="form-control" />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleUpdateProject} variant="primary">Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Edit