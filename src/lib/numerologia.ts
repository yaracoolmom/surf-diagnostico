export interface NumerologyResult {
  compound_number: number
  final_number: number
  keyword: string
}

const KEYWORDS: Record<number, string> = {
  1: 'iniciativa, liderazgo, afirmación personal',
  2: 'sensibilidad, cooperación, necesidad de armonía',
  3: 'expresión, creatividad, comunicación',
  4: 'estructura, orden, responsabilidad',
  5: 'libertad, cambio, movimiento',
  6: 'cuidado, familia, responsabilidad afectiva',
  7: 'introspección, análisis, mundo interno',
  8: 'dirección, poder personal, logro, control',
  9: 'empatía, cierre de ciclos, sensibilidad social',
  11: 'intuición, alta sensibilidad, inspiración',
  22: 'construcción, visión práctica, materialización',
  33: 'servicio, cuidado profundo, enseñanza',
}

const COMBINATION_READINGS: Record<string, string> = {
  '8-5': 'Posible tensión entre control y libertad.',
  '4-3': 'Posible tensión entre orden y expresión.',
  '6-1': 'Posible tensión entre cuidado y autonomía.',
  '2-7': 'Posible tensión entre búsqueda de cercanía y necesidad de espacio.',
  '1-2': 'Posible tensión entre dirección fuerte y sensibilidad emocional.',
  '8-3': 'Posible tensión entre autoridad y necesidad de expresión libre.',
  '4-5': 'Posible tensión entre estructura y la búsqueda de libertad.',
  '1-7': 'Posible tensión entre liderazgo y la necesidad de espacio interior.',
  '6-5': 'Posible tensión entre el cuidado activo y la necesidad de autonomía.',
  '3-4': 'Posible tensión entre la expresión libre y la búsqueda de orden.',
  '7-3': 'Posible tensión entre el mundo interno y la necesidad de comunicación.',
  '8-1': 'Posible tensión entre dos energías de liderazgo fuerte.',
  '9-1': 'Posible tensión entre la empatía y la afirmación personal.',
  '6-7': 'Posible tensión entre el cuidado activo y la necesidad de introspección.',
  '4-1': 'Posible tensión entre la estructura y la necesidad de independencia.',
  '1-5': 'Posible tensión entre la dirección y la necesidad de libertad.',
  '8-7': 'Posible tensión entre el logro externo y el mundo interno.',
  '6-3': 'Posible tensión entre el cuidado y la necesidad de expresión libre.',
  '2-1': 'Posible tensión entre la armonía y la dirección individual.',
  '9-5': 'Posible tensión entre el cierre de ciclos y la búsqueda de cambio.',
}

function sumDigits(n: number): number {
  return n
    .toString()
    .split('')
    .reduce((acc, d) => acc + parseInt(d), 0)
}

function reduceToFinal(n: number): number {
  if (n === 11 || n === 22 || n === 33 || n <= 9) return n
  return reduceToFinal(sumDigits(n))
}

export function calculateNumerology(date: string): NumerologyResult {
  const digits = date.replace(/-/g, '').split('').map(Number)
  const compound_number = digits.reduce((a, b) => a + b, 0)
  const final_number = reduceToFinal(compound_number)
  const keyword = KEYWORDS[final_number] ?? 'energía en construcción'
  return { compound_number, final_number, keyword }
}

export function getLecturaSimbolica(adultoFinal: number, hijoFinal: number): string {
  const key = `${adultoFinal}-${hijoFinal}`
  if (COMBINATION_READINGS[key]) return COMBINATION_READINGS[key]
  const keyReverse = `${hijoFinal}-${adultoFinal}`
  if (COMBINATION_READINGS[keyReverse]) return COMBINATION_READINGS[keyReverse]
  return 'Usar como referencia simbólica complementaria. Revisar junto con el diagnóstico relacional antes de sacar conclusiones.'
}
