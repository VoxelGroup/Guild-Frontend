export interface Invoice {
  tid: string;
  reference: string;
  currency: string;
  invoiceType: InvoiceType;
  amount: number;
  tax: number;
  totalAmount?: number;
}

type InvoiceType = 'Credit' | 'Debit';
