import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function LandingPage(){
  const navigate=useNavigate()

const handleNavigate=()=>{

  
  navigate('/home')
}

  return (
    <>
    <Row>
<Col></Col>
<Col lg={6} >
<h1>welcome to video.com</h1>
<p style={{textAlign:'justify'}} > where user can use their favorate videos.user can upload  any youtube videos by copy and paste their url into video.com will allow to add and remove their uploaded videos and also arrange them in diffrent categories by drag it is free try it now !!! </p>

<button  onClick={handleNavigate} className='btn btn-success'>click here to know more</button>
</Col>


<Col lg={5}>

    <img src="https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2018/12/how-to-embed-video-in-wordpress.png" alt="no-image" className='img-fluid' style={{width:400}}/>
</Col>

    </Row>
    </>


  )
}

export default LandingPage