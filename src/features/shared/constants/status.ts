import type { LeaveStatus } from "../types";

export const statusStyles: Record<LeaveStatus, string> = {
  Pending: "bg-pending-bg text-pending-text",
  Approved: "bg-approved-bg text-approved-text",
  Rejected: "bg-rejected-bg text-rejected-text",
};
