'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Award, User, ShoppingBag, Coins, Trophy, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const navItems = [
  { href: '/', label: 'Tarefas', icon: Award },
  { href: '/profile', label: 'Perfil', icon: User },
  { href: '/orders', label: 'Pedidos', icon: ShoppingBag },
  { href: '/ranking', label: 'Ranking', icon: Trophy },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 border-r bg-background">
      <div className="p-4 flex items-center justify-center h-16 border-b">
        <Link href="/" className="flex items-center gap-2">
            <Zap className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold text-foreground">TokRush</h1>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} passHref>
              <Button
                variant={isActive ? 'secondary' : 'ghost'}
                className="w-full justify-start gap-3"
                aria-current={isActive ? 'page' : undefined}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-base">{item.label}</span>
              </Button>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
