
export interface TikTokProfile {
  id: string;
  url: string;
  username: string;
}

export interface User {
  id: string;
  username: string;
  perfis_tiktok: TikTokProfile[];
  coins: number;
  followers: number;
  following: number;
  tarefas_completas: string[];
  data_criacao: Date; // Using JS Date for simplicity
  codigo_convite?: string;
  nivel: number;
  tarefas_diarias: number;
  ultima_tarefa_data: Date;
  tutorial_completo: boolean;
}

export type TaskType = "follow" | "like" | "comment" | "view";
export type TaskStatus = "ativa" | "concluída";

export interface Tarefa {
  id: string;
  tipo: TaskType;
  url: string;
  valor: number;
  user_alvo: string;
  status: TaskStatus;
  data_criacao: Date;
  criador_id?: string;
}

export interface Historico {
  id: string;
  user_id: string;
  tarefa_id: string;
  recompensa: number;
  data: Date;
  tipo: TaskType;
}

export type PedidoType = "follower" | "like" | "comment" | "view";
export type PedidoStatus = "pendente" | "concluído";

export interface Pedido {
  id: string;
  solicitante: string; // user id
  tipo: PedidoType;
  quantidade: number;
  link_tiktok: string;
  status: PedidoStatus;
  data_solicitacao: Date;
}
