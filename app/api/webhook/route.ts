import { NextRequest, NextResponse } from 'next/server';
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

        // معالجة أنواع مختلفة من webhooks
        switch (change.field) {
          case 'messages':
            await handleMessagesChange(change.value);
            break;
          case 'about':
            await handleAboutChange(change.value);
            break;
          case 'email':
            await handleEmailChange(change.value);
            break;
          case 'fbe_install':
            await handleFbeInstallChange(change.value);
            break;
          case 'books':
            await handleBooksChange(change.value);
            break;
          default:
            console.log('📝 معالجة change غير معروف:', change.field, change.value);
        }
      }
    }

    return new NextResponse('OK', { status: 200 });
  } catch (error) {
    console.error('❌ خطأ في Webhook:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

async function handleMessagesChange(value: any) {
  console.log('📨 معالجة تغيير الرسائل:', JSON.stringify(value, null, 2));

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

async function handleAboutChange(value: any) {
  console.log('ℹ️ معالجة تغيير about:', JSON.stringify(value, null, 2));

  if (value.field === 'about') {
    console.log('📝 قيمة about الجديدة:', value.value);
    // هنا يمكنك إضافة منطق إضافي لمعالجة تغيير about
  }
}

async function handleEmailChange(value: any) {
  console.log('📧 معالجة تغيير email:', JSON.stringify(value, null, 2));
  // معالجة تغييرات email
}

async function handleFbeInstallChange(value: any) {
  console.log('🔧 معالجة تغيير fbe_install:', JSON.stringify(value, null, 2));
  // معالجة تغييرات fbe_install
}

async function handleBooksChange(value: any) {
  console.log('📚 معالجة تغيير books:', JSON.stringify(value, null, 2));
  // معالجة تغييرات books
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
  const whatsappMessage = {
    id: message.id,
    from: message.from,
    to: message.to || process.env.WHATSAPP_PHONE_NUMBER_ID,
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