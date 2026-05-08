import type { FormData } from '@/types'

interface StepOneProps {
  data: FormData
  errors: Partial<Record<keyof FormData, string>>
  onChange: (field: keyof FormData, value: string | boolean) => void
}

const ROL_OPTIONS = ['Mamá', 'Papá', 'Cuidador/a', 'Familiar', 'Otro']

export default function StepOne({ data, errors, onChange }: StepOneProps) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-1">Cuéntame sobre ti</h2>
        <p className="text-sm text-gray-500">
          Usaré esta información para personalizar tu resultado.
        </p>
      </div>

      {/* Nombre */}
      <div>
        <label className="label" htmlFor="nombre_adulto">
          Tu nombre <span className="text-[#50c4c6]">*</span>
        </label>
        <input
          id="nombre_adulto"
          type="text"
          className="input-field"
          placeholder="¿Cómo te llamas?"
          value={data.nombre_adulto}
          onChange={(e) => onChange('nombre_adulto', e.target.value)}
          autoComplete="given-name"
        />
        {errors.nombre_adulto && <p className="error-msg">{errors.nombre_adulto}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="label" htmlFor="email">
          Correo electrónico <span className="text-[#50c4c6]">*</span>
        </label>
        <input
          id="email"
          type="email"
          className="input-field"
          placeholder="tucorreo@ejemplo.com"
          value={data.email}
          onChange={(e) => onChange('email', e.target.value)}
          autoComplete="email"
        />
        {errors.email && <p className="error-msg">{errors.email}</p>}
      </div>

      {/* WhatsApp */}
      <div>
        <label className="label" htmlFor="whatsapp">
          WhatsApp <span className="text-[#50c4c6]">*</span>
        </label>
        <input
          id="whatsapp"
          type="tel"
          className="input-field"
          placeholder="+57 300 000 0000"
          value={data.whatsapp}
          onChange={(e) => onChange('whatsapp', e.target.value)}
          autoComplete="tel"
        />
        {errors.whatsapp && <p className="error-msg">{errors.whatsapp}</p>}
      </div>

      {/* Rol */}
      <div>
        <label className="label" htmlFor="rol">
          ¿Cuál es tu rol? <span className="text-[#50c4c6]">*</span>
        </label>
        <select
          id="rol"
          className="input-field"
          value={data.rol}
          onChange={(e) => onChange('rol', e.target.value)}
        >
          <option value="">Selecciona...</option>
          {ROL_OPTIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        {errors.rol && <p className="error-msg">{errors.rol}</p>}
      </div>

      {/* Fecha de cumpleaños */}
      <div>
        <label className="label" htmlFor="cumple_adulto">
          Tu fecha de cumpleaños <span className="text-[#50c4c6]">*</span>
        </label>
        <input
          id="cumple_adulto"
          type="date"
          className="input-field"
          value={data.cumple_adulto}
          onChange={(e) => onChange('cumple_adulto', e.target.value)}
          max={new Date().toISOString().split('T')[0]}
        />
        {errors.cumple_adulto && <p className="error-msg">{errors.cumple_adulto}</p>}
      </div>

      {/* Acepta contacto */}
      <div className="bg-[#e8f9f9] rounded-xl p-4">
        <p className="text-xs text-gray-600 mb-3 leading-relaxed">
          Usaremos tus datos para enviarte tu resultado, contactarte si solicitas orientación y
          personalizar la experiencia. Tu fecha de cumpleaños puede usarse para mensajes
          especiales y como referencia simbólica interna. No hacemos diagnósticos clínicos ni
          etiquetamos a tu hijo/a.
        </p>
        <label className="flex items-start gap-3 cursor-pointer">
          <div className="relative mt-0.5">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={data.acepta_contacto}
              onChange={(e) => onChange('acepta_contacto', e.target.checked)}
            />
            <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-[#50c4c6] peer-checked:border-[#50c4c6] transition-all flex items-center justify-center">
              {data.acepta_contacto && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
          <span className="text-sm text-gray-700">
            Acepto el uso de mis datos para recibir mi resultado y orientación personalizada.{' '}
            <span className="text-[#50c4c6] font-medium">*</span>
          </span>
        </label>
        {errors.acepta_contacto && <p className="error-msg mt-2">{errors.acepta_contacto}</p>}
      </div>
    </div>
  )
}
