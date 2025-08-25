import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    const apiMid = process.env.API_MIDTRANS_SB;

    const response = await fetch(`${apiMid}/v2/${id}/status`, {
      headers: {
        Authorization: `Basic ${Buffer.from(serverKey + ":").toString(
          "base64"
        )}`,
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.status_message || "Failed to fetch payment status"
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: result,
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

// // /api/payment/checkStatus/[id]/route.ts
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { id } = params;
//     const serverKey = process.env.MIDTRANS_SERVER_KEY;

//     const response = await fetch(
//       `https://api.sandbox.midtrans.com/v2/${id}/status`,
//       {
//         headers: {
//           Authorization: `Basic ${Buffer.from(serverKey + ":").toString(
//             "base64"
//           )}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const result = await response.json();

//     return NextResponse.json({
//       success: true,
//       data: result,
//     });
//   } catch (error) {
//     return NextResponse.json({
//       success: false,
//       message: error instanceof Error ? error.message : "Unknown error",
//     });
//   }
// }
