import { CardProps } from '../types/CardProps.type';

export async function getAllClients(): Promise<CardProps[]> {
  const res = await fetch(`http://localhost:8000/clients`);

  if (!res.ok) {
    throw new Error('Błąd ładowania danych...');
  }

  const data = (await res.json()) as CardProps[];

  return data;
}

export async function getSingleClient(clientId: string): Promise<CardProps> {
  const res = await fetch(`http://localhost:8000/clients/${clientId}`);
  if (!res.ok) {
    throw new Error('Błąd ładowania danych...');
  }

  const data = (await res.json()) as CardProps;

  return data;
}

export async function addClient(newClient: CardProps): Promise<CardProps> {
  const res = await fetch(`http://localhost:8000/clients`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(newClient),
  });
  if (!res.ok) {
    throw new Error('Błąd podczas dodawania...');
  }

  const data = (await res.json()) as CardProps;

  return data;
}

export async function updateClientById(
  updateClientData: CardProps,
  clientId: string
): Promise<CardProps> {
  const res = await fetch(`http://localhost:8000/clients/${clientId}`, {
    method: 'PUT',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(updateClientData),
  });
  if (!res.ok) {
    throw new Error('Błąd podczas aktualizacji...');
  }
  const data = (await res.json()) as CardProps;
  return data;
}

export async function deleteClient(clientId: string): Promise<void> {
  const res = await fetch(`http://localhost:8000/clients/${clientId}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Błąd podczas usuwania...');
  }
}
