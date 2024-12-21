import { Injectable } from '@angular/core';
import { TranslateService as NgxTranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor(private translate: NgxTranslateService) {
    this.translate.addLangs(['sr-hr-bs-cg', 'en', 'si', 'mk']); // Додајте подржане језике
    this.translate.setDefaultLang('sr-hr-bs-cg'); // Поставите подразумевани језик
  }

  setLanguage(lang: string) {
  //  console.log('Постављање језика на:', lang);
    this.translate.use(lang);
  }

  getCurrentLang() {
    return this.translate.currentLang;
  }

  getTranslation(key: string): Observable<any> {
    return this.translate.get(key);
  }

  instant(key: string, interpolateParams?: Object): string {
    return this.translate.instant(key, interpolateParams);
  }
}