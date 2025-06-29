
'use client';

// This page was a temporary workaround and is no longer needed for local development.
// It can be safely deleted from your project after you download the code.

export default function DeprecatedDownloadPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="p-4 rounded-md bg-destructive text-destructive-foreground">
        <h1 className="text-2xl font-bold mb-2">Página Desativada</h1>
        <p>
          Esta página era uma solução temporária e não é mais necessária.
          Você pode apagar o arquivo <code>/src/app/download/page.tsx</code> com segurança
          assim que o projeto estiver funcionando no seu computador.
        </p>
      </div>
    </div>
  );
}
