'use client';

import { useState, useEffect } from 'react';
import { Header } from '../components/layout/header';
import { SendMessageForm } from '../components/chat/send-message-form';
import { MessageList } from '../components/chat/message-list';
import { WhatsAppMessage } from '../helpers/types/whatsapp';

export default function Home() {
  const [messages, setMessages] = useState<WhatsAppMessage[]>([]);

  // محاكاة استقبال الرسائل (في التطبيق الحقيقي ستأتي من قاعدة البيانات)
  useEffect(() => {
    const mockMessages: WhatsAppMessage[] = [
      {
        id: '1',
        from: '966501234567',
        to: '744540948737430',
        timestamp: Math.floor(Date.now() / 1000).toString(),
        type: 'text',
        text: {
          body: 'مرحباً! كيف حالك؟'
        }
      },
      {
        id: '2',
        from: '966501234567',
        to: '744540948737430',
        timestamp: (Math.floor(Date.now() / 1000) - 300).toString(),
        type: 'image',
        image: {
          id: 'image_123',
          mime_type: 'image/jpeg',
          sha256: 'abc123'
        }
      }
    ];

    setMessages(mockMessages);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* نموذج إرسال الرسائل */}
          <div>
            <SendMessageForm />
          </div>

          {/* قائمة الرسائل */}
          <div>
            <MessageList messages={messages} />
          </div>
        </div>

        {/* معلومات إضافية */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">إعدادات الويبهوك</h3>
            <p className="text-sm text-gray-600 mb-4">
              تأكد من إعداد الويبهوك في Facebook Developer Console
            </p>
            <div className="text-xs bg-gray-50 p-3 rounded">
              <p><strong>URL:</strong> https://your-domain.com/api/webhook</p>
              <p><strong>Verify Token:</strong> ammwag_webhook_2024</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">أنواع الرسائل المدعومة</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• رسائل نصية</li>
              <li>• صور</li>
              <li>• مستندات</li>
              <li>• رسائل صوتية</li>
              <li>• فيديو</li>
              <li>• مواقع</li>
              <li>• جهات اتصال</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">حالة الاتصال</h3>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">متصل</span>
            </div>
            <p className="text-xs text-gray-500">
              WhatsApp Cloud API يعمل بشكل طبيعي
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
