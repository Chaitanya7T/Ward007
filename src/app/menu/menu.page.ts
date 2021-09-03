import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private userService : CurrentUserService

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
      this.userService.deleteUser().then(data =>{
      this.router.navigate(['action-list']);
      })
    }
  }
}
