import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrashCanPageRoutingModule } from './trash-can-routing.module';

import { TrashCanPage } from './trash-can.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrashCanPageRoutingModule
  ],
  declarations: [TrashCanPage]
})
export class TrashCanPageModule {}
