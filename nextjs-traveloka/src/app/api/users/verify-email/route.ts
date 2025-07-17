import { verifyEmail } from "@/db/model/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const { token } = data;

    if (!token) {
      throw new Error("Token is required");
    }

    const verifyThisEmail = await verifyEmail(token);

    return NextResponse.json(
      {
        message: verifyThisEmail.message,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
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
