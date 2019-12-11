import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js";
import { LoginService } from "../../services/login.service";
import { FacturasService } from "../../services/facturas.service";

@Component({
  selector: "app-reportes",
  templateUrl: "./reportes.page.html",
  styleUrls: ["./reportes.page.scss"]
})
export class ReportesPage implements OnInit {

  data: boolean;

  usuarios: any[] = [];
  constructor(
    private loginService: LoginService,
    private facturasService: FacturasService
  ) {}
  ngOnInit() {
    this.facturasService.getFacturasAprobadas().subscribe((aprobadas: []) => {
      this.facturasService.getFacturasNotas().subscribe((notas: []) => {
        this.facturasService
        .getFacturasRefacturacion()
        .subscribe((refacturacion: []) => {
            this.facturasService.getFacturas().subscribe((generales: []) => {
              this.facturasService.getFacturasRechazadas().subscribe((rechazadas: []) => {
                this.graficaEstados(aprobadas, refacturacion, notas, generales, rechazadas);
              });
            });
          });
      });
    });
    // this.graficaFacturas();
  }


  graficaEstados(aprobadas: [], refacturacion: [], notas: [], generales: [], rechazadas: []) {
    const bar = new Chart(
      document.getElementById("bar-chart") as HTMLCanvasElement,
      {
        type: "horizontalBar",
        data: {
          labels: [
            "Pendientes",
            "Aprobadas",
            "Refacturacion",
            "Nota de credito",
            "Rechazadas"
          ],
          datasets: [
            {
              label: "Factura (estado)",
              backgroundColor: ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e"],
              data: [
                generales.length,
                aprobadas.length,
                refacturacion.length,
                notas.length,
                rechazadas.length
              ]
            }
          ]
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: "Estado de las facturas"
          }
        }
      }
    );
  }

}
