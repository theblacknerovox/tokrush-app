'use client';

import type { Tarefa, TaskType } from '@/lib/types';
import TaskCard from './TaskCard';

interface TaskListProps {
  tasks: Tarefa[];
  onTaskComplete: (taskId: string, reward: number, taskType: TaskType) => void;
}

export default function TaskList({ tasks, onTaskComplete }: TaskListProps) {
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskCard key={task.id} task={task} onComplete={onTaskComplete} />
        ))
      ) : (
        <div className="col-span-full text-center py-16 bg-card rounded-lg">
            <h3 className="text-xl font-semibold">Tudo em dia!</h3>
            <p className="text-muted-foreground mt-2">
                Nenhuma nova tarefa disponível no momento. Volte mais tarde!
            </p>
        </div>
      )}
    </div>
  );
}
