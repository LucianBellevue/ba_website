import { NextRequest, NextResponse } from "next/server";
import { resendService } from "@/lib/resend";

interface BasicLeadData {
  firstName: string;
  lastName: string;
  phone: string;
  state: string;
  age: string;
  gender?: string;
  productType?: string;
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
  estimate?: {
    low: number;
    high: number;
    coverageAmount?: string;
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

    // Send email notification via Resend
    let emailResult = false;
    if (isCalculatorLead(data)) {
      emailResult = await resendService.sendLeadNotification({
        leadId,
        firstName: data.contact.firstName,
        lastName: data.contact.lastName,
        phone: data.contact.phone,
        email: data.contact.email,
        state: data.inputs.state,
        productType: data.productType,
        source: data.source,
        isHighIntent: true,
        estimate: data.estimate,
        details: {
          age: data.inputs.age.toString(),
          gender: data.inputs.gender,
          tobacco: data.inputs.tobacco ? 'Yes' : 'No',
          coverage: data.estimate?.coverageAmount || data.inputs.coverage,
          termLength: data.inputs.termLength,
          policyStyle: data.inputs.policyStyle,
        },
      });
    } else {
      emailResult = await resendService.sendLeadNotification({
        leadId,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        state: data.state,
        productType: data.productType,
        source: 'contact_form',
        isHighIntent: false,
        notes: data.notes,
        details: {
          age: data.age,
          gender: data.gender,
          tobacco: data.tobacco || 'Not specified',
        },
      });
    }

    return NextResponse.json({ 
      ok: true, 
      leadId, 
      message: "Lead received successfully",
      emailSent: emailResult 
    });
  } catch (error) {
    console.error("[Lead Submission Error]", error);
    return NextResponse.json({ ok: false, message: "Failed to process lead" }, { status: 500 });
  }
}
