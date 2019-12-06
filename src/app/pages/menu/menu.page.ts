import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {


  pages = [
    {
      title: "Inicio",
      url: "/menu/inicio",
      icon: "home"
    },
    {
      title: "Facturas pendientes por aprobar",
      url: "/menu/facturas-pendientes",
      icon: "folder"
    },
    {
      title: "Facturas aprobadas",
      url: "/menu/facturas-aprobadas",
      icon: "folder-open"
    },
    {
      title: "Graficas",
      url: "/menu/graficas",
      icon: "analytics"
    },
    {
      title: "Reportes",
      url: "/menu/reportes",
      icon: "document"
    },
    {
      title: "Configuracion",
      url: "/menu/configuracion",
      icon: "build"
    }
  ];

  selectedPath = '';

  constructor(private router: Router, private navCtrl: NavController, private storage: Storage) { 

    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });

  }

  ngOnInit() {
  }

  async salir() {
    // await this.storage.set('isLogged', false);
    this.navCtrl.navigateRoot('/login');
    this.storage.remove('User');
  }

}
