import { NextResponse } from "next/server";

export function middleware(request) {

  const { pathname } = request.nextUrl;
  console.log("Current Path:", pathname);

 
  const token = request.cookies.get("token")?.value; 


  if (pathname.startsWith("/admin") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  
 
  return NextResponse.next();
}


export const config = {
  matcher: [
    "/admin/:path*",  
    "/publicLessons/:path*"  
  ],
};