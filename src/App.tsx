import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './components/dashboard/Dashboard'
import SignIn from './components/sign-in/SignIn'
import ProtectedRoutes from './services/auth/ProtectedRoutes'


function App() {
 

  return (

    <BrowserRouter>

      <Routes>

        <Route index element={<SignIn/>}></Route>
       

        <Route path='/dashboard' element={
          <ProtectedRoutes>
            <Dashboard/>
          </ProtectedRoutes>
        }/>

       
        
      </Routes>

    </BrowserRouter>

  )
}

export default App
