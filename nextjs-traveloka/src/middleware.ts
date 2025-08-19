import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export async function middleware(request: NextRequest) {
  try {
    // Ambil token dari cookie

    const cookiesAuth = (await cookies()).get("access_token");

    // Jika token tidak ada, redirect ke halaman login
    if (!cookiesAuth) {
      // Jika token tidak ada, redirect ke halaman login
      return NextResponse.redirect(new URL("/login", request.url), {
        status: 307,
      });
    }

    // Ambil tokennya
    const token = cookiesAuth.value;

    const secret = new TextEncoder().encode(process.env.SECRET!);

    // Verifikasi token menggunakan jose
    const decoded = await jose.jwtVerify<{
      _id: string;
      username: string;
      email: string;
      role: string;
      phone: string;
      firstName: string;
      lastName: string;
    }>(token, secret);

    // Setelah verifikasi dan suntik data di dalam token berhasil, lanjutkan request

    const reqHeaders = new Headers(request.headers);

    reqHeaders.set("UserId", decoded.payload._id);
    reqHeaders.set("username", decoded.payload.username);
    reqHeaders.set("firstName", decoded.payload.firstName);
    reqHeaders.set("lastName", decoded.payload.lastName);
    reqHeaders.set("email", decoded.payload.email);
    reqHeaders.set("phone", decoded.payload.phone);
    reqHeaders.set("role", decoded.payload.role);

    // Kembalikan request dengan headers yang sudah disuntik
    return NextResponse.next({
      request: {
        headers: reqHeaders,
      },
    });
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

// Buat matcher untuk menentukan route yang akan menggunakan middleware
export const config = {
  matcher: [
    // untuk page
    "/home/:path*",
    "/flight/:path*",
    "/profile/:path*",

    // untuk API route
    "/api/flights/:path*",
    "/api/payment/:path*",
  ],
};
