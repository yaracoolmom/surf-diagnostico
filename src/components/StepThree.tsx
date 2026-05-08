import type { FormData } from '@/types'

interface StepThreeProps {
  data: FormData
  errors: Partial<Record<keyof FormData, string>>
  onChange: (field: keyof FormData, value: number) => void
}

type ScaleField = keyof Pick<
  FormData,
  | 'q_cierre'
  | 'q_discusion_limites'
  | 'q_consecuencias'
  | 'q_reparacion'
  | 'q_culpa_cansancio'
  | 'q_comunicacion_emocional'
  | 'q_acuerdos'
  | 'q_rechazo'
  | 'q_miedo_perder_vinculo'
  | 'q_sin_ruta'
>

interface Question {
  field: ScaleField
  text: string
}

const QUESTIONS: Question[] = [
  {
    field: 'q_cierre',
    text: 'Siento que mi hijo/a se cierra cuando intento hablar.',
  },
  {
    field: 'q_discusion_limites',
    text: 'En casa discutimos con frecuencia por límites, permisos o responsabilidades.',
  },
  {
    field: 'q_consecuencias',
    text: 'Me cuesta poner consecuencias sin terminar en pelea.',
  },
  {
    field: 'q_reparacion',
    text: 'Después de un conflicto nos cuesta reparar o volver a hablar bien.',
  },
  {
    field: 'q_culpa_cansancio',
    text: 'Siento que estoy criando desde la culpa, el cansancio o el miedo.',
  },
  {
    field: 'q_comunicacion_emocional',
    text: 'Mi hijo/a me cuenta poco sobre lo que siente o le preocupa.',
  },
  {
    field: 'q_acuerdos',
    text: 'En casa no tenemos acuerdos claros sobre pantallas, horarios, estudio o responsabilidades.',
  },
  {
    field: 'q_rechazo',
    text: 'Cuando intento acercarme, siento rechazo, burla, indiferencia o mala actitud.',
  },
  {
    field: 'q_miedo_perder_vinculo',
    text: 'Me preocupa perder el vínculo con mi hijo/a.',
  },
  {
    field: 'q_sin_ruta',
    text: 'Siento que ya intenté muchas cosas y no sé qué más hacer.',
  },
]

const SCALE_LABELS: Record<number, string> = {
  1: 'Nunca',
  2: 'Poco',
  3: 'A veces',
  4: 'Frecuente',
  5: 'Siempre',
}

function ScaleQuestion({
  question,
  value,
  error,
  onChange,
  index,
}: {
  question: Question
  value: number
  error?: string
  onChange: (v: number) => void
  index: number
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
      <p className="text-sm font-medium text-gray-700 mb-4 leading-snug">
        <span className="text-[#50c4c6] font-semibold mr-1">{index + 1}.</span>
        {question.text}
      </p>

      <div className="flex gap-2 justify-between">
        {[1, 2, 3, 4, 5].map((score) => (
          <button
            key={score}
            type="button"
            onClick={() => onChange(score)}
            className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-xl border-2 transition-all duration-150 ${
              value === score
                ? 'border-[#50c4c6] bg-[#50c4c6] text-white'
                : 'border-gray-200 text-gray-500 hover:border-[#50c4c6]/50 hover:bg-[#e8f9f9]'
            }`}
          >
            <span className="font-bold text-sm">{score}</span>
            <span
              className={`text-[10px] leading-tight text-center hidden sm:block ${
                value === score ? 'text-white/80' : 'text-gray-400'
              }`}
            >
              {SCALE_LABELS[score]}
            </span>
          </button>
        ))}
      </div>

      {/* Mobile scale labels */}
      <div className="flex justify-between mt-1 sm:hidden">
        <span className="text-[10px] text-gray-400">Nunca</span>
        <span className="text-[10px] text-gray-400">Siempre</span>
      </div>

      {error && <p className="error-msg mt-2">{error}</p>}
    </div>
  )
}

export default function StepThree({ data, errors, onChange }: StepThreeProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-1">Diagnóstico relacional</h2>
        <p className="text-sm text-gray-500">
          Responde con sinceridad. No hay respuestas correctas o incorrectas.
        </p>
        <div className="mt-2 flex items-center gap-4 text-xs text-gray-400">
          <span>
            <strong className="text-gray-600">1</strong> = Nunca
          </span>
          <span>
            <strong className="text-gray-600">3</strong> = A veces
          </span>
          <span>
            <strong className="text-gray-600">5</strong> = Siempre
          </span>
        </div>
      </div>

      {QUESTIONS.map((q, i) => (
        <ScaleQuestion
          key={q.field}
          question={q}
          value={data[q.field] as number}
          error={errors[q.field]}
          onChange={(v) => onChange(q.field, v)}
          index={i}
        />
      ))}
    </div>
  )
}
