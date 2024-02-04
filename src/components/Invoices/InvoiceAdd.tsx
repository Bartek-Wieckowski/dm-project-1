import { useFormik } from 'formik';
import useMultistepsForm from '../../hooks/useMultistepsForm';
import Button from '../Button';
import Step1Form from './Step1Form';
import Step2Form from './Step2Form';
import Step3Form from './Step3Form';
import StepperForm from './StepperForm';
import {
  InvoicesFormValues,
  invociesYupSchema,
} from '../../validators/validators';
import { OrderData } from '../../types/Order.types';
import { addInvoice } from '../../api/apiInvoices';
import { useNavigate } from 'react-router-dom';

const INITIAL_DATA: InvoicesFormValues = {
  selectedClient: {
    userId: '',
    name: '',
    surname: '',
    phoneNumber: '',
  },
  selectedOrders: [] as OrderData[],
  price: 0,
  dateOfIssue: '',
  accountingMonth: '',
};

export default function InvoiceAdd() {
  const navigate = useNavigate();
  const formik = useFormik<InvoicesFormValues>({
    initialValues: INITIAL_DATA,
    validationSchema: invociesYupSchema,
    onSubmit: async (values: InvoicesFormValues) => {
      await addInvoice(values);
      navigate('/invoices');
      //   alert(JSON.stringify(values, null, 2));
      //   console.log(JSON.stringify(values, null, 2));
    },
  });

  const {
    steps,
    currentStepIndex,
    step,
    isFirstStep,
    isLastStep,
    backStep,
    nextStep,
  } = useMultistepsForm([
    <Step1Form formik={formik} />,
    <Step2Form formik={formik} />,
    <Step3Form formik={formik} />,
  ]);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <StepperForm currentStepIndex={currentStepIndex} steps={steps} />
        <div className="mx-auto w-full max-w-2xl rounded-md p-3 shadow-lg">
          {step}

          <div className="mt-4 flex justify-end gap-2">
            {!isFirstStep && (
              <Button type="button" onClick={backStep} btnStyles="btnUpdate">
                Wstecz
              </Button>
            )}
            {!isLastStep && (
              <Button
                type="button"
                onClick={nextStep}
                btnStyles="btnAdd"
                disabled={
                  formik.values.selectedClient?.phoneNumber === undefined
                }
              >
                Dalej
              </Button>
            )}
            {isLastStep && (
              <Button type="submit" btnStyles="btnAdd">
                Zapisz
              </Button>
            )}
          </div>
        </div>
      </form>
    </>
  );
}
