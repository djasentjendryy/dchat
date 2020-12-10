import { Injectable } from '@angular/core';
import {RS} from '../model/rumah_sakit.model';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireStorage} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class RumahSakitService {
  private rs: any;
  private dbPath = '/rumahsakit/';
  constructor(
      private db: AngularFireDatabase,
      private storage: AngularFireStorage
  ) { }
  getAllRS(){
    return this.db.object(this.dbPath).valueChanges();
  }

  getrs(rsId){
    return this.db.object(this.dbPath + rsId).valueChanges();
  }
}
