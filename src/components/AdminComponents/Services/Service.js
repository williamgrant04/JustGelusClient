import { useParams } from "react-router"
import { useEffect, useState } from "react"
import axios from "axios"


const Service = (props) => {
    const [service, setService] = useState({})

    const params = useParams()
    useEffect(()=>{
        const token = localStorage.getItem('_jgu_jwt')
        const headers = {
          headers: { 
            'Authorization': `${token ? token : ''}`,
            "Content-Type": "application/json"
          }
        }

        const fetchService = async () => {
            const response = await axios.get(`http://localhost:3001/services/${params.id}`, headers)
            setService(response.data.body)
            console.log(response)
        }
        fetchService()
    }, [params])

    return(
        <div>
            <h1>{service.name}</h1>
            <p>{service.description}</p>
            <p>{service.price}</p>
        </div>
    )
}

export default Service