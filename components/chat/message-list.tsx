'use client';

import { useState, useEffect } from 'react';
import { WhatsAppMessage } from '../../helpers/types/whatsapp';
import { MessageSquare, User, Bot, Image, File, MapPin, Phone, Clock } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Separator } from '../ui/separator';

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

  const getMessageTypeColor = (type: string) => {
    switch (type) {
      case 'image':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'document':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
      case 'location':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'contact':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const getMessageTypeText = (type: string) => {
    switch (type) {
      case 'image':
        return 'صورة';
      case 'document':
        return 'مستند';
      case 'location':
        return 'موقع';
      case 'contact':
        return 'جهة اتصال';
      case 'audio':
        return 'رسالة صوتية';
      case 'video':
        return 'رسالة فيديو';
      default:
        return 'نص';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(parseInt(timestamp) * 1000).toLocaleString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPhoneNumber = (phone: string) => {
    return phone.replace('966', '+966 ');
  };

  const getInitials = (phone: string) => {
    return phone.slice(-2).toUpperCase();
  };

  if (messages.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium text-foreground mb-2">لا توجد رسائل بعد</h3>
          <p className="text-muted-foreground">ستظهر الرسائل هنا عند استلامها</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <Card key={message.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className={message.from.startsWith('966') ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}>
                  {getInitials(message.from)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">
                      {formatPhoneNumber(message.from)}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {message.from.startsWith('966') ? 'مستخدم' : 'عمل'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {formatTimestamp(message.timestamp)}
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  {getMessageIcon(message.type)}
                  <Badge variant="secondary" className={getMessageTypeColor(message.type)}>
                    {getMessageTypeText(message.type)}
                  </Badge>
                </div>

                <div className="text-sm text-foreground">
                  {message.type === 'text' && message.text && (
                    <p className="bg-muted p-3 rounded-lg border border-border">{message.text.body}</p>
                  )}

                  {message.type === 'image' && message.image && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border dark:border-blue-800">
                      <div className="flex items-center gap-2">
                        <Image className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span className="font-medium">صورة</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        النوع: {message.image.mime_type}
                      </p>
                    </div>
                  )}

                  {message.type === 'document' && message.document && (
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border dark:border-purple-800">
                      <div className="flex items-center gap-2">
                        <File className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        <span className="font-medium">مستند</span>
                      </div>
                      <p className="text-sm font-medium mt-1">{message.document.filename}</p>
                      <p className="text-xs text-muted-foreground">
                        النوع: {message.document.mime_type}
                      </p>
                    </div>
                  )}

                  {message.type === 'audio' && message.audio && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border dark:border-yellow-800">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">رسالة صوتية</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        النوع: {message.audio.mime_type}
                      </p>
                    </div>
                  )}

                  {message.type === 'video' && message.video && (
                    <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border dark:border-red-800">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">رسالة فيديو</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        النوع: {message.video.mime_type}
                      </p>
                    </div>
                  )}

                  {message.type === 'location' && message.location && (
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border dark:border-green-800">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-green-600 dark:text-green-400" />
                        <span className="font-medium">موقع</span>
                      </div>
                      <p className="text-sm mt-1">
                        {message.location.latitude}, {message.location.longitude}
                      </p>
                    </div>
                  )}

                  {message.type === 'contact' && message.contacts && message.contacts[0] && (
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg border dark:border-orange-800">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                        <span className="font-medium">جهة اتصال</span>
                      </div>
                      <p className="font-medium mt-1">
                        {message.contacts[0].name.formatted_name}
                      </p>
                      {message.contacts[0].phones.map((phone, index) => (
                        <p key={index} className="text-sm text-muted-foreground">
                          {phone.phone}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 