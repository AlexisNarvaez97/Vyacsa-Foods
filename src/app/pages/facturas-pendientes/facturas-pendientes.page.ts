import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from "@angular/core";
import { FacturasService } from "../../services/facturas.service";
import { NavController, PopoverController, AlertController } from "@ionic/angular";
import { Router } from "@angular/router";
import { LanguagePopoverPage } from '../language-popover/language-popover.page';
import { TranslateService } from '@ngx-translate/core';

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
    private alertCtrl: AlertController,
    private translate: TranslateService
  ) {
    // this.http.get('assets/information.json').subscribe( res => {
    //   this.information = res['items'];
    //   this.information[0].open = true;
    // });

    this.facturasService.getFacturas().subscribe((resp: any) => {
      console.log(resp);
      this.facturas = resp;
      this.facturas[0].open = false;
    });
  }

  // ionViewWillEnter() {
  //   console.log("IonViewWillEnter");
  // }

  ngOnInit() {
    console.log("NgOnInit");
    this.getFacturas();
  }

  async showAlert() {
    const alert = await this.alertCtrl.create({
      header: this.translate.instant('ALERT.header'),
      message: this.translate.instant('ALERT.msg'),
      buttons: ['OK']
    });
    alert.present();
  }

  async openLanguagePopover(ev) {
    const popover = await this.popoverCtrl.create({
      component: LanguagePopoverPage,
      event: ev
    });
    await popover.present();
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
