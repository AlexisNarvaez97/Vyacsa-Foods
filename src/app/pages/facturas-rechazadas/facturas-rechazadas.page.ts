import { Component, OnInit } from '@angular/core';
import { FacturasService } from '../../services/facturas.service';

@Component({
  selector: 'app-facturas-rechazadas',
  templateUrl: './facturas-rechazadas.page.html',
  styleUrls: ['./facturas-rechazadas.page.scss'],
})
export class FacturasRechazadasPage implements OnInit {

  facturas: any[] = [];
  searchFactura = "";
  automaticClose = false;

  constructor(private facturasService: FacturasService) {

    this.facturasService.getFacturasRechazadas().subscribe((resp: any) => {
      this.facturas = resp;
      console.log(resp);
    });

   }

  ngOnInit() {
  }

  toggleSection(index) {
    this.facturas[index].open = !this.facturas[index].open;

    if (this.automaticClose && this.facturas[index].open) {
      this.facturas
        .filter((item, itemIndex) => itemIndex != index)
        .map(item => (item.open = false));
    }
  }

  buscar(evento) {
    this.searchFactura = evento.detail.value;
  }

}
