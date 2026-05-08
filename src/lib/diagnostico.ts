import type { ResultadoVisible } from '@/types'

interface Answers {
  q_cierre: number
  q_discusion_limites: number
  q_consecuencias: number
  q_reparacion: number
  q_culpa_cansancio: number
  q_comunicacion_emocional: number
  q_acuerdos: number
  q_rechazo: number
  q_miedo_perder_vinculo: number
  q_sin_ruta: number
}

type GrupoEdad = 'A' | 'B' | 'C' | 'D'

function getGrupoEdad(edad: number): GrupoEdad {
  if (edad <= 12) return 'A'   // 10-12: preadolescencia
  if (edad <= 15) return 'B'   // 13-15: adolescencia temprana
  if (edad <= 18) return 'C'   // 16-18: adolescencia media
  return 'D'                    // 19-25: adulto joven
}

// ─── OLA DE SILENCIO EMOCIONAL ────────────────────────────────────────────────

const SILENCIO: Record<GrupoEdad, ResultadoVisible> = {
  A: {
    ola_principal: 'Ola de Silencio Emocional',
    explicacion:
      'A esta edad los niños/as que están entrando a la adolescencia pueden cerrarse de golpe, especialmente si sienten que no van a ser entendidos. El silencio no siempre es rechazo — muchas veces es ensayo.',
    fase_surf: 'S — Sintonizar',
    reto: 'Durante las próximas 24 horas, haz una actividad junto a él/ella sin hablar de temas importantes. La conexión sin agenda primero.',
    frase_puente: 'No tengo que entenderlo todo. Solo quiero estar cerca.',
  },
  B: {
    ola_principal: 'Ola de Silencio Emocional',
    explicacion:
      'Puede que en este momento tu hijo/a esté hablando menos, evitando conversaciones o respondiendo desde la distancia. A esta edad el grupo de pares toma mucho peso y el adulto puede sentirse desplazado. El primer paso no es presionar más, sino crear una entrada segura para volver a conversar.',
    fase_surf: 'S — Sintonizar',
    reto: 'Durante las próximas 24 horas, haz una pregunta sin corregir la respuesta. Solo escucha.',
    frase_puente: 'Quiero entenderte mejor, no empezar otra pelea.',
  },
  C: {
    ola_principal: 'Ola de Silencio Emocional',
    explicacion:
      'A esta edad el silencio suele ser una forma de pedir espacio y ser tratado/a como alguien con criterio propio. Forzar la conversación puede profundizar el cierre. Lo que más funciona es mostrar disponibilidad sin condiciones.',
    fase_surf: 'S — Sintonizar',
    reto: 'Escríbele un mensaje corto sin esperar respuesta inmediata. Solo hazle saber que estás ahí cuando quiera hablar.',
    frase_puente: 'No necesito que me cuentes todo. Solo quiero que sepas que siempre puedes.',
  },
  D: {
    ola_principal: 'Ola de Silencio Emocional',
    explicacion:
      'Con un hijo/a mayor, el silencio puede venir de una dinámica instalada desde antes: si las conversaciones terminaban en conflicto, aprendió a no hablar. Reconstruir eso requiere paciencia y conversaciones distintas.',
    fase_surf: 'S — Sintonizar',
    reto: 'Busca un momento informal, sin agenda, sin correcciones. Una conversación que no tenga nada importante en juego.',
    frase_puente: 'Sé que no siempre ha sido fácil hablar. Quiero que eso cambie.',
  },
}

// ─── OLA DE LÍMITES DIFUSOS ───────────────────────────────────────────────────

const LIMITES: Record<GrupoEdad, ResultadoVisible> = {
  A: {
    ola_principal: 'Ola de Límites Difusos',
    explicacion:
      'A esta edad los límites aún se pueden instalar con más claridad porque el niño/a todavía está construyendo sus referencias de lo que es normal. Es buen momento para establecer acuerdos con estructura, pero con espacio para que él/ella también proponga.',
    fase_surf: 'U — Ubicar',
    reto: 'Elige un solo acuerdo nuevo esta semana e involúcralo/a en construirlo. Los límites que se negocian se cumplen más.',
    frase_puente: 'Quiero que tengamos reglas claras que los dos entendamos.',
  },
  B: {
    ola_principal: 'Ola de Límites Difusos',
    explicacion:
      'Puede que el conflicto no esté solo en la actitud de tu hijo/a, sino en la falta de acuerdos claros, consecuencias sostenibles o límites comunicados sin pelea.',
    fase_surf: 'U — Ubicar',
    reto: 'Elige un solo límite para ordenar esta semana. No intentes corregir todo al tiempo.',
    frase_puente:
      'No quiero pelear por esto todos los días. Necesitamos un acuerdo claro que los dos podamos entender.',
  },
  C: {
    ola_principal: 'Ola de Límites Difusos',
    explicacion:
      'A esta edad imponer límites sin contexto suele generar más resistencia. Lo que funciona mejor es pasar de reglas a acuerdos: explicar el por qué y negociar el cómo. El objetivo no es obediencia sino responsabilidad.',
    fase_surf: 'U — Ubicar',
    reto: 'Elige un límite importante y propónselo como conversación, no como decreto. Pregúntale qué le parece justo.',
    frase_puente:
      'No quiero seguir peleando por esto. ¿Podemos buscar un acuerdo que funcione para los dos?',
  },
  D: {
    ola_principal: 'Ola de Límites Difusos',
    explicacion:
      'Con un hijo/a mayor, los límites empiezan a ser más sobre respeto mutuo que sobre reglas del hogar. Puede que el conflicto sea sobre roles: siguen relacionándose como antes, cuando la dinámica necesita actualizarse.',
    fase_surf: 'U — Ubicar',
    reto: 'Identifica si el conflicto es sobre una regla concreta o sobre cómo se relacionan. Eso cambia completamente la conversación.',
    frase_puente: 'Creo que necesitamos reajustar cómo nos tratamos ahora que eres mayor.',
  },
}

