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
  letterObj = {
    to: "Alexis",
    from: "Raymundo",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc gravida tincidunt ex in faucibus. Nam felis dui, laoreet vitae justo ultricies, euismod elementum dui. In hac habitasse platea dictumst. Pellentesque."
  };

  pdfObj = null;

  constructor(
    public navCtrl: NavController,
    private plt: Platform,
    private file: File,
    private fileOpener: FileOpener
  ) {}

  ngOnInit() {}

  createPdf() {
    var docDefinition = {
      content: [
        { text: "REMINDER", style: "header" },
        { text: new Date().toTimeString(), alignment: "right" },

        { text: "From", style: "subheader" },
        { text: this.letterObj.from },

        { text: "To", style: "subheader" },
        this.letterObj.to,

        { text: this.letterObj.text, style: "story", margin: [0, 20, 0, 20] },

        {
          ul: ["Bacon", "Rips", "BBQ"]
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        story: {
          italic: true,
          alignment: "center",
          width: "50%"
        }
      }
    };
    this.pdfObj = pdfMake.createPdf(docDefinition);
  }

  downloadPdf() {
    // if(this.plt.is('cordova')) {

    // } else {
    //   this.pdfObj.download();
    // }

    if (this.plt.is("cordova")) {
      this.pdfObj.getBuffer(buffer => {
        var blob = new Blob([buffer], { type: "application/pdf" });

        // Save the PDF to the data Directory of our App
        this.file
          .writeFile(this.file.dataDirectory, "myletter.pdf", blob, {
            replace: true
          })
          .then(fileEntry => {
            // Open the PDf with the correct OS tools
            this.fileOpener.open(
              this.file.dataDirectory + "myletter.pdf",
              "application/pdf"
            );
          });
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }
}
