import {Component, inject, OnInit} from '@angular/core';
import {Highlight} from 'ngx-highlightjs';
import {InvoiceService} from '../../../services/invoice.service';
import {Invoice} from '../../../models/invoice';

@Component({
  selector: 'app-map',
  imports: [Highlight],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {
  private invoiceService = inject(InvoiceService);
  invoices: Invoice[] = [];

  code: string = `
    import { of } from 'rxjs';
    import { map } from 'rxjs/operators';

    const numbers$ = of(1, 2, 3, 4, 5);
    numbers$
        .pipe(map(num => num * num))
        .subscribe({
          next: data => console.log(data),// Output: 1, 4, 9, 16, 25
        });
    `;

  ngOnInit(): void {
    // Debemos calcular el total amount de cada factura sumando el amount y tax
    // Todo: refactorizar este código usando el operador Map:
    this.invoiceService.getInvoices().subscribe({
      next: (invoices: Invoice[]) => {
        this.invoices = invoices.map(invoice => ({
          ...invoice,
          totalAmount: invoice.amount + invoice.tax,
        }))
      }
    });
  }
}
