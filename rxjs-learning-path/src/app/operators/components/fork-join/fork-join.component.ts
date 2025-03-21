import {Component, inject, OnInit} from '@angular/core';
import {Highlight} from 'ngx-highlightjs';
import {InvoiceService} from '../../../services/invoice.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SelectOption} from '../../../models/selectOption';

@Component({
  selector: 'app-fork-join',
  imports: [
    Highlight
  ],
  templateUrl: './fork-join.component.html',
  styleUrl: './fork-join.component.css'
})
export class ForkJoinComponent implements OnInit {
  private invoiceService = inject(InvoiceService);
  private formBuilder = inject(FormBuilder);
  private currencyOptions: SelectOption[] = [];
  private countryOptions: SelectOption[] = [];

  invoiceFormCreator!: FormGroup;

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

  // Debemos iniciar el formulario de creación de facturas una vez recuperados los datos de países y monedas
  // Todo: refactorizar este código
  ngOnInit(): void {
    this.invoiceService.getCurrencies()
      .subscribe({
        next: (data: SelectOption[]) => {
          this.currencyOptions = data;
          if (this.countryOptions.length > 0) {
            this.initForm();
          }
        },
      });

    this.invoiceService.getCountries().subscribe({
      next: (data: SelectOption[]) => {
        this.countryOptions = data;
        if (this.currencyOptions.length > 0) {
          this.initForm();
        }
      }
    });
  }

 private initForm(): void {
    this.invoiceFormCreator = this.formBuilder.group({
      country: this.formBuilder.control(this.countryOptions),
      currency: this.formBuilder.control(this.currencyOptions),
    });
  }
}
