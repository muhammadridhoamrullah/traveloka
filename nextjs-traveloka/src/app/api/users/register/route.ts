import { createUser } from "@/db/model/user";
import { NextRequest, NextResponse } from "next/server";
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

    const validatedData = schemaRegister.safeParse(data);

    if (!validatedData.success) {
      throw validatedData.error;
    }

    const creatingUser = await createUser(data);

    return NextResponse.json(
      {
        message: "User created successfully",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      const path = error.issues[0].path[0];
      const message = error.issues[0].message;

      return NextResponse.json({
        message: `Validation error on path ${String(path)}: ${message}`,
      });
    } else if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 400,
        }
      );
    } else {
      return NextResponse.json(
        {
          message: "Internal Server Error",
        },
        {
          status: 500,
        }
      );
    }
  }
}
