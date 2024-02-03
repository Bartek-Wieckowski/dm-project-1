type StepperFormProps = {
  steps: React.ReactNode[];
  currentStepIndex: number;
};

export default function StepperForm({
  currentStepIndex,
  steps,
}: StepperFormProps) {
  const isStepActive = (stepIndex: number) => stepIndex <= currentStepIndex;

  return (
    <ol className="mx-auto mb-4 flex max-w-[500px] items-center justify-center sm:mb-5">
      {steps.map((_, index) => (
        <li
          key={index}
          className={`flex w-full items-center after:inline-block after:h-1 after:w-full after:border-4 after:border-b after:content-['']  dark:text-blue-600 ${
            isStepActive(index + 1)
              ? 'dark:text-blue-500 dark:after:border-blue-800'
              : 'after:border-blue-100'
          } ${index + 1 < 3 ? 'after:inline-block' : 'after:hidden'}`}
        >
          <div
            className={`flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-800 lg:size-12`}
          >
            <span
              className={`size-4 text-center text-blue-600 dark:text-blue-300 lg:size-6`}
            >
              {index + 1}
            </span>
          </div>
        </li>
      ))}
    </ol>
  );
}
