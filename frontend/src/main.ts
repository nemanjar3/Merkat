import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { RouterModule, provideRouter } from '@angular/router'; // Додајте ову линију
import { importProvidersFrom } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'; // Измењено
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { createTranslateLoader } from './app/translate-http-loader';
import { HttpClient } from '@angular/common/http';
import { MatSelectModule, MatFormField, MatLabel, MatError } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app/app.routes';
import { ToastrModule } from 'ngx-toastr';






bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(
      MatButtonModule,
      MatSelectModule,
      BrowserAnimationsModule, // Required for animations
      ToastrModule.forRoot({ // Configure Toastr globally
        timeOut: 3000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
      }),
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
        }
      })
    )
  ]
}).catch(err => console.error(err));
