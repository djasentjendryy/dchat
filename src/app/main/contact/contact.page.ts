import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ModalController, NavController, PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AddcontactpopoverComponent } from 'src/app/components/addcontactpopover/addcontactpopover.component';
import { RoomService } from 'src/app/service/room.service';
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
    private db: AngularFireDatabase,
    private roomService: RoomService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {}

  ionViewWillEnter(){
    this.contacts = []
    this.currUser = JSON.parse(localStorage.getItem('currUser')).nama;
    this.currUserId = localStorage.getItem('UID');
    this.friendSubs = this.db.list('/userDchat/'+this.currUserId+'/friends').valueChanges().subscribe( data => {
      const tempdata = data
      this.contacts = []
      tempdata.forEach(uid => {
        this.db.list('/userDchat/'+uid).query.once('value', ref => {
          const contact = {
            key: ref.key,
            ...ref.val()
          }
          this.contacts.push(contact)
        })
      })
    })
  }

  ionViewWillLeave(){
    if(this.friendSubs){
      this.friendSubs.unsubscribe()
    }
  }

  async addContactPopover(ev: any){
    const popover = await this.popoverCtrl.create({
      component: AddcontactpopoverComponent,
      event: ev
    });

    return await popover.present();
  }

  chat(userId){
    let currkey = ''
    this.roomService.getRoom()
      .then( snapshot => {
        const data = snapshot.val()
        if(data){
          for( const [key, value] of Object.entries(data)){
            if(value['participant'][0] == this.currUserId && value['participant'][1] == userId || value['participant'][0] == userId && value['participant'][1] == this.currUserId){
              currkey = key 
              break;
            }
          }
        }

        if(currkey){
          this.navCtrl.navigateForward('/main/roomchat/'+currkey)
        }
        else{
          const key = this.roomService.setRoom(this.currUserId, userId)
          this.navCtrl.navigateForward('/main/roomchat/'+key)
        }
      })
  }
  
}
