import { loginUser } from "@/db/model/user";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const schemaLogin = z.object({
  identifier: z.string().min(1, { message: "Identifier is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const validatedData = schemaLogin.safeParse(data);

    if (!validatedData.success) {
      throw validatedData.error;
    }

    const access_token = await loginUser(data);

    return NextResponse.json(
      {
        access_token,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      const path = error.issues[0].path[0];
      const message = error.issues[0].message;

      return NextResponse.json(
        {
          message: `Validation error on path ${String(path)}: ${message}`,
        },
        {
          status: 400,
        }
      );
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
