import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserNusaService} from '../service/user-nusa.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  users: Array<any>;
  constructor(
      private router: Router,
      private userService: UserNusaService,
  ) { }

  ngOnInit() {
   this.userService.get_all_user().subscribe(res => {
      this.users = res;
   });
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
