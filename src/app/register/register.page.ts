import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserNusaService} from '../service/user-nusa.service';
import {UserNusa} from '../service/userNusa';
import { Router } from '@angular/router';
import {LoadingController, ToastController} from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  formSignUp: FormGroup;
  errorMsg: string;
  constructor(
      private auth: AuthService,
      private userService: UserNusaService,
      private router: Router,
      private toastController: ToastController,
      private loadingController: LoadingController
  ) { }

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

  ngOnInit() {
    this.formSignUp = new FormGroup({
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
      bahasa: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }

  submitForm(){
    // firebase auth //
    this.auth.signUpWithEmail(this.formSignUp.value.email, this.formSignUp.value.password)
        .then((resp) => {
          resp.user.sendEmailVerification()
              .then(() => {
                this.auth.setMessage('Email verifikasi telah dikirim');
                // data user ke db //
                const userData = {
                  nama: this.formSignUp.value.nama,
                  email: this.formSignUp.value.email,
                  noTelp: this.formSignUp.value.noTelp,
                  lang: this.formSignUp.value.bahasa
                };

                this.userService.newUser(userData, resp.user.uid )
                    .then(res => {
                      console.log(res);
                    })
                    .catch(error => {
                      console.log(error);
                    });
                this.formSignUp.reset();
                this.presentLoading().then(() => {
                  this.router.navigate(['./login']);
                  this.toastSentEmail('Email verifikasi sudah dikirim, silahkan check email anda.');
                });

              })
              .catch(err => {
                console.log(err);
              });
        })
        .catch(error => {
          this.errorMsg = error.message;
        });
  }


}
