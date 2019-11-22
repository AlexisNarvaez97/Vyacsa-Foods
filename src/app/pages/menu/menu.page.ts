import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  pages = [
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
    }
  ];

  selectedPath = "";

  constructor(private router: Router) { 

    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });

  }

  ngOnInit() {
  }

  async salir() {
    // await this.storage.set('isLogged', false);
    // this.storage.remove('User');
    // this.navCtrl.navigateRoot('/login');
  }

}
