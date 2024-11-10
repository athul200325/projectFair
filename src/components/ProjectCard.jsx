import React,{useState} from 'react'
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import SERVER_URL from '../services/serverUrl';

const ProjectCard = ({displayData}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  
  const handleShow = () => setShow(true);

  return (
    <>
        <Card onClick={handleShow} className='btn shadow' style={{ backgroundColor:'rgba(255, 255, 255, 0.109)', width: '18rem' }}>
      <Card.Img height={'200px'} style={{objectFit:'cover'}} variant="top" src={`${SERVER_URL}/uploads/${displayData?.projectImg}`} />
      <Card.Body className='text-light'>
        <Card.Title>{displayData?.title}</Card.Title>
      </Card.Body>
    </Card>

    <Modal size='lg'  show={show} onHide={handleClose}>
        <Modal.Header  closeButton>
          <Modal.Title>Project details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-6">
                <img  style={{objectFit:'cover',width:'500px',height:'300px'}} className='img-fluid' src={`${SERVER_URL}/uploads/${displayData?.projectImg}`} alt="" />
            </div>
            <div className="text-black my-auto col-lg-6">
                <h4>{displayData?.title}</h4>
                <h6 className="fw-bolder">Language used: <span className="text-danger">{displayData?.lang}</span></h6>
                <h6 style={{textAlign:'justify'}}><span className="text-warning fw-bolder">Poject overview: </span> {displayData?.overview}</h6>
            </div>
          </div>
          <div className="mt-4  float-start">
            <a href={displayData?.github} className="btn btn-secondary"><i className="fa-brands fa-github"></i></a>
            <a href={displayData?.website} className="btn btn-secondary ms-3"><i class="fa-solid fa-link"></i></a>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ProjectCard