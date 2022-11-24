import axios from "axios"
import { useReducer } from "react"
import { useNavigate } from "react-router-dom"

const Login = ({user, setUser, loggedin, setLoggedIn}) => {
    const navigateTo = useNavigate()
    const [credentialsState, dispatchCredentials] = useReducer((state, action) => {
        switch (action.type) {
            case 'email':
                return {email: action.value, password: state.password}
            case 'password':
                return {email: state.email, password: action.value}
            default:
                throw new Error()
        }
    }, {email: "", password: ""})

    const changeHandler = e => {
        dispatchCredentials({type: e.target.name, value: e.target.value})
    }

    const handleLogin = data => {
        setLoggedIn(true)
        setUser(data.data.user)
      }
    
      const handleLogout = () => {
        setLoggedIn(false)
        setUser({})
      }

    const submitHandler = e => {
        e.preventDefault()
        
        const user = {...credentialsState} //* This is because on the backend it requires an object named "user"
        axios.post('http://localhost:3001/login', {user}, {withCredentials: true})
            .then(res => {
                console.log(res);
                if (res.data.status === 200) {
                    handleLogin(res)
                    navigateTo("/admin")
                } else {
                    handleLogout()
                    console.log("bad data")
                }
            })
            .catch(err => console.log(err))
    }

    return(
        <form onSubmit={submitHandler}>
            <h1>Log in</h1>
            <input placeholder="Email" type="text" name="email" value={credentialsState.email} onChange={changeHandler}></input>
            <input placeholder="Password" type="text" name="password" value={credentialsState.password} onChange={changeHandler}></input>
            <button placeholder="submit" type="submit">Log in</button>
        </form>
    )
}

export default Login