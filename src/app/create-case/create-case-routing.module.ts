import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateCasePage } from './create-case.page';

const routes: Routes = [
  {
    path: '',
    component: CreateCasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateCasePageRoutingModule {}
