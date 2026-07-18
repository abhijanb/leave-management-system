import { z } from "zod";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const editLeaveSchema = z
  .object({
    type: z.enum(["Paid Leave", "Sick Leave", "Casual Leave", "Unpaid Leave"], {
      error: "Please select a leave type",
    }),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    reason: z.string().min(1, "Reason is required").max(500, "Reason must be under 500 characters"),
  })
  .refine((data) => new Date(data.startDate) > today, {
    message: "Start date must be after today",
    path: ["startDate"],
  })
  .refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
    message: "End date must be on or after start date",
    path: ["endDate"],
  })
  .refine((data) => {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    const diffDays = Math.round((end.getTime() - start.getTime()) / 86400000) + 1;
    return diffDays <= 30;
  }, {
    message: "Leave request cannot exceed 30 days",
    path: ["endDate"],
  });

export type EditLeaveForm = z.infer<typeof editLeaveSchema>;
