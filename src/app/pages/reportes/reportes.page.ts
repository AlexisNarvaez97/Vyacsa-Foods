import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js";
import { LoginService } from "../../services/login.service";

@Component({
  selector: "app-reportes",
  templateUrl: "./reportes.page.html",
  styleUrls: ["./reportes.page.scss"]
})
export class ReportesPage implements OnInit {
  usuarios: any[] = [];

  constructor(private loginService: LoginService) {}
  ngOnInit() {
    this.loginService.getUsuarios().subscribe((resp: any) => {
      this.usuarios = resp;
      const longitud = this.usuarios.length;
      this.graficaUsuarios(longitud);
    });
    this.graficaFacturas();
  }

  graficaUsuarios(valor) {
    const recetas = document.getElementById("receipts") as HTMLCanvasElement;

    Chart.defaults.global.defaultFontFamily = "Lato";
    Chart.defaults.global.defaultFontSize = 23;

    const receta = {
      labels: ["Usuarios registrados"],
      datasets: [
        {
          data: [valor],
          backgroundColor: ["#3498db"]
        }
      ]
    };

    const pieChart = new Chart(recetas, {
      type: "pie",
      data: receta
    });
  }

  graficaFacturas() {
    const bar = new Chart(
      document.getElementById("bar-chart") as HTMLCanvasElement,
      {
        type: "horizontalBar",
        data: {
          labels: ["Pendientes", "Aprobadas", "Refacturacion", "Nota de credito"],
          datasets: [
            {
              label: "Factura (estado)",
              backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e74c3c"],
              data: [21, 32, 54, 32]
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
