import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { CurrentUserService } from '../core/services/current-user/current-user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  user;
  navigate = [
    {
        title: "New Case",
        url: "menu/create-case",
        icon: "pencil-outline"
      },
      {
        title: "Existing Cases",
        url: "menu/existing-cases",
        icon: "list-outline"
      },

      {
        title: "Profile",
        url: "menu/profile",
        icon: "person-circle-outline"
      },
      {
        title: "Logout",
        url: "",
        icon: "log-out-outline"
      },
  ];
  selectedPath: string;
  appName: string

  constructor(
    private translate: TranslateService,
    private router: Router,
    private userService : CurrentUserService,
    private alertController: AlertController

  ) {
    console.log('menu loading');
    translate.use('en');
  }

  ngOnInit() {
    
  }

  navigateTo(url) {
    if(url){
      this.router.navigate([url]);
    }else{
      this.logoutAlert();
    
    }
  }

  async logoutAlert(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Are you sure!',
      message: 'You want Logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.userService.deleteUser().then(data =>{
              this.router.navigate(['action-list']);
              })
          }
        }
      ]
    });
    await alert.present();
  }
}
