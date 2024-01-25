import { ClientProps } from "../types/ClientProps.type";
import { OrderData } from "../types/Order.types";

export async function getAllClientOrders(): Promise<ClientProps[]> {
  const res = await fetch("http://localhost:8000/clients");
  if (!res.ok) {
    throw new Error("Błąd ładowania danych...");
  }
  const data = (await res.json()) as ClientProps[];
  return data;
}

export async function getAllOrders(): Promise<OrderData[]> {
  const res = await fetch("http://localhost:8000/orders");
  if (!res.ok) {
    throw new Error("Błąd ładowania danych...");
  }
  const data = (await res.json()) as OrderData[];
  return data;
}

export async function getSingleOrder(orderId: string): Promise<OrderData> {
  const res = await fetch(`http://localhost:8000/orders/${orderId}`);
  if (!res.ok) {
    throw new Error("Błąd ładowania danych...");
  }

  const data = (await res.json()) as OrderData;

  return data;
}

export async function createOrder(newOrder: OrderData): Promise<OrderData> {
  const res = await fetch("http://localhost:8000/orders", {
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
