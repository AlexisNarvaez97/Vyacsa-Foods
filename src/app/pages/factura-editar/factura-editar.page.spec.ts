import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FacturaEditarPage } from './factura-editar.page';

describe('FacturaEditarPage', () => {
  let component: FacturaEditarPage;
  let fixture: ComponentFixture<FacturaEditarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturaEditarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FacturaEditarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
