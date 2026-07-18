import type { LeaveStatus, StatusFilterValue, TypeFilterValue } from "../types";

export const STATUS_LABELS: Record<LeaveStatus, LeaveStatus> = {
  Pending: "Pending",
  Approved: "Approved",
  Rejected: "Rejected",
};

export const STATUS_OPTIONS: StatusFilterValue[] = ["All", "Pending", "Approved", "Rejected"];

export const TYPE_OPTIONS: TypeFilterValue[] = ["All", "Paid Leave", "Sick Leave", "Casual Leave", "Unpaid Leave"];

export const MESSAGES = {
  loading: "Loading...",
  empty: "No leave requests yet.",
  errorStats: "Failed to load stats.",
  errorLeaves: "Failed to load leave requests.",
  errorActivity: "Failed to load recent activity.",
  errorEmployees: "Failed to load employees.",
} as const;
