import Button from './Button';

type ErrorFallbackProps = {
  resetErrorBoundary: () => void;
};
export default function ErrorFallback({
  resetErrorBoundary,
}: ErrorFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h2 className="text-5xl text-rose-500">Coś poszło nie tak...</h2>
      <Button type="button" onClick={resetErrorBoundary} btnStyles="btnAdd">
        Spróbuj ponowanie
      </Button>
    </div>
  );
}
