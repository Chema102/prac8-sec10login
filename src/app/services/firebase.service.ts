import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private url ='https://identitytoolkit.googleapis.com/v1';
  private api_key = 'AIzaSyAy1I10b-LPtZAqDDte9ejTjKg1I4qXMzY';
  userToken: string;
  //para crear usuarios
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  //validar usuario
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor(private http: HttpClient) {
    this.readToken()
  }
  logout(){
    localStorage.removeItem('token');
  }

  login(user: UsuarioModel){
    const autoData= {
      //se esta usando todas las propiedades del modelo
      ...user,
      returnSecureToken: true
    }
    return this.http.post(
      `${this.url}/accounts:signInWithPassword?key=${this.api_key}`,
      autoData).pipe(map(res =>{
        //si ocurre un error en el endpoint no se ejectara este codigo
        this.saveToken(res['idToken'])
        return res
      }));
  }

  reginterUser(user: UsuarioModel){
    const autoData= {
      //se esta usando todas las propiedades del modelo
      ...user,
      returnSecureToken: true
    }

    return this.http.post(
      `${this.url}/accounts:signUp?key=${this.api_key}`,
      autoData).pipe(map(res =>{
        //si ocurre un error en el endpoint no se ejectara este codigo
        this.saveToken(res['idToken'])
        return res
      }));

  }

  saveToken(idToken: string){

    this.userToken = idToken
    localStorage.setItem("token",idToken)

    let hoy = new Date();
    hoy.setSeconds(3600);
    localStorage.setItem('time',hoy.getTime().toString())

  }

  readToken(){
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken = '';
    }
    return this.userToken;

  }
  autenticacion(): boolean{
    if (this.userToken.length < 2) {
      return false;
    }
    const timeStorage = Number(localStorage.getItem('token'));
    const date = new Date();
    date.setTime(timeStorage);
    if (date > new Date()) {
      console.log('el toquen aun vale');

      return true;
    }else{
      console.log('se te acabo el tiempo mi rey');

      return false;
    }

    return this.userToken.length >2;
  }
}
