import { Component, OnInit, OnDestroy } from "@angular/core";
import { FacturasService } from "../../services/facturas.service";
import { NavController } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-facturas-pendientes",
  templateUrl: "./facturas-pendientes.page.html",
  styleUrls: ["./facturas-pendientes.page.scss"]
})
export class FacturasPendientesPage implements OnInit {
  searchFactura = "";

  facturas: any[] = [];

  constructor(
    private facturasService: FacturasService,
    private navCtrl: NavController,
    private router: Router
  ) {
    console.log("CONSTRUCTOR");
  }

  ionViewWillEnter() {
    console.log("IonViewWillEnter");
  }

  ngOnInit() {
    console.log("NgOnInit");
    this.getFacturas();
  }

  getFacturas() {
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
    this.navCtrl.navigateRoot(["/factura-conceptos", id]);
  }
}
