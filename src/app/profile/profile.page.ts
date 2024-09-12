import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Kavaludhala, LoaderService, ToastServiceService, urlConstants } from '../core';
import { CurrentUserService } from '../core/services/current-user/current-user.service';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  showMenu: boolean = false;
  editProfile: boolean = true;
  constructor(
    private modal : ModalController,
    private kavaludhala:Kavaludhala,
    private user : CurrentUserService,
    private toast :ToastServiceService,
    private loader :LoaderService
  ) { }
  profile;
  ngOnInit() {
    this.getProfile();
  }
    async edit() {
      console.log('in edit');
      const modal = await this.modal.create({
        component: ProfileEditComponent,
        cssClass: 'my-custom-class',
        componentProps: {
         profile : this.profile
        }
      });
    modal.onDidDismiss().then((data) => {
      this.getProfile();
    });
      return await modal.present();
    }

    getProfile(){
    this.user.getUser().then(user =>{
    this.loader.startLoader('Loading... ,Please wait');
    let config={
      url:urlConstants.API_URLS.GET_PROFILE+user._id
    }
  this.kavaludhala.get(config).subscribe(data =>{
    console.log(data,"profile");
    this.loader.stopLoader();
    this.toast.displayMessage('Profile fetched successfully','success');
    this.profile = data.data;
    console.log(this.profile,"this.profile");
  },error=>{
    this.loader.stopLoader();
  })
})
    }
}
