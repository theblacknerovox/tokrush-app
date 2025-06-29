'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  tipo: z.enum(['follower', 'like', 'comment', 'view'], { required_error: "Por favor, selecione um tipo de pedido." }),
  quantidade: z.coerce.number().int().min(10, { message: "O mínimo é 10." }),
  link_tiktok: z.string().url({ message: "Por favor, insira uma URL válida do TikTok." }),
});

interface OrderFormProps {
  userCoins: number;
  addFollowers: (amount: number) => void;
}

export default function OrderForm({ userCoins, addFollowers }: OrderFormProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantidade: 10,
      link_tiktok: "",
      tipo: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const totalCost = values.quantidade * 2;
    if (userCoins < totalCost) {
        toast({
            title: "Fundos Insuficientes",
            description: `Você precisa de ${totalCost} moedas, mas você só tem ${userCoins}.`,
            variant: "destructive"
        })
        return;
    }

    startTransition(async () => {
      // Simulate API call
      await new Promise(res => setTimeout(res, 1000));
      
      console.log('Creating order:', values);

      toast({ title: 'Sucesso', description: "Pedido recebido! Ele aparecerá no histórico em breve." });
      
      if (values.tipo === 'follower') {
        addFollowers(values.quantidade);
      }

      form.reset();
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
        <FormField
          control={form.control}
          name="tipo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Serviço</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um serviço" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="follower">Seguidores</SelectItem>
                  <SelectItem value="like">Curtidas</SelectItem>
                  <SelectItem value="comment">Comentários</SelectItem>
                  <SelectItem value="view">Visualizações</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantidade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantidade</FormLabel>
              <FormControl>
                <Input type="number" placeholder="ex: 50" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="link_tiktok"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL do Perfil/Vídeo do TikTok</FormLabel>
              <FormControl>
                <Input placeholder="https://tiktok.com/@..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-sm text-muted-foreground pt-2">
            Custo: {form.watch('quantidade') * 2} moedas (Você tem: {userCoins})
        </div>
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Enviando Pedido...</> : 'Enviar Pedido'}
        </Button>
      </form>
    </Form>
  );
}
