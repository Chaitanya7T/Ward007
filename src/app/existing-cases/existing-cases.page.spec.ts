import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExistingCasesPage } from './existing-cases.page';

describe('ExistingCasesPage', () => {
  let component: ExistingCasesPage;
  let fixture: ComponentFixture<ExistingCasesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistingCasesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExistingCasesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
