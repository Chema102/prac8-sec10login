import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

import { UsuarioModel } from "../../models/usuario.model";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: UsuarioModel = new UsuarioModel ;
  RecordarUser = false;
  error={};

  constructor(private http: FirebaseService,
              private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('imail')) {
      this.user.email = localStorage.getItem('imail');
      this.RecordarUser = true

    }
  }
  onSubmit2(form: NgForm){
    if (form.invalid) {return;}



    this.http.login(this.user).subscribe(data =>{
      console.log(data);
      if (this.RecordarUser) {
        localStorage.setItem('imail', this.user.email )
      }
      this.router.navigateByUrl('/home')
    }, (err) =>{
      this.error = err
        console.log(err.error.error.message);

    });
  }
}
