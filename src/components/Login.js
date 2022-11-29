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

    const submitHandler = async e => {
        e.preventDefault()
        
        const user = {...credentialsState} //* This is because on the backend it requires an object named "user"
        const response = await axios.post('http://localhost:3001/login', {user})

        if (response.status === 200) {
            localStorage.setItem('_jgu_jwt', `${response.headers.authorization}`)
            navigateTo("/admin")
        } else {
            console.log("Incorrect credentials")
            navigateTo("/")
        }
    }

    return(
        <form onSubmit={submitHandler}>
            <h1>Log in</h1>
            <input placeholder="Email" type="text" name="email" value={credentialsState.email} onChange={changeHandler}></input>
            <input placeholder="Password" type="password" name="password" value={credentialsState.password} onChange={changeHandler}></input>
            <button placeholder="submit" type="submit">Log in</button>
        </form>
    )
}

export default Login