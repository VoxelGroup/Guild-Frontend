import {ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed, tick} from '@angular/core/testing';

import { ForkJoinComponent } from './fork-join.component';
import {MockProvider} from 'ng-mocks';
import {InvoiceService} from '../../../services/invoice.service';
import {provideHighlightOptions} from 'ngx-highlightjs';
import {SelectOption} from '../../../models/selectOption';
import {delay, EMPTY, of} from 'rxjs';

const countries: SelectOption[] = [
  { "label": "United States", "value": "US" },
  { "label": "Canada", "value": "CA" },
  { "label": "Mexico", "value": "MX" },
  { "label": "Brazil", "value": "BR" },
  { "label": "Argentina", "value": "AR" },
];

const currencies: SelectOption[] = [
  { "value": "USD", "label": "United States Dollar" },
  { "value": "EUR", "label": "Euro" },
  { "value": "JPY", "label": "Japanese Yen" },
  { "value": "GBP", "label": "British Pound" },
];

describe('ForkJoinComponent', () => {
  let component: ForkJoinComponent;
  let fixture: ComponentFixture<ForkJoinComponent>;
  let invoiceService: InvoiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForkJoinComponent],
      providers: [
        MockProvider(InvoiceService, {getCurrencies: () => EMPTY, getCountries: () => EMPTY}),
        provideHighlightOptions({
          fullLibraryLoader: () => import('highlight.js')
        })
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForkJoinComponent);
    component = fixture.componentInstance;
    invoiceService = TestBed.inject(InvoiceService);
    fixture.detectChanges();
  });

  it('should init the form', fakeAsync(() => {
    spyOn(invoiceService, 'getCurrencies').and.returnValue(of(currencies).pipe(delay(50)));
    spyOn(invoiceService, 'getCountries').and.returnValue(of(countries).pipe(delay(100)));

    component.ngOnInit();
    tick(150);

    expect(component.invoiceFormCreator).toBeDefined();
    expect(component.invoiceFormCreator.get('currency')?.value).toEqual(currencies);
    expect(component.invoiceFormCreator.get('country')?.value).toEqual(countries);
  }));
});
