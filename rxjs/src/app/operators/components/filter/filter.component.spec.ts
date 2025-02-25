import {ComponentFixture, fakeAsync, flush, TestBed} from '@angular/core/testing';

import {FilterComponent} from './filter.component';
import {provideHighlightOptions} from 'ngx-highlightjs';
import {MockProvider} from 'ng-mocks';
import {InvoiceService} from '../../../services/invoice.service';
import {EMPTY, of} from 'rxjs';
import {Invoice} from '../../../models/invoice';

const creditInvoice: Invoice = {
  "tid": "550e8400-e29b-41d4-a716-446655440000",
  "reference": "INV-001",
  "currency": "USD",
  "invoiceType": "Credit",
  "amount": 1000.00,
  "tax": 100.00
};

const debitInvoice: Invoice = {
  "tid": "550e8400-e29b-41d4-a716-446655440001",
  "reference": "INV-002",
  "currency": "EUR",
  "invoiceType": "Debit",
  "amount": 2000.00,
  "tax": 200.00
};

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let invoiceService: InvoiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterComponent],
      providers: [
        MockProvider(InvoiceService, {getInvoice: () => EMPTY}),
        provideHighlightOptions({
          fullLibraryLoader: () => import('highlight.js')
        })]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    invoiceService = TestBed.inject(InvoiceService);
    fixture.detectChanges();
  });

  it('should map the credit invoice to the expected one', fakeAsync(() => {
    const expectedInvoice: Invoice = {
      ...creditInvoice,
      totalAmount: creditInvoice.amount + creditInvoice.tax,
    }
    spyOn(invoiceService, 'getInvoice').and.returnValue(of(expectedInvoice));
    component.ngOnInit();
    flush();

    expect(component.invoice).toEqual(expectedInvoice);
  }));

  it('should doesnt map the debit invoice to the expected one', fakeAsync(() => {
   spyOn(invoiceService, 'getInvoice').and.returnValue(of(debitInvoice));

    component.ngOnInit();
    flush();

    expect(component.invoice).toBeUndefined();
  }));
});
