import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {UserNusaService} from "../../service/user-nusa.service";
import {Router} from "@angular/router";
import {LoadingController, ToastController} from "@ionic/angular";

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  formAdmin: FormGroup;
  constructor(
      private auth: AuthService,
      private userService: UserNusaService,
      private router: Router,
      private toastController: ToastController,
      private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.formAdmin = new FormGroup({
      nama: new FormControl(null, {
        validators: [Validators.required],
      }),
      email: new FormControl(null, {
        validators: [Validators.required],
      }),
      noTelp: new FormControl(null, {
        validators: [Validators.required],
      }),
      password: new FormControl(null, {
        validators: [Validators.required],
      }),
      privilege: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Memproses akun...',
      duration: 3000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  async toastSentEmail(msg) {
    const toast = await this.toastController.create({
      message: msg,
      color: 'danger',
      duration: 2500
    });
    toast.present();
  }

  submitForm(){
    // firebase auth //
    this.auth.signUpWithEmail(this.formAdmin.value.email, this.formAdmin.value.password)
        .then((resp) => {
          resp.user.sendEmailVerification()
              .then(() => {
                this.auth.setMessage('Email verifikasi telah dikirim');
                // data user ke db //
                const userData = {
                  nama: this.formAdmin.value.nama,
                  email: this.formAdmin.value.email,
                  noTelp: this.formAdmin.value.noTelp,
                  privilege: this.formAdmin.value.privilege
                };

                this.userService.newUser(userData, resp.user.uid );
                this.formAdmin.reset();
                this.presentLoading().then(() => {
                  this.router.navigate(['./admin']);
                  this.toastSentEmail('Email verifikasi sudah dikirim');
                });

              })
              .catch(err => {
                console.log(err);
              });
        })
        .catch(error => {
          this.toastSentEmail(error.message);
        });
  }

}
