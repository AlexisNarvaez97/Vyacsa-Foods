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
    return this.http.get(`${URL}/facturas`)
    .pipe(
      map((resp: any) => {
        return resp.map(a => {
          const nombre = a.nombre;
          const idFactura = a.idFactura;
          const fechaCreacion = a.fecha_creacion;
          const numeroOrden = a.num_orden;
          const valido = a.valido;
          const estado = a.estado;
          const idOrden = a.idOrden;
          const idQB = a.Qbid;
          const email = a.email;
          const fechaSubida = a.fecha_subida;
          const idProveedor = a.idProveedor;
          return {
            nombre,
            idFactura,
            fechaCreacion,
            numeroOrden,
            idOrden,
            idQB,
            email,
            idProveedor,
            fechaSubida,
            valido,
            estado
          };
        });
      })
    );
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
          const idQB = a.Qbid;
          const idOrden = a.idOrden;
          const fechaSubida = a.fecha_subida;
          const idProveedor = a.idProveedor;
          return {
            nombre,
            idFactura,
            fechaCreacion,
            numeroOrden,
            idQB,
            valido,
            estado,
            idOrden,
            fechaSubida,
            idProveedor
          };
        });
      })
    );
  }

  getFacturasRechazadas() {
    return this.http.get(`${URL}/facturasRechazadas`)
    .pipe(
      map((resp: any) => {
        return resp.map(a => {
          const nombre = a.nombre;
          const idFactura = a.idFactura;
          const fechaCreacion = a.fecha_creacion;
          const numeroOrden = a.num_orden;
          const valido = a.valida;
          const estado = a.estado;
          const idQB = a.Qbid;
          const idOrden = a.idOrden;
          const fechaSubida = a.fecha_subida;
          const idProveedor = a.idProveedor;
          const razonRechazo = a.razon_rechazo;
          return {
            nombre,
            idFactura,
            fechaCreacion,
            numeroOrden,
            idQB,
            valido,
            estado,
            idOrden,
            fechaSubida,
            idProveedor,
            razonRechazo
          };
        });
      })
    );
  }

  getFacturasNotas() {
    return this.http.get(`${URL}/facturasNotas`);
  }

  getFacturasRefacturacion() {
    return this.http.get(`${URL}/facturasRefacturacion`);
  }

  getXml(facturaId) {
    const formData = new FormData();
    formData.append("factura_id", facturaId);

    return this.http.post(`${URL}/xmlToJson`, formData).pipe(
      map((resp: any) => {
        const comprobante: [] = resp.data["cfdi:Comprobante"];
        const conceptos: [] =
          resp.data["cfdi:Comprobante"]["cfdi:Conceptos"]["cfdi:Concepto"];
        const impuestos: [] =
          resp.data["cfdi:Comprobante"]["cfdi:Conceptos"]["cfdi:Concepto"][
            "cfdi:Impuestos"
          ] || ["cfdi:Traslados"]["cfdi:Traslado"];
        const emisor: [] = resp.data["cfdi:Comprobante"]["cfdi:Emisor"];
        return { comprobante, conceptos, emisor, impuestos };
      })
    );
  }

  postCredit(facturas, facturaOrden) {

    console.log('FacturaDiferencia', facturas);
    console.log('FacturaNormal', facturaOrden);
    const formData = new FormData();
    formData.append('idfactura', facturaOrden.idFactura);
    formData.append('idorden', facturaOrden.idOrden);
    formData.append('idproveedor', facturaOrden.idProveedor);
    formData.append('total_recibida', facturas.CantidadTotal);
    formData.append('refac_not', facturaOrden.estado); // No funciona con otro estado.

    for (const [index, val] of facturas.entries()) {
      // console.log(`Hola ${val.cantidadSolicitada} + Index ${index}`);
      // console.log(`'item_df[${index}]', '${val.nombre}'|${val.diferencia}|${val.monto}~,`);
      formData.append(`items_df[${index}]`, `${val.nombre}|${val.diferencia}|${val.monto}~,`);
      // tslint:disable-next-line: max-line-length
      formData.append(`items_rec[${index}]`, `${val.nombre}|${val.cantidadSolicitada}|${val.precioUnitario}|${val.cantidadTotal}|0.00|0.00,`);
      // tslint:disable-next-line: max-line-length
    }
    return this.http.post(`${URL}/credit`, formData);
  }


  postCreditRefacturacion(facturas, facturaOrden) {
    console.log('FacturaDiferencia', facturas);
    console.log('FacturaNormal', facturaOrden);
    const formData = new FormData();
    formData.append('idfactura', facturaOrden.idFactura);
    formData.append('idorden', facturaOrden.idOrden);
    formData.append('idproveedor', facturaOrden.idProveedor);
    formData.append('total_recibida', facturas.CantidadTotal);
    formData.append('refac_not', facturaOrden.estado); // No funciona con otro estado.

    for (const [index, val] of facturas.entries()) {
      // console.log(`Hola ${val.cantidadSolicitada} + Index ${index}`);
      // console.log(`'item_df[${index}]', '${val.nombre}'|${val.diferencia}|${val.monto}~,`);
      formData.append(`items_df[${index}]`, `${val.nombre}|${val.diferencia}|${val.monto}~,`);
      // tslint:disable-next-line: max-line-length
      // formData.append(`items_rec[${index}]`, `${val.nombre}|${val.cantidadSolicitada}|${val.precioUnitario}|${val.cantidadTotal}|0.00|0.00,`);
      // tslint:disable-next-line: max-line-length
    }
    return this.http.post(`${URL}/credit`, formData);
  }

  postCreditAprobada(facturas, facturaOrden) {
    console.log('FacturaDiferencia', facturas);
    console.log('FacturaNormal', facturaOrden);
    const formData = new FormData();
    formData.append('idfactura', facturaOrden.idFactura);
    formData.append('idorden', facturaOrden.idOrden);
    formData.append('idproveedor', facturaOrden.idProveedor);
    // formData.append('total_recibida', facturas.CantidadTotal);
    formData.append('refac_not', facturaOrden.estado); // No funciona con otro estado.

    const array = facturas;

    for (const [index, val] of array.entries()) {
      // console.log(`Hola ${val.cantidadSolicitada} + Index ${index}`);
      // console.log(`'item_df[${index}]', '${val.nombre}'|${val.diferencia}|${val.monto}~,`);
      // formData.append(`items_df[${index}]`, `${val.nombre}|${val.diferencia}|${val.monto}~,`);
      // tslint:disable-next-line: max-line-length
      formData.append(`items_rec[${index}]`, `${val.nombre}|${val.cantidadTotal}|${val.precioUnitario}|${val.cantidadSolicitada}|0.00|0.00,`);
      // tslint:disable-next-line: max-line-length
    }
    return this.http.post(`${URL}/credit`, formData);
  }



  postGuardarBill(form, factura, facturasBill) {

    console.log(form);
    console.log(factura);
    console.log(facturasBill);

    const formData = new FormData();
    formData.append('factura', factura.idFactura);
    formData.append('orden', factura.idOrden);
    formData.append('datepicker', form.date);
    formData.append('total_descuento', '0');
    formData.append('referencia', form.Referencia);
    formData.append('memo', form.Memo);

    const array = facturasBill;

    for (const [index, val] of array.entries()) {
      formData.append(`itms_exp[${index}]`, `${factura.idQB}|${val.Descripcion}|${val.Cantidad}|${val.ValorUnitario}|${val.Importe}|Items|0.00,`);
    }
    return this.http.post(`${URL}/guardarBills`, formData);
  }


  postRechazarFactura(factura, text) {

    const formData = new FormData();
    formData.append('rechazo', '2');
    formData.append('razon', text);
    formData.append('ordencompra', factura.idOrden);

    return this.http.post(`${URL}/rechazarFactura`, formData);
  }




}
