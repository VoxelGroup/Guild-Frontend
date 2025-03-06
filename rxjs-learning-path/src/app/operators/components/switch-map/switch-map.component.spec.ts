import {ComponentFixture, fakeAsync, flush, TestBed} from '@angular/core/testing';

import { SwitchMapComponent } from './switch-map.component';
import {MockProvider} from 'ng-mocks';
import {InvoiceService} from '../../../services/invoice.service';
import {UserService} from '../../../services/user.service';
import {provideHighlightOptions} from 'ngx-highlightjs';
import {EMPTY, of} from 'rxjs';
import {UserData} from '../../../models/user';
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

describe('SwitchMapComponent', () => {
  let component: SwitchMapComponent;
  let fixture: ComponentFixture<SwitchMapComponent>;
  let userService: UserService;
  let invoiceService: InvoiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchMapComponent],
      providers: [
        MockProvider(UserService, {getUser: () => EMPTY }),
        MockProvider(InvoiceService),
        provideHighlightOptions({
          fullLibraryLoader: () => import('highlight.js')
        })
      ]
    })
    .compileComponents();

    userService = TestBed.inject(UserService);
    invoiceService = TestBed.inject(InvoiceService);

    fixture = TestBed.createComponent(SwitchMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call to invoiceService when user is not an Admin', fakeAsync(() => {
    const user: UserData = {
      id: "E1FA1D68-8783-460C-ABC0-A11BA71CD36C",
      name: "John Doe",
      role:  "User"
    }
    spyOn(userService, 'getUser').and.returnValue(of(user));
    spyOn(invoiceService, 'getAdminInvoices');
    component.ngOnInit();
    flush();

    expect(userService.getUser).toHaveBeenCalled();
    expect(invoiceService.getAdminInvoices).not.toHaveBeenCalled();
    expect(component.invoices).toEqual([]);
  }));

  it('should call to invoiceService when user is an Admin', fakeAsync(() => {
    const user: UserData = {
      id: "E1FA1D68-8783-460C-ABC0-A11BA71CD36C",
      name: "John Doe",
      role:  "Admin"
    }
    spyOn(userService, 'getUser').and.returnValue(of(user));
    spyOn(invoiceService, 'getAdminInvoices').and.returnValue(of(invoices));
    component.ngOnInit();
    flush();

    expect(userService.getUser).toHaveBeenCalled();
    expect(invoiceService.getAdminInvoices).toHaveBeenCalledWith(user.id);
    expect(component.invoices).toEqual(expectedInvoices);
  }));
});
