import {useState} from 'react';
const AddService = ({onAdd}) => {
  const [act, setAct] = useState('')
  const [location, setLocation] = useState('')
  const [individual, setIndividual] = useState('')
  const [message, setMessage] = useState('')

  //submit service to the database or display an error for empty input
  const onSubmit = (e) => {
    e.preventDefault();
    if(!act || !location || !individual) {
      setMessage('The fields cannot be empty. Please try again...')
      return
    }
  
    onAdd({act: cleanAct(act), location, individual})
    setAct('')
    setLocation('')
    setIndividual('')
  }

  //strip he, she, they from act
  const cleanAct = (act) => {
    let newAct = act.replace(/\b(?:[h]e|she|they)\b/ig, '');
    return newAct.toLowerCase();
  }

  return (
    <div className="service-form">
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Who: </label>
          <input type="text" maxLength='30' className="form-control" value={individual} onChange={(e)=>{setIndividual(e.target.value)}} placeholder='Who was gracious to you?'/>
        </div>
        <div className='form-group'>
          <label>What: </label>
          <input type="text" maxLength='100' className="form-control" value={act} 
          onChange={(e)=>{
            setAct(e.target.value)
          }} placeholder='What did they do for you?'/>
        </div>
        <div className='form-group'>
          <label>Where: </label>
          <input type="text" maxLength='15' className="form-control" value={location} onChange={(e)=>{setLocation(e.target.value)}} placeholder='Where did it take place?'/>
        </div>
        <h4 className={`${message ? 'text-danger': ''}`}>{message}</h4>
        <input type="submit" value='Save' className='btn btn-success btn-block'/>
      </form>
    </div>
  )
}

export default AddService;
