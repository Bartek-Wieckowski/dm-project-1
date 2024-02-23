import { FormikProps } from 'formik';
import { Tables } from '../../types/supabase';
import { ClientDataInOrder, OrderData } from './Order.types';

type InvoiceFormikProps = FormikProps<Omit<InvoiceData, 'id'>>;

export type InvoiceData = Tables<'dm-project-1-invoice'>;

export type selectedClientInInvoiceType = ClientDataInOrder;

export type selectedOrderInInvoiceType = OrderData & { orderId?: number };

export type step1FormProps = {
  formik: InvoiceFormikProps;
  selectedClient: selectedClientInInvoiceType;
  chosenClient: (values: selectedClientInInvoiceType) => void;
};
export type step2FormProps = {
  formik: InvoiceFormikProps;
  selectedClient: selectedClientInInvoiceType;
  chosenOrder: (values: selectedOrderInInvoiceType) => void;
  selectedOrder: selectedOrderInInvoiceType;
};
export type step3FormProps = {
  formik: InvoiceFormikProps;
  selectedClient: selectedClientInInvoiceType;
  selectedOrder: selectedOrderInInvoiceType;
};
