import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './components/dashboard/Dashboard'
import SignIn from './components/sign-in/SignIn'
import GestorProductos from './components/sign-in/testComponent'
import CollapsibleTable from './components/sign-in/testTree'


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route index element={<SignIn/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route> 
        <Route path='/test' element={<GestorProductos/>}></Route> 
        <Route path='/tree' element={<CollapsibleTable/>}></Route> 
      </Routes>

    </BrowserRouter>

  )
}

export default App
