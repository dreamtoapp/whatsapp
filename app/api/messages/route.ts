import { NextRequest, NextResponse } from 'next/server';
import { WhatsAppMessage } from '../../../helpers/types/whatsapp';
import { getMessages, addMessage } from '../../../helpers/utils/message-store';

export async function GET() {
  try {
    const messages = getMessages();
    return NextResponse.json({ messages });
  } catch (error) {
    return NextResponse.json({ error: 'خطأ في جلب الرسائل' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const message: WhatsAppMessage = await request.json();

    // إضافة الرسالة للمخزن المشترك
    addMessage(message);

    return NextResponse.json({ success: true, message: 'تم حفظ الرسالة' });
  } catch (error) {
    return NextResponse.json({ error: 'خطأ في حفظ الرسالة' }, { status: 500 });
  }
} 