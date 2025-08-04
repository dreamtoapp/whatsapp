import { WhatsAppMessage } from '../types/whatsapp';

// في التطبيق الحقيقي، استخدم قاعدة بيانات
export let messages: WhatsAppMessage[] = [];

export function addMessage(message: WhatsAppMessage) {
  console.log('💾 إضافة رسالة للمخزن:', message.id);
  console.log('   📱 من:', message.from);
  console.log('   💬 المحتوى:', message.text?.body || 'غير نصي');

  messages.unshift(message);

  console.log('📊 عدد الرسائل في المخزن:', messages.length);

  // الاحتفاظ بآخر 100 رسالة فقط
  if (messages.length > 100) {
    console.log('🧹 حذف الرسائل القديمة (الاحتفاظ بآخر 100)');
    messages = messages.slice(0, 100);
  }

  console.log('✅ تم حفظ الرسالة بنجاح في المخزن');
}

export function getMessages(): WhatsAppMessage[] {
  console.log('📤 جلب الرسائل من المخزن:', messages.length, 'رسالة');
  return messages;
}

export function clearMessages() {
  console.log('🗑️ مسح جميع الرسائل من المخزن');
  messages = [];
} 