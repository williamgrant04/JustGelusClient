import { useEffect, useState } from 'react'
import axios from "axios"
import { Outlet } from 'react-router'

const Services = (props) => {
    const [services, setServices] = useState([])

    useEffect(()=>{
        const token = localStorage.getItem('_jgu_jwt')
        const headers = {
          headers: { 
            'Authorization': `${token ? token : ''}`,
            "Content-Type": "application/json"
          }
        }

        const fetchServices = async () => {
            const response = await axios.get('http://localhost:3001/services/index', headers)
            console.log(response.data.body)
            setServices(response.data.body)
        }
        fetchServices()
    }, [])

    return(
        <div>
            <h1>Services</h1>
            {services.map((service) => {
                return(
                    <div key={service.id}>
                        <h2>{service.name}</h2>
                        <h3>{service.description}</h3>
                        <p>£{service.price}</p>
                    </div>
                )
            })}

            <Outlet />
        </div>
    )
}

export default Services