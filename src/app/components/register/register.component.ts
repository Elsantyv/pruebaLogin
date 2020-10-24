import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UsersModel } from '../../models/users.model';
import { UsersService } from '../../services/users.service';

import { Capitalize, Sweetalert } from '../../app.funciones';

declare var jQuery: any;
declare var $:any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    /*===========================================
    4.Creamos la variable global del modelo users
    ===========================================*/

    user: UsersModel;

    /*===========================================
    19. Inicializamos la variable userService
    ===========================================*/
    constructor(private usersService: UsersService) {

        /*===========================================
        5. Instanciamos la variable user
        ===========================================*/

        this.user = new UsersModel();

    }

    ngOnInit(): void {
    }

    /*===========================================
    30. Creamos la funcion capitalize para
    capitalizar la primera letra de nombre y apellido
    ===========================================*/

    capitalize(input){

        input.value = Capitalize.fnc(input.value);

    }

    /*============================================
    31.funcion validate para validar si el nombre
    de usuario ya se encuentra en la BD y otras
    validaciones
    ============================================*/

    validate(input){

        let pattern;

        if($(input).attr("name")=="username"){

            pattern = /^[A-Za-z]{2,8}$/
            input.value = input.value.toLowerCase();

        }

        if($(input).attr("name")=="password"){

            pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}$/


        }

        if(!pattern.test(input.value)){

            input.value ="";

        }


        /*============================================
        Validamos el patron que ingresa y si cumple
        con las validaciones
        ============================================*/

//        if($(input).attr("name") == "username"){
//
//            pattern = /^[A-Za-z]{2,8}$/;

//            input.value = input.value.toLowerCase();

            /*============================================
            Validamos si el usuario existe
            ============================================*/

//            this.usersService.getFilterData("username", input.value)
//                .subscribe( resp => {

                    /*============================================
                    Si la longitud de la resp es mayor a 0 es porque
                    trajo informacion, osea que el usuario se encuentra
                    en la BD
                    ============================================*/

//                    if(Object.keys(resp).length > 0){

//                        input.value = "";

//                        return

//                    }


//                });


//        }

        /*============================================
        Se realiza de esta forma ya que como no realice
        las vadilaciones de angular, me tira un mensaje
        de error de la forma anterior
        ============================================*/

        this.usersService.getFilterData("username", input.value)
                .subscribe( resp => {

                    /*============================================
                    Si la longitud de la resp es mayor a 0 es porque
                    trajo informacion, osea que el usuario se encuentra
                    en la BD
                    ============================================*/

                    if(Object.keys(resp).length > 0){

                        input.value = "";
                        //Enviamos 3 parametros "Tipo de alerta", "Mensaje", "Direccionamiento"
                        Sweetalert.fnc("error", "El usuario ya existe en la base de datos.", null);

                        return

                    }


                });

    }

    /*===========================================
    9. Creamos la funcion onSubmit
    ===========================================*/

    onSubmit(f: NgForm){

        /*===========================================
        28. Validaciones privadas
        Preguntamos si la informacion que viene en el
        parametro f es invalida
        ===========================================*/

        if(f.invalid){
            return;
        }

        Sweetalert.fnc("loading", "Loagind...", null);

        /*===========================================
        20. Actualizamos el returnSecureToken
        ===========================================*/

        this.user.returnSecureToken = true;

        /*===========================================
        21. Realizamos la peticion para registrar un usuario en firebase auhtentacion
        ===========================================*/

        this.usersService.registerAuth(this.user)
            .subscribe( resp => {

                /*===========================================
                24. Realizamos una desicion para ver si el
                registro en firebase authentication fue exitoso
                ===========================================*/

                if(resp["email"] == this.user.email){

                    /*===========================================
                    Llenado de datos faltantes manualmente
                    ===========================================*/
                    this.user.displayName = `${this.user.first_name} ${this.user.last_name}`;
                    this.user.method = "directo";
                    this.user.idToken = resp["idToken"];
                    this.user.needConfirm = false;

                    /*===========================================
                    26. Registro en firebase database
                    ===========================================*/

                    this.usersService.registerDatabase(this.user)
                        .subscribe( resp => {

                            Sweetalert.fnc("success", "Confirma tu cuenta en tu correo electronico.", "login");

                        });

                }

            }, (err) => {

                Sweetalert.fnc("error", err.error.error.message, null);

            });

    }

}
