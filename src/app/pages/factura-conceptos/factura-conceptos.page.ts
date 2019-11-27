import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FacturasService } from "../../services/facturas.service";

import Swal from "sweetalert2";

@Component({
  selector: "app-factura-conceptos",
  templateUrl: "./factura-conceptos.page.html",
  styleUrls: ["./factura-conceptos.page.scss"]
})
export class FacturaConceptosPage implements OnInit {
  facturita = false;
  credito = false;

  comprobante: any[] = [];
  emisor: any[] = [];
  impuestos: any[] = [];
  conceptos: any[] = [];

  facturaRechazada = false;

  cantidadProporcionada = 0;

  facturasDiferencias: any[] = [];

  facturaMap: { [id: string]: any } = {};

  constructor(
    private route: ActivatedRoute,
    private facturaService: FacturasService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    this.getFactura(id);

    const facturaActual = this.facturaService.selectedObject;
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

  modelChanged(cantidadInput: number) {
    if (cantidadInput === 0) {
      return;
    }

    this.cantidadProporcionada = cantidadInput;
    // console.log("Evento", cantidadInput);
  }

  validarFactura(idFactura) {
    let nombre;
    let cantidadSolicitada;
    let cantidadTotal;
    let precioUnitario;
    let cantidadRecibida;
    let index;
    let diferencias;
    let montoTotal;
    // console.log(idFactura);
    const partidas = this.conceptos;
    for (const [id, factura] of partidas.entries()) {
      // console.log(index, factura, "Partidas");

      if (id === idFactura) {
        index = id;
        nombre = factura.Descripcion;
        cantidadSolicitada = factura.Cantidad;
        cantidadTotal = factura.Importe;
        precioUnitario = factura.ValorUnitario;
        cantidadRecibida = this.cantidadProporcionada;

        // Operaciones

        diferencias = Number(
          (cantidadSolicitada - cantidadRecibida).toFixed(2)
        );
        montoTotal = Number((diferencias * precioUnitario).toFixed(2));

        if (cantidadRecibida < cantidadSolicitada) {
          // console.log("Diferencia");
          Swal.fire({
            position: "center",
            icon: "info",
            title: `Existe una diferencia de mercancia de ${diferencias.toFixed(
              2
            )}`,
            showConfirmButton: false,
            timer: 2700
          });
        }
        this.facturaRechazada = true;
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
    // console.log(facturaDif);

    this.facturasDiferencias.push(facturaDif);

    if (this.facturasDiferencias.length > partidas.length) {
      const idRepetido = this.facturasDiferencias.findIndex(item => item.index === facturaDif.index);
      this.facturasDiferencias[idRepetido] = facturaDif;
      console.log(`Rebaso el tamaño de los conceptos ${partidas.length}`);
      this.facturasDiferencias.pop();
      return;
    }
    // console.log(this.facturasDiferencias);

    // console.log(facturaDif);
  }

  aceptarFactura() {}

  changeRadio(valor) {}
}
