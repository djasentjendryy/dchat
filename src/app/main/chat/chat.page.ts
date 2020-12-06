import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { filter, last, map } from 'rxjs/operators';
import { SearchPage } from 'src/app/search/search.page';
import { RoomService } from 'src/app/service/room.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  recentChat: any;
  currUser: string;
  currUserId: string;
  chatSubs: Subscription;

  constructor(
    private modalCtrl: ModalController,
    private roomService: RoomService,
    private db: AngularFireDatabase
  ) { }

  ngOnInit() {}

  ionViewWillEnter(){
    this.currUser = JSON.parse(localStorage.getItem('currUser')).nama
    this.currUserId = localStorage.getItem('UID')
    this.chatSubs = this.roomService.getAllRoom().snapshotChanges().pipe(
      map(changes => changes.map( c => ({key: c.payload.key, ...c.payload.val()}))),
    )
    .subscribe(data => {
      const tempdata = data.filter( chat => {
        return chat.messages && chat.participant.includes(this.currUserId)
      })

      tempdata.forEach( val => {
        const user_key = val.participant.filter(key => key != this.currUserId).pop();
        this.db.list('/userDchat/' + user_key).query.once('value', ref => {
          val.participant = ref.val();
        });
        this.db.list('/room/' + val.key + '/messages').query.orderByKey().limitToLast(1).on('child_added', ref => {
          val.messages = ref.val();
        });
      })

      this.recentChat = tempdata
    })
  }

  ionViewWillLeave(){
    if(this.chatSubs){
      this.chatSubs.unsubscribe()
    }
  }

  async navigateSearch(){
    
    const modal = await this.modalCtrl.create({
      component: SearchPage
    })

    return await modal.present();
  }

}
