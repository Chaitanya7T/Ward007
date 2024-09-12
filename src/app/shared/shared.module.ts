import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { MomentModule } from 'ngx-moment';
import { HighchartsChartModule } from 'highcharts-angular';
@NgModule({
  declarations: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  imports: [
    CommonModule,
    TranslateModule,
    MomentModule
  ],
  exports: [
    TranslateModule,
    HighchartsChartModule
  
  ]
})
export class SharedModule { }
