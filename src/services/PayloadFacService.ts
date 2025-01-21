import { Ranges } from "../components/models/other/ranges";
import Cookies from 'js-cookie';
import { env } from "../env/entorno";
import axios from "axios";

export function getTokenCookie() {
    const token =Cookies.get('authToken')
    return token
 }
 
export function deleteTokenCookie(err:any){
    if(err.status=== 401){
        Cookies.remove('authToken')
    }
}
export const getRanges = async ():Promise<Ranges[]>=>{
    const token=getTokenCookie()

    try {
        const response = await axios.get<Ranges[]>(env.urlApi+'/v1/numbering-ranges',{
            headers:{
                Authorization: `Bearer ${token}`}
        });
    
    
        return response.data
    } catch (err) {
        deleteTokenCookie(err)
        return []
    }
    
    
}

