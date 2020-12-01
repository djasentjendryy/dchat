import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
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
    const keyword = this.searchControl.value
    const arr_result = []
    this.userNusaService.filterItems(keyword)
    .then(rawdata => {
      rawdata.forEach( data => {
        if(data.val()['nama'] != this.currUser){
          const setdata = {
            key: data.key,
            ...data.val()
          }
          arr_result.push(setdata)
        }
      })
      this.Dummy = arr_result
      console.log(this.Dummy)
    })  
  }

  chat(user:string){
    let currkey = ''
    this.roomService.getRoom()
      .then( snapshot => {
        const data = snapshot.val()
        if(data){
          for( const [key, value] of Object.entries(data)){
            if(value['participant'][0] == this.currUser && value['participant'][1] == user || value['participant'][0] == user && value['participant'][1] == this.currUser){
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
          const key = this.roomService.setRoom(this.currUser, user)
          this.navCtrl.navigateForward('/main/roomchat/'+key)
          this.onClose();
        }
      })
    
    
  }
  
  onClose(){
    this.modalCtrl.dismiss();
  }
}
