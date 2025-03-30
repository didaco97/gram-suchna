
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorState = ({ 
  message = "Something went wrong while fetching the data.", 
  onRetry 
}: ErrorStateProps) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg border border-red-200 p-6 text-center my-6">
      <div className="w-16 h-16 mx-auto mb-4 text-red-500">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Error Loading Data</h3>
      <p className="text-gray-600 mb-4">{message}</p>
      {onRetry && (
        <Button 
          onClick={onRetry}
          className="bg-ghibli-green hover:bg-ghibli-green-dark"
        >
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
