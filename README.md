# WhatsApp Cloud API Application

تطبيق Next.js لإدارة رسائل WhatsApp باستخدام WhatsApp Cloud API.

## المميزات

- ✅ إرسال رسائل نصية
- ✅ استقبال الرسائل عبر Webhook
- ✅ واجهة مستخدم عربية جميلة
- ✅ دعم أنواع مختلفة من الرسائل (نص، صور، مستندات، صوت، فيديو، مواقع، جهات اتصال)
- ✅ تحقق من صحة أرقام الجوال
- ✅ معالجة الأخطاء

## التثبيت

1. تثبيت المكتبات:
```bash
pnpm install
```

2. إنشاء ملف `.env.local`:
```bash
cp env.example .env.local
```

3. تحديث المتغيرات البيئية في `.env.local`:
```env
WHATSAPP_PERMANENT_TOKEN=your_token_here
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_BUSINESS_ACCOUNT_ID=your_business_account_id
WHATSAPP_WEBHOOK_VERIFY_TOKEN=ammwag_webhook_2024
WHATSAPP_APP_SECRET=your_app_secret
WHATSAPP_API_VERSION=v23.0
WHATSAPP_ENVIRONMENT=production
```

## تشغيل التطبيق

```bash
pnpm dev
```

افتح [http://localhost:3000](http://localhost:3000) في المتصفح.

## إعداد Webhook

1. اذهب إلى [Facebook Developer Console](https://developers.facebook.com/)
2. اختر تطبيقك
3. اذهب إلى WhatsApp > Configuration
4. أضف Webhook URL:
   - URL: `https://your-domain.com/api/webhook`
   - Verify Token: `ammwag_webhook_2024`

## هيكل المشروع

```
wpapi/
├── app/
│   ├── api/webhook/     # Webhook endpoints
│   ├── page.tsx         # الصفحة الرئيسية
│   └── layout.tsx       # تخطيط التطبيق
├── components/
│   ├── ui/              # مكونات واجهة المستخدم الأساسية
│   ├── chat/            # مكونات المحادثة
│   └── layout/          # مكونات التخطيط
├── actions/
│   └── whatsapp/        # إجراءات WhatsApp API
├── helpers/
│   ├── types/           # أنواع TypeScript
│   └── utils/           # دوال مساعدة
└── public/              # الملفات العامة
```

## API Endpoints

### POST /api/webhook
يستقبل رسائل WhatsApp من Facebook.

### GET /api/webhook
يستخدم للتحقق من صحة Webhook.

## استخدام التطبيق

1. **إرسال رسالة**: أدخل رقم الجوال والرسالة واضغط "إرسال الرسالة"
2. **عرض الرسائل**: ستظهر الرسائل المستلمة في القسم الأيمن
3. **مراقبة الحالة**: تحقق من حالة الاتصال في الأسفل

## أنواع الرسائل المدعومة

- رسائل نصية
- صور
- مستندات
- رسائل صوتية
- فيديو
- مواقع جغرافية
- جهات اتصال

## الأمان

- تحقق من صحة أرقام الجوال
- تشفير البيانات الحساسة
- معالجة آمنة للأخطاء

## المساهمة

1. Fork المشروع
2. أنشئ branch جديد
3. اكتب التغييرات
4. أرسل Pull Request

## الترخيص

MIT License
# whatsapp
