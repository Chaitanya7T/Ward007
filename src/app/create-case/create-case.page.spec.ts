import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateCasePage } from './create-case.page';

describe('CreateCasePage', () => {
  let component: CreateCasePage;
  let fixture: ComponentFixture<CreateCasePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCasePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
