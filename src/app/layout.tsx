
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import AppLayout from '@/components/layout/AppLayout';
import ServiceWorkerRegistrar from '@/components/pwa/ServiceWorkerRegistrar';
import { UserProvider } from '@/contexts/UserContext';


export const metadata: Metadata = {
  title: 'TokRush',
  description: 'Complete tarefas e ganhe recompensas!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="pt-BR" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className="font-body antialiased">
          <ServiceWorkerRegistrar />
          <UserProvider>
            <AppLayout>
              {children}
            </AppLayout>
          </UserProvider>
          <Toaster />
      </body>
    </html>
  );
}
