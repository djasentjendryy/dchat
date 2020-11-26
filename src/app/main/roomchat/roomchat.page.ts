import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/app/service/message';
import { RoomService } from 'src/app/service/room.service';

@Component({
  selector: 'app-roomchat',
  templateUrl: './roomchat.page.html',
  styleUrls: ['./roomchat.page.scss'],
})
export class RoomchatPage implements OnInit {

  currUser: string = JSON.parse(localStorage.getItem('currUser')).nama
  roomId: string;
  userChat: any;
  messages: Message[];

  constructor(
    private roomService: RoomService,
    private activatedRouter: ActivatedRoute,
    private db: AngularFireDatabase
  ) { }

  ngOnInit() {
    this.activatedRouter.paramMap.subscribe( paramMap => {
      if(!paramMap.get('roomId')){return;}
      const roomId = paramMap.get('roomId');
      this.roomId = roomId;
      this.db.object('/room/'+roomId).valueChanges().subscribe( data => {
        this.userChat = data['participant'].filter( user => {return user != this.currUser})
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
        sender: this.currUser,
        time: time.getTime().toString()
      };
  
      this.roomService.createMessage(this.roomId, message)
    }
    form.reset()
  }

}
