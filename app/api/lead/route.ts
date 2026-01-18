import { NextRequest, NextResponse } from "next/server";
import { hubspotService } from "@/lib/hubspot";

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

    // Send to HubSpot
    let hubspotContact;
    if (isCalculatorLead(data)) {
      hubspotContact = {
        firstname: data.contact.firstName,
        lastname: data.contact.lastName,
        phone: data.contact.phone,
        email: data.contact.email,
        state: data.inputs.state,
        age: data.inputs.age.toString(),
        gender: data.inputs.gender,
        tobacco_use: data.inputs.tobacco ? 'yes' : 'no',
        insurance_type: data.productType,
        lead_source: data.source,
        lead_id: leadId,
      };
    } else {
      hubspotContact = {
        firstname: data.firstName,
        lastname: data.lastName,
        phone: data.phone,
        state: data.state,
        age: data.age,
        tobacco_use: data.tobacco,
        notes: data.notes,
        lead_source: 'contact_form',
        lead_id: leadId,
      };
    }

    const hubspotResult = await hubspotService.createOrUpdateContact(hubspotContact);

    // Add detailed note for calculator leads
    if (hubspotResult.success && isCalculatorLead(data) && hubspotResult.id) {
      const noteContent = `Lead from ${data.source}\n\nQuote Details:\n` +
        `- Product: ${data.productType}\n` +
        `- Age: ${data.inputs.age}\n` +
        `- Gender: ${data.inputs.gender}\n` +
        `- State: ${data.inputs.state}\n` +
        `- Tobacco: ${data.inputs.tobacco ? 'Yes' : 'No'}\n` +
        (data.inputs.coverage ? `- Coverage: ${data.inputs.coverage}\n` : '') +
        (data.inputs.termLength ? `- Term Length: ${data.inputs.termLength}\n` : '') +
        (data.inputs.policyStyle ? `- Policy Style: ${data.inputs.policyStyle}\n` : '') +
        `\nLead ID: ${leadId}`;
      
      await hubspotService.addNoteToContact(hubspotResult.id, noteContent);
    }

    return NextResponse.json({ 
      ok: true, 
      leadId, 
      message: "Lead received successfully",
      hubspotSync: hubspotResult.success 
    });
  } catch (error) {
    console.error("[Lead Submission Error]", error);
    return NextResponse.json({ ok: false, message: "Failed to process lead" }, { status: 500 });
  }
}
