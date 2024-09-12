import { Component, OnInit, Input} from '@angular/core';
import { NotificationService } from '../../services';
import { Router } from '@angular/router';

import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() title: string;
  @Input() showMenu: boolean = false;
  constructor(
    private notificationServ: NotificationService,
    private localNotifications: LocalNotifications,
    private alert: AlertController
  ) { }

  ngOnInit() {}
}
