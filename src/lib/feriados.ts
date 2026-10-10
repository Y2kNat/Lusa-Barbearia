export type Feriado = { data: string; nome: string }

const cruzeFeriados = [
  '2026-01-01',
  '2026-01-25',
  '2026-02-16',
  '2026-02-17',
  '2026-02-18',
  '2026-04-03',
  '2026-04-21',
  '2026-05-01',
  '2026-06-04',
  '2026-09-07',
  '2026-10-12',
  '2026-11-02',
  '2026-11-15',
  '2026-11-20',
  '2026-12-25',
  '2027-01-01',
  '2027-01-25',
  '2027-02-09',
  '2027-02-10',
  '2027-04-21',
  '2027-04-23',
  '2027-05-01',
  '2027-05-27',
  '2027-09-07',
  '2027-10-12',
  '2027-11-02',
  '2027-11-15',
  '2027-11-20',
  '2027-12-25',
]

export const feriados: Feriado[] = cruzeFeriados.map((data) => ({ data, nome: '' }))

function chaveLocal(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function feriadoDe(data: Date) {
  const k = chaveLocal(data)
  return feriados.some((f) => f.data === k) ? k : null
}

export function minutos(d: string) {
  const [h, m] = d.split(':').map(Number)
  return h * 60 + m
}
