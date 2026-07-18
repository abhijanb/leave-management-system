import { AlertTriangle } from "lucide-react";
import { memo } from "react";

interface Props {
  message?: string;
}

function ErrorMessage({ message = "Something went wrong. Please try again." }: Props) {
  return (
    <div className="flex items-center gap-3 p-4 bg-error-bg border border-error-border rounded-xl text-error-text text-sm">
      <AlertTriangle className="w-5 h-5 shrink-0" />
      <span>{message}</span>
    </div>
  );
}

export default memo(ErrorMessage);