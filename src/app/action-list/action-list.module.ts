import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActionListPageRoutingModule } from './action-list-routing.module';

import { ActionListPage } from './action-list.page';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoreModule,
    SharedModule,
    ActionListPageRoutingModule
  ],
  declarations: [ActionListPage]
})
export class ActionListPageModule {}
