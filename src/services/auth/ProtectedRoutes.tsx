import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';


export default function ProtectedRoutes({children}:{children:any}) {
   const token =Cookies.get('authToken')
   if(!token){
      return < Navigate to ={"/"}/>
   }
   return  children 
}

