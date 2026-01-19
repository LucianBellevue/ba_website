import { Resend } from 'resend';

interface LeadEmailData {
  leadId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  state?: string;
  productType?: string;
  source?: string;
  isHighIntent?: boolean;
  notes?: string;
  estimate?: {
    low: number;
    high: number;
    coverageAmount?: string;
  };
  details?: {
    age?: string;
    gender?: string;
    tobacco?: string;
    termLength?: string;
    policyStyle?: string;
    coverage?: string;
    heightFeet?: number;
    heightInches?: number;
    weightLbs?: number;
    bmi?: number;
    healthClass?: string;
    hasChronicCondition?: boolean;
    hasFamilyHistory?: boolean;
    takingMedications?: boolean;
  };
}

class ResendService {
  private resend: Resend | null = null;
  private fromEmail: string;
  private notificationEmail: string;
  private isConfigured: boolean = false;

  constructor() {
    const apiKey = process.env.RESEND_API_KEY;
    this.fromEmail = process.env.RESEND_FROM_EMAIL || 'Bellevue Assurance <onboarding@resend.dev>';
    this.notificationEmail = process.env.LEAD_NOTIFICATION_EMAIL || '';

    // Log configuration status
    console.log('[Resend] Initializing with config:', {
      hasApiKey: !!apiKey,
      fromEmail: this.fromEmail,
      notificationEmail: this.notificationEmail ? '***configured***' : 'NOT SET',
    });

    if (apiKey && this.notificationEmail) {
      this.resend = new Resend(apiKey);
      this.isConfigured = true;
      console.log('[Resend] Service configured successfully');
    } else {
      if (!apiKey) console.warn('[Resend] Missing RESEND_API_KEY');
      if (!this.notificationEmail) console.warn('[Resend] Missing LEAD_NOTIFICATION_EMAIL');
    }
  }

  async sendLeadNotification(data: LeadEmailData): Promise<boolean> {
    if (!this.resend || !this.isConfigured) {
      console.error('[Resend] Service not configured - check environment variables');
      return false;
    }

    try {
      const isHighIntent = data.isHighIntent || data.source?.includes('calculator');
      const subject = isHighIntent 
        ? `🔥 HIGH INTENT LEAD: ${data.firstName} ${data.lastName} - ${data.productType?.replace('_', ' ').toUpperCase() || 'Insurance'}`
        : `New Lead: ${data.firstName} ${data.lastName}`;

      const htmlContent = this.buildEmailHtml(data, isHighIntent ?? false);

      console.log('[Resend] Sending email:', {
        from: this.fromEmail,
        to: this.notificationEmail,
        subject,
        leadId: data.leadId,
        source: data.source,
      });

      const { data: responseData, error } = await this.resend.emails.send({
        from: this.fromEmail,
        to: this.notificationEmail,
        subject,
        html: htmlContent,
      });

      if (error) {
        console.error('[Resend] API Error:', JSON.stringify(error, null, 2));
        return false;
      }

      console.log('[Resend] Email sent successfully:', responseData);
      return true;
    } catch (error) {
      console.error('[Resend] Exception:', error instanceof Error ? error.message : error);
      return false;
    }
  }

