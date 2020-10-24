import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Api, Register } from '../app.config';
import { UsersModel } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  /*============================================
  15.Creamos las clase privadas de api y register
  ============================================*/

  private api:string = Api.url;
  private register:string = Register.url;

  /*============================================
  16.Declaramos http para poderlo utilizar
  ============================================*/
  constructor(private http:HttpClient) {}

  /*============================================
  17.Creamos el registro para firebase authentication
  ============================================*/

  registerAuth(user: UsersModel){

      return this.http.post(`${this.register}`,user);

  }

  /*============================================
  25. Creamos el registro para firebase database
  ============================================*/

  registerDatabase(user: UsersModel){

      /*============================================
      Si no queremos que un campo quede guardado en
      la base de datos lo eliminamos de la siguiente
      forma
      ============================================*/

      delete user.password;
      delete user.returnSecureToken;

      return this.http.post(`${this.api}/users.json`, user);

  }

  
  /*============================================
  32. Filtrar data para buscar coincidencias
  ============================================*/

  getFilterData(orderBy:string, equalTo:string){

      return this.http.get(`${this.api}/users.json?orderBy="${orderBy}"&equalTo="${equalTo}"&print=pretty`);

  }

}
