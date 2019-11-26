import { Component, OnInit } from '@angular/core';
import { FacturasService } from '../../services/facturas.service';

@Component({
  selector: 'app-facturas-aprobadas',
  templateUrl: './facturas-aprobadas.page.html',
  styleUrls: ['./facturas-aprobadas.page.scss'],
})
export class FacturasAprobadasPage implements OnInit {

  facturas: any[] = [];

  constructor(private facturasService: FacturasService) { }

  ngOnInit() {
    this.facturasService.getFacturasAprobadas().subscribe( resp => {
      console.log(resp);
      this.facturas = resp;
    });
  }

  aceptar(factura) {
    console.log(factura);
  }

  rechazar(factura){
  }

  openLocalPdf() {
    
  }

}
