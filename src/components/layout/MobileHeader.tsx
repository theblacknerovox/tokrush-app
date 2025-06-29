
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Award, User, ShoppingBag, Coins, Trophy, Zap, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const navItems = [
  { href: '/', label: 'Tarefas', icon: Award },
  { href: '/profile', label: 'Perfil', icon: User },
  { href: '/orders', label: 'Pedidos', icon: ShoppingBag },
  { href: '/ranking', label: 'Ranking', icon: Trophy },
];

export default function MobileHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:hidden">
      <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
        <Zap className="h-6 w-6 text-primary" />
        <span className="font-bold">TokRush</span>
      </Link>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <SheetHeader>
            <SheetTitle asChild>
              <Link
                href="/"
                className="flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <Zap className="h-6 w-6 text-primary" />
                <span className="font-bold">TokRush</span>
              </Link>
            </SheetTitle>
          </SheetHeader>
          <nav className="grid gap-2 text-lg font-medium py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'flex items-center gap-4 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                  pathname === item.href && 'bg-muted text-primary'
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
