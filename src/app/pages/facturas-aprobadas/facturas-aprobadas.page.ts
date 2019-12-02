import { Component, OnInit } from '@angular/core';
import { FacturasService } from '../../services/facturas.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-facturas-aprobadas',
  templateUrl: './facturas-aprobadas.page.html',
  styleUrls: ['./facturas-aprobadas.page.scss'],
})
export class FacturasAprobadasPage implements OnInit {

  facturas: any[] = [];

  constructor(private facturasService: FacturasService, private navCtrl: NavController) { }

  ngOnInit() {
    this.facturasService.getFacturasAprobadas().subscribe( resp => {
      console.log(resp);
      this.facturas = resp;
    });
  }

  aceptar(factura) {
    this.facturasService.selectedObject = factura;
    const id = factura.idFactura;
    this.navCtrl.navigateRoot(["/factura-editar", id]);
  }

  rechazar(factura){
  }

  openLocalPdf() {
    
  }

}
