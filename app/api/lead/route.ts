import { NextRequest, NextResponse } from "next/server";

interface BasicLeadData {
  firstName: string;
  lastName: string;
  phone: string;
  state: string;
  age: string;
  tobacco?: string;
  notes?: string;
  consent: boolean;
}

interface CalculatorLeadData {
  productType: 'final_expense' | 'term_life';
  inputs: {
    state: string;
    age: number;
    gender: 'female' | 'male';
    tobacco: boolean;
    coverage?: string;
    policyStyle?: string;
    termLength?: string;
  };
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    consent: boolean;
  };
  source: string;
  createdAt: string;
}

type LeadData = BasicLeadData | CalculatorLeadData;

function generateLeadId(): string {
  return `lead_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

function isCalculatorLead(data: LeadData): data is CalculatorLeadData {
  return 'productType' in data && 'inputs' in data && 'contact' in data;
}

export async function POST(request: NextRequest) {
  try {
    const data: LeadData = await request.json();
    const leadId = generateLeadId();

    // Log the lead data safely
    console.log("[New Lead Submission]", {
      leadId,
      timestamp: new Date().toISOString(),
      type: isCalculatorLead(data) ? 'calculator' : 'basic',
      productType: isCalculatorLead(data) ? data.productType : 'general',
      source: isCalculatorLead(data) ? data.source : 'form',
    });

    // TODO: Forward to CRM/webhook integration
    // Example: Zapier webhook
    // await fetch('https://hooks.zapier.com/hooks/catch/...', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ leadId, ...data }),
    // });

    // Example: HubSpot
    // const contactData = isCalculatorLead(data) ? data.contact : data;
    // await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
    //   },
    //   body: JSON.stringify({
    //     properties: {
    //       firstname: contactData.firstName,
    //       lastname: contactData.lastName,
    //       phone: contactData.phone,
    //       email: isCalculatorLead(data) ? contactData.email : undefined,
    //     },
    //   }),
    // });

    return NextResponse.json({ ok: true, leadId, message: "Lead received successfully" });
  } catch (error) {
    console.error("[Lead Submission Error]", error);
    return NextResponse.json({ ok: false, message: "Failed to process lead" }, { status: 500 });
  }
}