// ─── OLA DE DESCONEXIÓN DESPUÉS DEL CONFLICTO ────────────────────────────────

const DESCONEXION: Record<GrupoEdad, ResultadoVisible> = {
  A: {
    ola_principal: 'Ola de Desconexión Después del Conflicto',
    explicacion:
      'A esta edad los niños/as absorben mucho el ambiente emocional después de una pelea. Si no hay reparación visible, pueden cargar con culpa o confusión sin saber cómo expresarlo.',
    fase_surf: 'R — Reparar',
    reto: 'Después del próximo conflicto, sé el primero/a en acercarte con algo pequeño: una pregunta, un abrazo, un gesto. No tienes que resolver todo de una vez.',
    frase_puente: 'Peleamos, pero eso no cambia lo que siento por ti.',
  },
  B: {
    ola_principal: 'Ola de Desconexión Después del Conflicto',
    explicacion:
      'Puede que el problema más grande no sea la pelea, sino lo que pasa después: silencio, distancia, culpa o dificultad para reparar.',
    fase_surf: 'R — Reparar',
    reto: 'Busca una conversación corta para reparar, no para volver a discutir el problema.',
    frase_puente: 'Lo que pasó no me gustó, pero tú me importas más que esta pelea.',
  },
  C: {
    ola_principal: 'Ola de Desconexión Después del Conflicto',
    explicacion:
      'A esta edad la reparación después del conflicto se hace más difícil porque ambos tienen orgullo en juego. El adolescente puede interpretar el silencio posterior como que así son las cosas, y normalizarlo.',
    fase_surf: 'R — Reparar',
    reto: 'Busca una conversación corta para reparar, no para volver a discutir el problema. Un "me importa más la relación que tener razón" puede abrir mucho.',
    frase_puente: 'Lo que pasó no me gustó, pero tú me importas más que esta pelea.',
  },
  D: {
    ola_principal: 'Ola de Desconexión Después del Conflicto',
    explicacion:
      'Con un hijo/a adulto, los conflictos no resueltos se van apilando y crean distancia estructural. La reparación requiere más intención porque ya no comparten el espacio cotidiano que facilitaba la reconciliación natural.',
    fase_surf: 'R — Reparar',
    reto: 'Llámale o escríbele específicamente para reparar, no para revisar el tema del conflicto. La reparación va primero.',
    frase_puente: 'Sé que quedó algo pendiente entre nosotros. Quiero arreglarlo.',
  },
}

// ─── OLA DE CANSANCIO PARENTAL ────────────────────────────────────────────────

const CANSANCIO: Record<GrupoEdad, ResultadoVisible> = {
  A: {
    ola_principal: 'Ola de Cansancio Parental',
    explicacion:
      'Criar a un preadolescente desde el agotamiento es más común de lo que parece. A esta edad los niños/as son muy sensibles a la energía del adulto — si estás saturado/a, él/ella lo percibe y puede reaccionar con más desafío o más demanda.',
    fase_surf: 'F — Fortalecer',
    reto: 'Antes de la próxima conversación difícil, date 10 minutos para ti. No es egoísmo — es condición para estar presente.',
    frase_puente: 'Estoy aprendiendo a cuidarme para poder cuidarte mejor.',
  },
  B: {
    ola_principal: 'Ola de Cansancio Parental',
    explicacion:
      'Puede que estés intentando sostenerlo todo desde el agotamiento. Cuando un adulto está saturado, incluso una buena intención puede salir como grito, control o desconexión.',
    fase_surf: 'F — Fortalecer',
    reto: 'Antes de tener una conversación difícil, escribe qué necesitas lograr y qué no quieres repetir.',
    frase_puente: 'Necesito ordenar esto contigo, pero quiero hacerlo de una forma distinta.',
  },
  C: {
    ola_principal: 'Ola de Cansancio Parental',
    explicacion:
      'Con un adolescente de esta edad el cansancio parental muchas veces viene de sentir que todo es una batalla. Cuando el adulto está saturado y el adolescente está en plena construcción de identidad, los dos entran en modo reactivo y nadie puede escuchar bien.',
    fase_surf: 'F — Fortalecer',
    reto: 'Antes de tener una conversación difícil, escribe qué necesitas lograr y qué no quieres repetir. Entrar con claridad cambia el tono.',
    frase_puente: 'Necesito ordenar esto contigo, pero quiero hacerlo de una forma distinta.',
  },
  D: {
    ola_principal: 'Ola de Cansancio Parental',
    explicacion:
      'El cansancio con un hijo/a mayor puede venir de años de dinámicas difíciles o de no saber cómo relacionarse ahora que creció. Muchas veces el adulto sigue respondiendo con los patrones del pasado aunque la situación ya cambió.',
    fase_surf: 'F — Fortalecer',
    reto: 'Identifica un patrón que se repite entre ustedes y pregúntate: ¿qué haría diferente si empezara de cero?',
    frase_puente: 'Quiero relacionarme contigo de una forma nueva. No sé exactamente cómo, pero quiero intentarlo.',
  },
}

