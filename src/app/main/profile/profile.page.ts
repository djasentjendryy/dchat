import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any;
  imageUrl: any;
  constructor(
      private router: Router,
      private authService: AuthService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currUser'));
    if (this.user.profileImage == null ){
      this.imageUrl = '../../../assets/img/orang.png';
    }else{
      this.imageUrl = this.user.profileImage;
    }
  }

  ionViewWillEnter(){
    this.user = JSON.parse(localStorage.getItem('currUser'));
    if (this.user.profileImage == null ){
      this.imageUrl = '../../../assets/img/orang.png';
    }else{
      this.imageUrl = this.user.profileImage;
    }
  }

  logout(){
    this.authService.logOut();
    localStorage.clear();
    this.router.navigate(['/home']);
  }
}
