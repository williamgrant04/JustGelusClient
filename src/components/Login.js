import axios from "axios"
import { useReducer } from "react"
import { useNavigate } from "react-router-dom"

const Login = ({loggedin, setLoggedIn, setAuth}) => {
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

    const handleLogin = res => {
        setLoggedIn(true)
        localStorage.setItem('_jgu_jwt', `${res.headers.authorization}`)
      }
    
      const handleLogout = () => {
        setLoggedIn(false)
      }

    const submitHandler = e => {
        e.preventDefault()
        
        const user = {...credentialsState} //* This is because on the backend it requires an object named "user"
        axios.post('http://localhost:3001/login', {user})
            .then(res => {
                // console.log(res);
                if (res.status === 200) {
                    handleLogin(res)
                    navigateTo("/admin")
                } else {
                    handleLogout()
                    navigateTo("/")
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