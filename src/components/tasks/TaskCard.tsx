
'use client';

import { useState } from 'react';
import { Heart, MessageSquare, UserPlus, Coins, CheckCircle2, Eye } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import type { Tarefa, TaskType } from '@/lib/types';

const taskIcons: { [key: string]: React.ReactNode } = {
  follow: <UserPlus className="h-4 w-4" />,
  like: <Heart className="h-4 w-4" />,
  comment: <MessageSquare className="h-4 w-4" />,
  view: <Eye className="h-4 w-4" />,
};

const taskTypeTranslations: { [key: string]: string } = {
  follow: 'Seguir',
  like: 'Curtir',
  comment: 'Comentar',
  view: 'Visualizar',
};

interface TaskCardProps {
  task: Tarefa;
  onComplete: (taskId: string, reward: number, taskType: TaskType) => void;
}

export default function TaskCard({ task, onComplete }: TaskCardProps) {
  const [taskState, setTaskState] = useState<{ linkOpened: boolean; openTime: number | null }>({
    linkOpened: false,
    openTime: null,
  });
  const { toast } = useToast();

  const handleOpenLink = () => {
    setTaskState({ linkOpened: true, openTime: Date.now() });
  };

  const handleCompleteTask = () => {
    if (taskState.openTime) {
      const timeElapsed = (Date.now() - taskState.openTime) / 1000; // seconds
      if (timeElapsed < 10) {
        toast({
          title: 'Ação Inválida',
          description: 'Você precisa esperar pelo menos 10 segundos para validar a tarefa. Isso garante que a ação foi realizada corretamente.',
          variant: 'destructive',
        });
        return;
      }
    }

    toast({
      title: 'Recompensa Recebida!',
      description: `Você ganhou ${task.valor} moedas!`,
    });
    onComplete(task.id, task.valor, task.tipo);
  };

  return (
    <Card className="flex flex-col transition-all hover:shadow-lg hover:border-primary">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="flex items-center gap-2">
                    {taskIcons[task.tipo]}
                    <span>Tarefa de {taskTypeTranslations[task.tipo] ?? task.tipo}</span>
                </CardTitle>
                <CardDescription>Alvo: @{task.user_alvo}</CardDescription>
            </div>
            <Badge variant="secondary" className="flex items-center gap-1.5">
                <Coins className="h-3 w-3 text-amber-500" />
                +{task.valor}
            </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">
          {taskState.linkOpened
            ? "Ótimo! Se você já completou a tarefa, clique em 'Concluído' para receber sua recompensa."
            : `Clique no botão para abrir o link da tarefa. Depois de completá-la, volte aqui e confirme.`}
        </p>
      </CardContent>
      <CardFooter className="flex-col items-stretch gap-2">
        {!taskState.linkOpened ? (
          <Button asChild className="w-full">
            <a
              href={task.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleOpenLink}
            >
              Fazer Tarefa
            </a>
          </Button>
        ) : (
          <Button onClick={handleCompleteTask} className="w-full bg-green-600 hover:bg-green-700">
            {'Concluído'}
            <CheckCircle2 className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
