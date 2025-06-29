'use client';

import OrderHistory from '@/components/orders/OrderHistory';
import OrderForm from '@/components/orders/OrderForm';
import type { Pedido } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@/contexts/UserContext';

export default function OrdersPage() {
  const { user, addFollowers } = useUser();
  
  // Para a demonstração, os pedidos permanecem vazios.
  const orders: Pedido[] = [];

  if (!user) {
    return null; // Ou um esqueleto de carregamento
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Seus Pedidos</h1>
        <p className="text-muted-foreground">
          Crie novos pedidos de engajamento e acompanhe seu histórico.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
           <Card>
            <CardHeader>
              <CardTitle>Criar Novo Pedido</CardTitle>
              <CardDescription>Use suas moedas para ganhar seguidores, curtidas e mais.</CardDescription>
            </CardHeader>
            <CardContent>
              <OrderForm userCoins={user.coins} addFollowers={addFollowers} />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <OrderHistory orders={orders} />
        </div>
      </div>
    </div>
  );
}
