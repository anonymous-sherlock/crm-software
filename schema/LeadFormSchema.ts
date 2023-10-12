import { z } from "zod";

export const LeadsFormSchema = z.object({
    name: z.string().min(3, { message: "Name must be atleat 3 characters" }),
    phone: z.string().optional().refine(value => {
        // Enhance the phone number validation pattern
        const phonePattern = /^[\d\+() -]*\d[\d\+() -]*$/;

        // Ensure the phone number has a minimum length (adjust as needed)
        const minLength = 9;
        const maxLength = 13;
        return (
            phonePattern.test(value?.toString() ?? "") &&
            (value?.toString().replace(/[\D]/g, '').length ?? 0) >= minLength &&
            (value?.toString().replace(/[\D]/g, '').length ?? 0) <= maxLength
        )
    }, {
        message: "Phone number is not valid"
    }),
    address: z.string().optional()
})