import {Component, Input, OnInit} from '@angular/core';
import {UserNusaService} from '../../service/user-nusa.service';
import {FormControl} from '@angular/forms';
import {ModalController, NavController} from '@ionic/angular';
import {RoomService} from '../../service/room.service';
import {RS} from '../../model/rumah_sakit.model';
import {RumahSakitService} from '../../service/rumah-sakit.service';
import {map} from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {
    user: any;
    rs: any;
    rsId: any;
    @Input() lang: any;
    public Dummy: any = [];
    public test: any = [];
    searching: any = false;
    public searchControl: FormControl;
    public searchTerm = '';
    currUserId: string;
    recentChat: any = '';
    chatSubs: Subscription;
    constructor(
        private rsService: RumahSakitService,
        private userNusaService: UserNusaService,
        private modalCtrl: ModalController,
        private roomService: RoomService,
        private navCtrl: NavController,
        private db: AngularFireDatabase
    ) {
        this.searchControl = new FormControl();
    }

    ngOnInit() {
        this.rsService.getAllRS().subscribe(res => {
            this.rs =  Object.values(res);
        });
    }

    setFilteredItems(searchTerm) {
        this.Dummy = this.userNusaService.filterItems(searchTerm);
    }

    ionViewWillEnter(){
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
            this.chatSubs.unsubscribe();
        }
    }

    onClose(){
        this.modalCtrl.dismiss();
    }
}
