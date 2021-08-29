import {useState} from 'react';
const EditService = ({setEditClicked, onUpdate, serviceId}) => {
  const [act, setAct] = useState('')
  const [location, setLocation] = useState('')
  const [individual, setIndividual] = useState('')
  const [message, setMessage] = useState('')

  //submit service to the database or display an error for empty input
  const onSubmit = (e) => {
    e.preventDefault();
    if(!act || !location || !individual) {
      setMessage('Please Try Again...')
      setTimeout( () =>
        setEditClicked(false), 500      
      )
      return
    }
    onUpdate(serviceId, {act: cleanAct(act), location, individual})
    setAct('')
    setIndividual('')
    setLocation('')
  }

  //strip he, she, they from act
  const cleanAct = (act) => {
    let newAct = act.replace(/\b(?:[h]e|she|they)\b/ig, '');
    return newAct.toLowerCase();
  }

  return (
    <div className="card service-form">
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Who: </label>
          <input type="text" maxLength='30' className="form-control" value={individual} onChange={(e)=>{setIndividual(e.target.value)}} placeholder='Who was gracious to you?'/>
        </div>
        <div className='form-group'>
          <label>What: </label>
          <input type="text" maxLength='100' className="form-control" value={act} onChange={(e)=>{setAct(e.target.value)}} placeholder='What did they do for you?'/>
        </div>
        <div className='form-group'>
          <label>Where: </label>
          <input type="text" maxLength='20' className="form-control" value={location} onChange={(e)=>{setLocation(e.target.value)}} placeholder='Where were you at?'/>
        </div>
        <h6 className={`${message ? 'text-danger': ''}`}>{message}</h6>
        <input type="submit" value='Update' className='btn btn-primary btn-block' style={{backgroundColor:"#7ea865"}}/>
      </form>
      <form onSubmit={()=>{
        setEditClicked(false) 
      }}>
        <input type="text" hidden/>
        <input type="submit" value='Ignore' className='btn btn-primary' style={{backgroundColor:"#8c846c", marginTop:".5rem"}}/>
      </form>
    </div>
  )
}

export default EditService;
