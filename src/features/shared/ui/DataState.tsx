import { MESSAGES } from "@/features/shared/constants/messages";
import { memo } from "react";

interface Props {
  loading: boolean;
  empty?: boolean;
  colSpan?: number;
  children: React.ReactNode;
}

function DataState({ loading, empty, colSpan, children }: Props) {
  if (loading) {
    const msg = <span>{MESSAGES.loading}</span>;
    return colSpan ? (
      <tr><td colSpan={colSpan} className="p-8 text-center text-sm text-on-surface-variant">{msg}</td></tr>
    ) : (
      <div className="p-8 text-center text-sm text-on-surface-variant">{msg}</div>
    );
  }

  if (empty) {
    const msg = <span>{MESSAGES.empty}</span>;
    return colSpan ? (
      <tr><td colSpan={colSpan} className="p-8 text-center text-sm text-on-surface-variant">{msg}</td></tr>
    ) : (
      <div className="p-8 text-center text-sm text-on-surface-variant">{msg}</div>
    );
  }

  return <>{children}</>;
}

export default memo(DataState);
