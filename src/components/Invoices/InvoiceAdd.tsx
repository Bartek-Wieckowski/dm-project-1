import { useFormik } from 'formik';
import useMultistepsForm from '../../hooks/useMultistepsForm';
import Button from '../Button';
import Step1Form from './Step1Form';
import Step2Form from './Step2Form';
import Step3Form from './Step3Form';
import StepperForm from './StepperForm';
import { invociesYupSchema } from '../../validators/validators';
import { useNavigate } from 'react-router-dom';
import { useInvoiceAdd } from '../../api/mutations/invoices/useInvoiceAdd';
import {
  InvoiceData,
  selectedClientInInvoiceType,
  selectedOrderInInvoiceType,
} from '../../types/Invoice.types';
import { useState } from 'react';

export default function InvoiceAdd() {
  const navigate = useNavigate();
  const { addInvoice } = useInvoiceAdd();
  const formik = useFormik<Omit<InvoiceData, 'id'>>({
    initialValues: {
      invoiceCost: 0,
      orderId: 0,
      startDate: '',
      endDate: '',
      phoneNumber: '',
    },
    onSubmit: (values: Omit<InvoiceData, 'id'>) => {
      addInvoice(values);
      navigate('/invoices');
    },
    validationSchema: invociesYupSchema,
  });
  const [selectedClient, setSelectedClient] =
    useState<selectedClientInInvoiceType | null>(null);

  const [selectedOrder, setSelectedOrder] =
    useState<selectedOrderInInvoiceType | null>(null);

  function chosenClient(values: selectedClientInInvoiceType) {
    setSelectedClient((prevData) => ({
      ...prevData,
      ...values,
    }));
  }
  function chosenOrder(values: selectedOrderInInvoiceType) {
    setSelectedOrder((prevData) => ({
      ...prevData,
      ...values,
    }));
  }

  console.log();

  const {
    steps,
    currentStepIndex,
    step,
    isFirstStep,
    isLastStep,
    backStep,
    nextStep,
  } = useMultistepsForm([
    <Step1Form
      formik={formik}
      chosenClient={chosenClient}
      selectedClient={selectedClient!}
    />,
    <Step2Form
      formik={formik}
      selectedClient={selectedClient!}
      chosenOrder={chosenOrder}
      selectedOrder={selectedOrder!}
    />,
    <Step3Form
      formik={formik}
      selectedClient={selectedClient!}
      selectedOrder={selectedOrder!}
    />,
  ]);

  let disabled = false;

  if (currentStepIndex === 0) {
    disabled = !formik.dirty || !formik.values.phoneNumber;
  }

  if (currentStepIndex === 1) {
    disabled = !selectedOrder;
  }

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
                disabled={disabled}
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
