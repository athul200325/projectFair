import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap'
import profileImg from '../assets/profileImg.jpg'
import SERVER_URL from '../services/serverUrl'
import { updateUserAPI } from '../services/allAPI'

const Profile = () => {
  const[preview,setPreview]=useState("")
  const [existingProfilePic,setExistinProfilePic]=useState("")
  const [userDetails,setuserDetails]=useState({
    username:"",email:"",password:"",github:""
,linkdin:"",profilePic:""  })

const [open, setOpen] = useState(false);
 

useEffect(()=>{
  if(sessionStorage.getItem("user")){
    const user=JSON.parse(sessionStorage.getItem("user"))
    setuserDetails({
      ...userDetails,username:user.username,email:user.email,password:user.password,github:user.github,linkdin:user.linkdin
    })
    setExistinProfilePic(user.profilePic)
  }
},[open])

useEffect(()=>{
  if(userDetails.profilePic){
    setPreview(URL.createObjectURL(userDetails.profilePic))
  }else{
    setPreview("")
  }
},[userDetails.profilePic])

const handleupdateProfile=async ()=>{
  const {username,email,password,github,linkdin,profilePic}=userDetails
  if(linkdin&&password){
    const reqBody=new FormData()
    reqBody.append("username",username)
    reqBody.append("email",email)
    reqBody.append("password",password)
    reqBody.append("github",github)
    reqBody.append("linkdin",linkdin)
    preview? reqBody.append("profilePic",profilePic): reqBody.append("profilePic",existingProfilePic)

    const token =sessionStorage.getItem("token")
    if(token){
      const reqHeader={
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }

      try{
        const result=await updateUserAPI(reqBody,reqHeader)
        if(result.status==200){
          alert("Your profile updated")
          sessionStorage.setItem("user",JSON.stringify(result.data))
          setOpen(!open)
        }else{
          console.log(result);
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
    <div className="d-flex justify-content-evenly">
      <h3 className='text-warning'>Profile</h3>
      <button  onClick={() => setOpen(!open)} className='btn text-warning'><i className="fa-solid fa-chevron-down"></i></button>
    </div>

    <Collapse in={open}>
        <div  className="row container-fluid align-items-center justify-content-center shadow p-3 rounded" id="example-collapse-text">
         <label className='text-center mb-5'>
          <input onChange={e=>setuserDetails({...userDetails,profilePic:e.target.files[0]})} type="file" style={{display:'none'}}/>
          {
            existingProfilePic==""?
            <img width={'200px'} height={'200px'} className='rounded-circle' src={preview?preview:profileImg} alt="" />
            :
            <img width={'200px'} height={'200px'} className='rounded-circle' src={preview?preview:`${SERVER_URL}/uploads/${existingProfilePic}`} alt="" />
          }
         </label>
              <div className="my-3 w-75">
              <input onChange={e=>setuserDetails({...userDetails,github:e.target.value})} value={userDetails.github} placeholder='User GITHUB link' type="text" className="form-control" />
              </div>
              <div className="mb-3  w-75">
              <input onChange={e=>setuserDetails({...userDetails,linkdin:e.target.value})} value={userDetails.linkdin}  placeholder='User LINKDIN Profile link' type="text" className="form-control" />
              </div>
              <div className="grid  w-75">
                <button onClick={handleupdateProfile} className='btn  w-100 btn-warning'>Update profile</button>
              </div>
        </div>
      </Collapse>
    </>
  )
}

export default Profile