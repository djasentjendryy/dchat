import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Message } from './message';
import { Room } from './room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private dbpath = "/room/";
  private roomRef: AngularFireList<Room>

  constructor(private db: AngularFireDatabase) {
    this.roomRef = db.list(this.dbpath)
  }

  getAllRoom(){
    return this.roomRef
  }

  getRoom(){
    return this.roomRef.query.once('value')
  }

  setRoom(user1, user2){
    return this.roomRef.push({
      participant: [user1, user2],
      messages: []
    }).key
  }

  createMessage(roomId: string, message: Message){
    this.db.list(this.dbpath+roomId+'/messages').push(message)
  }
}
