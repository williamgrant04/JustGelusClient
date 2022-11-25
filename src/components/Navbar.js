import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import axios from "axios"


const Navbar = () => {
  const navigateTo = useNavigate()
  
  const logoutHandler = () => {
    let token = localStorage.getItem('_jgu_jwt')
    console.log(token)
    axios.delete('http://localhost:3001/logout', {
      headers: {
        "Authorization": `${token}`,
        "Content-Type": "application/json"
      }
    })
        .then(res => {
          console.log(res)
          if (res.data.message == 'You are logged out.') {
            localStorage.removeItem('_jgu_jwt')
            navigateTo('/')
            }
        })
  }

  return (
    <NavContainer>
      <CustomLink to='/'>Home</CustomLink>
      <CustomLink to='/aboutme'>About Me</CustomLink>
      <CustomLink to='/gallery'>Gallery</CustomLink>
      <CustomLink to='/contact'>Contact</CustomLink>
      <button onClick={logoutHandler}>Log out</button>
    </NavContainer>
  )
}

const NavContainer = styled.div`
  
`

const CustomLink = styled(Link)`
    
`

export default Navbar