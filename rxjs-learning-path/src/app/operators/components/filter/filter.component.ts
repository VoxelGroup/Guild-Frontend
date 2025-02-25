import {Component, inject, OnInit} from '@angular/core';
import {Highlight} from 'ngx-highlightjs';
import {InvoiceService} from '../../../services/invoice.service';
import {Invoice} from '../../../models/invoice';
import {filter, map} from 'rxjs';

@Component({
  selector: 'app-filter',
  imports: [Highlight],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent implements OnInit {
  private invoiceService = inject(InvoiceService);
  invoice: Invoice | undefined;

  code: string = `
    import { of } from 'rxjs';
    import { filter } from 'rxjs/operators';

    const numbers$ = of(1, 2, 3, 4, 5);
    numbers$
        .pipe(filter(num => num % 2 === 0))
        .subscribe({
          next: data => console.log(data), // Output: 2, 4
        });
    `;

  ngOnInit(): void {
    // Solo calcularemos el totalAmount de una factura si es de tipo Credit
    // Todo: refactorizar este código usando el operador Filter:
    this.invoiceService
      .getInvoice()
      .pipe(
        filter(invoice => invoice.invoiceType === 'Credit'),
        map(invoice => ({...invoice, totalAmount: invoice.amount + invoice.tax}))
      ).subscribe({
        next: invoice => this.invoice = invoice,
    })
  }
}
