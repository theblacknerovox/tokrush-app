'use client';

import { useState, useEffect } from 'react';
import type { User, TikTokProfile } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Coins, UserCheck, UserPlus, Trophy } from 'lucide-react';
import ClientFormattedNumber from '@/components/common/ClientFormattedNumber';

interface UserProfileCardProps {
  user: User;
  selectedProfile: TikTokProfile | null;
}

export default function UserProfileCard({ user, selectedProfile }: UserProfileCardProps) {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    // Isso será executado apenas no cliente, após a hidratação
    setFormattedDate(new Date(user.data_criacao).toLocaleDateString());
  }, [user.data_criacao]);

  const profileToDisplay = selectedProfile || user.perfis_tiktok?.[0];
  const username = profileToDisplay?.username || user.username;
  const displayName = profileToDisplay ? `@${username}` : username;
  const avatarUrl = profileToDisplay ? `https://unavatar.io/tiktok/${username}` : `https://placehold.co/100x100.png`;

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <Avatar className="h-16 w-16 border-2 border-primary">
            <AvatarImage src={avatarUrl} data-ai-hint="profile avatar" />
            <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{displayName}</CardTitle>
            <p className="text-sm text-muted-foreground">Entrou em {formattedDate}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-secondary rounded-lg">
                <Coins className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold"><ClientFormattedNumber value={user.coins} /></p>
                <p className="text-sm text-muted-foreground">Moedas</p>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
                <Trophy className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold">{user.nivel}</p>
                <p className="text-sm text-muted-foreground">Nível</p>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
                <UserCheck className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold"><ClientFormattedNumber value={user.followers} /></p>
                <p className="text-sm text-muted-foreground">Seguidores</p>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
                <UserPlus className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold"><ClientFormattedNumber value={user.following} /></p>
                <p className="text-sm text-muted-foreground">Seguindo</p>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
