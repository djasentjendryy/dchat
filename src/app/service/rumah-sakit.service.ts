import { Injectable } from '@angular/core';
import {RS} from '../model/rumah_sakit.model';

@Injectable({
  providedIn: 'root'
})
export class RumahSakitService {
  private rs: RS[] = [
    {
      id: 'r1',
      nama: 'mitra keluarga',
      imageURL: 'https://i.pinimg.com/originals/49/33/f5/4933f55c84c7f6ea31bf7c8685d72c58.jpg'
    },
    {
      id: 'r2',
      nama: 'hermina',
      imageURL: 'https://i.pinimg.com/originals/49/33/f5/4933f55c84c7f6ea31bf7c8685d72c58.jpg'
    },
    {
      id: 'r3',
      nama: 'siloam',
      imageURL: 'https://i.pinimg.com/originals/49/33/f5/4933f55c84c7f6ea31bf7c8685d72c58.jpg'
    }
  ];
  constructor() { }
  getAllRS(){
    return [...this.rs];
  }
  getrs(rsId: string){
    return {...this.rs.find( rumahsakit => {
          return rumahsakit.id === rumahsakit.id;
      })};
  }
}
