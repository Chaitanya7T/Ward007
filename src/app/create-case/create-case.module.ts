import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { CreateCasePageRoutingModule } from './create-case-routing.module';

import { CreateCasePage } from './create-case.page';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoreModule,
    ReactiveFormsModule,
    SharedModule,
    CreateCasePageRoutingModule
  ],
  declarations: [CreateCasePage]
})
export class CreateCasePageModule {}
