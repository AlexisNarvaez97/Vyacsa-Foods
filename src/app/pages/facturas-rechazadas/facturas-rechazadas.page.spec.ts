import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FacturasRechazadasPage } from './facturas-rechazadas.page';

describe('FacturasRechazadasPage', () => {
  let component: FacturasRechazadasPage;
  let fixture: ComponentFixture<FacturasRechazadasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturasRechazadasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FacturasRechazadasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
