import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ModalController, NavController } from '@ionic/angular';
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
  currUser: string = JSON.parse(localStorage.getItem('currUser')).nama
  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private roomService: RoomService,
    private db: AngularFireDatabase
  ) { }

  ngOnInit() {
    this.roomService.getAllRoom().snapshotChanges().pipe(
      map(changes => changes.map( c => ({key: c.payload.key, ...c.payload.val()}))),
    )
    .subscribe(data => {
      const tempdata = data.filter( chat => {
        return chat.messages
      })

      tempdata.forEach( val => {
        val.participant = val.participant.filter( user => { return user != this.currUser})
        this.db.list('/room/'+val.key+'/messages').query.orderByKey().limitToLast(1).on('child_added', ref => {
          val.messages = ref.val()
        })
      })

      this.recentChat = tempdata
    })
  }
  async navigateSearch(){
    
    const modal = await this.modalCtrl.create({
      component: SearchPage
    })

    return await modal.present();
  }

}
