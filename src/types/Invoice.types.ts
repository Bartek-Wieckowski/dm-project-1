import { FormikProps } from 'formik';
import { InvoicesFormValues } from '../validators/validators';

export type InvoiceData = InvoicesFormValues & { id: string };


export type InvoiceFormikProps = {
  formik: FormikProps<InvoicesFormValues>;
};
