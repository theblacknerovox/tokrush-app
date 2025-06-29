'use client';

import ProfileView from '@/components/profile/ProfileView';
import type { Historico } from '@/lib/types';
import { useUser } from '@/contexts/UserContext';

export default function ProfilePage() {
  const { user, removeTikTokProfile } = useUser();
  
  // O histórico de tarefas está agora no objeto 'user'
  // mas como não temos um backend, simularemos o histórico a partir das tarefas completas
  const history: Historico[] = user?.tarefas_completas.map((taskId, index) => ({
      id: `hist-${index}`,
      user_id: user.id,
      tarefa_id: taskId,
      recompensa: 5, // Valor de exemplo
      data: new Date(),
      tipo: 'like', // Tipo de exemplo
  })).slice(-5) || [];

  if (!user) {
    return null; // Ou um esqueleto de carregamento
  }

  return (
    <ProfileView 
      user={user}
      history={history}
      deleteAccountAction={removeTikTokProfile}
    />
  );
}
