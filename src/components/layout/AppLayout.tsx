
import React, { type ReactNode } from 'react';
import AppSidebar from './AppSidebar';
import MobileHeader from './MobileHeader';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-secondary/50">
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <MobileHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
