import { NextRequest, NextResponse } from 'next/server';
import { WebhookPayload, WhatsAppMessage } from '../../../helpers/types/whatsapp';
import { addMessage } from '../../../helpers/utils/message-store';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const verifyToken = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN;

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('✅ Webhook verified successfully');
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse('Forbidden', { status: 403 });
}

export async function POST(request: NextRequest) {
  try {
    console.log('📥 استقبال webhook من WhatsApp...');

    const body = await request.json();
    console.log('📋 بيانات Webhook الخام:', JSON.stringify(body, null, 2));

    // التحقق من نوع الكائن
    if (body.object !== 'whatsapp_business_account') {
      console.log('❌ نوع الكائن غير صحيح:', body.object);
      return new NextResponse('OK', { status: 200 });
    }

    console.log('✅ تأكيد: بيانات WhatsApp صحيحة');

    // معالجة كل entry
    for (const entry of body.entry) {
      console.log('📦 معالجة entry:', entry.id);

      // معالجة كل change
      for (const change of entry.changes) {
        console.log('🔄 معالجة change:', change.field);

        // التحقق من أن هذا change للرسائل
        if (change.field === 'messages') {
          const value = change.value;
          console.log('📨 قيمة change:', JSON.stringify(value, null, 2));

          // التحقق من وجود رسائل
          if (value.messages && Array.isArray(value.messages)) {
            console.log('📨 عدد الرسائل المستلمة:', value.messages.length);

            for (const message of value.messages) {
              console.log('💬 معالجة رسالة:', message.id);
              await processMessage(message);
            }
          } else {
            console.log('📨 لا توجد رسائل في هذا change');
          }
        }
      }
    }

    return new NextResponse('OK', { status: 200 });
  } catch (error) {
    console.error('❌ خطأ في Webhook:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

async function processMessage(message: any) {
  console.log('🔍 تفاصيل الرسالة:');
  console.log('   📱 من:', message.from);
  console.log('   📱 إلى:', message.to);
  console.log('   📝 النوع:', message.type);
  console.log('   ⏰ الوقت:', new Date(parseInt(message.timestamp) * 1000).toLocaleString('ar-SA'));

  if (message.text) {
    console.log('   💬 المحتوى:', message.text.body);
  }

  // تحويل الرسالة إلى النوع الصحيح
  const whatsappMessage: WhatsAppMessage = {
    id: message.id,
    from: message.from,
    to: message.to,
    timestamp: message.timestamp,
    type: message.type,
    text: message.text,
    image: message.image,
    document: message.document,
    audio: message.audio,
    video: message.video,
    location: message.location,
    contacts: message.contacts
  };

  // حفظ الرسالة في المخزن المشترك
  try {
    addMessage(whatsappMessage);
    console.log('✅ تم حفظ الرسالة بنجاح');
  } catch (error) {
    console.error('❌ خطأ في حفظ الرسالة:', error);
  }
} 