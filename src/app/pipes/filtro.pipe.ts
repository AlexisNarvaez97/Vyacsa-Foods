import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filtro"
})
export class FiltroPipe implements PipeTransform {
  transform(arreglo: any[], texto: string): any[] {
    if (texto === "") {
      return arreglo;
    }

    return arreglo.filter(item => {
      if (item.idOrden.toLowerCase().includes(texto.toLowerCase())) {
        item.open = true;
        return item.idOrden.toLowerCase().includes(texto.toLowerCase());
      }
    });
  }
}
