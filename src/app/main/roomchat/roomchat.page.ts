import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/app/service/message';
import { RoomService } from 'src/app/service/room.service';
import { UserNusaService } from 'src/app/service/user-nusa.service';

@Component({
  selector: 'app-roomchat',
  templateUrl: './roomchat.page.html',
  styleUrls: ['./roomchat.page.scss'],
})
export class RoomchatPage implements OnInit {

  currUserId: string = localStorage.getItem('UID')
  currUser: string = JSON.parse(localStorage.getItem('currUser')).nama
  roomId: string;
  userChat: any = '';
  messages: Message[];

  constructor(
    private roomService: RoomService,
    private activatedRouter: ActivatedRoute,
    private db: AngularFireDatabase,
    private userService: UserNusaService
  ) { }

  ngOnInit() {
    this.activatedRouter.paramMap.subscribe( paramMap => {
      if(!paramMap.get('roomId')){return;}
      const roomId = paramMap.get('roomId');
      this.roomId = roomId;
      this.db.object('/room/'+roomId).valueChanges().subscribe( data => {
        const user_key = data['participant'].filter( userId => {return userId != this.currUserId}).pop()
        this.userService.getUser(user_key).subscribe( data => {
          this.userChat = data
        });

        this.messages = []
        for(let key in data['messages']){
          this.messages.push(data['messages'][key])
        }
      })
    })
  }

  send(form: NgForm){

    if(form.value.pesan.trim()){
      const time = new Date();
      const message: Message = {
        msg: form.value.pesan,
        sender: this.currUserId,
        time: time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
      };
  
      this.roomService.createMessage(this.roomId, message)
    }
    form.reset()
  }

}
