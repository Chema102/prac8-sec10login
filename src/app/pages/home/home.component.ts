import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private sevidor: FirebaseService,
              private router: Router) { }

  ngOnInit() {
  }

  salir(){
    this.sevidor.logout();
    this.router.navigateByUrl('/login')

  }
}
