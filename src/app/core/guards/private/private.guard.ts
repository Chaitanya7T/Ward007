import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CurrentUserService } from '../../services/current-user/current-user.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PrivateGuard implements CanActivate {

  constructor(private userService: CurrentUserService, private router: Router,
    private navCtrl :NavController
    ) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, reject) => {
      this.userService.getUser().then(success => {
        if (success) {
          resolve(true)
        } else {
          // this.router.navigateByUrl('login');
          this.navCtrl.navigateRoot('action-list');
          resolve(false)
        }
      }).catch(error => {
        // this.router.navigateByUrl('login');
        this.navCtrl.navigateRoot('action-list');
        resolve(false)
      })
    })
  }

}
