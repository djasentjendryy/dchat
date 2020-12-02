import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoomchatPageRoutingModule } from './roomchat-routing.module';

import { RoomchatPage } from './roomchat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoomchatPageRoutingModule
  ],
  declarations: [RoomchatPage]
})
export class RoomchatPageModule {}
