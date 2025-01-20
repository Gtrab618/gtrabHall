import Cookies from 'js-cookie';

export const saveToken = (token: string): void => {

    Cookies.set('authToken', token, { expires: 1 / 24, path: '' ,sameSite:'strict'})
}