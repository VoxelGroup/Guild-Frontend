import {Component} from '@angular/core';
import {Highlight} from 'ngx-highlightjs';

@Component({
  selector: 'app-switch-map',
  imports: [Highlight],
  templateUrl: './switch-map.component.html',
  styleUrl: './switch-map.component.css'
})
export class SwitchMapComponent {
  code: string =  `
  import {Observable, of, switchMap} from 'rxjs';

  const numbers$ = of(1, 2, 3);
  function multiply$(value: number): Observable<number> {
    return of(value*2);
  }

  numbers$
    .pipe(switchMap(value => multiply$(value)))
    .subscribe({
      next: value => console.log(value), // Output: 2, 4, 6
    });
  `;
}
