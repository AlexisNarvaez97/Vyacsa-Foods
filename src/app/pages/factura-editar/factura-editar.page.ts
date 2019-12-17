import { Component, OnInit, ViewChild } from "@angular/core";
import { ModalController, NavController } from '@ionic/angular';

import { Ionic4DatepickerModalComponent } from "@logisticinfotech/ionic4-datepicker";
import { FacturasService } from "../../services/facturas.service";
import { ActivatedRoute } from "@angular/router";

import { IonicSelectableComponent } from "ionic-selectable";

import Swal from "sweetalert2";


@Component({
  selector: "app-factura-editar",
  templateUrl: "./factura-editar.page.html",
  styleUrls: ["./factura-editar.page.scss"]
})
export class FacturaEditarPage implements OnInit {
  optionSeleccionado;

  selectedDate;

  mydate = "";

  dataPickerObjEsMx: any = {};

  facturasAprobadas: any[] = [];

  comprobante: any[] = [];
  emisor: any[] = [];
  impuestos: any[] = [];
  conceptos: any[] = [];

  opcionBill;

  facturasBill: any[] = [];

  factura;
  constructor(
    public modalCtrl: ModalController,
    private facturaService: FacturasService,
    private route: ActivatedRoute,
    private navCtrl: NavController
  ) {
    const id = this.route.snapshot.paramMap.get("id");
    this.getFactura(id);
    const facturaActual = this.facturaService.selectedObject;
    this.factura = this.facturaService.selectedObject;
    // console.log(`Factura actual con el ${id}`);
    console.log(facturaActual);

    // console.log('AVER', this.optionSeleccionado);
  }

  opcionCambiante(event: { component: IonicSelectableComponent; value: any }) {
    // Se almacena la opcion del selectable
    this.opcionBill = event.value.Descripcion;
    console.log("Opcion:", event.value.Descripcion);
    // console.log('Referencia alv', this.portComponent);
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
      // console.log(this.conceptos);
    });
  }

  validarFactura(idFactura) {

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

    const bienesAprobados = this.conceptos;

    for (const [id, factura] of bienesAprobados.entries()) {
      if (id === idFactura) {
        const opcionBill = this.opcionBill;
        // console.log(factura);
        const nuevaFactura = {
          id,
          ...factura,
          opcionBill
        };

        // console.log(nuevaFactura);
        // console.log(nuevaFactura.opcionBill);

        this.facturasBill.push(nuevaFactura);

        Toast.fire({
          icon: "success",
          title: `Item guardado`
        });

        console.log("FacturasBill", this.facturasBill);

        if (this.facturasBill.length > this.conceptos.length) {
          const idRepetido = this.facturasBill.findIndex(
            item => item.index === nuevaFactura.id
          );
          this.facturasAprobadas[idRepetido] = nuevaFactura;
          console.log(`Rebaso el tamaño de los conceptos ${this.conceptos.length}`);
          this.facturasBill.pop();
          return;
        }
      }
    }

    console.log(idFactura);
  }

  ngOnInit() {
    this.dataPickerObjEsMx = {
      dateFormat: "DD/MM/YYYY",
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
      fromDate: new Date("2019-01-01"), // default null
      toDate: new Date()
    };
  }

  async openDatePicker() {
    const datePickerModal = await this.modalCtrl.create({
      component: Ionic4DatepickerModalComponent,
      cssClass: "li-ionic4-datePicker",
      componentProps: { objConfig: this.modalCtrl }
    });
    await datePickerModal.present();

    datePickerModal.onDidDismiss().then(data => {
      console.log(data);
      this.selectedDate = data.data.date;
    });
  }

  onChangeDate() {
    console.log("date", this.mydate);
  }

  montoTotal(cantidad, unitario) {
    return Number(cantidad * unitario).toFixed(2);
  }

  enviarData(form) {

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

    console.log('ENVIAR AL ENDPOINT');
    console.log(form.value);
    console.log(this.factura);

    // console.log(this.facturasBill);

    this.facturaService.postGuardarBill(form.value, this.factura, this.facturasBill).subscribe( resp => {
      console.log('Response', resp);
      Toast.fire({
        icon: "success",
        title: `Factura guardada`
      });
      this.navCtrl.navigateForward(['/menu/facturas-pendientes']);
    });
  }

}
