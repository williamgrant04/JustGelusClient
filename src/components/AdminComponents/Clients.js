import { useEffect, useState } from "react"
import axios from "axios"

const Clients = (props) => {
    const [users, setUsers] = useState([])

    // useEffect(()=>{
    //     axios.get('http://localhost:3001/clients/index')
    //         .then(res=>{
    //             setUsers(res.data.body)
    //         })
    // },[])

    return(
        <div>
            <h1>Clients</h1>
            {users.map((user)=> {
                return <p key={user.id}>{user.name}</p>
            })}
        </div>
    )
}

export default Clients