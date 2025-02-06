import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './components/dashboard/Dashboard'
import SignIn from './components/sign-in/SignIn'
import ViewAllDataFacture from './components/sign-in/viewAllDataFacture'


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route index element={<SignIn/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route> 
        <Route path='/allDataFacture' element={<ViewAllDataFacture/>}></Route> 
      </Routes>

    </BrowserRouter>

  )
}

export default App
