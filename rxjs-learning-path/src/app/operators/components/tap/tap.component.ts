import {Component, OnInit} from '@angular/core';
import {Highlight} from 'ngx-highlightjs';

@Component({
  selector: 'app-tap',
  imports: [
    Highlight
  ],
  templateUrl: './tap.component.html',
  styleUrl: './tap.component.css'
})
export class TapComponent implements OnInit {
  code: string = `
    import { of } from 'rxjs';
    import { tap } from 'rxjs/operators';

    const numbers$ = of(1, 2, 3, 4, 5);
    numbers$
        .pipe(tap(num => console.log(num))) // Output 1, 2, 3, 4, 5
        .subscribe();
    `;


  ngOnInit(): void {

  }
}
