import { Component, Input } from "@angular/core";
import { ToastController } from '@ionic/angular';

@Component({
  selector: "app-expandable",
  templateUrl: "./expandable.component.html",
  styleUrls: ["./expandable.component.scss"]
})
export class ExpandableComponent {

  // tslint:disable-next-line: no-input-rename
  @Input('product') product: any;

  constructor(private toastCtrl: ToastController) {}


  async buyItem(product) {
    let toast = await this.toastCtrl.create({
      message: 'Added to the cart Hola'
    });
    toast.present();
  }

}