// ─── CÁLCULO PRINCIPAL ────────────────────────────────────────────────────────

interface Area {
  avg: number
  grupo: Record<GrupoEdad, ResultadoVisible>
  priority: number
  maxQ: number
}

export function calcularResultado(
  answers: Answers,
  edad_hijo: number = 14
): {
  resultado_visible: ResultadoVisible
  promedio_total: number
  prioridad_comercial: string
} {
  const grupo = getGrupoEdad(edad_hijo)

  const silencioAvg =
    (answers.q_cierre + answers.q_comunicacion_emocional + answers.q_rechazo) / 3
  const limitesAvg =
    (answers.q_discusion_limites + answers.q_consecuencias + answers.q_acuerdos) / 3
  const desconexionAvg =
    (answers.q_reparacion + answers.q_miedo_perder_vinculo + answers.q_sin_ruta) / 3
  const cansancioAvg =
    (answers.q_culpa_cansancio + answers.q_sin_ruta + answers.q_consecuencias) / 3

  const allValues = [
    answers.q_cierre, answers.q_discusion_limites, answers.q_consecuencias,
    answers.q_reparacion, answers.q_culpa_cansancio, answers.q_comunicacion_emocional,
    answers.q_acuerdos, answers.q_rechazo, answers.q_miedo_perder_vinculo, answers.q_sin_ruta,
  ]
  const promedio_total = allValues.reduce((a, b) => a + b, 0) / allValues.length

  const areas: Area[] = [
    {
      avg: silencioAvg, grupo: SILENCIO, priority: 1,
      maxQ: Math.max(answers.q_cierre, answers.q_comunicacion_emocional, answers.q_rechazo),
    },
    {
      avg: desconexionAvg, grupo: DESCONEXION, priority: 2,
      maxQ: Math.max(answers.q_reparacion, answers.q_miedo_perder_vinculo, answers.q_sin_ruta),
    },
    {
      avg: limitesAvg, grupo: LIMITES, priority: 3,
      maxQ: Math.max(answers.q_discusion_limites, answers.q_consecuencias, answers.q_acuerdos),
    },
    {
      avg: cansancioAvg, grupo: CANSANCIO, priority: 4,
      maxQ: Math.max(answers.q_culpa_cansancio, answers.q_sin_ruta, answers.q_consecuencias),
    },
  ]

  areas.sort((a, b) => {
    if (Math.abs(b.avg - a.avg) > 0.001) return b.avg - a.avg
    if (b.maxQ !== a.maxQ) return b.maxQ - a.maxQ
    return a.priority - b.priority
  })

  const segunda_ola =
    Math.abs(areas[0].avg - areas[1].avg) < 1
      ? areas[1].grupo[grupo].ola_principal
      : undefined

  let intensidad: string
  if (promedio_total < 2) {
    intensidad = 'Señal temprana'
  } else if (promedio_total < 3) {
    intensidad = 'En proceso'
  } else if (promedio_total < 4) {
    intensidad = 'Momento importante'
  } else {
    intensidad = 'Momento crítico'
  }

  const resultado_visible = {
    ...areas[0].grupo[grupo],
    segunda_ola,
    intensidad,
  }

  let prioridad_comercial: string
  if (answers.q_miedo_perder_vinculo >= 4 || answers.q_sin_ruta >= 4 || promedio_total >= 4) {
    prioridad_comercial = 'Alta'
  } else if (promedio_total >= 3) {
    prioridad_comercial = 'Media'
  } else {
    prioridad_comercial = 'Baja'
  }

  return {
    resultado_visible,
    promedio_total: Math.round(promedio_total * 100) / 100,
    prioridad_comercial,
  }
}
