import { ModeToggle } from '../mode-toggle';
import Image from 'next/image';

export function Header() {
  return (
    <header className="bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden border border-border">
              <Image
                src="/logo.webp"
                alt="DreamToApp Logo"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">واجهة واتساب API</h1>
              <p className="text-sm text-muted-foreground">إدارة الرسائل والويبهوك</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
} 