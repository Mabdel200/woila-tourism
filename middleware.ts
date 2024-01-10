// export { default } from "next-auth/middleware"
import { withAuth } from "next-auth/middleware";
import { useRouter } from "next/navigation";
import {  NextResponse } from "next/server";

export default withAuth(
 
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
 
    console.log("token: ", req.nextauth.token);

    if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.role !== "ADMIN")
      return NextResponse.rewrite(
        new URL("/", req.url)
      );
   
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);


export const config = { 
  matcher: [
    "/trips",
    "/reservations",
    "/properties",
    "/favorites",
    "/admin",
  ]
};
