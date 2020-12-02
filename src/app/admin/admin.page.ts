import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserNusaService} from '../service/user-nusa.service';
import {AuthService} from '../service/auth.service';
import {UserNusa} from '../service/userNusa';
import {AlertController, IonItemSliding} from '@ionic/angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  users: any;
  usersUid: any;
  constructor(
      private router: Router,
      private userService: UserNusaService,
      private authService: AuthService,
      private alertController: AlertController,
  ) { }

  ngOnInit() {
   this.userService.get_all_user().subscribe(res => {
      this.users = Object.values(res);
      this.usersUid = Object.keys(res);
   });
  }

  ionViewWillEnter(){
    this.userService.get_all_user().subscribe(res => {
      this.users = Object.values(res);
      this.usersUid = Object.keys(res);
    });
  }

  async confirmDelete(user, slidingItems: IonItemSliding) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      mode: 'ios',
      header: 'Delete Item',
      message: 'Are you sure ?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Yes',
          handler: () => this.delete(user, slidingItems)
        }
      ]
    });

    await alert.present();
  }

  create(){
    this.router.navigate(['admin/create']);
  }

  signout(){
    this.authService.logOut();
    localStorage.clear();
    this.router.navigate(['/home']);
  }

  delete(i, slidingItems){
    this.userService.deleteUser(this.usersUid[i]);
    slidingItems.close();
    this.router.navigate(['/admin']);
  }

  edit(){
    console.log('edit');
  }
}
