import styled from "styled-components"
import Clients from "./Clients"

const AdminPanel = ({ loggedIn }) => {
    console.log(loggedIn, 'loggedIn boolean')
    return (
        <AdminDiv>
            <div>{ loggedIn && "Now logged in"}</div>
        </AdminDiv>
    )
}

const AdminDiv = styled.div`
    
`

export default AdminPanel