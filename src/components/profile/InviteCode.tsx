'use client';

import { useState, useTransition } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from '@/hooks/use-toast';
import type { User } from '@/lib/types';
import { Gift, Copy, Check, Loader2 } from 'lucide-react';

const FormSchema = z.object({
  code: z.string().min(3, { message: "O código deve ter pelo menos 3 caracteres." }),
})

interface InviteCodeProps {
  user: User;
}

export default function InviteCode({ user }: InviteCodeProps) {
  const [isGenerating, startGenerating] = useTransition();
  const [isApplying, startApplying] = useTransition();
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { code: "" },
  })

  const handleGenerate = () => {
    startGenerating(async () => {
      await new Promise(res => setTimeout(res, 1000));
      const newCode = `TOK${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      // NOTE: This won't visually update the user's code in the UI because we can't modify mock-data.ts from an action.
      toast({ title: "Sucesso", description: `Seu código foi gerado: ${newCode}` });
    });
  };
  
  const copyToClipboard = () => {
    if (user.codigo_convite) {
      navigator.clipboard.writeText(user.codigo_convite);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startApplying(async () => {
        await new Promise(res => setTimeout(res, 1000));
        if (data.code.toUpperCase() === 'AMIGO10') {
          toast({ title: 'Sucesso!', description: "Código aplicado! Você ganhou 20 moedas de bônus." });
          form.reset();
        } else {
          toast({ title: 'Ops!', description: "Código de convite inválido ou expirado.", variant: 'destructive' });
        }
    })
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Gift /> Convide e Ganhe</CardTitle>
          <CardDescription>Compartilhe seu código para ganhar 10 moedas para cada amigo que se juntar.</CardDescription>
        </CardHeader>
        <CardContent>
          {user.codigo_convite ? (
            <div className="flex items-center space-x-2">
              <Input value={user.codigo_convite} readOnly className="font-mono" />
              <Button size="icon" variant="outline" onClick={copyToClipboard} aria-label="Copiar código de convite">
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Você ainda não tem um código de convite.</p>
          )}
        </CardContent>
        {!user.codigo_convite && (
          <CardFooter>
            <Button onClick={handleGenerate} disabled={isGenerating} className="w-full">
              {isGenerating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Gerando...</> : 'Gerar Meu Código'}
            </Button>
          </CardFooter>
        )}
      </Card>

      <Card>
          <CardHeader>
              <CardTitle>Tem um Código?</CardTitle>
              <CardDescription>Insira um código de convite para ganhar um bônus de 20 moedas!</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent>
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Código de Convite</FormLabel>
                      <FormControl>
                        <Input placeholder="Insira o código aqui" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isApplying} className="w-full">
                  {isApplying ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Aplicando...</> : 'Aplicar Código'}
                </Button>
              </CardFooter>
            </form>
          </Form>
      </Card>
    </>
  );
}
