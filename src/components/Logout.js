import axios from "axios"
import { useEffect, useState } from "react"

const Logout = () => {
    
    //* The number of seconds until the user is redirected
    const [count, setCount] = useState(5)

    axios.delete('http://localhost:3001/logout').then(res=>console.log(res))

    return(
        <div>
            <h1>Successfulled logged out.</h1>
            <h1>You will be redirected in {count} seconds</h1>
        </div>
    )
}

export default Logout