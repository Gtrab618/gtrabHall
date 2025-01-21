import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './components/dashboard/Dashboard'
import SignIn from './components/sign-in/SignIn'

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route index element={<SignIn/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route> 

      </Routes>

    </BrowserRouter>

  )
}

export default App
