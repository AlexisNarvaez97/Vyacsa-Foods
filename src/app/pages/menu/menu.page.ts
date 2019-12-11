import { Component, OnInit } from "@angular/core";
import { Router, RouterEvent } from "@angular/router";
import { NavController } from "@ionic/angular";
import { Storage } from "@ionic/storage";

import * as moment from 'moment';

@Component({
  selector: "app-menu",
  templateUrl: "./menu.page.html",
  styleUrls: ["./menu.page.scss"]
})
export class MenuPage implements OnInit {
  horaImprimible;

  date;

  pages = [
    {
      title: "Inicio",
      url: "/menu/inicio",
      icon: "home"
    },
    {
      title: "Facturas pendientes",
      url: "/menu/facturas-pendientes",
      icon: "folder"
    },
    {
      title: "Facturas aprobadas",
      url: "/menu/facturas-aprobadas",
      icon: "folder-open"
    },
    {
      title: "Facturas rechazadas",
      url: "/menu/facturas-rechazadas",
      icon: "hand"
    },
    // {
    //   title: "Graficas",
    //   url: "/menu/graficas",
    //   icon: "analytics"
    // },
    {
      title: "Graficas",
      url: "/menu/reportes",
      icon: "analytics"
    },
    {
      title: "Configuracion",
      url: "/menu/configuracion",
      icon: "build"
    }
  ];

  selectedPath = "";

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private storage: Storage
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }

  ngOnInit() {

    const date = moment().format('LL');

    this.date = date;

    this.reloj();
  }

  async salir() {
    // await this.storage.set('isLogged', false);
    this.navCtrl.navigateRoot("/login");
    this.storage.remove("User");
    this.storage.remove("isLogged");
  }

  reloj() {
    const momentoActual = new Date();
    const hora = momentoActual.getHours();
    const minuto = momentoActual.getMinutes();
    const segundo = momentoActual.getSeconds();

    const horaImprimible = hora + ":" + minuto + ":" + segundo;

    this.horaImprimible = horaImprimible;

    // La función se tendrá que llamar así misma para que sea dinámica,
    // de esta forma:

    setTimeout(() => {
      this.reloj();
    }, 1000);
  }
}
