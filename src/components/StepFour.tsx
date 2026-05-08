import type { FormData } from '@/types'

interface StepFourProps {
  data: FormData
  isSubmitting: boolean
  submitError: string | null
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 py-3 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-500 sm:w-48 shrink-0">{label}</span>
      <span className="text-sm font-medium text-gray-800">{value}</span>
    </div>
  )
}

export default function StepFour({ data, isSubmitting, submitError }: StepFourProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          Revisa tu información
        </h2>
        <p className="text-sm text-gray-500">
          Confirma que todo esté correcto antes de ver tu resultado.
        </p>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
        <p className="text-xs font-semibold text-[#50c4c6] uppercase tracking-wide mb-3">
          Tus datos
        </p>
        <SummaryRow label="Nombre" value={data.nombre_adulto} />
        <SummaryRow label="Correo" value={data.email} />
        <SummaryRow label="WhatsApp" value={data.whatsapp} />
        <SummaryRow label="Rol" value={data.rol} />
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
        <p className="text-xs font-semibold text-[#50c4c6] uppercase tracking-wide mb-3">
          Tu hijo/a
        </p>
        <SummaryRow
          label="Nombre"
          value={`${data.nombre_hijo} (${data.edad_hijo} años)`}
        />
        <SummaryRow label="Principal preocupación" value={data.principal_preocupacion} />
      </div>

      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-sm text-red-600">{submitError}</p>
        </div>
      )}

      {isSubmitting && (
        <div className="flex items-center justify-center gap-3 py-4">
          <div className="w-5 h-5 border-2 border-[#50c4c6] border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-gray-500">Procesando tu diagnóstico...</span>
        </div>
      )}

      <p className="text-xs text-gray-400 text-center leading-relaxed">
        Esta herramienta es una orientación inicial y no reemplaza acompañamiento psicológico,
        terapéutico, médico o legal.
      </p>
    </div>
  )
}
