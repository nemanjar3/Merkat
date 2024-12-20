import { Component,ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '../../translate.service';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
    standalone: true,
    selector: 'app-language-selector',
    imports: [
      
        MatButtonModule,
        MatSelectModule,
        TranslateModule,
        CommonModule
    ],
    providers: [TranslateService, FormsModule], // Додајте TranslateService овде
    templateUrl: './language-selector.component.html',
    styleUrls: ['./language-selector.component.scss'],
    encapsulation: ViewEncapsulation.None // Add this line if needed
})
export class LanguageSelectorComponent {
  languages = [
    { code: 'sr-hr-bs-cg', name: 'SHBC' },
    { code: 'si', name: 'Slovenščina' },
    { code: 'mk', name: 'Makedonski' },
    { code: 'en', name: 'English' }
  ];

  selectedLanguage = 'sr-hr-bs-cg';

  constructor(private translateService: TranslateService, private cd: ChangeDetectorRef) {}

  onLanguageChange(event: any) {
    this.translateService.setLanguage(event.value);
    this.cd.detectChanges(); // Додајте ово
  }
}