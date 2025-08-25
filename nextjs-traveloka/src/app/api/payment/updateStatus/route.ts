import { createPayment, updatePaymentStatus } from "@/db/model/payment";
import { ObjectId } from "mongodb";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { orderId, completeData } = await request.json();

    if (!orderId || !completeData) {
      return NextResponse.json(
        {
          message: "Missing required fields: orderId, completeData",
        },
        {
          status: 400,
        }
      );
    }

    const headerList = headers();

    const payment = {
      orderId,
      completeData,
    };

    const creatingPayment = await updatePaymentStatus(payment);

    return NextResponse.json(
      {
        message: creatingPayment.message,
        paymentId: creatingPayment.paymentId,
      },
      {
        status: 201,
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

// type InputPayment = {
//     orderId: string;
//     UserId: string;
//     transactionStatus: string;
//     grossAmount: number;
//     paymentType: string;
//     transactionTime: Date;
//     fraudStatus: string;
//     transactionId: string;
// }
