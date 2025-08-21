import { createPayment } from "@/db/model/payment";
import midtransClient from "midtrans-client";
import { ObjectId } from "mongodb";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const {
      orderId,
      grossAmount,
      serviceType,
      serviceDetails,
      contactDetails,
      passengerDetails,
    } = await request.json();

    const headerList = headers();
    const UserId = (await headerList).get("UserId");
    const first_name = (await headerList).get("firstName");
    const last_name = (await headerList).get("lastName");
    const email = (await headerList).get("email");
    const phone = (await headerList).get("phone");
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

    if (!orderId || !grossAmount) {
      return NextResponse.json(
        {
          message: "Missing required fields: orderId, grossAmount",
        },
        {
          status: 400,
        }
      );
    }

    const inputPayment = {
      orderId,
      UserId,
      grossAmount,
      serviceType,
      serviceDetails,
      contactDetails,
      passengerDetails,
    };

    const creatingPayment = await createPayment(inputPayment);

    let parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: grossAmount,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name,
        last_name,
        email,
        phone,
      },
    };

    const transaction = await snap.createTransaction(parameter);

    return NextResponse.json(
      {
        token: transaction.token,
        redirect_url: transaction.redirect_url,
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
          message: "Internal Server Error",
        },
        {
          status: 500,
        }
      );
    }
  }
}
