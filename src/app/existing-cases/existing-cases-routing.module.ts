import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExistingCasesPage } from './existing-cases.page';

const routes: Routes = [
  {
    path: '',
    component: ExistingCasesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExistingCasesPageRoutingModule {}
