import axios from "axios"
import { useLayoutEffect } from "react"
import { Link, Routes, Route, useNavigate } from "react-router-dom"
import styled from "styled-components"
import Clients from "./Clients/Clients"
import Services from "./Services/Services"
import Appointments from "./Appointments/Appointments"
import Client from "./Clients/Client"
import Service from "./Services/Service"
import Appointment from "./Appointments/Appointment"

const AdminPanel = (props) => {
    const navTo = useNavigate()

    let token = localStorage.getItem('_jgu_jwt')
    const headers = {
        headers: { 
            'Authorization': `${token ? token : ''}`,
            "Content-Type": "application/json"
        }
    }

    const loginStatus = async () => {
        const response = await axios.get('http://localhost:3001/logged_in', headers)
        console.log(response)
        if (response.data.body.logged_in === true) {
            return true
        } else {
            localStorage.removeItem('_jgu_jwt')
            navTo('/')
            return false
        }
    }

    useLayoutEffect(() => {
        loginStatus()
    }, [])

    return (
        <AdminDiv>
            <SidePanel>
                <Link to='/admin/appointments'>Appointments</Link>
                <Link to='/admin/clients'>Clients</Link>
                <Link to='/admin/services'>Services</Link>
            </SidePanel>

            <Routes>
                <Route path='clients'>
                    <Route index element={<Clients />}/>
                    <Route path=':id' element={<Client />}/>
                </Route>
                <Route path='services'>
                    <Route index element={<Services />}/>
                    <Route path=':id' element={<Service />}/>
                </Route>
                <Route path='appointments'>
                    <Route index element={<Appointments />}/>
                    <Route path=':id' element={<Appointment />}/>
                </Route>
            </Routes>
        </AdminDiv>
    )
}

const AdminDiv = styled.div`
    
`

const SidePanel = styled.div`
    /* background-color: black;
    display: flex;
    flex-direction: column;
    
    width: 100px;
    height: 100vh;
    position: fixed;
    top: 0;
    padding: 10px; */
`

export default AdminPanel