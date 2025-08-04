import axios from 'axios';

export async function verifyWebhookSetup() {
  try {
    console.log('🔍 التحقق من إعدادات الويبهوك...');
    
    // التحقق من الوصول للويبهوك
    const webhookUrl = 'https://wp.dreamto.app/api/webhook';
    
    console.log('📡 اختبار الوصول للويبهوك:', webhookUrl);
    
    const response = await axios.get(webhookUrl, {
      timeout: 10000,
    });
    
    console.log('✅ الويبهوك يستجيب:', response.status);
    return { success: true, status: response.status };
    
  } catch (error: any) {
    if (error.response?.status === 403) {
      console.log('✅ الويبهوك يعمل (403 Forbidden طبيعي للـ GET)');
      return { success: true, status: 403, message: 'الويبهوك يعمل بشكل صحيح' };
    }
    
    console.error('❌ خطأ في الوصول للويبهوك:', error.message);
    return { 
      success: false, 
      error: error.message,
      details: 'تأكد من أن الموقع يعمل وأن الويبهوك مُعد بشكل صحيح'
    };
  }
}

export async function testWebhookWithData() {
  try {
    console.log('🧪 اختبار الويبهوك ببيانات تجريبية...');
    
    const webhookUrl = 'https://wp.dreamto.app/api/webhook';
    
    const testData = {
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
                    profile: { name: 'Test User' },
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
                      body: `اختبار الويبهوك - ${new Date().toLocaleString('ar-SA')}`
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
    
    const response = await axios.post(webhookUrl, testData, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });
    
    console.log('✅ اختبار الويبهوك نجح:', response.status);
    return { success: true, status: response.status };
    
  } catch (error: any) {
    console.error('❌ خطأ في اختبار الويبهوك:', error.message);
    return { 
      success: false, 
      error: error.message,
      details: 'الويبهوك لا يستقبل البيانات بشكل صحيح'
    };
  }
} 