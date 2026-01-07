import { NextRequest, NextResponse } from "next/server";

interface LeadData {
  firstName: string;
  lastName: string;
  phone: string;
  state: string;
  age: string;
  tobacco?: string;
  notes?: string;
  consent: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const data: LeadData = await request.json();

    // Log the lead data
    console.log("[New Lead Submission]", {
      timestamp: new Date().toISOString(),
      data,
    });

    // TODO: Forward to CRM/webhook integration
    // Example: Zapier webhook
    // await fetch('https://hooks.zapier.com/hooks/catch/...', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });

    // Example: HubSpot
    // await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
    //   },
    //   body: JSON.stringify({
    //     properties: {
    //       firstname: data.firstName,
    //       lastname: data.lastName,
    //       phone: data.phone,
    //       state: data.state,
    //     },
    //   }),
    // });

    return NextResponse.json({ ok: true, message: "Lead received successfully" });
  } catch (error) {
    console.error("[Lead Submission Error]", error);
    return NextResponse.json({ ok: false, message: "Failed to process lead" }, { status: 500 });
  }
}
