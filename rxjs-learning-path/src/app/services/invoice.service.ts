import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {delay, Observable} from 'rxjs';
import {Invoice} from '../models/invoice';
import {SelectOption} from '../models/selectOption';

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

  getAdminInvoices(userId: string): Observable<Invoice[]> {
    let params = new HttpParams().set('userId', userId);
    return this.httpClient.get<Invoice[]>('fakeData/invoices.json', { params })
  }

  getCurrencies(): Observable<SelectOption[]> {
    const randomDelay = this.getRandomNumber(1000);
    return this.httpClient.get<SelectOption[]>('fakeData/currency.json')
      .pipe(delay(randomDelay));
  }

  getCountries(): Observable<SelectOption[]> {
    const randomDelay = this.getRandomNumber(1000);
    return this.httpClient.get<SelectOption[]>('fakeData/countries.json')
      .pipe(delay(randomDelay));
  }


  private getRandomNumber(maxValue: number): number {
    return Math.floor(Math.random() * maxValue);
  }
}
