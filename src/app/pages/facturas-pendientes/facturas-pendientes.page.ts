import { HttpClient } from "@angular/common/http";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { FacturasService } from "../../services/facturas.service";
import {
  NavController,
  PopoverController,
  AlertController
} from "@ionic/angular";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-facturas-pendientes",
  templateUrl: "./facturas-pendientes.page.html",
  styleUrls: ["./facturas-pendientes.page.scss"]
})
export class FacturasPendientesPage implements OnInit {
  searchFactura = "";

  facturas: any[] = [];

  public items: any = [];

  information: any[];
  automaticClose = false;

  constructor(
    private facturasService: FacturasService,
    private navCtrl: NavController,
    private router: Router,
    private http: HttpClient,
    private popoverCtrl: PopoverController,
    private alertCtrl: AlertController
  ) {
    this.facturasService.getFacturas().subscribe((resp: any) => {
      console.log(resp);
      this.facturas = resp;
      this.facturas[0].open = false;
    });
  }

  ngOnInit() {
  }


  toggleSection(index) {
    this.facturas[index].open = !this.facturas[index].open;

    if (this.automaticClose && this.facturas[index].open) {
      this.facturas
        .filter((item, itemIndex) => itemIndex != index)
        .map(item => (item.open = false));
    }
  }

  buscar(evento) {
    this.searchFactura = evento.detail.value;
  }

  openLocalPdf() {}

  async rechazar(factura) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: toast => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      }
    });

    const { value: text } = await Swal.fire({
      icon: "error",
      title: "¿Estas seguro de rechazar?",
      input: "textarea",
      inputPlaceholder: "Razon de rechazo...",
      inputAttributes: {
        "aria-label": "Razon de rechazo"
      },
      showCancelButton: true
    });
    if (text) {
      console.log(factura);
      this.facturasService
        .postRechazarFactura(factura, text)
        .subscribe((resp: any) => {
          Toast.fire({
            icon: "success",
            title: `${resp.message}`
          });
          console.log(resp);
          this.navCtrl.navigateForward(['/menu/facturas-rechazadas']);
        });
    }
  }

  aceptar(factura) {
    this.facturasService.selectedObject = factura;
    const id = factura.idFactura;
    this.navCtrl.navigateRoot(["/factura-conceptos", id]);
  }

  onClick() {}
}
