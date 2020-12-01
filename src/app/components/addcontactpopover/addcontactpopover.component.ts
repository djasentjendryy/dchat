import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-addcontactpopover',
  templateUrl: './addcontactpopover.component.html',
  styleUrls: ['./addcontactpopover.component.scss'],
})
export class AddcontactpopoverComponent implements OnInit {

  constructor(
    private navCtrl: NavController,
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() {}

  navAddContact(){
    this.popoverCtrl.dismiss();
    this.navCtrl.navigateForward('/addcontact')
  }
}
