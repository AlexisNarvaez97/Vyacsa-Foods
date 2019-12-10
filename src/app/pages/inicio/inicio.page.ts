import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { HidenavStretchheaderComponent } from 'ionic4-hidenav';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  @ViewChild(HidenavStretchheaderComponent, {static: false}) hidenav: HidenavStretchheaderComponent;

  constructor(private menuCtrl: MenuController) { }

  ngOnInit() {
  }

  menu() {
    this.menuCtrl.toggle();
  }

  expand() {
    this.hidenav.toggle();
  }

}
