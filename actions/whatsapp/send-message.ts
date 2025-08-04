'use server';

import { sendWhatsAppMessage, formatPhoneNumber, validatePhoneNumber } from '../../helpers/utils/whatsapp';
import { SendMessageRequest } from '../../helpers/types/whatsapp';

export async function sendMessage(phoneNumber: string, message: string) {
  try {
    if (!validatePhoneNumber(phoneNumber)) {
      throw new Error('رقم الجوال غير صحيح');
    }

    const formattedPhone = formatPhoneNumber(phoneNumber);

    const messageData: SendMessageRequest = {
      messaging_product: 'whatsapp',
      to: formattedPhone,
      type: 'text',
      text: {
        body: message,
      },
    };

    const response = await sendWhatsAppMessage(messageData);
    return { success: true, data: response };
  } catch (error) {
    console.error('Error in sendMessage action:', error);
    return { success: false, error: error instanceof Error ? error.message : 'خطأ في إرسال الرسالة' };
  }
} 