import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  splash = true;

  constructor(private router: Router) {
  }

  ionViewWillEnter(){
    if (localStorage.getItem('currUser')){

      setTimeout(() => {
        this.router.navigate(['/main/tabs/dashboard']); this.splash = false;
      }, 4000);
    }else{

      this.router.navigate(['/login']);
    }
  }

}
