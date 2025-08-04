'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { MessageSquare } from 'lucide-react';

export function TestMessageButton() {
  const [isLoading, setIsLoading] = useState(false);

  const addTestMessage = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/test-message', {
        method: 'POST',
      });

      if (response.ok) {
        console.log('تم إضافة رسالة تجريبية');
        // تحديث الصفحة بعد ثانيتين
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        console.error('خطأ في إضافة الرسالة التجريبية');
      }
    } catch (error) {
      console.error('خطأ في الاتصال:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={addTestMessage}
      disabled={isLoading}
      variant="outline"
      className="w-full mb-4"
    >
      <MessageSquare className="w-4 h-4 mr-2" />
      {isLoading ? 'جاري الإضافة...' : 'إضافة رسالة تجريبية'}
    </Button>
  );
} 