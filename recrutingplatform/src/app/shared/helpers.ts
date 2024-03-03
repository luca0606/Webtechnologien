import * as CryptoJS from 'crypto-js';


export function hashPassword(password: string) {
    let hashPassword = CryptoJS.SHA256(password).toString();
    return hashPassword;
}