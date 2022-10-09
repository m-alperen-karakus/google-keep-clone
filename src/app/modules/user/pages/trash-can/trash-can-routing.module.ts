import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrashCanPage } from './trash-can.page';

const routes: Routes = [
  {
    path: '',
    component: TrashCanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrashCanPageRoutingModule {}
