'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { TikTokProfile } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlusCircle, Trash2, Loader2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';


const FormSchema = z.object({
  profileUrl: z.string().url({ message: "URL inválida." }).refine(
    (url) => url.includes('tiktok.com'),
    { message: "Por favor, insira um link do seu perfil do TikTok." }
  ),
});

interface AccountManagerProps {
  accounts: TikTokProfile[];
  selectedProfileId?: string | null;
  onSelectProfile: (profile: TikTokProfile) => void;
  deleteAccountAction: (profileId: string) => void;
}

export default function AccountManager({ accounts, selectedProfileId, onSelectProfile, deleteAccountAction }: AccountManagerProps) {
  const { toast } = useToast();
  const [isAdding, startAdding] = useTransition();
  const [isDeleting, startDeleting] = useTransition();
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { profileUrl: "" },
  });

  async function handleAddSubmit(data: z.infer<typeof FormSchema>) {
    startAdding(async () => {
      // Simulate API call
      await new Promise(res => setTimeout(res, 1000)); 
      console.log('Adding profile:', data.profileUrl);

      // In a real app, this would update the user's data. For this demo, we can't modify the mock data from an action.
      // We return a success message and ask the user to reload to see any mock changes.
      // The initial user flow is handled by the mock data directly.
      toast({ title: 'Em Desenvolvimento', description: "A funcionalidade de adicionar outro perfil está em desenvolvimento." });

      form.reset();
      setAddDialogOpen(false);
    });
  }

  function handleDelete(profileId: string) {
    startDeleting(async () => {
      toast({ title: 'Perfil Removido', description: 'Você será redirecionado para a tela de configuração.' });
      // Add a small delay so the user can read the toast before the page reloads.
      await new Promise(res => setTimeout(res, 1500));
      deleteAccountAction(profileId);
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciar Contas TikTok</CardTitle>
        <CardDescription>Selecione um perfil para ver os detalhes ou adicione/remova contas.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {accounts.map(account => (
          <div
            key={account.id}
            className={cn(
              "flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors",
              selectedProfileId === account.id ? 'bg-primary/20' : 'bg-secondary hover:bg-secondary/80'
            )}
            onClick={() => onSelectProfile(account)}
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border">
                <AvatarImage src={`https://unavatar.io/tiktok/${account.username}`} data-ai-hint="profile avatar" />
                <AvatarFallback>{account.username.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="font-medium">@{account.username}</span>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="icon" disabled={isDeleting}>
                  <Trash2 className="text-destructive" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta ação não pode ser desfeita. Isso removerá permanentemente o perfil de sua conta e todos os seus dados serão apagados. Você será levado de volta à tela de configuração.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(account.id)} className="bg-destructive hover:bg-destructive/90">
                    {isDeleting ? <Loader2 className="animate-spin" /> : "Sim, Excluir"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ))}
         {accounts.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-4">Nenhuma conta do TikTok adicionada.</p>
        )}
      </CardContent>
      <CardFooter>
        <Dialog open={isAddDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" />
              Adicionar Nova Conta
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Perfil do TikTok</DialogTitle>
              <DialogDescription>
                Cole a URL do seu perfil do TikTok para adicioná-lo.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAddSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="profileUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Link do perfil do TikTok</FormLabel>
                      <FormControl>
                        <Input placeholder="https://www.tiktok.com/@seuusuario" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <div className="flex justify-end gap-2 pt-4">
                    <DialogClose asChild>
                        <Button type="button" variant="ghost">Cancelar</Button>
                    </DialogClose>
                    <Button type="submit" disabled={isAdding}>
                        {isAdding ? <><Loader2 className="animate-spin mr-2" /> Adicionando...</> : 'Adicionar Conta'}
                    </Button>
                 </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
