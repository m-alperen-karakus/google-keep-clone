import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPage } from './user.page';

const routes: Routes = [
  {
    path: '',
    component: UserPage,
    children :[
      {
        path: '',
        loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'reminder',
        loadChildren: () => import('./pages/reminder/reminder.module').then( m => m.ReminderPageModule)
      },
      {
        path: 'label',
        loadChildren: () => import('./pages/label/label.module').then( m => m.LabelPageModule)
      },
      {
        path: 'archive',
        loadChildren: () => import('./pages/archive/archive.module').then( m => m.ArchivePageModule)
      },
      {
        path: 'trash-can',
        loadChildren: () => import('./pages/trash-can/trash-can.module').then( m => m.TrashCanPageModule)
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPageRoutingModule {}
