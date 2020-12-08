import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { debounceTime, filter, map } from 'rxjs/operators';
import { RoomService } from '../service/room.service';
import { UserNusaService } from '../service/user-nusa.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  @Input() lang: any;
  public Dummy: any = [];
  public test: any = [];
  searching: any = false;
  public searchControl:FormControl;
  public searchTerm: string = "";
  currUser: string = JSON.parse(localStorage.getItem('currUser')).nama
  currUserId: string = localStorage.getItem('UID');
  searchSubs: Subscription

  constructor(
    private userNusaService : UserNusaService, 
    private modalCtrl: ModalController,
    private roomService: RoomService,
    private navCtrl: NavController
  ) {
    this.searchControl = new FormControl('');
   }

  ngOnInit() {this.setFilteredItems()}

  setFilteredItems() { //FUNCTION UNTUK FILTER
    this.searchSubs = this.userNusaService.getFriends(this.currUserId).valueChanges().subscribe( friendsId => {
      const keyword = this.searchControl.value
      const arr_result = []
      this.userNusaService.filterItems(keyword)
      .then(rawdata => {
        rawdata.forEach( data => {
          if(friendsId.includes(data.key)){
            const setdata = {
              key: data.key,
              ...data.val()
            }
            arr_result.push(setdata)
          }
        })
        this.Dummy = arr_result
      })  
    })
  }

  ionViewWillLeave(){
    if(this.searchSubs){
      this.searchSubs.unsubscribe()
    }
  }

  chat(userId:string){
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
          this.onClose();
        }
        else{
          const key = this.roomService.setRoom(this.currUserId, userId)
          this.navCtrl.navigateForward('/main/roomchat/'+key)
          this.onClose();
        }
      })
  }
  
  onClose(){
    this.modalCtrl.dismiss();
  }
}
