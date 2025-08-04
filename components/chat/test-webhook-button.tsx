'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Webhook } from 'lucide-react';

export function TestWebhookButton() {
  const [isLoading, setIsLoading] = useState(false);

  const testWebhook = async () => {
    setIsLoading(true);
    try {
      console.log('🧪 بدء اختبار الويبهوك...');

      const response = await fetch('/api/test-webhook', {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ اختبار الويبهوك نجح:', data);

        // انتظار قليلاً ثم تحديث الصفحة
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        console.error('❌ خطأ في اختبار الويبهوك');
      }
    } catch (error) {
      console.error('❌ خطأ في الاتصال:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={testWebhook}
      disabled={isLoading}
      variant="outline"
      className="w-full mb-4 bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
    >
      <Webhook className="w-4 h-4 mr-2" />
      {isLoading ? 'جاري اختبار الويبهوك...' : 'اختبار الويبهوك'}
    </Button>
  );
} 