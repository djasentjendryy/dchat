import {Component, Input, OnInit} from '@angular/core';
import {UserNusaService} from '../../service/user-nusa.service';
import {FormControl} from '@angular/forms';
import {ModalController, NavController} from '@ionic/angular';
import {RoomService} from '../../service/room.service';
import {RS} from '../../model/rumah_sakit.model';
import {RumahSakitService} from '../../service/rumah-sakit.service';
import {map} from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
    user: any;
    rs: RS[];
    @Input() lang: any;
    public Dummy: any = [];
    public test: any = [];
    searching: any = false;
    public searchControl: FormControl;
    public searchTerm = '';
    currUser: string = JSON.parse(localStorage.getItem('currUser')).nama;
    recentChat: any;
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



    this.rs = this.rsService.getAllRS();
    this.user = JSON.parse(localStorage.getItem('currUser'));
    if(this.lang){
          this.userNusaService.getAllUser().snapshotChanges().pipe(
              map( changes =>
                  changes.map(c => ({
                      imgUrl: '../../../assets/img/logo.png',...c.payload.val()
                  }))
              )
          ).subscribe( ({filter}) => {
              this.Dummy = filter(user => {
                  return user.lang.includes(this.lang) && user.nama != this.currUser
              });
          });
      }
      else{
          this.userNusaService.getAllUser().snapshotChanges().pipe(
              map( changes =>
                  changes.map(c => ({
                      imgUrl: '../../../assets/img/logo.png', ...c.payload.val()
                  }))
              )
          ).subscribe( ({filter}) => {
              this.Dummy = filter(user => {
                  // tslint:disable-next-line:triple-equals
                  return user.nama != this.currUser;
              });
          });
      }
  }
    setFilteredItems(searchTerm) {
        this.Dummy = this.userNusaService.filterItems(searchTerm);
    }

    chat(user: string){
        let currkey = '';
        this.roomService.getRoom()
            .then( snapshot => {
                const data = snapshot.val();
                if (data){
                    for ( const [key, value] of Object.entries(data)){
                        // tslint:disable-next-line:max-line-length
                        // if(value['participant'][0] == this.currUser && value['participant'][1] == user || value['participant'][0] == user && value['participant'][1] == this.currUser){
                            currkey = key;
                            break;
                        // }
                    }
                }

                if(currkey){
                    this.navCtrl.navigateForward('/main/roomchat/'+currkey)
                    this.onClose();
                }
                else{
                    const key = this.roomService.setRoom(this.currUser, user)
                    this.navCtrl.navigateForward('/main/roomchat/'+key)
                    this.onClose();
                }
            });
  }

  ionViewWillEnter(){
    this.user = JSON.parse(localStorage.getItem('currUser'));
  }

    onClose(){
        this.modalCtrl.dismiss();
    }
}
