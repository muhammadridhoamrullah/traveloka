import { getPaymentByOrderId } from "@/db/model/payment";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;

    if (!id) {
      throw new Error("Payment ID is required");
    }

    const findPaymentById = await getPaymentByOrderId(id);

    return NextResponse.json(
      {
        findPaymentById,
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
          status: 500,
        }
      );
    } else {
      return NextResponse.json(
        {
          message: "An unexpected error occurred",
        },
        {
          status: 500,
        }
      );
    }
  }
}
