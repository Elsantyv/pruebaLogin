/*=============================================
29. Capitalizaremos los campos para que se
conviertan en mayusculas al momento de ser
ingresados en el formulario
=============================================*/

import { SyntaxWalker } from "tslint";

export let Capitalize = {

    fnc: function(value){

        /*=======================================
        Convertimos lo que venga en mayusculas
        =======================================*/
        value = value.toLowerCase();
        
        /*=======================================
        Separamos por espacios
        =======================================*/
        let names = value.split(' ');

        /*=======================================
        Recorremos el array generado por el split
        con map
        =======================================*/
        names = names.map( name => {

            /*=======================================
            Retorna la primera letra en mayuscula y el
            resto en minucula
            =======================================*/

            return name[0].toUpperCase() + name.substr(1);

        });

        return names.join(' ');

    }

}

/*=======================================
34. Creamos funcion sweetalert para poderla 
utilizar en cualquier componente
=======================================*/

export let Sweetalert = {

    fnc: function(type, text, url){

        switch(type){

            case "error":

                if(url == null){

                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: text,
                    })

                }else{

                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: text,
                    }).then((result) => {

                        if(result.value){

                            window.open(url, "_top");

                        }
                    })
                }
            break;

            case "succes":

                if(url == null){

                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: text,
                    })

                }else{

                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: text,
                    }).then((result) => {

                        if(result.value){

                            window.open(url, "_top");

                        }
                    })
                }
            break;

            case "loading":
            
                Swal.fire({
                    allowOutsideClick: false,
                    type: 'info',
                    text: text
                })
                Swal.showLoading()

            break;

        }
    }
}