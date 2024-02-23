import { supabase } from '../supabase/supabaseConfig';
import { OrderData } from '../types/Order.types';

export async function getAllOrdersByClient(clientPhoneNumber: string) {
  const { data: clientData, error } = await supabase
    .from('dm-project-1-clients')
    .select()
    .eq('phoneNumber', clientPhoneNumber)
    .single();

  if (error || !clientData) {
    console.error(error);
    throw new Error('Błąd podczas pobierania danych zamówienia');
  }

  const { data: orderData, error: orderError } = await supabase
    .from('dm-project-1-orders')
    .select()
    .eq('phoneNumber', clientData.phoneNumber);

  if (orderError || !orderData) {
    console.error(error);
    throw new Error('Błąd podczas pobierania danych klienta');
  }

  return orderData;
}

export async function getAllOrders() {
  const { data, error } = await supabase.from('dm-project-1-orders').select();

  if (error) {
    console.error(error);
    throw new Error('Błąd podczas ładowania danych...');
  }

  return data;
}

export async function getSingleOrder(orderId: number) {
  const { data: orderData, error } = await supabase
    .from('dm-project-1-orders')
    .select()
    .eq('id', orderId)
    .single();

  if (error || !orderData) {
    console.error(error);
    throw new Error('Błąd podczas pobierania danych zamówienia');
  }

  const { data: clientData, error: clientError } = await supabase
    .from('dm-project-1-clients')
    .select('id, name, surname, phoneNumber')
    .eq('phoneNumber', orderData.phoneNumber)
    .single();

  if (clientError || !clientData) {
    console.error(error);
    throw new Error('Błąd podczas pobierania danych klienta');
  }

  return { ...orderData, client: clientData };
}

export async function createOrder(newOrder: Omit<OrderData, 'id'>) {
  const { data, error } = await supabase
    .from('dm-project-1-orders')
    .insert(newOrder);
  if (error) {
    console.error(error);
    throw new Error('Błąd podczas dodawania danych...');
  }

  return data;
}

export async function deleteOrder(orderId: number) {
  const { error } = await supabase
    .from('dm-project-1-orders')
    .delete()
    .eq('id', orderId);

  if (error) {
    console.error(error);
    throw new Error('Błąd podczas usuwania...');
  }
}
