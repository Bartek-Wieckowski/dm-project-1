import { ClientFormValues } from '../validators/validators';
import { ClientProps } from '../types/ClientProps.type';
import { API_URL } from '../constants/appConst';

export async function getAllClients(): Promise<ClientProps[]> {
  const res = await fetch(`${API_URL}/clients`);
  if (!res.ok) {
    throw new Error('Błąd ładowania danych...');
  }
  const data = (await res.json()) as ClientProps[];
  return data;
}

export async function getSingleClient(clientId: string): Promise<ClientProps> {
  const res = await fetch(`${API_URL}/clients/${clientId}`);
  if (!res.ok) {
    throw new Error('Błąd ładowania danych...');
  }
  const data = (await res.json()) as ClientProps;
  return data;
}

export async function addClient(
  newClient: ClientFormValues
): Promise<ClientProps> {
  const res = await fetch(`${API_URL}/clients`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(newClient),
  });
  if (!res.ok) {
    throw new Error('Błąd podczas dodawania...');
  }
  const data = (await res.json()) as ClientProps;
  return data;
}

export async function updateClientById(
  updateClientData: ClientFormValues,
  clientId: ClientProps['id']
): Promise<ClientProps> {
  const res = await fetch(`${API_URL}/clients/${clientId}`, {
    method: 'PATCH',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(updateClientData),
  });
  if (!res.ok) {
    throw new Error('Błąd podczas aktualizacji...');
  }
  const data = (await res.json()) as ClientProps;
  return data;
}

export async function deleteClient(clientId: string): Promise<void> {
  const res = await fetch(`${API_URL}/clients/${clientId}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Błąd podczas usuwania...');
  }
}
