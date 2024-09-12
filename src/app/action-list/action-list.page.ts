import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateStore} from '@ngx-translate/core';

@Component({
  selector: 'app-action-list',
  templateUrl: './action-list.page.html',
  styleUrls: ['./action-list.page.scss'],
})
export class ActionListPage implements OnInit {

  constructor(
    private router:Router,
    private translate: TranslateStore,
  ) {
    translate.defaultLang ='en';
   }

  ngOnInit() {
  }

  goToLogin(){
    this.router.navigate(['login']);
  }
  goToRegister(){
    this.router.navigate(['register']);
  }
}
