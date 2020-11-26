import { Component, OnInit } from '@angular/core';
import {Camera} from '@ionic-native/camera/ngx';
import {PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-popovercomponent',
  templateUrl: './popovercomponent.page.html',
  styleUrls: ['./popovercomponent.page.scss'],
})
export class PopovercomponentPage implements OnInit {
    imageUrl: any;
    constructor(
      private popOverController: PopoverController,
      private camera: Camera,
  ) { }

  ngOnInit() {
  }

  // Change Profile Picture using Camera //
  changePPUsingCamera(){
    this.camera.getPicture(
        {
          sourceType: this.camera.PictureSourceType.CAMERA,
          destinationType: this.camera.DestinationType.DATA_URL
        }
    ).then((res) => {
        this.imageUrl = 'data:image/jpeg;base64,' + res;
        this.popOverController.dismiss(this.imageUrl);
    }).catch(e => {
      console.log(e);
    });
  }

  // Change profile picture from gallery //
  changePPUsingGallery(){
    this.camera.getPicture(
        {
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
          destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
        }
    ).then((res) => {
        this.imageUrl = 'data:image/jpeg;base64,' + res;
        this.popOverController.dismiss(this.imageUrl);
    }).catch(e => {
      console.log(e);
    });
  }

}
