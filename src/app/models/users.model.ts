/*===========================================
3. Creamos el modelo de usuario para el formulario de register
===========================================*/

export class UsersModel {

    first_name:string;
    last_name:string;
    displayName:string;
    userName:string;
    email: string;
    password: string;
    returnSecureToken: boolean;
    method:string;
    picture:string;
    idToken:string;
    needConfirm:boolean;

}