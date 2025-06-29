import type { Tarefa, User } from '@/lib/types';

// O modelo base para um novo usuário. Os dados reais serão preenchidos
// a partir do localStorage durante a inicialização do app.
export const mockUser: User = {
  id: 'user_1',
  username: 'novo_usuario',
  perfis_tiktok: [],
  coins: 0,
  followers: 0,
  following: 0,
  tarefas_completas: [],
  data_criacao: new Date(),
  nivel: 1,
  tarefas_diarias: 0,
  ultima_tarefa_data: new Date(),
  tutorial_completo: false,
  codigo_convite: undefined
};

// Tarefas regulares que aparecem após o onboarding.
export const mockTasks: Tarefa[] = [
    {
        id: 'task-1',
        tipo: 'follow',
        url: 'https://www.tiktok.com/@neymarjr',
        valor: 10,
        user_alvo: 'neymarjr',
        status: 'ativa',
        data_criacao: new Date(),
        criador_id: 'user_2',
    },
    {
        id: 'task-2',
        tipo: 'like',
        url: 'https://www.tiktok.com/@khaby.lame/video/7074123412341234123',
        valor: 5,
        user_alvo: 'khaby.lame',
        status: 'ativa',
        data_criacao: new Date(),
        criador_id: 'user_3',
    },
    {
        id: 'task-3',
        tipo: 'comment',
        url: 'https://www.tiktok.com/@luvadepedreiro/video/7074123412341234123',
        valor: 8,
        user_alvo: 'luvadepedreiro',
        status: 'ativa',
        data_criacao: new Date(),
        criador_id: 'user_4',
    },
     {
        id: 'task-4',
        tipo: 'view',
        url: 'https://www.tiktok.com/@virginiafonseca/video/7074123412341234123',
        valor: 2,
        user_alvo: 'virginiafonseca',
        status: 'ativa',
        data_criacao: new Date(),
        criador_id: 'user_5',
    },
];
