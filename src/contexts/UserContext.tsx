'use client';

import type { User, TikTokProfile } from '@/lib/types';
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import TikTokProfileSetup from '@/components/auth/TikTokProfileSetup';
import { mockUser } from '@/lib/mock-data';
import { Loader2 } from 'lucide-react';

interface UserContextType {
  user: User | null;
  addCoins: (amount: number) => void;
  completeTask: (taskId: string) => void;
  addFollowers: (amount: number) => void;
  incrementFollowing: () => void;
  removeTikTokProfile: (profileId: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [needsSetup, setNeedsSetup] = useState(false);

  useEffect(() => {
    const profileUrl = localStorage.getItem('tiktok_profile_url');
    const username = localStorage.getItem('tiktok_username');

    if (profileUrl && username) {
      const tiktokProfile: TikTokProfile = { id: 'tiktok1', url: profileUrl, username };
      const initialUser: User = {
        ...mockUser,
        username: username,
        perfis_tiktok: [tiktokProfile],
      };
      
      const storedCoins = localStorage.getItem('user_coins');
      if (storedCoins) {
          initialUser.coins = parseInt(storedCoins, 10);
      }

      const completedTasks = localStorage.getItem('completed_tasks');
      if (completedTasks) {
          initialUser.tarefas_completas = JSON.parse(completedTasks);
      }
      
      const storedFollowers = localStorage.getItem('user_followers');
      if (storedFollowers) {
          initialUser.followers = parseInt(storedFollowers, 10);
      }

      const storedFollowing = localStorage.getItem('user_following');
      if (storedFollowing) {
          initialUser.following = parseInt(storedFollowing, 10);
      }

      setUser(initialUser);
      setNeedsSetup(false);
    } else {
      setNeedsSetup(true);
    }
    setIsInitialized(true);
  }, []);

  const addCoins = (amount: number) => {
    setUser(currentUser => {
      if (!currentUser) return null;
      const newCoins = currentUser.coins + amount;
      localStorage.setItem('user_coins', newCoins.toString());
      return { ...currentUser, coins: newCoins };
    });
  };

  const completeTask = (taskId: string) => {
    setUser(currentUser => {
      if (!currentUser) return null;
      const newCompletedTasks = [...currentUser.tarefas_completas, taskId];
      localStorage.setItem('completed_tasks', JSON.stringify(newCompletedTasks));
      return { ...currentUser, tarefas_completas: newCompletedTasks };
    });
  };

  const addFollowers = (amount: number) => {
    setUser(currentUser => {
      if (!currentUser) return null;
      const newFollowers = currentUser.followers + amount;
      localStorage.setItem('user_followers', newFollowers.toString());
      return { ...currentUser, followers: newFollowers };
    });
  };

  const incrementFollowing = () => {
    setUser(currentUser => {
      if (!currentUser) return null;
      const newFollowing = currentUser.following + 1;
      localStorage.setItem('user_following', newFollowing.toString());
      return { ...currentUser, following: newFollowing };
    });
  };

  const removeTikTokProfile = (profileId: string) => {
    setUser(currentUser => {
      if (!currentUser) return null;
      
      const profileToDelete = currentUser.perfis_tiktok.find(p => p.id === profileId);
      if (!profileToDelete) return currentUser;

      // Since we only support one profile right now, deleting it means resetting the app state
      // for the user. We clear all relevant localStorage items to start fresh.
      localStorage.removeItem('tiktok_profile_url');
      localStorage.removeItem('tiktok_username');
      localStorage.removeItem('user_coins');
      localStorage.removeItem('completed_tasks');
      localStorage.removeItem('user_followers');
      localStorage.removeItem('user_following');
      localStorage.removeItem('firstTime');
      
      // Reload the page to trigger the setup flow.
      window.location.reload();

      return null;
    });
  };

  if (!isInitialized) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (needsSetup) {
    return <TikTokProfileSetup />;
  }
  
  if (!user) {
     return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
         <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ user, addCoins, completeTask, addFollowers, incrementFollowing, removeTikTokProfile }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
