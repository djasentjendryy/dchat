import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RumahSakitPage } from './rumah-sakit.page';

describe('RumahSakitPage', () => {
  let component: RumahSakitPage;
  let fixture: ComponentFixture<RumahSakitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RumahSakitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RumahSakitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
