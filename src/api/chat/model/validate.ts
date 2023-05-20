import { z } from "zod";

export const validateChat = z.object({
    message: z.string().min(1),
    from: z.string().email(),
    to: z.string().email(),
});