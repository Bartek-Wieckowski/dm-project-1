import { API_URL } from '../constants/appConst';
import { InvoiceData } from '../types/Invoice.types';
import { InvoicesFormValues } from '../validators/validators';

export async function getAllInvoices(): Promise<InvoiceData[]> {
  const res = await fetch(`${API_URL}/invoices`);
  if (!res.ok) {
    throw new Error('Błąd ładowania danych...');
  }
  const data = (await res.json()) as InvoiceData[];
  return data;
}

export async function addInvoice(
  newInvoice: InvoicesFormValues
): Promise<InvoiceData> {
  const res = await fetch(`${API_URL}/invoices`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(newInvoice),
  });
  if (!res.ok) {
    throw new Error('Błąd podczas dodawania...');
  }
  const data = (await res.json()) as InvoiceData;
  return data;
}
