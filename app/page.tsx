'use client';

import { Header } from '../components/layout/header';
import { SendMessageForm } from '../components/chat/send-message-form';
import { MessageList } from '../components/chat/message-list';
import { TestMessageButton } from '../components/chat/test-message-button';
import { TestWebhookButton } from '../components/chat/test-webhook-button';
import { useMessages } from '../helpers/hooks/use-messages';
import { RefreshCw } from 'lucide-react';

export default function Home() {
  const { messages, loading, error, refetch } = useMessages();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* نموذج إرسال الرسائل */}
          <div>
            <SendMessageForm />

            {/* أزرار الاختبار */}
            <div className="mt-4 space-y-2">
              <TestWebhookButton />
              <TestMessageButton />
            </div>
          </div>

          {/* قائمة الرسائل */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">الرسائل الحقيقية</h2>
              <button
                onClick={refetch}
                disabled={loading}
                className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                تحديث
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded-md">
                {error}
              </div>
            )}

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
              <p><strong>URL:</strong> https://wp.dreamto.app/api/webhook</p>
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
              <div className={`w-3 h-3 rounded-full ${loading ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
              <span className="text-sm text-gray-700">
                {loading ? 'جاري التحميل...' : 'متصل'}
              </span>
            </div>
            <p className="text-xs text-gray-500">
              {loading ? 'جاري جلب الرسائل...' : 'WhatsApp Cloud API يعمل بشكل طبيعي'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              عدد الرسائل: {messages.length}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
