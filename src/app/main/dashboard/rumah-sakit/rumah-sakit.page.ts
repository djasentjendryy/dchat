import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RumahSakitService} from '../../../service/rumah-sakit.service';
import {RS} from '../../../model/rumah_sakit.model';

@Component({
  selector: 'app-rumah-sakit',
  templateUrl: './rumah-sakit.page.html',
  styleUrls: ['./rumah-sakit.page.scss'],
})
export class RumahSakitPage implements OnInit {
  loadedrs: RS;
  constructor(
      private activateRoute: ActivatedRoute,
      private rsService: RumahSakitService
  ) { }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe( paramMap =>{
      if(!paramMap.has( 'rsId')) { return; }
      const rsId = paramMap.get('rsId');
      this.loadedrs = this.rsService.getrs(rsId);
    });
  }


}
