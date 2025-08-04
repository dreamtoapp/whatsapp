import { NextRequest, NextResponse } from 'next/server';
import { WebhookPayload, WhatsAppMessage } from '../../../helpers/types/whatsapp';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const verifyToken = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN;

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('Webhook verified successfully');
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse('Forbidden', { status: 403 });
}

export async function POST(request: NextRequest) {
  try {
    const body: WebhookPayload = await request.json();

    if (body.object === 'whatsapp_business_account') {
      for (const entry of body.entry) {
        for (const change of entry.changes) {
          if (change.field === 'messages') {
            const messages = change.value.messages;
            if (messages) {
              for (const message of messages) {
                await processMessage(message);
              }
            }
          }
        }
      }
    }

    return new NextResponse('OK', { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

async function processMessage(message: WhatsAppMessage) {
  console.log('Received message:', {
    id: message.id,
    from: message.from,
    type: message.type,
    timestamp: message.timestamp,
  });

  // هنا يمكنك إضافة منطق معالجة الرسائل
  // مثل الرد التلقائي أو حفظ الرسائل في قاعدة البيانات
} 