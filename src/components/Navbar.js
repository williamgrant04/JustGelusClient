import { Link } from "react-router-dom"
import styled from "styled-components"


const Navbar = () => {
    return (
        <NavContainer>
            <CustomLink to='/'>Home</CustomLink>
            <CustomLink to='/aboutme'>About Me</CustomLink>
            <CustomLink to='/gallery'>Gallery</CustomLink>
            <CustomLink to='/contact'>Contact</CustomLink>
        </NavContainer>
    )
}

const NavContainer = styled.div`
  
`

const CustomLink = styled(Link)`
    
`

export default Navbar