  private buildEmailHtml(data: LeadEmailData, isHighIntent: boolean): string {
    const priorityBadge = isHighIntent 
      ? '<span style="background-color: #ef4444; color: white; padding: 4px 12px; border-radius: 4px; font-weight: bold;">🔥 HIGH INTENT</span>'
      : '<span style="background-color: #3b82f6; color: white; padding: 4px 12px; border-radius: 4px;">New Lead</span>';

    let estimateSection = '';
    if (data.estimate) {
      estimateSection = `
        <div style="background-color: #f0fdf4; border: 1px solid #22c55e; border-radius: 8px; padding: 16px; margin: 16px 0;">
          <h3 style="margin: 0 0 8px 0; color: #166534;">💰 Quote Estimate</h3>
          <p style="margin: 0; font-size: 24px; font-weight: bold; color: #166534;">
            $${data.estimate.low.toFixed(2)} - $${data.estimate.high.toFixed(2)}/month
          </p>
          ${data.estimate.coverageAmount ? `<p style="margin: 8px 0 0 0; color: #166534;">Coverage: ${data.estimate.coverageAmount}</p>` : ''}
        </div>
      `;
    }

    let detailsSection = '';
    if (data.details) {
      const details = [];
      if (data.details.age) details.push(`<li><strong>Age:</strong> ${data.details.age}</li>`);
      if (data.details.gender) details.push(`<li><strong>Gender:</strong> ${data.details.gender}</li>`);
      if (data.details.tobacco) details.push(`<li><strong>Tobacco Use:</strong> ${data.details.tobacco}</li>`);
      if (data.details.coverage) details.push(`<li><strong>Coverage Amount:</strong> ${data.details.coverage}</li>`);
      if (data.details.termLength) details.push(`<li><strong>Term Length:</strong> ${data.details.termLength}</li>`);
      if (data.details.policyStyle) details.push(`<li><strong>Policy Style:</strong> ${data.details.policyStyle}</li>`);
      
      // Health metrics (internal data)
      if (data.details.heightFeet !== undefined && data.details.heightInches !== undefined) {
        details.push(`<li><strong>Height:</strong> ${data.details.heightFeet}'${data.details.heightInches}"</li>`);
      }
      if (data.details.weightLbs) details.push(`<li><strong>Weight:</strong> ${data.details.weightLbs} lbs</li>`);
      if (data.details.bmi) details.push(`<li><strong>BMI:</strong> ${data.details.bmi.toFixed(1)}</li>`);
      if (data.details.healthClass) details.push(`<li><strong>Health Class:</strong> ${data.details.healthClass.replace('_', ' ')}</li>`);
      
      // Health screening questions
      if (data.details.hasChronicCondition !== undefined) {
        details.push(`<li><strong>Chronic Conditions:</strong> ${data.details.hasChronicCondition ? 'Yes' : 'No'}</li>`);
      }
      if (data.details.hasFamilyHistory !== undefined) {
        details.push(`<li><strong>Family History:</strong> ${data.details.hasFamilyHistory ? 'Yes' : 'No'}</li>`);
      }
      if (data.details.takingMedications !== undefined) {
        details.push(`<li><strong>Taking Medications:</strong> ${data.details.takingMedications ? 'Yes' : 'No'}</li>`);
      }
      
      if (details.length > 0) {
        detailsSection = `
          <div style="margin: 16px 0;">
            <h3 style="margin: 0 0 8px 0;">📋 Customer Details</h3>
            <ul style="margin: 0; padding-left: 20px;">
              ${details.join('')}
            </ul>
          </div>
        `;
      }
    }

    let notesSection = '';
    if (data.notes) {
      notesSection = `
        <div style="background-color: #fffbeb; border: 1px solid #fbbf24; border-radius: 8px; padding: 16px; margin: 16px 0;">
          <h3 style="margin: 0 0 8px 0; color: #92400e;">📝 Customer Notes</h3>
          <p style="margin: 0; color: #78350f; white-space: pre-wrap;">${data.notes}</p>
        </div>
      `;
    }

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f8fafc; border-radius: 12px; padding: 24px; border: 1px solid #e2e8f0;">
          <div style="margin-bottom: 16px;">
            ${priorityBadge}
          </div>
          
          <h2 style="margin: 16px 0 8px 0; color: #1e293b;">
            ${data.firstName} ${data.lastName}
          </h2>
          
          <div style="background-color: white; border-radius: 8px; padding: 16px; margin: 16px 0; border: 1px solid #e2e8f0;">
            <h3 style="margin: 0 0 12px 0; color: #475569;">📞 Contact Information</h3>
            <p style="margin: 4px 0;"><strong>Phone:</strong> <a href="tel:${data.phone}" style="color: #2563eb;">${data.phone}</a></p>
            ${data.email ? `<p style="margin: 4px 0;"><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #2563eb;">${data.email}</a></p>` : ''}
            ${data.state ? `<p style="margin: 4px 0;"><strong>State:</strong> ${data.state}</p>` : ''}
          </div>

          ${data.productType ? `
            <div style="margin: 16px 0;">
              <h3 style="margin: 0 0 8px 0;">🛡️ Product Interest</h3>
              <p style="margin: 0; font-size: 18px; font-weight: 600; color: #1e293b;">
                ${data.productType.replace('_', ' ').toUpperCase()}
              </p>
            </div>
          ` : ''}

          ${estimateSection}
          ${detailsSection}
          ${notesSection}

          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0; color: #64748b; font-size: 14px;">
              <strong>Source:</strong> ${data.source || 'Website'}<br>
              <strong>Lead ID:</strong> ${data.leadId}<br>
              <strong>Received:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} ET
            </p>
          </div>

          ${isHighIntent ? `
            <div style="background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 16px; margin-top: 16px;">
              <p style="margin: 0; color: #92400e; font-weight: 600;">
                ⚡ ACTION REQUIRED: This lead completed the full quote process. Contact ASAP!
              </p>
            </div>
          ` : ''}
        </div>
      </body>
      </html>
    `;
  }
}

export const resendService = new ResendService();
