import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  RecordarUser = false;
  error= {};

  constructor(private servidor: FirebaseService,
              private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();



   }
   onSubmit(form: NgForm){
    if (form.invalid) {return;}
    console.log(this.usuario);

    this.servidor.reginterUser(this.usuario).subscribe(data =>{

      console.log(data);

      if (this.RecordarUser) {
        localStorage.setItem('imail', this.usuario.email )
      }

      this.router.navigateByUrl('/home')

    }, (err) =>{
      this.error = err
      console.log(this.error['error'].error.message);


    });
   }


}
