import {ComponentFixture, fakeAsync, flush, TestBed} from '@angular/core/testing';

import {MapComponent} from './map.component';
import {MockProvider} from 'ng-mocks';
import {InvoiceService} from '../../../services/invoice.service';
import {of} from 'rxjs';
import {Highlight, provideHighlightOptions} from 'ngx-highlightjs';
import {Invoice} from '../../../models/invoice';

const invoices: Invoice[] = [
  {
    "tid": "550e8400-e29b-41d4-a716-446655440000",
    "reference": "INV-001",
    "currency": "USD",
    "invoiceType": "Credit",
    "amount": 1000.00,
    "tax": 100.00
  },
  {
    "tid": "550e8400-e29b-41d4-a716-446655440001",
    "reference": "INV-002",
    "currency": "EUR",
    "invoiceType": "Debit",
    "amount": 2000.00,
    "tax": 200.00
  }
];

const expectedInvoices: Invoice[] = [
  {
    tid: '550e8400-e29b-41d4-a716-446655440000',
    reference: 'INV-001',
    currency: 'USD',
    invoiceType: 'Credit',
    amount: 1000,
    tax: 100,
    totalAmount: 1100
  },
  {
    tid: '550e8400-e29b-41d4-a716-446655440001',
    reference: 'INV-002',
    currency: 'EUR',
    invoiceType: 'Debit',
    amount: 2000,
    tax: 200,
    totalAmount: 2200
  }
];

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let invoiceService: InvoiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapComponent, Highlight],
      providers: [
        MockProvider(InvoiceService),
        provideHighlightOptions({
          fullLibraryLoader: () => import('highlight.js')
        })
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    invoiceService = TestBed.inject(InvoiceService);
    spyOn(invoiceService, 'getInvoices').and.returnValue(of(invoices));
    fixture.detectChanges();
  });

  it('should map the invoices', fakeAsync(() => {
    component.ngOnInit();
    flush();
    expect(component.invoices).toEqual(expectedInvoices);
  }));
});
