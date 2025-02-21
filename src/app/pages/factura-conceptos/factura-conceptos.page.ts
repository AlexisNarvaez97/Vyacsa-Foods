import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FacturasService } from "../../services/facturas.service";

import Swal from "sweetalert2";
import { EmailComposer } from "@ionic-native/email-composer/ngx";
import Factura from "../../interfaces/factura.model";
import { NavController } from "@ionic/angular";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-factura-conceptos",
  templateUrl: "./factura-conceptos.page.html",
  styleUrls: ["./factura-conceptos.page.scss"]
})
export class FacturaConceptosPage implements OnInit {
  comprobante: any[] = [];
  emisor: any[] = [];
  impuestos: any[] = [];
  conceptos: any[] = [];

  facturaRechazada = false;

  facturaAprobada = false;

  cantidadSolicitada;

  facturaRefacturacion: any;
  facturaNota: any;

  cantidadProporcionada = 0;

  facturasDiferencias: any[] = [];
  facturasAprobadas: any[] = [];

  factura;

  constructor(
    private route: ActivatedRoute,
    private facturaService: FacturasService,
    private emailComposer: EmailComposer,
    private navCtrl: NavController,
    private router: Router,
    private storage: Storage
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    this.getFactura(id);

    const facturaActual = this.facturaService.selectedObject;
    this.factura = this.facturaService.selectedObject;
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

  modelChanged(cantidadInput: number) {
    if (cantidadInput === 0) {
      return;
    }

    console.log(cantidadInput);

    this.cantidadProporcionada = cantidadInput;
    // console.log("Evento", cantidadInput);
  }

  onSubmit(valor) {}

  validarFactura(idFactura) {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      onOpen: toast => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      }
    });

    let nombre;
    let cantidadSolicitada;
    let cantidadTotal;
    let precioUnitario;
    let cantidadRecibida;
    let index;
    let diferencias;
    let montoTotal;
    const partidas = this.conceptos;
    for (const [id, factura] of partidas.entries()) {
      if (id === idFactura) {
        index = id;
        nombre = factura.Descripcion;
        this.cantidadSolicitada = cantidadSolicitada;
        cantidadSolicitada = factura.Cantidad;
        cantidadTotal = factura.Importe;
        precioUnitario = factura.ValorUnitario;
        cantidadRecibida = this.cantidadProporcionada;

        if (cantidadRecibida < 0) {
          Toast.fire({
            icon: "error",
            title: "No se aceptan numeros negativos"
          });
          return;
        }

        // Operaciones

        diferencias = Number(
          (cantidadSolicitada - cantidadRecibida).toFixed(2)
        );
        montoTotal = Number((diferencias * precioUnitario).toFixed(2));

        if (cantidadSolicitada > cantidadRecibida) {
          Swal.fire({
            position: "center",
            icon: "info",
            allowOutsideClick: false,
            title: `Existe una diferencia de mercancia de ${diferencias.toFixed(
              2
            )}`,
            showConfirmButton: false,
            timer: 1500
          });
          this.facturaRechazada = true;
          this.facturaAprobada = false;
        } else {
          const facturaAprobada = {
            index,
            cantidadTotal,
            precioUnitario,
            cantidadSolicitada,
            nombre
          };

          this.facturasAprobadas.push(facturaAprobada);

          if (this.facturasAprobadas.length > partidas.length) {
            const idRepetido = this.facturasDiferencias.findIndex(
              item => item.index === facturaAprobada.index
            );
            this.facturasAprobadas[idRepetido] = facturaAprobada;
            console.log(`Rebaso el tamaño de los conceptos ${partidas.length}`);
            this.navCtrl.navigateBack("/menu/facturas-pendientes");
            Toast.fire({
              icon: "error",
              title: "¡Muchos intentos, pruebe de nuevo!"
            });
            this.facturasAprobadas.pop();
            return;
          }
          console.log("No hagas nada no hay diferencias", diferencias);
          this.facturaAprobada = true;
          this.facturaRechazada = false;
          return;
        }
      }
    }
    const facturaDif = {
      index,
      cantidadTotal,
      precioUnitario,
      cantidadSolicitada,
      nombre,
      diferencias,
      montoTotal
    };
    this.facturasDiferencias.push(facturaDif);

    if (this.facturasDiferencias.length > partidas.length) {
      const idRepetido = this.facturasDiferencias.findIndex(
        item => item.index === facturaDif.index
      );
      this.facturasDiferencias[idRepetido] = facturaDif;
      console.log(`Rebaso el tamaño de los conceptos ${partidas.length}`);
      this.facturasDiferencias.pop();
      return;
    }
  }

  changeRadio(valor) {
    const valorRadio = valor.detail.value;
    const facturaEdit = this.factura;

    let email = "";

    if (valorRadio === "factura") {
      const facturaRefacturacion = {
        ...facturaEdit
      };

      facturaRefacturacion.estado = "0";

      this.facturaRefacturacion = facturaRefacturacion;
      // Obtener el email del localstorage y agregar el video.
      this.storage.get("User").then(usuario => {
        email = usuario.email;
        console.log(usuario.email);
      });

      this.emailComposer.open({
        app: "gmail",
        to: facturaEdit.email,
        cc: facturaEdit.email,
        subject: `${facturaEdit.nombre} con N.O.C ${facturaEdit.idOrden}`,
        body: "Refacturación",
        isHtml: true
      });
    } else if (valorRadio === "nota") {
      const facturaNota = {
        ...facturaEdit
      };

      facturaNota.estado = "1";

      this.facturaNota = facturaNota;

      this.emailComposer.open({
        app: "gmail",
        to: facturaEdit.email,
        cc: facturaEdit.email,
        subject: `${facturaEdit.nombre} con N.O.C ${facturaEdit.idOrden}`,
        body: "Nota de crédito",
        isHtml: true
      });
    }
  }

  aceptarFactura() {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      onOpen: toast => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      }
    });

    const facturaDif = this.facturasDiferencias;

    const facturaNota = this.facturaNota;
    const facturaRefacturacion = this.facturaRefacturacion;

    if (facturaNota) {
      return this.facturaService
        .postCredit(facturaDif, facturaNota)
        .subscribe(resp => {
          console.log("Respuesta NOTA", resp);
          this.navCtrl.navigateRoot(["menu/facturas-pendientes"]);
          Toast.fire({
            icon: "success",
            title: "Factura guardada con exito"
          });
        });
    } else {
      // tslint:disable-next-line: deprecation
      return this.facturaService
        .postCreditRefacturacion(facturaDif, facturaRefacturacion)
        .subscribe(resp => {
          console.log("Respuesta REFACTURACION", resp);
          this.navCtrl.navigateRoot(["menu/facturas-pendientes"]);
          Toast.fire({
            icon: "success",
            title: "Factura guardada con exito"
          });
        });
    }
  }

  facturaPasada() {
    console.log(this.facturasAprobadas);

    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      onOpen: toast => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      }
    });
    const facturaNormal = this.factura;

    facturaNormal.estado = "6";

    return this.facturaService
      .postCreditAprobada(this.facturasAprobadas, facturaNormal)
      .subscribe(resp => {
        console.log("Respuesta Aprobada", resp);
        this.navCtrl.navigateRoot(["menu/facturas-pendientes"]);
        Toast.fire({
          icon: "success",
          title: "Factura guardada con exito"
        });
      });
  }
}
