import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent, LogoComponent } from './components';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import {FilterPipe} from './pipes';

@NgModule({
  declarations: [HeaderComponent,FilterPipe,LogoComponent],
  exports: [HeaderComponent,FilterPipe, RouterModule, LogoComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class CoreModule { }
