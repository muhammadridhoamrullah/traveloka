import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

const tokenCache = new Map<
  string,
  {
    payload: {
      _id: string;
      username: string;
      email: string;
      role: string;
      phone: string;
      firstName: string;
      lastName: string;
    };
    timestamp: number;
  }
>();

const CACHE_TTL = 5 * 60 * 1000; // Cache valid selama 5 menit

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

    // Cek apakah token sudah ada di cache
    const cached = tokenCache.get(token);

    const now = Date.now();

    // Cek apakah cache masih valid (belum expired)
    if (cached && now - cached.timestamp < CACHE_TTL) {
      console.log("INI PAKE CACHE");

      const reqHeaders = new Headers(request.headers);

      reqHeaders.set("UserId", cached.payload._id);
      reqHeaders.set("username", cached.payload.username);
      reqHeaders.set("firstName", cached.payload.firstName);
      reqHeaders.set("lastName", cached.payload.lastName);
      reqHeaders.set("email", cached.payload.email);
      reqHeaders.set("phone", cached.payload.phone);
      reqHeaders.set("role", cached.payload.role);

      // Kembalikan request dengan headers yang sudah disuntik
      return NextResponse.next({
        request: {
          headers: reqHeaders,
        },
      });
    }

    console.log("INI PAKE VERIFICATION");

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
    // Simpan hasil verification ke cache
    tokenCache.set(token, {
      payload: decoded.payload, // Data user
      timestamp: Date.now(),
    });

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
