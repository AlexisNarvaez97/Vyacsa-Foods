import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: "root"
})
export class FacturasService {
  constructor(private http: HttpClient) {}

  getFacturas() {
    return this.http.get(`${URL}/facturas`).pipe(
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
}
