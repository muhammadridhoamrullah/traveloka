import midtransClient from "midtrans-client";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { orderId, grossAmount } = await request.json();
    console.log(orderId, grossAmount, "ini gros");

    const headerList = headers();
    // // const UserId = (await headerList).get("UserId");
    const first_name = (await headerList).get("firstName");
    const last_name = (await headerList).get("lastName");
    const email = (await headerList).get("email");
    const phone = (await headerList).get("phone");
    console.log("Header first_name:", first_name);
    console.log("Header last_name:", last_name);
    console.log("Header email:", email);
    console.log("Header phone:", phone);

    if (!orderId || !grossAmount) {
      return NextResponse.json(
        {
          message:
            "Missing required fields: orderId, grossAmount, customerDetails",
        },
        {
          status: 400,
        }
      );
    }

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
    console.log("Transaction created:", transaction);

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
