import { Component, OnInit } from '@angular/core';
import { FacturasService } from '../../services/facturas.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-facturas-aprobadas',
  templateUrl: './facturas-aprobadas.page.html',
  styleUrls: ['./facturas-aprobadas.page.scss'],
})
export class FacturasAprobadasPage implements OnInit {

  searchFactura = "";

  facturas: any[] = [];

  automaticClose = false;

  constructor(private facturasService: FacturasService, private navCtrl: NavController) { }

  ngOnInit() {
    this.facturasService.getFacturasAprobadas().subscribe( resp => {
      console.log(resp);
      this.facturas = resp;
      this.facturas[0].open = true;
    });
  }

  toggleSection(index) {

    this.facturas[index].open = !this.facturas[index].open;

    if(this.automaticClose && this.facturas[index].open) {
      this.facturas
      .filter((item, itemIndex) => itemIndex != index)
      .map(item => item.open = false);
    }

  }

  buscar(evento) {
    this.searchFactura = evento.detail.value;
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
