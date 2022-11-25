import axios from "axios"
import { useEffect } from "react"

const Logout = ({ loggedIn, setLoggedIn}) => {
    
    axios.delete('http://localhost:3001/logout').then(res=>console.log(res))

    return(
        <div>
            <h1>hlogwd out</h1>
        </div>
    )
}

export default Logout