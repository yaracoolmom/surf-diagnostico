import type { FormData } from '@/types'

interface StepTwoProps {
  data: FormData
  errors: Partial<Record<keyof FormData, string>>
  onChange: (field: keyof FormData, value: string | number) => void
}

function calcularEdad(fechaNacimiento: string): number | null {
  if (!fechaNacimiento) return null
  const today = new Date()
  const birth = new Date(fechaNacimiento)
  if (birth > today) return null
  const age = Math.floor((today.getTime() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000))
  return age > 0 ? age : null
}

const GENERO_OPTIONS = ['Hija', 'Hijo', 'Prefiero no decirlo', 'Otro']
const PREOCUPACION_OPTIONS = [
  'Peleas frecuentes',
  'Límites y autoridad',
  'Pantallas y hábitos',
  'Silencio o distancia emocional',
  'Rebeldía o desafío',
  'Baja autoestima',
  'Ansiedad, tristeza o aislamiento',
  'Apatía o falta de motivación',
  'Estudio y responsabilidad',
  'Otro',
]

export default function StepTwo({ data, errors, onChange }: StepTwoProps) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-1">Cuéntame sobre tu hijo/a</h2>
        <p className="text-sm text-gray-500">
          Esta información ayuda a personalizar el análisis de tu situación.
        </p>
      </div>

      {/* Nombre hijo */}
      <div>
        <label className="label" htmlFor="nombre_hijo">
          Nombre de tu hijo/a <span className="text-[#50c4c6]">*</span>
        </label>
        <input
          id="nombre_hijo"
          type="text"
          className="input-field"
          placeholder="Nombre (primer nombre está bien)"
          value={data.nombre_hijo}
          onChange={(e) => onChange('nombre_hijo', e.target.value)}
        />
        {errors.nombre_hijo && <p className="error-msg">{errors.nombre_hijo}</p>}
      </div>

      {/* Cumpleaños hijo */}
      <div>
        <label className="label" htmlFor="cumple_hijo">
          Fecha de nacimiento <span className="text-[#50c4c6]">*</span>
        </label>
        <input
          id="cumple_hijo"
          type="date"
          className="input-field"
          value={data.cumple_hijo}
          onChange={(e) => onChange('cumple_hijo', e.target.value)}
          max={new Date().toISOString().split('T')[0]}
        />
        {data.cumple_hijo && !errors.cumple_hijo && (() => {
          const edad = calcularEdad(data.cumple_hijo)
          return edad !== null ? (
            <p className="text-sm text-[#50c4c6] mt-1.5 font-medium">
              ✓ {edad} {edad === 1 ? 'año' : 'años'}
            </p>
          ) : null
        })()}
        {errors.cumple_hijo && <p className="error-msg">{errors.cumple_hijo}</p>}
      </div>

      {/* Género */}
      <div>
        <label className="label" htmlFor="genero_hijo">
          ¿Cómo lo/la identificas? <span className="text-[#50c4c6]">*</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {GENERO_OPTIONS.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => onChange('genero_hijo', g)}
              className={`py-2.5 px-4 rounded-xl border-2 text-sm font-medium transition-all duration-150 ${
                data.genero_hijo === g
                  ? 'border-[#50c4c6] bg-[#e8f9f9] text-[#50c4c6]'
                  : 'border-gray-200 text-gray-600 hover:border-[#50c4c6]/50'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
        {errors.genero_hijo && <p className="error-msg">{errors.genero_hijo}</p>}
      </div>

      {/* Principal preocupación */}
      <div>
        <label className="label" htmlFor="principal_preocupacion">
          ¿Cuál es tu principal preocupación en este momento?{' '}
          <span className="text-[#50c4c6]">*</span>
        </label>
        <select
          id="principal_preocupacion"
          className="input-field"
          value={data.principal_preocupacion}
          onChange={(e) => onChange('principal_preocupacion', e.target.value)}
        >
          <option value="">Selecciona la que más se acerque...</option>
          {PREOCUPACION_OPTIONS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        {errors.principal_preocupacion && (
          <p className="error-msg">{errors.principal_preocupacion}</p>
        )}
      </div>
    </div>
  )
}
