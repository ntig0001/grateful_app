import React, { useState } from "react";
import Button from "./Button";
import EditService from "./EditService";
import thank_you_img from "../img/thank_you_img.jpg";
const Service = ({service, onUpdate, onDelete}) => {
  const [editClicked, setEditClicked] = useState(false);
  return (
    <>
      {editClicked === true ? 
        <> 
          <EditService setEditClicked={setEditClicked} onUpdate={onUpdate} serviceId={service._id}/>
        </> 
        : 
        <div key={service._id} className='card'>
          <div className="banner-img"></div>
          <img src={thank_you_img} alt="thank you" className="thanks-img"/>
          <div style={serviceP}>
            <p>Grateful for {service.individual} who {service.act} when we were at {service.location}</p>
          </div>
          <div className='bottom'>
            <Button default_class={'btn btn-secondary'} text={'Edit'} onClick={()=>{
              setEditClicked(true)
            }}/>
            <Button default_class={'btn btn-danger'} text={'Delete'} onClick={()=>{onDelete(service._id)}}/>
          </div>
        </div>
      }
    </>
  )
}

const serviceP = {
    marginBottom: '6rem',
    textAlign: 'center',
    marginRight: '.5rem',
    marginLeft: '.5rem'
}

export default Service
