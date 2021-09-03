import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ExistingCasesPageRoutingModule } from './existing-cases-routing.module';

import { ExistingCasesPage } from './existing-cases.page';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CoreModule,
    SharedModule,
    ExistingCasesPageRoutingModule
  ],
  declarations: [ExistingCasesPage]
})
export class ExistingCasesPageModule {}
