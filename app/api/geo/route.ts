import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const cfCountry = request.headers.get("cf-ipcountry"); // Cloudflare
  const vercelCountry = request.headers.get("x-vercel-ip-country"); // Vercel
  
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

  const ip = forwarded?.split(",")[0] || realIp || "unknown";
  
  try {
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=countryCode`);
    const data = await response.json();
    
    return NextResponse.json({ 
      country: data.countryCode || "unknown",
      isEthiopia: data.countryCode === "ET" 
    });
  } catch {
    return NextResponse.json({ 
      country: "unknown",
      isEthiopia: true 
    });
  }
}
