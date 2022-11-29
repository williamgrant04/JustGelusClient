import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

const Logout = () => {
    const navTo = useNavigate()
    const [count, setCount] = useState(5) //* The number of seconds until the user is redirected
    
    useEffect(() => {
        axios.delete('http://localhost:3001/logout')
    }, [])

    useEffect(() => {
        setTimeout(()=> {
            setCount(count-1)
        }, 1000)

        if (count === 0) {
            navTo('/')
        }
    }, [count, navTo])

    return(
        <div>
            <h1>Successfulled logged out.</h1>
            <h1>You will be redirected in {count} seconds</h1>
        </div>
    )
}

export default Logout