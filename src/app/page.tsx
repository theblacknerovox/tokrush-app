
'use client';

import { useState, useEffect } from 'react';
import TaskList from '@/components/tasks/TaskList';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { Coins, Trophy, CheckCheck, Gift } from 'lucide-react';
import type { Tarefa, TaskType } from '@/lib/types';
import ClientFormattedNumber from '@/components/common/ClientFormattedNumber';
import { mockTasks } from '@/lib/mock-data';
import { useUser } from '@/contexts/UserContext';

const bonusTasksData: Tarefa[] = [
    {
        id: 'bonus-1',
        tipo: 'follow',
        url: 'https://www.tiktok.com/@family_guy_semfiltro',
        valor: 10,
        user_alvo: 'family_guy_semfiltro',
        status: 'ativa',
        data_criacao: new Date(),
    },
    {
        id: 'bonus-2',
        tipo: 'like',
        url: 'https://www.tiktok.com/@family_guy_semfiltro/video/7519650393714969912',
        valor: 10,
        user_alvo: 'family_guy_semfiltro',
        status: 'ativa',
        data_criacao: new Date(),
    },
    {
        id: 'bonus-3',
        tipo: 'comment',
        url: 'https://www.tiktok.com/@family_guy_semfiltro/video/7519650393714969912',
        valor: 10,
        user_alvo: 'family_guy_semfiltro',
        status: 'ativa',
        data_criacao: new Date(),
    },
     {
        id: 'bonus-4',
        tipo: 'view',
        url: 'https://www.tiktok.com/@family_guy_semfiltro/video/7519650393714969912',
        valor: 20,
        user_alvo: 'family_guy_semfiltro',
        status: 'ativa',
        data_criacao: new Date(),
    },
];

export default function HomePage() {
  const { user, addCoins, completeTask, incrementFollowing } = useUser();
  const [tasks, setTasks] = useState<Tarefa[]>([]);
  const [isBonusRound, setIsBonusRound] = useState(false);
  const [completedBonusTaskCount, setCompletedBonusTaskCount] = useState(0);
  
  useEffect(() => {
    if (!user) return; // Wait for user to be loaded

    const isFirstTime = localStorage.getItem('firstTime') === 'true';
    setIsBonusRound(isFirstTime);
    
    // Determine how many bonus tasks were already completed in previous sessions
    const alreadyCompletedBonusCount = bonusTasksData.filter(bt => user.tarefas_completas.includes(bt.id)).length;
    setCompletedBonusTaskCount(alreadyCompletedBonusCount);

    if (isFirstTime) {
      // Filter out any bonus tasks that might have been completed before a page refresh
      const remainingBonusTasks = bonusTasksData.filter(task => !user.tarefas_completas.includes(task.id));
      setTasks(remainingBonusTasks);
    } else {
      setTasks(mockTasks.filter(task => !user.tarefas_completas.includes(task.id)));
    }
  }, [user]);

  const handleTaskComplete = (taskId: string, reward: number, taskType: TaskType) => {
    addCoins(reward);
    completeTask(taskId);
    if (taskType === 'follow') {
      incrementFollowing();
    }
    setTasks(currentTasks => currentTasks.filter(t => t.id !== taskId));

    if (isBonusRound) {
        setCompletedBonusTaskCount(prev => prev + 1);
    }
  };

  const finishBonusRound = () => {
      localStorage.setItem('firstTime', 'false');
      setIsBonusRound(false);
      setTasks(mockTasks.filter(task => !user?.tarefas_completas.includes(task.id)));
  }
  
  const bonusTasksRemaining = tasks.filter(t => t.id.startsWith('bonus-')).length;

  if (!user) {
    return null; // Handled by UserProvider
  }

  const pageTitle = isBonusRound ? "Tarefas Bônus de Boas-Vindas!" : "Tarefas da Comunidade";
  const pageDescription = isBonusRound 
    ? "Complete estas tarefas iniciais para ganhar suas primeiras moedas." 
    : "Complete estas tarefas para ganhar mais moedas. Novas tarefas são adicionadas regularmente.";

  return (
    <div className="container mx-auto py-8">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suas Moedas</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold"><ClientFormattedNumber value={user.coins} /></div>
            <p className="text-xs text-muted-foreground">Prontas para gastar</p>
          </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Seu Nível</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{user.nivel}</div>
                <p className="text-xs text-muted-foreground">Continue assim para subir!</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tarefas Concluídas</CardTitle>
                <CheckCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold"><ClientFormattedNumber value={user.tarefas_completas.length} /></div>
                <p className="text-xs text-muted-foreground">Total de tarefas feitas</p>
            </CardContent>
        </Card>
      </div>
      
      {/* Title and Description */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold md:text-3xl mb-2">{pageTitle}</h1>
        <p className="text-muted-foreground">
          {pageDescription}
        </p>
      </div>

      {/* Bonus round confirmation card */}
      {isBonusRound && (
          <Card className="mb-8 bg-primary/10 border-primary">
              <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                      <Gift className="text-primary"/>
                      <span>Progresso do Bônus</span>
                  </CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="text-muted-foreground">
                      Você completou {completedBonusTaskCount} de {bonusTasksData.length} tarefas bônus.
                  </p>
              </CardContent>
              {bonusTasksRemaining === 0 && (
                  <CardFooter>
                      <Button onClick={finishBonusRound} className="w-full">
                          Ótimo! Ir para as tarefas da comunidade
                      </Button>
                  </CardFooter>
              )}
          </Card>
      )}

      {/* Task List */}
      <TaskList 
        tasks={tasks}
        onTaskComplete={handleTaskComplete}
      />
    </div>
  );
}
