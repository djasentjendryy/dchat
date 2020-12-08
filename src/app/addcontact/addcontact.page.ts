import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { UserNusaService } from '../service/user-nusa.service';

@Component({
  selector: 'app-addcontact',
  templateUrl: './addcontact.page.html',
  styleUrls: ['./addcontact.page.scss'],
})
export class AddcontactPage implements OnInit {

  contacts: any;
  currUserId: string = localStorage.getItem('UID');
  searchControl: FormControl;

  constructor(
    private userService: UserNusaService,
    private toastCtrl: ToastController
  ) { 
    this.searchControl = new FormControl('')
  }

  ngOnInit() {
    // console.log(this.currUserId)
    // this.userService.getAllUser().snapshotChanges().pipe(
    //   map(changes => changes.map(c => ({key: c.payload.key, ...c.payload.val()})))
    // )
    // .subscribe( data => {
    //   console.log(data)
    //   const tempdata = data.filter( contact => contact.key != this.currUserId && contact['privilege'] != 'admin')
    //   this.contacts = tempdata
    // })
    this.filterContact()
  }

  filterContact(){
    const keyword = this.searchControl.value
    this.contacts = []
    this.userService.filterItems(keyword).then( res => {
      res.forEach( c => {
        if(c.val()['privilege'] != 'admin' && c.key != this.currUserId){
          const tempush = {
            key: c.key,
            ...c.val()
          };
          this.contacts.push(tempush)
        }
      })
    })
  }

  async toastAlert(msg, color){
    const toast = await this.toastCtrl.create({
      message: msg,
      color: color,
      duration: 1000
    })

    await toast.present()
  }

  addingContact(userkey){
    this.userService.addFriends(this.currUserId, userkey)
    .then( res => {
      if(res == 'exist'){
        this.toastAlert("User sudah pernah ditambahkan", "danger")
      }
      else{
        this.toastAlert("User berhasil ditambahkan", "success")
      }
    })
  }
}
