'use client';

import { useState, useEffect } from 'react';
import { WhatsAppMessage } from '../../helpers/types/whatsapp';
import { MessageSquare, User, Bot, Image, File, MapPin, Phone } from 'lucide-react';

interface MessageListProps {
  messages: WhatsAppMessage[];
}

export function MessageList({ messages }: MessageListProps) {
  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="w-4 h-4" />;
      case 'document':
        return <File className="w-4 h-4" />;
      case 'location':
        return <MapPin className="w-4 h-4" />;
      case 'contact':
        return <Phone className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(parseInt(timestamp) * 1000).toLocaleString('ar-SA');
  };

  const formatPhoneNumber = (phone: string) => {
    return phone.replace('966', '+966 ');
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-green-600 text-white p-4">
          <h2 className="text-lg font-semibold">رسائل WhatsApp</h2>
          <p className="text-sm opacity-90">آخر الرسائل المستلمة</p>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>لا توجد رسائل بعد</p>
              <p className="text-sm">ستظهر الرسائل المستلمة هنا</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {messages.map((message) => (
                <div key={message.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      {message.from.startsWith('966') ? (
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-green-600" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Bot className="w-4 h-4 text-blue-600" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-gray-900">
                          {formatPhoneNumber(message.from)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatTimestamp(message.timestamp)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        {getMessageIcon(message.type)}
                        <span className="text-xs text-gray-500 capitalize">
                          {message.type}
                        </span>
                      </div>

                      <div className="text-sm text-gray-700">
                        {message.type === 'text' && message.text && (
                          <p>{message.text.body}</p>
                        )}

                        {message.type === 'image' && message.image && (
                          <div className="flex items-center gap-2">
                            <span>صورة</span>
                            <span className="text-xs text-gray-500">
                              ({message.image.mime_type})
                            </span>
                          </div>
                        )}

                        {message.type === 'document' && message.document && (
                          <div className="flex items-center gap-2">
                            <span>مستند: {message.document.filename}</span>
                            <span className="text-xs text-gray-500">
                              ({message.document.mime_type})
                            </span>
                          </div>
                        )}

                        {message.type === 'audio' && message.audio && (
                          <div className="flex items-center gap-2">
                            <span>رسالة صوتية</span>
                            <span className="text-xs text-gray-500">
                              ({message.audio.mime_type})
                            </span>
                          </div>
                        )}

                        {message.type === 'video' && message.video && (
                          <div className="flex items-center gap-2">
                            <span>فيديو</span>
                            <span className="text-xs text-gray-500">
                              ({message.video.mime_type})
                            </span>
                          </div>
                        )}

                        {message.type === 'location' && message.location && (
                          <div className="flex items-center gap-2">
                            <span>موقع</span>
                            <span className="text-xs text-gray-500">
                              ({message.location.latitude}, {message.location.longitude})
                            </span>
                          </div>
                        )}

                        {message.type === 'contact' && message.contacts && message.contacts[0] && (
                          <div>
                            <p className="font-medium">
                              {message.contacts[0].name.formatted_name}
                            </p>
                            {message.contacts[0].phones.map((phone, index) => (
                              <p key={index} className="text-sm text-gray-600">
                                {phone.phone}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 