import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomchatPage } from './roomchat.page';

const routes: Routes = [
  {
    path: ':roomId',
    component: RoomchatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomchatPageRoutingModule {}
