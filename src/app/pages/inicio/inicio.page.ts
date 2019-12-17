import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { HidenavStretchheaderComponent } from 'ionic4-hidenav';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  user: any = {};

  @ViewChild(HidenavStretchheaderComponent, {static: false}) hidenav: HidenavStretchheaderComponent;

  constructor(private menuCtrl: MenuController, private storage: Storage) { }

  ngOnInit() {
    this.storage.get('User').then( user =>{
      this.user = user;
    });
  }

  menu() {
    this.menuCtrl.toggle();
  }

  expand() {
    this.hidenav.toggle();
  }

}
