import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RoomchatPage } from './roomchat.page';

describe('RoomchatPage', () => {
  let component: RoomchatPage;
  let fixture: ComponentFixture<RoomchatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomchatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RoomchatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
