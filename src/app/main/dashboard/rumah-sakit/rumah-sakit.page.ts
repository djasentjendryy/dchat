import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RumahSakitService} from '../../../service/rumah-sakit.service';
import {RS} from '../../../model/rumah_sakit.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-rumah-sakit',
  templateUrl: './rumah-sakit.page.html',
  styleUrls: ['./rumah-sakit.page.scss'],
})
export class RumahSakitPage implements OnInit {
  loadedrs: Observable<unknown>;
  rsId: any;
  namaRs: string;
  alamatRs: string;
  phoneNum: number;
  dataDetail: any;
  index: any;
  constructor(
      private activateRoute: ActivatedRoute,
      private rsService: RumahSakitService
  ) { }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe( paramMap => {
      if (!paramMap.has( 'rsId')) { return; }
      this.index = paramMap.get('rsId');
      this.loadDataRS(this.index);
    });
  }

  loadDataRS(index){
    this.rsService.getAllRS().subscribe(res => {

      this.rsId = Object.keys(res);

      this.rsService.getrs(this.rsId[index]).subscribe(data => {
        console.log(data);
        this.namaRs = data['nama'];
        this.alamatRs = data['alamat'];
        this.phoneNum = data['phone'];
        // console.log(data['nama']);
      });
    });
  }


}
