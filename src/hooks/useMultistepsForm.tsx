import { useState } from 'react';

function useMultistepsForm(steps: React.ReactNode[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function nextStep() {
    setCurrentStepIndex((index) => {
      if (index >= steps.length - 1) {
        return index;
      }
      return index + 1;
    });
  }
  function backStep() {
    setCurrentStepIndex((index) => {
      if (index <= 0) {
        return index;
      }
      return index - 1;
    });
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    nextStep,
    backStep,
  };
}

export default useMultistepsForm;
