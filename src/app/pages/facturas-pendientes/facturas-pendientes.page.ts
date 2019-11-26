import { Component, OnInit } from "@angular/core";
import { FacturasService } from "../../services/facturas.service";
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: "app-facturas-pendientes",
  templateUrl: "./facturas-pendientes.page.html",
  styleUrls: ["./facturas-pendientes.page.scss"]
})
export class FacturasPendientesPage implements OnInit {
  searchFactura = "";

  facturas: any[] = [];

  constructor(private facturasService: FacturasService, private navCtrl: NavController, private router: Router) {}

  ngOnInit() {
    this.facturasService.getFacturas().subscribe((resp: any) => {
      console.log(resp);
      this.facturas = resp;
    });
  }

  buscar(evento) {
    this.searchFactura = evento.detail.value;
  }

  openLocalPdf() {}

  rechazar() {}

  aceptar(factura) {
    this.facturasService.selectedObject = factura;
    const id = factura.idFactura;
    this.router.navigate(['/factura-conceptos', id]);
  }
}
