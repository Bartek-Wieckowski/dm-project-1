export interface ClientDataInOrder {
  userId: string;
  name: string;
  surname: string;
  phoneNumber: string;
}

export interface OrderData {
  id: string;
  client: ClientDataInOrder;
  quantity: number;
  orderTitle: string;
  orderContent: string;
}
