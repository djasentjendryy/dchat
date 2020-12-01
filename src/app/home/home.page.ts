import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  splash = true;
  loggedUser: any;
  constructor(private router: Router) {
  }

  ionViewWillEnter(){
    this.loggedUser = JSON.parse(localStorage.getItem('currUser'));
    if (this.loggedUser != null){
      setTimeout(() => {
        if (this.loggedUser.privilege === 'admin'){
          this.router.navigate(['/admin']); this.splash = false;
        }else {
          this.router.navigate(['/main/tabs/dashboard']); this.splash = false;
        }
      }, 4000);
    }else{

      this.router.navigate(['/login']);
    }
  }

}
