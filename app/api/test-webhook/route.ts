import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // محاكاة بيانات webhook من WhatsApp
    const mockWebhookData = {
      object: 'whatsapp_business_account',
      entry: [
        {
          id: '744540948737430',
          changes: [
            {
              value: {
                messaging_product: 'whatsapp',
                metadata: {
                  display_phone_number: '+966 55 055 6240',
                  phone_number_id: '744540948737430'
                },
                contacts: [
                  {
                    profile: {
                      name: 'Test User'
                    },
                    wa_id: '966501234567'
                  }
                ],
                messages: [
                  {
                    from: '966501234567',
                    id: `test_${Date.now()}`,
                    timestamp: Math.floor(Date.now() / 1000).toString(),
                    type: 'text',
                    text: {
                      body: `رسالة اختبار من جوالك - ${new Date().toLocaleString('ar-SA')}`
                    }
                  }
                ]
              },
              field: 'messages'
            }
          ]
        }
      ]
    };

    console.log('🧪 إرسال بيانات webhook تجريبية...');

    // إرسال البيانات إلى الويبهوك المحلي
    const response = await fetch('http://localhost:3000/api/webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mockWebhookData),
    });

    if (response.ok) {
      console.log('✅ تم إرسال بيانات webhook بنجاح');
      return NextResponse.json({
        success: true,
        message: 'تم إرسال بيانات webhook تجريبية',
        webhookData: mockWebhookData
      });
    } else {
      console.error('❌ خطأ في إرسال webhook:', response.status);
      return NextResponse.json({ error: 'خطأ في إرسال webhook' }, { status: 500 });
    }
  } catch (error) {
    console.error('❌ خطأ في اختبار webhook:', error);
    return NextResponse.json({ error: 'خطأ في اختبار webhook' }, { status: 500 });
  }
} 