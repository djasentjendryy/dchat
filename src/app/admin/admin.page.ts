import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(
      private router: Router
  ) { }

  ngOnInit() {
  }

  create(){
    this.router.navigate(['admin/create']);
  }
  signout(){
    console.log('keluar');
  }
  delete(){
    console.log('delete');
  }

  edit(){
    console.log('edit');
  }
}
