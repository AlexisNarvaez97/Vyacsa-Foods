import { Component, OnInit } from "@angular/core";
import { FacturasService } from "../../services/facturas.service";

@Component({
  selector: "app-facturas-pendientes",
  templateUrl: "./facturas-pendientes.page.html",
  styleUrls: ["./facturas-pendientes.page.scss"]
})
export class FacturasPendientesPage implements OnInit {
  searchFactura = "";

  facturas: any[] = [];

  constructor(private facturasService: FacturasService) {}

  ngOnInit() {
    this.facturasService.getFacturas().subscribe((resp: any) => {
      this.facturas = resp;
    });
  }

  buscar(evento) {
    this.searchFactura = evento.detail.value;
  }

  openLocalPdf() {}

  rechazar() {}

  aceptar() {}
}
