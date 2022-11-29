import { useEffect, useState } from "react"
import axios from "axios"
import { Outlet } from "react-router"

const Appointments = (props) => {
    const [appointments, setAppointments] = useState([])
    
    useEffect(()=> {
        const token = localStorage.getItem('_jgu_jwt')
        const headers = {
          headers: { 
            'Authorization': `${token ? token : ''}`,
            "Content-Type": "application/json"
          }
        }

        const fetchAppointments = async () => {
            const response = await axios.get('http://localhost:3001/appointments/index', headers)
            console.log(response.data.body)
            setAppointments(response.data.body)
        }
        fetchAppointments()
    }, [])

    return(
        <div>
            {/* 
                //TODO Make this laid out like a calendar. (somehow)
            */}
            <h1>Appointments</h1>
            {appointments.map((appt) => {
                return (
                    <div key={appt.id}>
                        <h2>{appt.name}</h2>
                        <p>{appt.appt_date_time}</p>
                        <p>{appt.at_home ? "Home" : "Away"}</p> {/*//* This is temporary until I figure out a cleaner solution for displaying this */}
                    </div>
                )     
            })}
            
            <Outlet/>
        </div>
    )
}

export default Appointments