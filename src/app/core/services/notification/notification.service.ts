import { Injectable } from '@angular/core';
import { urlConstants } from '../../constants';
import { Subject } from 'rxjs';
import { Kavaludhala } from '../kavaludhala/kavaludhala.service';
import { CurrentUserService } from '../current-user/current-user.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  timeInterval: any;
  $notificationSubject = new Subject<any>();

  constructor(
    private app: Kavaludhala,
    private user: CurrentUserService
  ) { }

  startNotificationPooling() {
    this.timeInterval = setInterval(() => {
      // if (this.networkAvailable) {
      this.checkForNotificationApi();
      // }
      // else {
      //   console.log("no internet");
      // }
    }, 90000);
    this.checkForNotificationApi();
  }

  checkForNotificationApi() {
    this.user.getUser().then(userData => {
      console.log(userData, "userData");
      const config = {
        url: urlConstants.API_URLS.GET_CASE
      }
      this.app.get(config).subscribe(success => {
        console.log(success, "success");
        let count = 0;
        success.data.forEach(element => {
          if (element.is_new) {
            count = count + 1;
          }
        });
        this.internalNotificationsHandler(count)
        this.$notificationSubject.next(count);
      }, error => {

      })
    })
  }

  internalNotificationsHandler(notifications) {

  }

  stopNotificationPooling() {
    clearInterval(this.timeInterval);
  }


}
