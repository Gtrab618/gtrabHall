import axios from "axios";
import { env } from "../env/entorno";
import { Usuario } from "../components/models/user/usuario";



export const singInServi = async (user: Usuario) => {
    const formData = new FormData();

    // Añadir las propiedades del objeto usuario al FormData
    formData.append('client_id', user.clientId);
    formData.append('client_secret', user.clientSecret);
    formData.append('username', user.username);
    formData.append('password', user.password);
    formData.append('grant_type', user.grant_type)

    try {
        const response = await axios.post(env.urlApi + '/oauth/token', formData, {})
        return response.data
    } catch (error) {
        console.log("error enviar login token")
    }


}




