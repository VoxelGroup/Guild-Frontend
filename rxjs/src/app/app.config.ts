import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import Lara from '@primeng/themes/lara';
import {provideHighlightOptions} from 'ngx-highlightjs';
import {provideHttpClient} from '@angular/common/http';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset:  Lara,
        options: {
          cssLayer: 'primeng',
          order: 'primeng, app-styles'
        }
      },
    }),
    provideHighlightOptions({
      fullLibraryLoader: () => import('highlight.js')
    })
  ]
};
