import { Ranges } from "../components/models/other/ranges";
import Cookies from 'js-cookie';
import { env } from "../env/entorno";
import axios from "axios";
import { Tributes } from "../components/models/other/tributes";
import { Municipios } from "../components/models/other/municipios";
import { Unidades } from "../components/models/other/unidades";
import { Factura } from "../components/models/other/factura";
import { ThirtyFpsRounded } from "@mui/icons-material";

export function getTokenCookie() {
    const token = Cookies.get('authToken')
    return token
}

export function deleteTokenCookie(err: any) {
    if (err.status === 401) {
        Cookies.remove('authToken')
    }
}
export const getRanges = async (): Promise<Ranges[]> => {
    const token = getTokenCookie()

    try {
        const response = await axios.get<Ranges[]>(env.urlApi + '/v1/numbering-ranges', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data
    } catch (err) {
        deleteTokenCookie(err)
        return []
    }

}

export const getTributes = async (): Promise<Tributes[]> => {
    const token = getTokenCookie()

    try {
        const response = await axios.get<Ranges[]>(env.urlApi + '/v1/tributes/products?name=', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data
    } catch (err) {
        deleteTokenCookie(err)
        return []
    }

}

export const getMunicipios = async (): Promise<Municipios[]> => {
    const token = getTokenCookie()

    try {
        const response = await axios.get<Municipios[]>(env.urlApi + '/v1/municipalities?name=', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data.data
    } catch (err) {
        deleteTokenCookie(err)
        return []
    }
}


export const getUnidades = async (): Promise<Unidades[]> => {
    const token = getTokenCookie()

    try {
        const response = await axios.get<Unidades[]>(env.urlApi + '/v1/measurement-units?name=', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data.data
    } catch (err) {
        deleteTokenCookie(err)
        return []
    }
}

export const saveFactura = async (factu: Factura) => {
    const token = getTokenCookie()
    console.log(JSON.stringify(factu, null, 2)); // Formato legible

    try {
        const response = await axios.post<any>(env.urlApi + '/v1/bills/validate', 
            factu ,{

            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log(response.data)
        return response.data
    } catch (err) {
        console.log(err)
        return null
    }


}