import { useParams } from "react-router"
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"


const Appointment = (props) => {
    const [appointment, setAppointment] = useState({})
    const navTo = useNavigate()

    const params = useParams()
    useEffect(()=>{
        const token = localStorage.getItem('_jgu_jwt')
        const headers = {
          headers: { 
            'Authorization': `${token ? token : ''}`,
            "Content-Type": "application/json"
          }
        }

        const fetchAppointment = async () => {
            const response = await axios.get(`http://localhost:3001/appointments/${params.id}`, headers)
            setAppointment(response.data.body)
            console.log(response)
        }
        fetchAppointment()
    },[])

    return(
        <div>
            <h1>{appointment.name}</h1>
            <p>{appointment.appt_date_time}</p>
            <p>{appointment.at_home.toString()}</p>
            <button onClick={()=>{navTo(`/admin/clients/${appointment.client_id.toString()}`)}}>button</button>
        </div>
    )
}

export default Appointment