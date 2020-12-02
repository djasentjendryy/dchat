import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PcPage } from './pc.page';

describe('PcPage', () => {
  let component: PcPage;
  let fixture: ComponentFixture<PcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
