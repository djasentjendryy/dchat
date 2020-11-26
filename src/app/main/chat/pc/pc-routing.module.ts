import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PcPage } from './pc.page';

const routes: Routes = [
  {
    path: '',
    component: PcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PcPageRoutingModule {}
