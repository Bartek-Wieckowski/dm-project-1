import { OrderType } from "../../components/Orders/Orders";

export const ordersData: OrderType[] = [
  {
    id: 1,
    client: {
      userId: 1,
      name: "Zbigniew",
      surname: "Herbert",
      phoneNumber: "+48 123 456 789",
    },
    quantity: 5,
    orderTitle: "Example Order 1",
    orderContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    client: {
      userId: 2,
      name: "Henryk",
      surname: "Sienkiewicz",
      phoneNumber: "+48 123 456 788",
    },
    quantity: 10,
    orderTitle: "Example Order 2",
    orderContent:
      "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
  },
];
