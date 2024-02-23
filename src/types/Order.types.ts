// export interface ClientDataInOrder {
//   userId: string;
//   name: string;
//   surname: string;
//   phoneNumber: string;
// }

// export type OrderData = {
//   client: ClientDataInOrder;
//   quantity: number;
//   orderTitle: string;
//   orderContent: string;
//   paid:boolean;
// } & { id: string };

import { Tables } from '../../types/supabase';
import { ClientProps } from './ClientProps.type';

export type OrderDataFromSupabase = Tables<'dm-project-1-orders'>;

export type ClientDataInOrder = Pick<
  ClientProps,
  'id' | 'name' | 'surname' | 'phoneNumber'
>;
export type OrderData = OrderDataFromSupabase;
export type OrderDataByClient = OrderDataFromSupabase & { client: ClientDataInOrder };


export type OrderDataWithFlexibleClientId = OrderDataFromSupabase & { 
  client: {
    id: number | string;
    name: string;
    surname: string;
    phoneNumber: string;
  };
};