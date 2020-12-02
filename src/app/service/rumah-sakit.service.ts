import { Injectable } from '@angular/core';
import {RS} from '../model/rumah_sakit.model';

@Injectable({
  providedIn: 'root'
})
export class RumahSakitService {
  private rs: RS[] = [
    {
      id: 'r1',
      nama: 'Mayapada Hospital Kuningan',
      imageURL: 'https://wartapenanews.com/wp-content/uploads/2020/07/warta-1-36.jpg'
    },
    {
      id: 'r2',
      nama: 'Mayapada Hospital Bogor',
      imageURL: 'https://mayapadahospital.com/images/hospital/BMC%20NEW.jpg'
    },
    {
      id: 'r3',
      nama: 'RSPAD Gatot Soebroto',
      imageURL: 'https://d1ojs48v3n42tp.cloudfront.net/provider_location_list/232403_3-3-2020_11-3-9.jpg'
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
