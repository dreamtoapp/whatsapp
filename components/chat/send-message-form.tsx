'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Send, Phone, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import { sendMessage } from '../../actions/whatsapp/send-message';
import { toast } from 'sonner';

export function SendMessageForm() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await sendMessage(phoneNumber, message);

      if (response.success) {
        toast.success('تم إرسال الرسالة بنجاح!', {
          description: `تم إرسال الرسالة إلى ${phoneNumber}`,
          icon: <CheckCircle className="w-4 h-4" />,
        });
        setPhoneNumber('');
        setMessage('');
      } else {
        toast.error('فشل في إرسال الرسالة', {
          description: response.error || 'حدث خطأ أثناء إرسال الرسالة',
          icon: <AlertCircle className="w-4 h-4" />,
        });
      }
    } catch (error) {
      toast.error('خطأ غير متوقع', {
        description: 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
        icon: <AlertCircle className="w-4 h-4" />,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^966\d{9}$/;
    return phoneRegex.test(phone);
  };

  const isPhoneValid = phoneNumber && validatePhoneNumber(phoneNumber);
  const isFormValid = isPhoneValid && message.trim().length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          إرسال رسالة واتساب
        </CardTitle>
        <CardDescription>
          إرسال رسالة إلى أي رقم واتساب
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-foreground">
              رقم الهاتف
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
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
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                أدخل الرقم مع رمز البلد (مثال: 966501234567)
              </p>
              {phoneNumber && (
                <Badge variant={isPhoneValid ? "default" : "destructive"} className="text-xs">
                  {isPhoneValid ? "صحيح" : "غير صحيح"}
                </Badge>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-foreground">
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
            <p className="text-xs text-muted-foreground">
              {message.length} حرف
            </p>
          </div>

          <Button
            type="submit"
            disabled={isLoading || !isFormValid}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
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

        <div className="mt-4 p-3 bg-accent rounded-lg border border-border">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-accent-foreground" />
            <span className="text-sm font-medium text-accent-foreground">نصائح</span>
          </div>
          <ul className="text-xs text-accent-foreground space-y-1">
            <li>• تأكد من أن رقم الهاتف مسجل على واتساب</li>
            <li>• اكتب رمز البلد بدون + (مثال: 966501234567)</li>
            <li>• يتم إرسال الرسائل عبر واتساب Business API</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
} 