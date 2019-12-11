import { Component, OnInit } from "@angular/core";
import { NavController, Platform } from "@ionic/angular";
import { File } from "@ionic-native/file/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: "app-graficas",
  templateUrl: "./graficas.page.html",
  styleUrls: ["./graficas.page.scss"]
})
export class GraficasPage implements OnInit {

  constructor(
    public navCtrl: NavController,
    private plt: Platform,
    private file: File,
    private fileOpener: FileOpener
  ) {}

  ngOnInit() {}
}
