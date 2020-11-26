import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RumahSakitPageRoutingModule } from './rumah-sakit-routing.module';

import { RumahSakitPage } from './rumah-sakit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RumahSakitPageRoutingModule
  ],
  declarations: [RumahSakitPage]
})
export class RumahSakitPageModule {}
