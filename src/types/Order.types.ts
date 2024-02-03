export interface ClientDataInOrder {
  userId: string;
  name: string;
  surname: string;
  phoneNumber: string;
}

export type OrderData = {
  client: ClientDataInOrder;
  quantity: number;
  orderTitle: string;
  orderContent: string;
  paid:boolean;
} & { id: string };
