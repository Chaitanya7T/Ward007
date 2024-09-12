import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NotificationService, NetworkService, KeyboardEventService } from './core';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  navigate: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private notificationServ: NotificationService,
    private networkService: NetworkService,
    private router: Router,
    private translate: TranslateService,
    private keyboardEvent: KeyboardEventService
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.keyboardEvent.keyboardEvent();
      this.router.navigate(['/menu/home']);
      // this.currentUser.getUser().then(success => {
      //   if (success) {
      //     this.keyboardEvent.keyboardEvent();
      //     this.notificationServ.startNotificationPooling();
      //   }
      // }).catch(error => {
      // })
      this.networkService.netWorkCheck();
    });
  }
}