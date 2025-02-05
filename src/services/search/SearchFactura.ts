import axios from "axios";
import { Facture } from "../../components/models/factures/facture";
import { env } from "../../env/entorno";
import { deleteTokenCookie, getTokenCookie } from "../PayloadFacService";

export const getAllFactures = async (): Promise<Facture[]>=>{
    const token = getTokenCookie()

    try{

        const response = await axios.get<Facture[]>(env.urlApi+'/v1/bills?page=1',{
            
            headers:{
                Authorization: `Bearer ${token}`
            }

        })
    
        return response.data.data.data

    }catch(err){
        deleteTokenCookie(err)
        return []
    }

}

export const getNumberFactureServi = async (numberFac:String): Promise<Facture[]>=>{
    const token = getTokenCookie()

    try{

        const response = await axios.get<Facture[]>(env.urlApi+`/v1/bills?filter[number]=${numberFac}`,{
            
            headers:{
                Authorization: `Bearer ${token}`
            }

        })
    
        return response.data.data.data

    }catch(err){
        deleteTokenCookie(err)
        return []
    }

}