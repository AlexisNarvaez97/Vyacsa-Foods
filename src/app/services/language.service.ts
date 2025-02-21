import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Storage } from "@ionic/storage";
import { Platform } from "@ionic/angular";

const LNG_KEY = "SELECTED_LANGUAGE";

@Injectable({
  providedIn: "root"
})
export class LanguageService {
  selected = "";

  constructor(
    private translate: TranslateService,
    private storage: Storage
  ) {}

  setInitialAppLanguaje() {
    let language = this.translate.getBrowserLang();
    this.translate.setDefaultLang(language);

    this.storage.get(LNG_KEY).then(val => {
      if (val) {
        this.setLanguage(val);
        this.selected = val;
      }
    });
  }

  getLanguages() {
    return [
      { text: "English", value: "en", img: "assets/imgs/en.png" },
      { text: "Español", value: "es", img: "assets/imgs/es.png" }
    ];
  }

  setLanguage(lng) {
    this.translate.use(lng);
    this.selected = lng;
    this.storage.set(LNG_KEY, lng);
  }
}
