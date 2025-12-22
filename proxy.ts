import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";

  // Define your allowed domains (add your production domain here too)
  const allowedDomains = ["localhost:3000", "lencho.dev"];

  // Check if hostname matches any allowed pattern or is a subdomain
  const isAllowedDomain = allowedDomains.some(
    (domain) => hostname === domain || hostname.endsWith(`.${domain}`)
  );

  // Extract subdomain (e.g., "blogs" from "blogs.localhost:3000")
  let subdomain: string | null = null;
  
  for (const domain of allowedDomains) {
    if (hostname.endsWith(`.${domain}`)) {
      subdomain = hostname.replace(`.${domain}`, "");
      break;
    }
  }

  // If there's a subdomain (excluding www), rewrite to the subdomain's folder
  if (subdomain && subdomain !== "www") {
    // Rewrite to /[subdomain]/... path
    // e.g., blogs.localhost:3000/ -> /blogs
    // e.g., blogs.localhost:3000/posts -> /blogs/posts
    const newPath = `/${subdomain}${url.pathname}`;
    return NextResponse.rewrite(new URL(newPath, req.url));
  }

  return NextResponse.next();
}
