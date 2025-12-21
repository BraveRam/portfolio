import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Get IP from various headers (for proxied requests) or connection
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const cfCountry = request.headers.get("cf-ipcountry"); // Cloudflare
  const vercelCountry = request.headers.get("x-vercel-ip-country"); // Vercel
  
  // If deployed on Vercel or Cloudflare, use their country headers directly
  if (vercelCountry) {
    return NextResponse.json({ 
      country: vercelCountry,
      isEthiopia: vercelCountry === "ET" 
    });
  }
  
  if (cfCountry) {
    return NextResponse.json({ 
      country: cfCountry,
      isEthiopia: cfCountry === "ET" 
    });
  }

  // Fallback: use a free IP geolocation service
  const ip = forwarded?.split(",")[0] || realIp || "unknown";
  
  try {
    // Using ip-api.com (free, no API key needed, 45 req/min limit)
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=countryCode`);
    const data = await response.json();
    
    return NextResponse.json({ 
      country: data.countryCode || "unknown",
      isEthiopia: data.countryCode === "ET" 
    });
  } catch {
    // On error, default to showing the CV button (fail open)
    return NextResponse.json({ 
      country: "unknown",
      isEthiopia: true 
    });
  }
}
