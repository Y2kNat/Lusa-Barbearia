export const barbearia = {
  nome: 'Lusa Barbearia',
  categoria: 'Barbearia',
  endereco: 'R. Moacir Miguel da Silva, 846, Lj 9, Jardim Bonfiglioli',
  cidade: 'São Paulo',
  uf: 'SP',
  cep: '05595-000',
  telefone: '(11) 98148-4400',
  telefoneLink: 'tel:+5511981484400',
  whatsapp: 'https://wa.me/5511981484400?text=Ol%C3%A1%2C%20quero%20agendar%20um%20hor%C3%A1rio',
  maps: 'https://www.google.com/maps/place/LUSA+BARBEARIA/data=!4m8!3m7!1s0x94ce572a23fb3eeb:0x819d409f679bef10!8m2!3d-23.584582!4d-46.7453781!16s%2Fg%2F11xtym0707',
  booking: 'https://www.google.com/maps/reserve/appt/place/ChIJ6z77IypXzpQREO-bZ59AnYE/mid/%2Fg%2F11xtym0707',
  booksy: 'https://booksy.com/pt-br/389026_lusa-barbearia_barbearias_1047773_sao-paulo',
  coordenadas: { lat: -23.584582, lng: -46.7453781 },
  nota: 5.0,
  totalAvaliacoes: 107,
  comodidades: [
    'Estacionamento no local',
    'Cartão de crédito',
    'Acessível para cadeirantes',
    'Wi-Fi',
    'Programa de fidelidade',
    'Sala climatizada',
  ],
} as const

export const equipe = [
  {
    nome: 'Gabriel Correia',
    mencoes: 2,
    nota: 'Atendimento atencioso e corte na medida, com elogio direto pelo nome nas avaliações.',
  },
  {
    nome: 'Rodrigo Ramos',
    mencoes: 6,
    nota: 'Clientes citam corte sob medida e atendimento com calma, mesmo quando pedem o estilo pelo nome.',
  },
] as const

export type Horario = { dia: string; abre: string; fecha: string | null }

export const horarios: Horario[] = [
  { dia: 'Segunda', abre: '10:00', fecha: '20:00' },
  { dia: 'Terça', abre: '10:00', fecha: '20:00' },
  { dia: 'Quarta', abre: '10:00', fecha: '20:00' },
  { dia: 'Quinta', abre: '10:00', fecha: '20:00' },
  { dia: 'Sexta', abre: '10:00', fecha: '20:00' },
  { dia: 'Sábado', abre: '09:00', fecha: '18:00' },
  { dia: 'Domingo', abre: '00:00', fecha: null },
]
