export type Servico = {
  nome: string
  preco: number
  duracao: number
  descricao?: string
}

export const servicos: Servico[] = [
  {
    nome: 'Corte',
    preco: 50,
    duracao: 35,
  },
  {
    nome: 'Barba',
    preco: 50,
    duracao: 25,
    descricao:
      'Barboterapia: esfoliante, toalha quente e massagem facial. Hidratação profunda, modelagem e cuidados depois da barba, para evitar irritação e foliculite.',
  },
  {
    nome: 'Corte e barba',
    preco: 90,
    duracao: 50,
  },
  {
    nome: 'Barba express',
    preco: 30,
    duracao: 30,
    descricao:
      'Para manter o visual alinhado em poucos minutos. Contorno preciso e acabamento, só na máquina.',
  },
  {
    nome: 'Corte pente único',
    preco: 30,
    duracao: 20,
    descricao: 'Corte usando uma única altura de pente em toda a cabeça.',
  },
  {
    nome: 'Relaxamento',
    preco: 35,
    duracao: 25,
    descricao:
      'Procedimento químico que suaviza a curvatura dos fios. Reduz o volume, elimina o frizz e facilita o pentear.',
  },
  {
    nome: 'Epilação nasal',
    preco: 15,
    duracao: 10,
    descricao: 'Retirada do excesso de pelos nasais com cera.',
  },
  {
    nome: 'Sobrancelha',
    preco: 15,
    duracao: 10,
    descricao:
      'Remoção dos fios entre e abaixo das sobrancelhas, sem criar um arco exagerado. Só com lâmina.',
  },
]
