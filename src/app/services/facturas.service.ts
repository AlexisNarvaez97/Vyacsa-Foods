import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

const URL = environment.url;

@Injectable({
  providedIn: "root"
})
export class FacturasService {

  selectedObject: any;

  constructor(private http: HttpClient) {}

  getFacturas() {
    return this.http.get(`${URL}/facturas`);
    // .pipe(
    //   map((resp: any) => {
    //     return resp.map(a => {
    //       const nombre = a.nombre;
    //       const idFactura = a.idFactura;
    //       const fechaCreacion = a.fecha_creacion;
    //       const numeroOrden = a.num_orden;
    //       const valido = a.valida;
    //       const estado = a.estado;
    //       return {
    //         nombre,
    //         idFactura,
    //         fechaCreacion,
    //         numeroOrden,
    //         valido,
    //         estado
    //       };
    //     });
    //   })
    // );
  }

  getFacturasAprobadas() {
    return this.http.get(`${URL}/facturasAprobadas`).pipe(
      map((resp: any) => {
        return resp.map(a => {
          const nombre = a.nombre;
          const idFactura = a.idFactura;
          const fechaCreacion = a.fecha_creacion;
          const numeroOrden = a.num_orden;
          const valido = a.valida;
          const estado = a.estado;
          return {
            nombre,
            idFactura,
            fechaCreacion,
            numeroOrden,
            valido,
            estado
          };
        });
      })
    );
  }

  getXml(facturaId) {
    const formData = new FormData();
    formData.append("factura_id", facturaId);

    return this.http.post(`${URL}/xmlToJson`, formData).pipe(
      map((resp: any) => {
        const comprobante: [] = resp.data["cfdi:Comprobante"];
        const conceptos: [] =
          resp.data["cfdi:Comprobante"]["cfdi:Conceptos"]["cfdi:Concepto"];
        const impuestos: [] = resp.data["cfdi:Comprobante"]["cfdi:Conceptos"]["cfdi:Concepto"]["cfdi:Impuestos"] || ["cfdi:Traslados"]["cfdi:Traslado"];
        const emisor: [] = resp.data["cfdi:Comprobante"]["cfdi:Emisor"];
        return { comprobante, conceptos, emisor, impuestos };
      })
    );
  }
}
