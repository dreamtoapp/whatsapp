'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Send, Phone, MessageSquare } from 'lucide-react';
import { sendMessage } from '../../actions/whatsapp/send-message';

export function SendMessageForm() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    try {
      const response = await sendMessage(phoneNumber, message);

      if (response.success) {
        setResult({ success: true, message: 'تم إرسال الرسالة بنجاح!' });
        setPhoneNumber('');
        setMessage('');
      } else {
        setResult({ success: false, message: response.error || 'حدث خطأ في إرسال الرسالة' });
      }
    } catch (error) {
      setResult({ success: false, message: 'حدث خطأ غير متوقع' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="w-6 h-6 text-green-600" />
        <h2 className="text-xl font-semibold text-gray-800">إرسال رسالة WhatsApp</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            رقم الجوال
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              id="phone"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="966501234567"
              className="pl-10"
              required
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            أدخل الرقم مع رمز الدولة (مثال: 966501234567)
          </p>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            الرسالة
          </label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="اكتب رسالتك هنا..."
            rows={4}
            required
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              جاري الإرسال...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              إرسال الرسالة
            </div>
          )}
        </Button>
      </form>

      {result && (
        <div
          className={`mt-4 p-3 rounded-md ${result.success
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
            }`}
        >
          {result.message}
        </div>
      )}
    </div>
  );
} 