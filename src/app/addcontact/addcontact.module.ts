import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddcontactPageRoutingModule } from './addcontact-routing.module';

import { AddcontactPage } from './addcontact.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddcontactPageRoutingModule
  ],
  declarations: [AddcontactPage]
})
export class AddcontactPageModule {}
