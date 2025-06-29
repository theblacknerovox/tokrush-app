'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trophy, Coins } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import type { User } from '@/lib/types';
import ClientFormattedNumber from "@/components/common/ClientFormattedNumber";
import { useUser } from '@/contexts/UserContext';

export default function RankingPage() {
  const { user } = useUser();

  if (!user) {
    return null; // Ou esqueleto
  }

  // Na demonstração, o ranking mostra apenas o usuário atual.
  const sortedUsers: User[] = [user];
  const currentUser = user;

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold md:text-3xl">Ranking de Usuários</h1>
        <p className="text-muted-foreground">
          Veja quem está no topo e ganhe mais moedas para subir no ranking!
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Placar de Líderes</CardTitle>
          <CardDescription>
            Classificado pelo número de moedas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sortedUsers.length === 0 ? (
             <div className="text-center h-24 flex items-center justify-center">
              <p className="text-muted-foreground">O ranking ainda está vazio. Complete tarefas para aparecer aqui!</p>
            </div>
          ) : (
            <>
              {/* Mobile View: Cards */}
              <div className="space-y-3 md:hidden">
                {sortedUsers.map((user, index) => {
                  const primaryProfile = user.perfis_tiktok?.[0];
                  const tiktokHandle = primaryProfile?.username || user.username;
                  const avatarUrl = primaryProfile ? `https://unavatar.io/tiktok/${tiktokHandle}` : `https://placehold.co/100x100.png`;
                  const displayName = primaryProfile ? `@${tiktokHandle}` : user.username;
                  
                  return (
                    <div key={user.id} className={cn(
                      "flex items-center justify-between p-3 rounded-lg border",
                      user.id === currentUser.id ? "bg-primary/20 border-primary" : "bg-card"
                      )}>
                      <div className="flex items-center gap-4">
                         <div className="flex items-center justify-center w-8 font-bold text-lg">
                           {index < 3 ? <Trophy className={`w-6 h-6 ${
                                index === 0 ? 'text-yellow-400' :
                                index === 1 ? 'text-slate-400' :
                                'text-amber-600'
                            }`} /> : <span className="text-muted-foreground">{index + 1}</span>}
                        </div>
                        <Avatar className="h-10 w-10 border">
                           <AvatarImage src={avatarUrl} data-ai-hint="profile avatar" />
                          <AvatarFallback>{tiktokHandle.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{displayName}</div>
                          <div className="text-sm text-muted-foreground">Nível {user.nivel}</div>
                        </div>
                      </div>

                       <div className="flex items-center justify-end gap-1.5 font-semibold text-base">
                          <Coins className="h-4 w-4 text-amber-500" />
                          <ClientFormattedNumber value={user.coins} />
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Desktop View: Table */}
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Rank</TableHead>
                      <TableHead>Usuário</TableHead>
                      <TableHead className="text-right hidden sm:table-cell">Nível</TableHead>
                      <TableHead className="text-right">Moedas</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedUsers.map((user, index) => {
                      const primaryProfile = user.perfis_tiktok?.[0];
                      const tiktokHandle = primaryProfile?.username || user.username;
                      const avatarUrl = primaryProfile ? `https://unavatar.io/tiktok/${tiktokHandle}` : `https://placehold.co/100x100.png`;
                      const displayName = primaryProfile ? `@${tiktokHandle}` : user.username;
                      
                      return (
                      <TableRow key={user.id} className={cn(user.id === currentUser.id && "bg-primary/20")}>
                        <TableCell className="font-bold text-lg">
                          <div className="flex items-center gap-2">
                             {index < 3 ? <Trophy className={`w-6 h-6 ${
                                  index === 0 ? 'text-yellow-400' :
                                  index === 1 ? 'text-slate-400' :
                                  'text-amber-600'
                              }`} /> : <span className="w-6 text-center text-muted-foreground">{index + 1}</span>}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 border">
                               <AvatarImage src={avatarUrl} data-ai-hint="profile avatar" />
                              <AvatarFallback>{tiktokHandle.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{displayName}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-medium hidden sm:table-cell">{user.nivel}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1.5 font-semibold">
                              <Coins className="h-4 w-4 text-amber-500" />
                              <ClientFormattedNumber value={user.coins} />
                          </div>
                        </TableCell>
                      </TableRow>
                    )})}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
