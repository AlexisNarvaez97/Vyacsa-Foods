import { HttpClient } from '@angular/common/http';
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

  public items: any = [];

  information: any[];
  automaticClose = false;

  constructor(
    private facturasService: FacturasService,
    private navCtrl: NavController,
    private router: Router,
    private http: HttpClient
  ) {
    // this.http.get('assets/information.json').subscribe( res => {
    //   this.information = res['items'];
    //   this.information[0].open = true;
    // });

    this.facturasService.getFacturas().subscribe((resp: any) => {
      console.log(resp);
      this.facturas = resp;
      this.facturas[0].open = true;
    });
  }

  // ionViewWillEnter() {
  //   console.log("IonViewWillEnter");
  // }

  ngOnInit() {
    console.log("NgOnInit");
    this.getFacturas();
  }

  toggleSection(index) {

    this.facturas[index].open = !this.facturas[index].open;

    if(this.automaticClose && this.facturas[index].open) {
      this.facturas
      .filter((item, itemIndex) => itemIndex != index)
      .map(item => item.open = false);
    }

  }

  // toggleItem(index, childIndex) {
  //   this.information[index].children[childIndex].open = !this.information[index].children[childIndex].open;
  // }

  getFacturas() {
    // this.facturasService.getFacturas().subscribe((resp: any) => {
    //   // console.log(resp);
    //   this.facturas = resp;

    //   console.log('Probando');

    //   console.log(this.facturas[0]);
    //   console.log(this.facturas[1]);
    //   console.log(this.facturas[2]);
    //   console.log(this.facturas[3]);
    //   console.log(this.facturas[4]);
    // });
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

  onClick() {
    
  }
}
