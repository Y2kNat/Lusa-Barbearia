export type Avaliacao = {
  autor: string
  nota: number
  quando: string
  texto: string
}

export const avaliacoes: Avaliacao[] = [
  {
    autor: 'Rafael Crepaldi',
    nota: 5,
    quando: '2 meses atrás',
    texto:
      'Ambiente muito agradável, organizado, atendimento de primeira. O Rodrigo é extremamente talentoso, atencioso e cuidadoso em cada detalhe. Entende o que o cliente deseja e entrega um resultado impecável. Encontrei meu barbeiro de confiança.',
  },
  {
    autor: 'Raphael Magalhães',
    nota: 5,
    quando: '6 meses atrás',
    texto:
      'Fui com a minha noiva para testar um corte novo e, só pelo nome do corte, o Rodrigo já entendeu o que queríamos. Ambiente confortável, climatizado, com poltronas na espera e estacionamento. E tem cartão de fidelidade, um diferencial que eu já tinha esquecido.',
  },
  {
    autor: 'Thamires Tostes Neres',
    nota: 5,
    quando: '5 meses atrás',
    texto:
      'Todas as transformações que escolhi, o Rodrigo abraçou e me fez sentir segura. Ele é o barbeiro oficial do meu filho desde o primeiro corte, com 10 meses.',
  },
  {
    autor: 'Marcos Paulo',
    nota: 5,
    quando: 'Editado há 3 meses',
    texto:
      'Local extremamente organizado, um ótimo espaço. Profissionais prontos para te atender da melhor forma, executam exatamente o corte que você pede. Ótima localização, com certeza volto sempre.',
  },
  {
    autor: 'Amanda Silva',
    nota: 5,
    quando: '1 ano atrás',
    texto:
      'Meu filho de 11 anos amou a experiência. A decoração é linda e moderna, e os profissionais são muito simpáticos e competentes. O corte ficou perfeito. É definitivamente um lugar para voltar.',
  },
  {
    autor: 'Diego Silva Peukert',
    nota: 5,
    quando: '3 meses atrás',
    texto: 'Descobri hoje e com certeza volto. Preço justo e ótimo serviço. Procurem pelo Rodrigo.',
  },
]
