import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { ProfilePage } from './profile.page';
import { SharedModule } from '../shared';
import { CoreModule } from '../core/core.module';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    SharedModule,
    ReactiveFormsModule,
    IonicModule,
    ProfilePageRoutingModule
  ],
  declarations: [ProfilePage,ProfileEditComponent]
})
export class ProfilePageModule {}
