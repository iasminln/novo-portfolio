// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  const utmParams = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
  let hasUtm = false;

  utmParams.forEach(param => {
    if (url.searchParams.has(param)) {
      hasUtm = true;
      url.searchParams.delete(param);
    }
  });

  if (hasUtm) {
    return NextResponse.redirect(url, { status: 308 });
  }

  return NextResponse.next();
}
