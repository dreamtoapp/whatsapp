import axios from 'axios';
import { SendMessageRequest, SendMessageResponse } from '../types/whatsapp';

const WHATSAPP_API_URL = `https://graph.facebook.com/${process.env.WHATSAPP_API_VERSION || 'v23.0'}`;
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const ACCESS_TOKEN = process.env.WHATSAPP_PERMANENT_TOKEN;

export async function sendWhatsAppMessage(messageData: SendMessageRequest): Promise<SendMessageResponse> {
  try {
    const response = await axios.post(
      `${WHATSAPP_API_URL}/${PHONE_NUMBER_ID}/messages`,
      messageData,
      {
        headers: {
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    throw error;
  }
}

export function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');

  // Add country code if not present
  if (!cleaned.startsWith('966')) {
    return `966${cleaned}`;
  }

  return cleaned;
}

export function validatePhoneNumber(phone: string): boolean {
  const formatted = formatPhoneNumber(phone);
  return formatted.length >= 12 && formatted.length <= 15;
} 