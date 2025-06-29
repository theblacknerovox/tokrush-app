
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const FormSchema = z.object({
  profileUrl: z.string().url({ message: "URL inválida." }).refine(
    (url) => url.includes('tiktok.com/@'),
    { message: "Por favor, insira um link do seu perfil do TikTok (ex: https://www.tiktok.com/@seuusuario)." }
  ),
});

const extractUsernameFromUrl = (url: string): string => {
    try {
        const match = url.match(/tiktok\.com\/@([^/?]+)/);
        return match ? match[1] : 'usuario';
    } catch {
        return 'usuario';
    }
}

export default function TikTokProfileSetup() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      profileUrl: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);
    try {
        const username = extractUsernameFromUrl(data.profileUrl);
        localStorage.setItem('tiktok_profile_url', data.profileUrl);
        localStorage.setItem('tiktok_username', username);
        // Set firstTime flag to trigger bonus tasks
        localStorage.setItem('firstTime', 'true');
        
        // Reload the page to let the UserProvider take over
        window.location.reload();

    } catch (error) {
        toast({
            title: 'Erro',
            description: 'Não foi possível salvar seu perfil. Tente novamente.',
            variant: 'destructive',
        });
        setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={true}>
      <DialogContent 
        className="sm:max-w-[425px]" 
        hideCloseButton={true}
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
        >
        <DialogHeader>
          <DialogTitle>Bem-vindo(a)!</DialogTitle>
          <DialogDescription>
            Para começar, precisamos do seu perfil do TikTok. Isso nos ajuda a verificar as tarefas e a personalizar sua experiência.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="profileUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link do seu perfil do TikTok</FormLabel>
                  <FormControl>
                    <Input placeholder="https://www.tiktok.com/@seuusuario" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? <Loader2 className="animate-spin" /> : 'Salvar e Começar'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
