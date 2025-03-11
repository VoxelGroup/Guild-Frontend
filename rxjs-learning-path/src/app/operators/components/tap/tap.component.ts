import {Component, inject, OnInit} from '@angular/core';
import {Highlight} from 'ngx-highlightjs';
import {UserService} from '../../../services/user.service';
import {UserData} from '../../../models/user';

@Component({
  selector: 'app-tap',
  imports: [
    Highlight
  ],
  templateUrl: './tap.component.html',
  styleUrl: './tap.component.css'
})
export class TapComponent implements OnInit {
  private userService = inject(UserService)
  user!: UserData;

  code: string = `
    import { of } from 'rxjs';
    import { tap } from 'rxjs/operators';

    const numbers$ = of(1, 2, 3, 4, 5);
    numbers$
        .pipe(tap(num => console.log(num))) // Output 1, 2, 3, 4, 5
        .subscribe();
    `;


  ngOnInit(): void {
    // Todo: refactorizar este código usando los operadores necesarios:
    this.userService.getUser()
      .subscribe({
        next: user => {
          this.user = user;
          console.log(user);
        },
      })
  }
}
