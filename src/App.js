import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import AddService from './components/AddService';
import Services from './components/Services';
import Footer from './components/Footer';

function App() {
  const [isHome, setIsHome] = useState(true);
  const [services, setServices] = useState([]);
  
  //reload and display services on reload
  useEffect(()=>{
    const getServices = async () => {
      const dbServices = await fetchServices();
      setServices(dbServices);
    }
    getServices()
  }, [])

  // fetch services from database
  const fetchServices = async () => {
    const res = await axios({
      url: '/services',
      method: 'GET'
    })
    return res.data
  }

  //fetch one service
  const fetchOne = async (id) => {
    const res = await axios({
      url: `/services/findone/${id}`,
      method: 'GET'
    })
    return res.data
  }

  //add a service
  const addService = async (service) => {
    const res = await axios({
      url: '/services/create',
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      data: JSON.stringify(service)
    })
    const serviceToAdd = res.data 
    setServices([...services, serviceToAdd])
  }

  //set up update request
  const updateService = async (id, service) => {
    const res = await axios({
      url: `/services/update/${id}`,
      method: 'PUT',
      headers: {
        'Content-type':'application/json'
      },
      data: JSON.stringify(service)
    })
    return res.data
  }

  //update a service
  const onUpdate = async (id, service) => {
    const serviceToUpdate = await fetchOne(id);
    const updatedService = {...serviceToUpdate, act: service.act, location: service.location, individual: service.individual}
    const returnedService = await updateService (id, updatedService);
    const newServices = services.map((service) => {
      if(service._id === id) {
        return returnedService
      }
      return service
    })
    setServices(newServices);
  }

  //delete a service
  const onDelete = async (id) => {
    await axios({
      url: `/services/delete/${id}`,
      method: 'DELETE'
    })
    setServices(services.filter((service) => service._id !== id))
  }

  return (
    <Router>
      <div className={isHome ? "App" : "wrapper"}>
        <Header onClick={()=>{setIsHome(!isHome)}} isHome={isHome}/>
        {!isHome && 
          <Route path='/' exact component={()=>
            <>
              <AddService onAdd={addService}/>
              {(services.length > 0 ? (<Services services={services} onUpdate={onUpdate} onDelete={onDelete}/>) : 'You have nothing to be grateful for')}
              <Footer/>
            </> 
          }/>  
        }
      </div>
    </Router>
  );
}

export default App;
