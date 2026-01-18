interface HubSpotContact {
  firstname: string;
  lastname: string;
  phone: string;
  email?: string;
  state?: string;
  age?: string;
  gender?: string;
  tobacco_use?: string;
  insurance_type?: string;
  notes?: string;
  lead_source?: string;
  lead_id?: string;
}

export class HubSpotService {
  private apiKey: string;
  private baseUrl = 'https://api.hubapi.com';

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.HUBSPOT_API_KEY || '';
    if (!this.apiKey) {
      console.warn('[HubSpot] API key not configured');
    }
  }

  async createOrUpdateContact(data: HubSpotContact): Promise<{ id: string; success: boolean }> {
    if (!this.apiKey) {
      console.error('[HubSpot] API key missing - skipping contact creation');
      return { id: '', success: false };
    }

    try {
      const properties: Record<string, string> = {
        firstname: data.firstname,
        lastname: data.lastname,
        phone: data.phone,
      };

      if (data.email) properties.email = data.email;
      if (data.state) properties.state = data.state;
      if (data.age) properties.age = data.age;
      if (data.gender) properties.gender = data.gender;
      if (data.tobacco_use) properties.tobacco_use = data.tobacco_use;
      if (data.insurance_type) properties.insurance_type = data.insurance_type;
      if (data.notes) properties.notes = data.notes;
      if (data.lead_source) properties.lead_source = data.lead_source;
      if (data.lead_id) properties.lead_id = data.lead_id;

      const response = await fetch(`${this.baseUrl}/crm/v3/objects/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({ properties }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[HubSpot] Contact creation failed:', response.status, errorText);
        return { id: '', success: false };
      }

      const result = await response.json();
      console.log('[HubSpot] Contact created/updated:', result.id);
      return { id: result.id, success: true };
    } catch (error) {
      console.error('[HubSpot] Error creating contact:', error);
      return { id: '', success: false };
    }
  }

  async addNoteToContact(contactId: string, noteContent: string): Promise<boolean> {
    if (!this.apiKey || !contactId) {
      return false;
    }

    try {
      const response = await fetch(`${this.baseUrl}/crm/v3/objects/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          properties: {
            hs_note_body: noteContent,
          },
          associations: [
            {
              to: { id: contactId },
              types: [
                {
                  associationCategory: 'HUBSPOT_DEFINED',
                  associationTypeId: 202, // Note to Contact association
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        console.error('[HubSpot] Note creation failed:', response.status);
        return false;
      }

      console.log('[HubSpot] Note added to contact:', contactId);
      return true;
    } catch (error) {
      console.error('[HubSpot] Error adding note:', error);
      return false;
    }
  }

  async searchContactByEmail(email: string): Promise<string | null> {
    if (!this.apiKey || !email) {
      return null;
    }

    try {
      const response = await fetch(`${this.baseUrl}/crm/v3/objects/contacts/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          filterGroups: [
            {
              filters: [
                {
                  propertyName: 'email',
                  operator: 'EQ',
                  value: email,
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        return null;
      }

      const result = await response.json();
      return result.results?.[0]?.id || null;
    } catch (error) {
      console.error('[HubSpot] Error searching contact:', error);
      return null;
    }
  }
}

export const hubspotService = new HubSpotService();
