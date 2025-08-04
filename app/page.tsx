'use client';

import Image from 'next/image';
import { Header } from '../components/layout/header';
import { SendMessageForm } from '../components/chat/send-message-form';
import { MessageList } from '../components/chat/message-list';
import { TestMessageButton } from '../components/chat/test-message-button';
import { TestWebhookButton } from '../components/chat/test-webhook-button';
import { useMessages } from '../helpers/hooks/use-messages';
import { RefreshCw, MessageCircle, Settings, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Separator } from '../components/ui/separator';
import { Toaster } from '../components/ui/sonner';

export default function Home() {
  const { messages, loading, error, refetch } = useMessages();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Toaster />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <Image
              src="/logo.webp"
              alt="DreamToApp Logo"
              width={80}
              height={80}
              className="object-contain"
            />
            <h1 className="text-3xl font-bold text-foreground">لوحة تحكم واتساب API</h1>
          </div>
          <p className="text-muted-foreground">إدارة ومراقبة رسائل واتساب</p>
        </div>

        <Tabs defaultValue="messages" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              الرسائل
            </TabsTrigger>
            <TabsTrigger value="send" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              إرسال رسالة
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              الإعدادات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      الرسائل الحقيقية
                      <Badge variant={loading ? "secondary" : "default"}>
                        {messages.length} رسالة
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      الرسائل المستلمة من واتساب
                    </CardDescription>
                  </div>
                  <button
                    onClick={refetch}
                    disabled={loading}
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 transition-colors"
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    تحديث
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                {error && (
                  <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-md">
                    {error}
                  </div>
                )}
                <MessageList messages={messages} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="send" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>إرسال رسالة</CardTitle>
                  <CardDescription>
                    إرسال رسالة إلى أي رقم واتساب
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SendMessageForm />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>أدوات الاختبار</CardTitle>
                  <CardDescription>
                    اختبار الويبهوك ووظائف API
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <TestWebhookButton />
                  <TestMessageButton />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>إعدادات الويبهوك</CardTitle>
                  <CardDescription>
                    تكوين الويبهوك في لوحة تحكم ميتا
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-foreground">رابط الاستدعاء</label>
                      <p className="text-sm bg-muted p-2 rounded border border-border font-mono">
                        https://wp.dreamto.app/api/webhook
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">رمز التحقق</label>
                      <p className="text-sm bg-muted p-2 rounded border border-border font-mono">
                        ammwag_webhook_2024
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>أنواع الرسائل المدعومة</CardTitle>
                  <CardDescription>
                    جميع أنواع الرسائل التي يمكن إرسالها واستقبالها
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {['رسائل نصية', 'صور', 'مستندات', 'صوت', 'فيديو', 'موقع', 'جهات اتصال'].map((type) => (
                      <div key={type} className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>حالة الاتصال</CardTitle>
                  <CardDescription>
                    مراقبة اتصال واتساب API
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${loading ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                      <span className="text-sm text-foreground">
                        {loading ? 'جاري التحميل...' : 'متصل'}
                      </span>
                      <Badge variant={loading ? "secondary" : "default"}>
                        {loading ? 'تحميل' : 'متصل'}
                      </Badge>
                    </div>
                    <Separator />
                    <div className="text-sm text-muted-foreground">
                      <p>واتساب Cloud API يعمل بشكل طبيعي</p>
                      <p className="mt-1">عدد الرسائل: {messages.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
