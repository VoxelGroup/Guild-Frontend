import { Component } from '@angular/core';
import {Highlight} from 'ngx-highlightjs';

@Component({
  selector: 'app-fork-join',
  imports: [
    Highlight
  ],
  templateUrl: './fork-join.component.html',
  styleUrl: './fork-join.component.css'
})
export class ForkJoinComponent {
  code: string = `
    import { ajax } from 'rxjs/ajax';
    import { forkJoin } from 'rxjs';

    /*
      when all observables complete, provide the last
      emitted value from each as dictionary
    */
    forkJoin(
      // as of RxJS 6.5+ we can use a dictionary of sources
      {
        google: ajax.getJSON('https://api.github.com/users/google'),
        microsoft: ajax.getJSON('https://api.github.com/users/microsoft'),
        users: ajax.getJSON('https://api.github.com/users')
      }
    )
      .subscribe(console.log); // { google: object, microsoft: object, users: array }
    `;
}
