const Button = ({default_class, text, onClick}) => {
  return (
    <>
      <button className={default_class} onClick={onClick}>{text}</button>
    </>
  )
}

Button.defaultProps = {
  default_class: 'btn btn-info',
  isHome: false,
  text : 'Get Started'
}

export default Button
