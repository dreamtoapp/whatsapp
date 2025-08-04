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
        console.log('✅ نجح اختبار الويبهوك:', data);

        // انتظار قليلاً ثم تحديث الصفحة
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        console.error('❌ فشل اختبار الويبهوك');
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
      className="w-full mb-4 bg-accent border-border text-accent-foreground hover:bg-accent/80"
    >
      <Webhook className="w-4 h-4 mr-2" />
      {isLoading ? 'جاري اختبار الويبهوك...' : 'اختبار الويبهوك'}
    </Button>
  );
} 