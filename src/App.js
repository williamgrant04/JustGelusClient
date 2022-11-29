import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Navbar from './components/Navbar'
import AdminPanel from './components/AdminComponents/AdminPanel'
import Logout from './components/Logout'


const App = () => {  
  return (
    <div className="App">
        <BrowserRouter>
            <Navbar />
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    {/* <Route exact path='/aboutme' element={<AboutMe />} />
                    <Route exact path='/gallery' element={<Gallery />}/>
                    <Route exact path='/contact' element={<ContactForm />}/> */}
                    <Route exact path='/login' element={<Login />}/>
                    <Route exact path='/logout' element={<Logout />}/>
                    <Route exact path='/admin/*' element={<AdminPanel />}/>
                </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
