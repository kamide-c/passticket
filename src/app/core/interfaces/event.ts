export interface IEvent {
  id?: string;
  atracoes?: string;
  cidade?: string;
  d_date?: Date;
  data?: Date;
  descricao?: string;
  endereco?: string;
  estado?: string;
  hora_inicio?: string;
  imagens?: string;
  images?: Array<IEventImage>;
  informacoes?: string;
  latitude?: number;
  longitude?: number;
  link?: string;
  local?: string;
  poster?: string;
  ticketeria?: string;
  titulo?: string;
  uf?: string;
}

export interface IEventImage {
  url: string;
}

export interface IEventFilter {
  Paginacao: {
    page_number: number,
    page_size: number
  };
  descricao?: string;
  informacoes?: string;
  atracoes?: string;
  titulo?: string;
  endereco?: string;
  cidade?: string;
  estado?: string;
  local?: string;
  ticketeria?: string;
  buscageral?: string;
  data_inicio?: string;
  data_fim?: string;
}
