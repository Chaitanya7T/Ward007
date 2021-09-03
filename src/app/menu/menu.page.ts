import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  user;
  navigate = [
  ];
  selectedPath: string;
  appName: string

  constructor(
    private translate: TranslateService,
    private router: Router,

  ) {
    console.log('menu loading');
    translate.use('en');
  }

  ngOnInit() {
    
  }

  navigateTo(url) {
    this.router.navigate([url]);
  }
}
