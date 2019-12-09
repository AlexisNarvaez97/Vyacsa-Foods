import { Component, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { LanguagePopoverPage } from "../language-popover/language-popover.page";

@Component({
  selector: "app-configuracion",
  templateUrl: "./configuracion.page.html",
  styleUrls: ["./configuracion.page.scss"]
})
export class ConfiguracionPage implements OnInit {
  darkMode: boolean = true;

  constructor(private popoverCtrl: PopoverController) {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    console.log(prefersDark);
    this.darkMode = prefersDark.matches;
  }

  ngOnInit() {}

  async openLanguagePopover(ev) {
    const popover = await this.popoverCtrl.create({
      component: LanguagePopoverPage,
      event: ev
    });
    await popover.present();
  }

  cambio() {
    this.darkMode = !this.darkMode;
    // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    document.body.classList.toggle("dark");
  }
}
