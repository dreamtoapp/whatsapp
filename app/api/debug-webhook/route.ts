import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // اختبار الوصول للويبهوك المباشر
    const webhookUrl = 'https://wp.dreamto.app/api/webhook';

    console.log('🧪 اختبار الوصول للويبهوك المباشر:', webhookUrl);

    const response = await fetch(webhookUrl, {
      method: 'GET',
    });

    console.log('📊 حالة الويبهوك:', response.status, response.statusText);

    if (response.status === 403) {
      return NextResponse.json({
        success: true,
        message: 'الويبهوك يعمل (403 Forbidden هو طبيعي للـ GET)',
        status: response.status,
        statusText: response.statusText
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'الويبهوك لا يستجيب بشكل صحيح',
        status: response.status,
        statusText: response.statusText
      });
    }
  } catch (error) {
    console.error('❌ خطأ في اختبار الويبهوك:', error);
    return NextResponse.json({
      error: 'خطأ في الاتصال بالويبهوك',
      details: error instanceof Error ? error.message : 'خطأ غير معروف'
    }, { status: 500 });
  }
}

export async function POST() {
  try {
    // إرسال بيانات webhook تجريبية للموقع المباشر
    const webhookUrl = 'https://wp.dreamto.app/api/webhook';

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
                      body: `رسالة اختبار من الموقع المباشر - ${new Date().toLocaleString('ar-SA')}`
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

    console.log('🧪 إرسال بيانات webhook للموقع المباشر...');

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mockWebhookData),
    });

    console.log('📊 استجابة الويبهوك المباشر:', response.status, response.statusText);

    if (response.ok) {
      return NextResponse.json({
        success: true,
        message: 'تم إرسال بيانات webhook للموقع المباشر بنجاح',
        status: response.status
      });
    } else {
      const errorText = await response.text();
      return NextResponse.json({
        success: false,
        message: 'خطأ في إرسال بيانات webhook للموقع المباشر',
        status: response.status,
        error: errorText
      }, { status: 500 });
    }
  } catch (error) {
    console.error('❌ خطأ في اختبار الويبهوك المباشر:', error);
    return NextResponse.json({
      error: 'خطأ في الاتصال بالويبهوك المباشر',
      details: error instanceof Error ? error.message : 'خطأ غير معروف'
    }, { status: 500 });
  }
} 