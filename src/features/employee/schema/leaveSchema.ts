import { z } from "zod";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const leaveSchema = z
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
  });

export type LeaveForm = z.infer<typeof leaveSchema>;
