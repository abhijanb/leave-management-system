import { z } from "zod";

export const schema = z.object({
  email: z.email("Please enter a valid work email"),
  password: z.string().min(1, "Password is required"),
  remember: z.boolean().optional(),
});

export type LoginForm = z.infer<typeof schema>;
