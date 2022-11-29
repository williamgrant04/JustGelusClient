import axios from "axios"
import { useCallback, useEffect } from "react"
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
    const token = localStorage.getItem('_jgu_jwt')
    
    //* useCallback memorises a function so that it doesn't recreate the function on every component render unless one of the dependencies change (just like useEffect)
    //* I mostly did this to SHUT ESLINT UP STOP CRYING AT ME
    const fetchLoginStatus = useCallback(async () => {
        const headers = {
            headers: { 
                'Authorization': `${token ? token : ''}`,
                "Content-Type": "application/json"
            }
        }

        const response = await axios.get('http://localhost:3001/logged_in', headers)
        console.log(response)
        if (response.data.body.logged_in === true) {
            return true
        } else {
            localStorage.removeItem('_jgu_jwt')
            navTo('/')
            return false
        }
    }, [token, navTo])
    
    useEffect(() => {
        fetchLoginStatus()
    }, [fetchLoginStatus])

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