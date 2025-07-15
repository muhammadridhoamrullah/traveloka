import { NextRequest } from "next/server";
import z from "zod";

const schemaRegister = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  username: z.string().min(1, { message: "Username is required" }),
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(20, { message: "Password must be at most 20 characters" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  dateOfBirth: z.string().refine(
    (date) => {
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime()) && parsedDate < new Date();
    },
    {
      message: "Date of birth must be a valid date in the past",
    }
  ),
  address: z.string().min(1, { message: "Address is required" }),
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // const validatedData
  } catch (error) {}
}

// firstName: string;
//     lastName: string;
//     username: string;
//     email: string;
//     password: string;
//     phoneNumber: string;
//     dateOfBirth: Date;
//     address: string
