import { supabase } from '../supabase/supabaseConfig';
import { InvoiceData } from '../types/Invoice.types';

export async function getAllInvoices() {
  const { data, error } = await supabase.from('dm-project-1-invoice').select();

  if (error) {
    console.error(error);
    throw new Error('Błąd podczas ładowania danych...');
  }

  return data;
}

export async function addInvoice(newInvoice: Omit<InvoiceData, 'id'>) {
  const { data, error } = await supabase
    .from('dm-project-1-invoice')
    .insert(newInvoice);
  if (error) {
    console.error(error);
    throw new Error('Błąd podczas dodawania danych...');
  }

  return data;
}

export async function deleteInvoice(invoiceId: number): Promise<void> {
  const { error } = await supabase
    .from('dm-project-1-invoice')
    .delete()
    .eq('id', invoiceId);

  if (error) {
    console.error(error);
    throw new Error('Błąd podczas usuwania...');
  }
}
