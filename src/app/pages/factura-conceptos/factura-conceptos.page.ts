import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacturasService } from '../../services/facturas.service';

@Component({
  selector: 'app-factura-conceptos',
  templateUrl: './factura-conceptos.page.html',
  styleUrls: ['./factura-conceptos.page.scss'],
})
export class FacturaConceptosPage implements OnInit {

  constructor(private route: ActivatedRoute, private facturaService: FacturasService) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    this.getFactura(id);

    const facturaActual = this.facturaService.selectedObject;
    console.log(`Factura actual con el ${id}`);
    console.log(facturaActual);

  }


  getFactura(id: string) {

    this.facturaService.getXml(id).subscribe( resp => {
      console.log(resp);
    });

  }


}
