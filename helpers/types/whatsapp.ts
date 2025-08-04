export interface WhatsAppMessage {
  id: string;
  from: string;
  to: string;
  timestamp: string;
  type: 'text' | 'image' | 'document' | 'audio' | 'video' | 'location' | 'contact';
  text?: {
    body: string;
  };
  image?: {
    id: string;
    mime_type: string;
    sha256: string;
  };
  document?: {
    id: string;
    filename: string;
    mime_type: string;
  };
  audio?: {
    id: string;
    mime_type: string;
  };
  video?: {
    id: string;
    mime_type: string;
  };
  location?: {
    latitude: number;
    longitude: number;
  };
  contacts?: Array<{
    name: {
      formatted_name: string;
    };
    phones: Array<{
      phone: string;
    }>;
  }>;
}

export interface SendMessageRequest {
  messaging_product: 'whatsapp';
  to: string;
  type: 'text' | 'image' | 'document' | 'audio' | 'video' | 'location' | 'contact';
  text?: {
    body: string;
  };
  image?: {
    id: string;
    link?: string;
    caption?: string;
  };
  document?: {
    id: string;
    link?: string;
    caption?: string;
    filename?: string;
  };
  audio?: {
    id: string;
    link?: string;
  };
  video?: {
    id: string;
    link?: string;
    caption?: string;
  };
  location?: {
    latitude: number;
    longitude: number;
    name?: string;
    address?: string;
  };
  contacts?: Array<{
    name: {
      formatted_name: string;
      first_name?: string;
      last_name?: string;
    };
    phones: Array<{
      phone: string;
      type?: string;
    }>;
  }>;
}

export interface SendMessageResponse {
  messaging_product: 'whatsapp';
  contacts: Array<{
    input: string;
    wa_id: string;
  }>;
  messages: Array<{
    id: string;
  }>;
}

export interface WebhookEntry {
  id: string;
  changes: Array<{
    value: {
      messaging_product: 'whatsapp';
      metadata: {
        display_phone_number: string;
        phone_number_id: string;
      };
      contacts?: Array<{
        profile: {
          name: string;
        };
        wa_id: string;
      }>;
      messages?: WhatsAppMessage[];
    };
    field: 'messages';
  }>;
}

export interface WebhookPayload {
  object: 'whatsapp_business_account';
  entry: WebhookEntry[];
} 