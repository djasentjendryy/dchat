import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController, NavController, PopoverController} from '@ionic/angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserNusaService} from '../service/user-nusa.service';
import { PopovercomponentPage } from '../popovercomponent/popovercomponent.page';
import {Router} from '@angular/router';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  user: any;
  uploadImage = false;
  imageUrl: any;
  updateProfile: FormGroup;
  constructor(
      private userService: UserNusaService,
      private navCtrl: NavController,
      private loadingController: LoadingController,
      private router: Router,
      private popOver: PopovercomponentPage,
      private alertController: AlertController,
      private popoverController: PopoverController
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currUser'));

    if (this.user.profileImage == null ){
      this.imageUrl = '../../../assets/img/orang.png';
    }else{
      this.imageUrl = this.user.profileImage;
    }

    this.updateProfile = new FormGroup({
      nama: new FormControl(this.user.nama, {
        validators: [Validators.required],
      }),
      email: new FormControl(this.user.email, {
        validators: [Validators.required],
      }),
      noTelp: new FormControl(this.user.noTelp, {
        validators: [Validators.required],
      }),
    });
  }

  ionViewWillEnter(){
    this.user = JSON.parse(localStorage.getItem('currUser'));

    if (this.user.profileImage == null ){
      this.imageUrl = '../../../assets/img/orang.png';
    }else{
      this.imageUrl = this.user.profileImage;
    }

    this.updateProfile = new FormGroup({
      nama: new FormControl(this.user.nama, {
        validators: [Validators.required],
      }),
      email: new FormControl(this.user.email, {
        validators: [Validators.required],
      }),
      noTelp: new FormControl(this.user.noTelp, {
        validators: [Validators.required],
      }),
    });
  }

  saveProfile(){
    this.userService.updateUser(this.updateProfile.value, localStorage.getItem('UID'), this.uploadImage);
    this.uploadImage = false;
    this.userService.getUser(localStorage.getItem('UID')).subscribe(data => {
      console.log(data);
      // renew user session //
      localStorage.setItem('currUser', JSON.stringify(data));
      // tolong di benerin loadingny //
      this.presentLoading();
      this.router.navigate(['/main/tabs/profile']);
    });
  }


  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Updating Profile ...',
      duration: 3000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }


  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopovercomponentPage,
      event: ev,
      translucent: false
    });



    await popover.present();

    await popover.onDidDismiss()
        .then(result => {
          this.imageUrl = result.data;
          this.userService.uploadProfileImage(this.imageUrl, localStorage.getItem('UID'));
          this.uploadImage = true;
        })
        .catch(err => {
          console.log(err);
        });

  }

  async presentAlert() { // alert jika Batal edit//
    const alert = await this.alertController.create({
      message: 'Batal Ubah Profil?',
      buttons: [
        {
          text: 'Ya',
          handler: () => this.navCtrl.navigateBack('/main/tabs/profile')
        },
        {
          text: 'Tidak',
          role: 'cancel'
        }
      ]
    });

    await alert.present();
  }
}
