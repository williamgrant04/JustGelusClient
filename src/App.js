import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import axios from 'axios'
import { useState, useCallback, useEffect } from 'react'
import Navbar from './components/Navbar'
import AdminPanel from './components/AdminComponents/AdminPanel'
import Logout from './components/Logout'


const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)

  const loginStatus = () => {
    let token = localStorage.getItem('_jgu_jwt')
    axios.get('http://localhost:3001/logged_in', {
      headers: {
        "Authorization": `${token ? token : ''}`,
        "Content-Type": "application/json"
      }
      })
      .then(res => {
        console.log(res)
          if (res.data.logged_in) {
            setLoggedIn(true)
          } else {
            setLoggedIn(false)
            localStorage.removeItem('_jgu_jwt')
          }
      })
      .catch(err => console.log(err))
  }

  useEffect(()=>{
      loginStatus()
      console.log(loggedIn)
  }, [])

  
  return (
    <div className="App">
    
    <BrowserRouter>
      <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          {/* <Route exact path='/aboutme' element={<AboutMe />} />
          <Route exact path='/gallery' element={<Gallery />}/>
          <Route exact path='/contact' element={<ContactForm />}/> */}
          <Route exact path='/login' element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}/>
          <Route exact path='/logout' element={<Logout loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>
          <Route exact path='/admin' element={<AdminPanel loggedIn={loggedIn} />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
