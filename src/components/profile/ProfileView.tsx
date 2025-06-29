'use client';

import { useState } from 'react';
import type { User, Historico, TikTokProfile } from '@/lib/types';
import UserProfileCard from '@/components/profile/UserProfileCard';
import TaskHistory from '@/components/profile/TaskHistory';
import InviteCode from '@/components/profile/InviteCode';
import AccountManager from '@/components/profile/AccountManager';

interface ProfileViewProps {
  user: User;
  history: Historico[];
  deleteAccountAction: (profileId: string) => void;
}

export default function ProfileView({ user, history, deleteAccountAction }: ProfileViewProps) {
  const [selectedProfile, setSelectedProfile] = useState<TikTokProfile | null>(user.perfis_tiktok?.[0] || null);

  const handleSelectProfile = (profile: TikTokProfile) => {
    setSelectedProfile(profile);
  }

  // If the currently selected profile is deleted, select the first one again.
  if (selectedProfile && !user.perfis_tiktok.find(p => p.id === selectedProfile.id)) {
      setSelectedProfile(user.perfis_tiktok?.[0] || null);
  } else if (!selectedProfile && user.perfis_tiktok.length > 0) {
      setSelectedProfile(user.perfis_tiktok[0]);
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Seu Perfil</h1>
        <p className="text-muted-foreground">
          Veja suas estatísticas, histórico de tarefas e gerencie sua conta.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <UserProfileCard user={user} selectedProfile={selectedProfile} />
          <TaskHistory history={history} />
        </div>
        <div className="space-y-8">
          <AccountManager 
            accounts={user.perfis_tiktok}
            selectedProfileId={selectedProfile?.id}
            onSelectProfile={handleSelectProfile}
            deleteAccountAction={deleteAccountAction}
          />
          <InviteCode user={user} />
        </div>
      </div>
    </div>
  );
}
