import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AutsGuard implements CanActivate {

  constructor(private servidor:FirebaseService,
              private router:Router){

  }

  canActivate(): boolean {

    if (this.servidor.autenticacion()) {
      return true;
    }else{
      this.router.navigateByUrl('/login');
      return false;
    }

  }

}
