import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PcPageRoutingModule } from './pc-routing.module';

import { PcPage } from './pc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PcPageRoutingModule
  ],
  declarations: [PcPage]
})
export class PcPageModule {}
