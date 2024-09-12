import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CurrentUserService } from '../../services/current-user/current-user.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate {
  constructor(private userService: CurrentUserService, private router: Router,
    private navCtrl: NavController
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, reject) => {
      this.userService.getUser().then(success => {
        console.log(success, "success");
        if (success) {
          // this.router.navigate(['/menu/orders']);
          this.navCtrl.navigateRoot('/menu/home');
          resolve(false)
        } else {
          resolve(true)
          this.navCtrl.navigateRoot('/menu/home');

        }
      }).catch(error => {
        this.navCtrl.navigateRoot('/menu/home');

        resolve(true)
      })
    })
  }

}
