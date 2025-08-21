import { createPayment, updatePaymentStatus } from "@/db/model/payment";
import { ObjectId } from "mongodb";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const {
      orderId,
      transactionStatus,
      grossAmount,
      paymentType,
      transactionTime,
      fraudStatus,
      transactionId,
      dataBody,
    } = await request.json();

    if (
      !orderId ||
      !transactionStatus ||
      !grossAmount ||
      !paymentType ||
      !transactionTime ||
      !transactionId ||
      !fraudStatus ||
      !dataBody
    ) {
      return NextResponse.json(
        {
          message:
            "Missing required fields: orderId, transactionStatus, grossAmount, paymentType, transactionTime, fraudStatus, transactionId, dataBody",
        },
        {
          status: 400,
        }
      );
    }

    const headerList = headers();
    const UserId = (await headerList).get("UserId");

    if (!UserId) {
      return NextResponse.json(
        {
          message: "UserId is required",
        },
        {
          status: 400,
        }
      );
    }

    const payment = {
      orderId,
      UserId,
      transactionStatus,
      grossAmount,
      paymentType,
      transactionTime,
      fraudStatus,
      transactionId,
      serviceType: dataBody.serviceType,
      serviceDetails: dataBody.serviceDetails,
      contactDetails: dataBody.contactDetails,
      passengerDetails: dataBody.passengerDetails.map((passenger: any) => ({
        passengerDetailTitle: passenger.passengerDetailTitle,
        passengerDetailFirstName: passenger.passengerDetailFirstName,
        passengerDetailLastName: passenger.passengerDetailLastName,
        passengerDetailDateOfBirth: new Date(
          passenger.passengerDetailDateOfBirth
        ),
        passengerDetailNationality: passenger.passengerDetailNationality,
      })),
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
