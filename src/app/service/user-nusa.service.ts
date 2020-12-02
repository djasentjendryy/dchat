import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {UserNusa} from './userNusa';
import {AngularFireStorage} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class UserNusaService {
  private Dummy: any = [];
  private profileImage: any;
  private dbPath = '/userDchat/';
  userRef: AngularFireList<UserNusa> = null;
  constructor(
      private db: AngularFireDatabase,
      private storage: AngularFireStorage
  ) {
    this.userRef = db.list(this.dbPath);

    this.Dummy = [
      {
        imgUrl: '../../../assets/img/logo.png',
        nama: 'Djasen Wirya',
        lang: ['Bahasa Sunda', 'Bahasa Jawa', 'Bahasa Manado']
      },
      {
        imgUrl: '../../../assets/img/logo.png',
        nama: 'Steven Wirya',
        lang: ['Bahasa Sunda', 'Bahasa Jawa', 'Bahasa Manado']
      },
      {
        imgUrl: '../../../assets/img/logo.png',
        nama: 'Adi Wirya',
        lang: ['Bahasa Sunda', 'Bahasa Jawa', 'Bahasa Manado']
      },
      {
        imgUrl: '../../../assets/img/logo.png',
        nama: 'Aldo Wirya',
        lang: ['Bahasa Sunda', 'Bahasa Jawa', 'Bahasa Manado']
      }
    ];
  }

  getAllUser(){
    return this.userRef;
  }

  newUser(user: { nama: string; email: string; noTelp: string; privilege: string }, uid ): any{
    console.log(user);
    return this.db.object(this.dbPath + uid).set({
      nama: user.nama,
      email: user.email,
      noTelp: user.noTelp,
      privilege: user.privilege,
    });
  }
  // return certain user data //
  getUser(uid){
    return this.db.object(this.dbPath + uid).valueChanges();
  }

  get_all_user(){
    return this.db.list(this.dbPath).valueChanges();
  }

  filterItems(keyword) {
    return this.Dummy.filter(dataDummy => {
      return dataDummy.nama.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
    });
  }

  updateUser(data, uid, uploadImage){
    if (uploadImage){
      this.storage.ref(this.dbPath + uid + '/profileImage/').getDownloadURL().subscribe(res => {
        this.db.object(this.dbPath + uid).update({nama: data.nama, profileImage: res});
      });
    }else{
      this.db.object(this.dbPath + uid).update({nama: data.nama});
    }

  }

  uploadProfileImage(imageData, uid){
    return this.storage.ref(this.dbPath + uid + '/profileImage/').putString(imageData, 'data_url');
  }
}
