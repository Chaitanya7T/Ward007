import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';
import { SharedModule } from '../shared/shared.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,ReactiveFormsModule,
    IonicModule,
    LoginPageRoutingModule,
    SharedModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
