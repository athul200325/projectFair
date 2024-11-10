import React, { useContext, useEffect, useState } from 'react'
import { Modal,Button } from 'react-bootstrap'
import placeImg from '../assets/placeImg.jpg'
import { addProjectAPI } from '../services/allAPI'
import { addProjectResponseContext } from '../../context/ContextAPI'
 
const Add = () => {
  const {addProjectResponse,setAddProjectResponse} =useContext(addProjectResponseContext)

  const [preview,setPreview]=useState("")

  const [imageFileStatus,setImageFileStatus]=useState(false)
  const [projectDetails,setProjectDetails]=useState({
    title:"",
    lang:"",
    overview:"",
    github:"",
    website:"",
    projectImg:""
  })

  
  

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

  console.log(projectDetails);
  
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setPreview("")
    setProjectDetails({
      title:"",
      lang:"",
      overview:"",
      github:"",
      website:"",
      projectImg:""
    })
  }
  const handleShow = () => setShow(true);

  const handleAddProject=async ()=>{
    const {title,lang,overview,github,website,projectImg}=projectDetails
    if(title&&lang&&overview&&website&&github&&projectImg){
      // alert("proceed to api")
      const reqBody =new FormData()
      reqBody.append("title",title)
      reqBody.append("lang",lang)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("projectImg",projectImg)
      const token=sessionStorage.getItem("token")
      if(token){
        const reqHeader={
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        try{
          const result=await addProjectAPI(reqBody,reqHeader)
          if(result.status==200){
            alert("Project added successfully")
            setAddProjectResponse(result)
            handleClose()
          }else{
            alert(result.response.data)
          }
        }catch(err){
          console.log(err);
          
        }
      }

    }else{
      alert("Please fill the form completely")
    }
  }
  return (
    <>
    <button onClick={handleShow} className='btn btn-primary '>+ New Project</button>
    <Modal 
        size='lg'
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className='text-black' closeButton>
          <Modal.Title>Add Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-black'>
          <div className="row align-items-center">
            <div className="col-lg-4">
              <label>
                <input onChange={e=>setProjectDetails({...projectDetails,projectImg:e.target.files[0]})} type="file" style={{display:'none'}} />
                <img height={'200px'} className='img-fluid' src={preview?preview:placeImg} alt="" />
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
          <Button onClick={handleAddProject} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Add