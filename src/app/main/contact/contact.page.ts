import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ModalController, PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AddcontactpopoverComponent } from 'src/app/components/addcontactpopover/addcontactpopover.component';
import { UserNusaService } from 'src/app/service/user-nusa.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  currUser: string;
  currUserId: string;
  friendSubs: Subscription;
  contacts: any;

  constructor(
    private popoverCtrl: PopoverController,
    private db: AngularFireDatabase
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.contacts = []
    this.currUser = JSON.parse(localStorage.getItem('currUser')).nama;
    this.currUserId = localStorage.getItem('UID');
    this.friendSubs = this.db.list('/userDchat/'+this.currUserId+'/friends').valueChanges().subscribe( data => {
      const tempdata = data
      tempdata.forEach(uid => {
        this.db.list('/userDchat/'+uid).query.once('value', ref => {
          this.contacts.push(ref.val())
        })
      })
    })
  }

  async addContactPopover(ev: any){
    const popover = await this.popoverCtrl.create({
      component: AddcontactpopoverComponent,
      event: ev
    });

    return await popover.present();
  }
  
}
