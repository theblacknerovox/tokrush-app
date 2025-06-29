'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegistrar() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(reg => console.log("Service Worker registrado", reg))
          .catch(err => console.error("Erro no Service Worker", err));
      });
    }
  }, []);

  return null; // This component doesn't render anything
}
