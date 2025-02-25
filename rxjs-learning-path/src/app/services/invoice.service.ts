import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Invoice} from '../models/invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private httpClient = inject(HttpClient);
  getInvoices(): Observable<Invoice[]> {
    return this.httpClient.get<Invoice[]>('fakeData/invoices.json')
  }

  getInvoice(): Observable<Invoice> {
    return this.httpClient.get<Invoice>('fakeData/invoice.json')
  }
}
