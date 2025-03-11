import {Component, inject, OnInit} from '@angular/core';
import {Highlight} from 'ngx-highlightjs';
import {InvoiceService} from '../../../services/invoice.service';
import {Invoice} from '../../../models/invoice';
import {UserService} from '../../../services/user.service';
import {UserData} from "../../../models/user";

@Component({
  selector: 'app-switch-map',
  imports: [Highlight],
  templateUrl: './switch-map.component.html',
  styleUrl: './switch-map.component.css'
})
export class SwitchMapComponent implements OnInit {
  private userService = inject(UserService);
  private invoiceService = inject(InvoiceService);

  invoices: Invoice[] = [];
  user!: UserData;

  code: string = `
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

  ngOnInit(): void {
    //Solo en caso de que el usuario sea un administrador podrá listar las facturas.
    // En caso de serlo llamar al servicio de invoice para traer el listado y calcular el total amount de cada factura sumando el amount y tax
    // Todo: refactorizar este código usando los operadores necesarios:

    this.userService.getUser()
      .subscribe({
        next: user => {
          this.user = user;
          if (user.role === 'Admin') {
            this.invoiceService.getAdminInvoices(user.id)
              .subscribe({
                next: (invoices: Invoice[]) => this.invoices = this.mapInvoices(invoices)
              })
          }
        }
      })
  }

  private mapInvoices(invoices: Invoice[]): Invoice[] {
    return invoices.map(invoice => ({
      ...invoice,
      totalAmount: invoice.amount + invoice.tax,
    }));
  }
}
