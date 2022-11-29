import { useEffect, useState } from "react"
import { Outlet } from "react-router"
import axios from "axios"

const Clients = (props) => {
    const [clients, setClients] = useState([])


    useEffect(()=>{
        const token = localStorage.getItem('_jgu_jwt')
        const headers = {
          headers: { 
            'Authorization': `${token ? token : ''}`,
            "Content-Type": "application/json"
          }
        }

        const fetchClients = async () => {
            const response = await axios.get('http://localhost:3001/clients/index', headers)
            console.log(response.data.body)
            setClients(response.data.body)
        }
        fetchClients()
    }, [])

    return(
        <div>
            <h1>Clients</h1>
            {clients.map((client) => {
                return (
                    <div key={client.id}>
                        <h2>{client.name}</h2>
                        <p>Phone number: {client.phone_number}</p>
                        <p>Email: {client.email}</p>

                        {/*//! This is a really bad way to do this but we need to pass this through a serializer to make the shit that comes out of the backend not fucking awful so it's just temporary. */}
                        {/* {client.allergies.split('", "').map((allergy)=><p>Allergies: {allergy}</p>)}  */}
                        <p>Notes: {client.notes}</p>                        
                    </div>
                )
            })}
            
            <Outlet/>
        </div>
    )
}

export default Clients