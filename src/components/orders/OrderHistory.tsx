
'use client';

import { useState, useEffect } from 'react';
import type { Pedido } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Calendar, Hash, Link as LinkIcon, UserPlus, Heart, MessageSquare, Eye } from 'lucide-react';

const statusTranslations: { [key: string]: string } = {
  'concluído': 'Concluído',
  'pendente': 'Pendente',
};

const typeTranslations: { [key: string]: string } = {
  'follower': 'Seguidor',
  'like': 'Curtida',
  'comment': 'Comentário',
  'view': 'Visualização',
};

const typeIcons: { [key: string]: React.ReactNode } = {
  follower: <UserPlus className="h-4 w-4 text-muted-foreground" />,
  like: <Heart className="h-4 w-4 text-muted-foreground" />,
  comment: <MessageSquare className="h-4 w-4 text-muted-foreground" />,
  view: <Eye className="h-4 w-4 text-muted-foreground" />,
};


export default function OrderHistory({ orders }: { orders: Pedido[] }) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Pedidos</CardTitle>
        <CardDescription>Um registro de todos os seus pedidos enviados.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Mobile View: Cards */}
        <div className="space-y-4 md:hidden">
          {orders.length > 0 ? orders.map((order) => (
            <div key={order.id} className="rounded-lg border bg-card p-4 space-y-3">
               <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-semibold">
                    {typeIcons[order.tipo]}
                    <span>{typeTranslations[order.tipo] ?? order.tipo}</span>
                </div>
                <Badge
                    className={cn(
                      'text-white',
                      order.status === 'concluído' && 'bg-green-500 hover:bg-green-600',
                      order.status === 'pendente' && 'bg-amber-500 hover:bg-amber-600',
                    )}
                  >
                    {statusTranslations[order.status] ?? order.status}
                </Badge>
               </div>

              <div className="text-sm text-muted-foreground space-y-2">
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4" /> 
                  <span>Quantidade:</span>
                  <span className="font-medium text-foreground">{order.quantidade}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Data:</span>
                  <span className="font-medium text-foreground">{isClient ? new Date(order.data_solicitacao).toLocaleDateString() : ''}</span>
                </div>
                <div className="flex items-start gap-2">
                    <LinkIcon className="h-4 w-4 mt-0.5" />
                    <a href={order.link_tiktok} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate block flex-1">
                      {order.link_tiktok}
                    </a>
                </div>
              </div>

            </div>
          )) : (
            <div className="text-center h-24 flex items-center justify-center">
              <p className="text-muted-foreground">Você ainda não fez nenhum pedido.</p>
            </div>
          )}
        </div>
        
        {/* Desktop View: Table */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Link</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.length > 0 ? orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{typeTranslations[order.tipo] ?? order.tipo}</TableCell>
                  <TableCell>{order.quantidade}</TableCell>
                  <TableCell>
                      <a href={order.link_tiktok} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate block max-w-xs">
                          {order.link_tiktok}
                      </a>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        'text-white',
                        order.status === 'concluído' && 'bg-green-500 hover:bg-green-600',
                        order.status === 'pendente' && 'bg-amber-500 hover:bg-amber-600',
                      )}
                    >
                      {statusTranslations[order.status] ?? order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {isClient ? new Date(order.data_solicitacao).toLocaleDateString() : ''}
                  </TableCell>
                </TableRow>
              )) : (
                  <TableRow>
                      <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                          Você ainda não fez nenhum pedido.
                      </TableCell>
                  </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
