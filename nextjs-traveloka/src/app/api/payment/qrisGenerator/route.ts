import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const transactionId = searchParams.get("transactionId");
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    const apiMid = process.env.API_MIDTRANS_SB;
    if (!transactionId) {
      return NextResponse.json(
        {
          message: "Missing required field: transactionId",
        },
        {
          status: 400,
        }
      );
    }

    const hitApiQRISMidtrans = await fetch(
      `${apiMid}/v2/qris/${transactionId}/qr-code`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(serverKey + ":").toString(
            "base64"
          )}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!hitApiQRISMidtrans.ok) {
      return NextResponse.json(
        {
          message: "Failed to fetch QRIS from Midtrans",
        },
        {
          status: 500,
        }
      );
    }

    const arrayBuffer = await hitApiQRISMidtrans.arrayBuffer();
    console.log(arrayBuffer, "<<< ini array buffer");

    const buffer = Buffer.from(arrayBuffer);
    console.log(buffer, "<<< ini buffer");

    const base64Image = buffer.toString("base64");
    console.log(base64Image, "<<< ini base64");

    return NextResponse.json(
      {
        base64Image,
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

// https://api.sandbox.midtrans.com/v2/qris/a913812f-eb94-45c2-8747-881c1dc1effe/qr-code
