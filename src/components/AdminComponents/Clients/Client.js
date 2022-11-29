import { useParams } from "react-router"
import { useEffect, useState } from "react"
import axios from "axios"


const Client = (props) => {
    const [client, setClient] = useState({})

    const params = useParams()
    useEffect(()=>{
        const token = localStorage.getItem('_jgu_jwt')
        const headers = {
          headers: { 
            'Authorization': `${token ? token : ''}`,
            "Content-Type": "application/json"
          }
        }

        const fetchClient = async () => {
            const response = await axios.get(`http://localhost:3001/clients/${params.id}`, headers)
            setClient(response.data.body)
            console.log(response)
        }
        fetchClient()
    }, [params])

    return(
        <div>
            <h1>{client.name}</h1>
            <p>{client.phone_number}</p>
            <p>{client.email}</p>
            <p>{client.allergies}</p>
            <p>{client.notes}</p>
        </div>
    )
}

export default Client