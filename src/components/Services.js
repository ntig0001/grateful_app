import Service from "./Service"
const Services = ({services, onUpdate, onDelete}) => {
  return (
    <div className="wrapper-grid">
      {services.map((service, index) =>(
        <Service key={index} service={service} onUpdate={onUpdate} onDelete={onDelete}/>  
        ))
      }
    </div>
  )
}

export default Services
