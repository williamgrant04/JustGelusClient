import { useCallback, useLayoutEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'

const Home = props => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState({})

    const handleLogin = data => {
        setLoggedIn(true)
        setUser(data.user)
    }

    const handleLogout = () => {
        setLoggedIn(false)
        setUser({})
    }

    const loginStatus = useCallback(() => {
        axios.get('http://localhost:3001/logged_in', {withCredentials: true})
        .then(res => {
            if (res.data.logged_in) {
                handleLogin(res)
                console.log("login")
            } else {
                handleLogout()
                console.log("logout")
            }
        })
        .catch(err => console.log(err))
    }, [])

    useLayoutEffect(()=>{
        loginStatus()
    }, [loginStatus])

    return (
        <div>
            <Link to='/login'>Log in</Link>
        </div>
    )
}

export default Home