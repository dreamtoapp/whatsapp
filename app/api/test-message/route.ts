import { NextResponse } from 'next/server';
import { addMessage } from '../../../helpers/utils/message-store';

export async function POST() {
  try {
    // إضافة رسالة تجريبية
    const testMessage = {
      id: `test_${Date.now()}`,
      from: '966501234567',
      to: '744540948737430',
      timestamp: Math.floor(Date.now() / 1000).toString(),
      type: 'text' as const,
      text: {
        body: `رسالة تجريبية - ${new Date().toLocaleString('ar-SA')}`
      }
    };

    addMessage(testMessage);

    return NextResponse.json({
      success: true,
      message: 'تم إضافة رسالة تجريبية',
      testMessage
    });
  } catch (error) {
    return NextResponse.json({ error: 'خطأ في إضافة الرسالة التجريبية' }, { status: 500 });
  }
} 