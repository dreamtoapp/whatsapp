import { useState, useEffect } from 'react';
import { WhatsAppMessage } from '../types/whatsapp';

export function useMessages() {
  const [messages, setMessages] = useState<WhatsAppMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      console.log('🔄 جاري جلب الرسائل...');

      const response = await fetch('/api/messages');

      if (response.ok) {
        const data = await response.json();
        const newMessages = data.messages || [];

        console.log('📨 الرسائل المستلمة:', newMessages);
        console.log('📊 عدد الرسائل:', newMessages.length);

        // مقارنة مع الرسائل السابقة
        if (newMessages.length > messages.length) {
          const latestMessage = newMessages[0]; // أول رسالة (الأحدث)
          console.log('🆕 رسالة جديدة:', latestMessage);
          console.log('📱 من:', latestMessage.from);
          console.log('💬 المحتوى:', latestMessage.text?.body || 'غير نصي');
          console.log('⏰ الوقت:', new Date(parseInt(latestMessage.timestamp) * 1000).toLocaleString('ar-SA'));
        }

        setMessages(newMessages);
      } else {
        console.error('❌ خطأ في جلب الرسائل:', response.status);
        setError('خطأ في جلب الرسائل');
      }
    } catch (err) {
      console.error('❌ خطأ في الاتصال:', err);
      setError('خطأ في الاتصال');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('🚀 بدء مراقبة الرسائل...');
    fetchMessages();

    // تحديث الرسائل كل 3 ثوانٍ (أسرع للمراقبة)
    const interval = setInterval(() => {
      console.log('⏰ تحديث تلقائي للرسائل...');
      fetchMessages();
    }, 3000);

    return () => {
      console.log('🛑 إيقاف مراقبة الرسائل');
      clearInterval(interval);
    };
  }, []);

  return { messages, loading, error, refetch: fetchMessages };
} 