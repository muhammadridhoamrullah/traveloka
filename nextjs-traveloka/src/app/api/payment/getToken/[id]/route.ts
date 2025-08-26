import { NextRequest, NextResponse } from "next/server";
interface Props {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: Props) {
  try {
    
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
