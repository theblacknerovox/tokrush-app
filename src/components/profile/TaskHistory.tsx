'use client';

import { useState, useEffect } from 'react';
import type { Historico } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageSquare, UserPlus, Coins, Eye } from 'lucide-react';

const taskIcons: { [key: string]: React.ReactNode } = {
  follow: <UserPlus className="h-4 w-4 text-muted-foreground" />,
  like: <Heart className="h-4 w-4 text-muted-foreground" />,
  comment: <MessageSquare className="h-4 w-4 text-muted-foreground" />,
  view: <Eye className="h-4 w-4 text-muted-foreground" />,
};

const taskTypeTranslations: { [key: string]: string } = {
  follow: 'Seguir',
  like: 'Curtir',
  comment: 'Comentar',
  view: 'Visualização',
};

export default function TaskHistory({ history }: { history: Historico[] }) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Atividade Recente</CardTitle>
        <CardDescription>Suas últimas 5 tarefas concluídas.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead>
              <TableHead>Recompensa</TableHead>
              <TableHead className="text-right">Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.length > 0 ? history.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {taskIcons[item.tipo]}
                    <span>{taskTypeTranslations[item.tipo] ?? item.tipo}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="flex items-center gap-1.5">
                    <Coins className="h-3 w-3 text-amber-500" />
                    +{item.recompensa}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-sm text-muted-foreground">
                  {isClient ? new Date(item.data).toLocaleDateString() : ''}
                </TableCell>
              </TableRow>
            )) : (
                <TableRow>
                    <TableCell colSpan={3} className="text-center h-24 text-muted-foreground">
                        Nenhuma atividade recente. Vá completar algumas tarefas!
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
