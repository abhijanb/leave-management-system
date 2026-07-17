export type UserRole = "manager" | "employee";

export type LeaveStatus = "Pending" | "Approved" | "Rejected";

export type LeaveType = "Paid Leave" | "Sick Leave" | "Casual Leave" | "Unpaid Leave";

export type SortBy = "startDate" | "createdAt";

export type StatusFilterValue = LeaveStatus | "All";

export type TypeFilterValue = LeaveType | "All";

export type SortOrder = "asc" | "desc";
