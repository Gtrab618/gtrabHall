import axios from "axios";
import { Facture } from "../../components/models/factures/facture";
import { env } from "../../env/entorno";
import { deleteTokenCookie, getTokenCookie } from "../PayloadFacService";
import { RegisterOk } from "../../components/models/savedFactura/registerOk";

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

export const getAllDataFacture= async (numberFacture:String): Promise<RegisterOk[]>=>{
    const token = getTokenCookie()
    try {
        const response = await axios.get<RegisterOk[]>(env.urlApi+`/v1/bills/show/${numberFacture}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        return []
    }
}