import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RumahSakitPage } from './rumah-sakit.page';

const routes: Routes = [
  {
    path: '',
    component: RumahSakitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RumahSakitPageRoutingModule {}
