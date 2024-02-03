import { API_URL } from "../constants/appConst";
import { OrderData } from "../types/Order.types";
import { OrderFormValues } from "../validators/validators";

export async function getAllOrdersByClient(clientId: string): Promise<OrderData[]> {
  const res = await fetch(`${API_URL}/orders?client.userId=${clientId}`);
  if (!res.ok) {
    throw new Error('Błąd ładowania danych...');
  }
  const data = (await res.json()) as OrderData[];
  return data;
}

export async function getAllOrders(): Promise<OrderData[]> {
  const res = await fetch(`${API_URL}/orders`);
  if (!res.ok) {
    throw new Error("Błąd ładowania danych...");
  }
  const data = (await res.json()) as OrderData[];
  return data;
}

export async function getSingleOrder(orderId: string): Promise<OrderData> {
  const res = await fetch(`${API_URL}/orders/${orderId}`);
  if (!res.ok) {
    throw new Error("Błąd ładowania danych...");
  }
  const data = (await res.json()) as OrderData;
  return data;
}

export async function createOrder(newOrder: OrderFormValues): Promise<OrderData> {
  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(newOrder),
  });
  if (!res.ok) {
    throw new Error("Błąd podczas dodawania...");
  }
  const data = (await res.json()) as OrderData;
  return data;
}

export async function deleteOrder(orderId: string): Promise<void> {
  const res = await fetch(`${API_URL}/orders/${orderId}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Błąd podczas usuwania...");
  }
}
