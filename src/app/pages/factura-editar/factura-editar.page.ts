import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';
import { FacturasService } from '../../services/facturas.service';
import { ActivatedRoute } from '@angular/router';
import Factura from '../../interfaces/factura.model';

@Component({
  selector: 'app-factura-editar',
  templateUrl: './factura-editar.page.html',
  styleUrls: ['./factura-editar.page.scss'],
})
export class FacturaEditarPage implements OnInit {

  selectedDate;

  mydate = "";

  dataPickerObjEsMx: any = {};

  facturasAprobadas: any[] = [];

  comprobante: any[] = [];
  emisor: any[] = [];
  impuestos: any[] = [];
  conceptos: any[] = [];

  factura: Factura;

  constructor(public modalCtrl: ModalController, private facturaService: FacturasService, private route: ActivatedRoute) {

    const id = this.route.snapshot.paramMap.get("id");
    this.getFactura(id);

    const facturaActual = this.facturaService.selectedObject;
    this.factura = this.facturaService.selectedObject;
    // console.log(`Factura actual con el ${id}`);
    console.log(facturaActual);
  }

  getFactura(id: string) {
    this.facturaService.getXml(id).subscribe(factura => {
      this.comprobante = factura.comprobante;
      this.emisor = factura.emisor;
      this.impuestos = factura.impuestos;
      // Validar el array
      if (factura.conceptos.length > 1) {
        this.conceptos = factura.conceptos;
      } else {
        this.conceptos.push(factura.conceptos);
      }
      console.log(this.conceptos);
    });
  }

  ngOnInit() {

    this.dataPickerObjEsMx = {
      dateFormat: "YYYY-MM-DD",
      closeOnSelect: true,
      setLabel: "OK",
      todayLabel: "Hoy",
      closeLabel: "Seleccionar",
      titleLabel: "Seleccione una fecha",
      monthsList: [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic"
      ],
      weeksList: ["D", "L", "M", "M", "J", "V", "S"],
      clearButton: false,
      momentLocale: "es-MX",
      mondayFirst: true,
      fromDate: new Date('2019-01-01'), // default null
      toDate: new Date()
    };
  }

  async openDatePicker() {
    const datePickerModal = await this.modalCtrl.create({
      component: Ionic4DatepickerModalComponent,
      cssClass: 'li-ionic4-datePicker',
      componentProps: { objConfig: this.modalCtrl }
    });
    await datePickerModal.present();
 
    datePickerModal.onDidDismiss()
      .then((data) => {
        console.log(data);
        this.selectedDate = data.data.date;
      });
  }

  onChangeDate() {
    console.log('date', this.mydate);
  }

}
