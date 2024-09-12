import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { Subject } from 'rxjs';
import { ToastServiceService } from '../toast-message/toast-service.service';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  connectSubscription;
  disconnectSubscription;
  $networkStatus = new Subject();
  isNetworkAvailable: boolean = false;
  constructor(
    private network: Network,
    private toast :ToastServiceService
  ) { }

  public netWorkCheck() {
    this.getCurrentStatus();
    this.disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      // alert('network was disconnected :-(');

      this.isNetworkAvailable = false;
      this.$networkStatus.next(this.isNetworkAvailable);
      this.toast.displayMessage('You are Offline, Please move to online to access the App feauters','danger');
    });
    this.connectSubscription = this.network.onConnect().subscribe(() => {
      // alert('network connected!');
      this.isNetworkAvailable = true;
      this.$networkStatus.next(this.isNetworkAvailable);
      this.toast.displayMessage('You are Online','success');

    });
  }

  public getCurrentStatus() {
    if (this.network.type == 'none') {
      this.isNetworkAvailable = false;
      this.$networkStatus.next(this.isNetworkAvailable);
    } else {
      this.isNetworkAvailable = true;
      this.$networkStatus.next(this.isNetworkAvailable);
    }
  }
  // public stopNetworkService() {
  //   this.connectSubscription.unsubscribe();
  //   this.disconnectSubscription.unsubscribe();
  // }
}
