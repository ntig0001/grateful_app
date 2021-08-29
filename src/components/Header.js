import Button from "./Button"
import { useLocation } from "react-router-dom"
const Header = ({onClick, isHome}) => {
  const path_name = useLocation()
  return (
    <div className='header'>
      <div style={{paddingBottom:"1rem"}}>
        <h4>What Are You Grateful For?</h4>
      </div>
      {path_name.pathname === '/' 
       && <Button default_class={isHome? 'btn btn-info': 'btn btn-danger'} text={isHome? 'Get Started': 'Close'} onClick={onClick}/> }
    </div>
  )
}

export default Header
