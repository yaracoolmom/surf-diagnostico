'use client'

import { useState, useMemo } from 'react'
import type { DiagnosticoRecord } from '@/types'

type View = 'login' | 'table' | 'detail'
type FiltroOla = 'todas' | 'Ola de Silencio Emocional' | 'Ola de Límites Difusos' | 'Ola de Desconexión Después del Conflicto' | 'Ola de Cansancio Parental'
type FiltroPrioridad = 'todas' | 'Alta' | 'Media' | 'Baja'

const PRIORIDAD_COLORS: Record<string, string> = {
  Alta: 'bg-red-100 text-red-700',
  Media: 'bg-amber-100 text-amber-700',
  Baja: 'bg-green-100 text-green-700',
}

const OLA_SHORT: Record<string, string> = {
  'Ola de Silencio Emocional': 'Silencio',
  'Ola de Límites Difusos': 'Límites',
  'Ola de Desconexión Después del Conflicto': 'Desconexión',
  'Ola de Cansancio Parental': 'Cansancio',
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('es-CO', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function Badge({ text }: { text: string }) {
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${PRIORIDAD_COLORS[text] ?? 'bg-gray-100 text-gray-700'}`}>
      {text}
    </span>
  )
}

function NotaEditor({
  record,
  adminPassword,
  onSaved,
}: {
  record: DiagnosticoRecord
  adminPassword: string
  onSaved: (id: string, nota: string) => void
}) {
  const [nota, setNota] = useState(record.nota_interna ?? '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/nota', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: adminPassword, id: record.id, nota }),
      })
      if (res.ok) {
        onSaved(record.id, nota)
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <textarea
        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#50c4c6] focus:border-transparent"
        rows={3}
        placeholder="Escribe tu nota aquí..."
        value={nota}
        onChange={(e) => setNota(e.target.value)}
      />
      <div className="flex items-center justify-between mt-2">
        <p className="text-xs text-gray-400">Solo visible en el admin</p>
        <button
          onClick={handleSave}
          disabled={saving}
          className="text-sm bg-[#50c4c6] hover:bg-[#3db5b7] text-white font-medium px-4 py-1.5 rounded-full transition-colors disabled:opacity-60"
        >
          {saved ? '✓ Guardado' : saving ? 'Guardando...' : 'Guardar nota'}
        </button>
      </div>
    </div>
  )
}

function DetailView({
  record,
  adminPassword,
  onBack,
  onNotaSaved,
}: {
  record: DiagnosticoRecord
  adminPassword: string
  onBack: () => void
  onNotaSaved: (id: string, nota: string) => void
}) {
  const rv = record.resultado_visible
  const qFields: Array<{ label: string; key: keyof DiagnosticoRecord }> = [
    { label: 'Cierre / distancia', key: 'q_cierre' },
    { label: 'Discusión por límites', key: 'q_discusion_limites' },
    { label: 'Dificultad con consecuencias', key: 'q_consecuencias' },
    { label: 'Reparación post-conflicto', key: 'q_reparacion' },
    { label: 'Culpa / cansancio / miedo', key: 'q_culpa_cansancio' },
    { label: 'Comunicación emocional', key: 'q_comunicacion_emocional' },
    { label: 'Falta de acuerdos', key: 'q_acuerdos' },
    { label: 'Rechazo al acercamiento', key: 'q_rechazo' },
    { label: 'Miedo a perder el vínculo', key: 'q_miedo_perder_vinculo' },
    { label: 'Sin ruta / agotado/a', key: 'q_sin_ruta' },
  ]

  return (
    <div className="max-w-3xl mx-auto">
      <button onClick={onBack} className="mb-4 text-sm text-[#50c4c6] hover:underline flex items-center gap-1">
        ← Volver a la tabla
      </button>

      <div className="grid gap-4">
        {/* Header */}
        <div className="bg-white rounded-2xl border p-5">
          <div className="flex items-start justify-between flex-wrap gap-2">
            <div>
              <h2 className="text-lg font-bold text-gray-800">{record.nombre_adulto}</h2>
              <p className="text-sm text-gray-500">{record.email} · {record.whatsapp}</p>
              <p className="text-xs text-gray-400 mt-1">{formatDate(record.created_at)}</p>
            </div>
            <Badge text={record.prioridad_comercial} />
          </div>
        </div>

        {/* Resultado visible */}
        <div className="bg-white rounded-2xl border p-5">
          <h3 className="text-xs font-semibold text-[#50c4c6] uppercase tracking-wide mb-3">Resultado visible</h3>
          <p className="font-bold text-gray-800 mb-1">{rv?.ola_principal}</p>
          {rv?.segunda_ola && (
            <p className="text-xs text-gray-400 mb-2">Segunda ola: {rv.segunda_ola}</p>
          )}
          {rv?.intensidad && (
            <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 mb-3">
              {rv.intensidad}
            </span>
          )}
          <p className="text-sm text-gray-600 mb-3">{rv?.explicacion}</p>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 mb-1">Fase SURF</p>
              <p className="font-medium text-gray-700">{rv?.fase_surf}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 mb-1">Reto 24h</p>
              <p className="font-medium text-gray-700">{rv?.reto}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 sm:col-span-2">
              <p className="text-xs text-gray-400 mb-1">Frase puente</p>
              <p className="font-medium text-gray-700 italic">&ldquo;{rv?.frase_puente}&rdquo;</p>
            </div>
          </div>
        </div>

        {/* Respuestas */}
        <div className="bg-white rounded-2xl border p-5">
          <h3 className="text-xs font-semibold text-[#50c4c6] uppercase tracking-wide mb-3">Respuestas del diagnóstico</h3>
          <div className="space-y-2">
            {qFields.map((f) => (
              <div key={f.key} className="flex items-center justify-between py-1.5 border-b border-gray-50">
                <span className="text-sm text-gray-600">{f.label}</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <div key={n} className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${(record[f.key] as number) === n ? 'bg-[#50c4c6] text-white' : 'bg-gray-100 text-gray-400'}`}>
                      {n}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="pt-2 flex justify-between">
              <span className="text-sm font-semibold text-gray-600">Promedio total</span>
              <span className="text-sm font-bold text-[#50c4c6]">{record.promedio_total}</span>
            </div>
          </div>
        </div>

        {/* Numerología interna */}
        <div className="bg-white rounded-2xl border p-5">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Información simbólica interna</h3>
          <p className="text-xs text-gray-400 italic mb-3">Uso interno exclusivo. No se muestra al usuario.</p>
          <div className="grid sm:grid-cols-2 gap-3 text-sm mb-3">
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 mb-1">Adulto — {record.nombre_adulto}</p>
              <p className="font-bold text-gray-800">Nº {record.adulto_final_number} <span className="text-xs text-gray-500">(compuesto: {record.adulto_compound_number})</span></p>
              <p className="text-xs text-gray-500 mt-0.5">{record.adulto_numerology_keyword}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 mb-1">Hijo/a — {record.nombre_hijo}</p>
              <p className="font-bold text-gray-800">Nº {record.hijo_final_number} <span className="text-xs text-gray-500">(compuesto: {record.hijo_compound_number})</span></p>
              <p className="text-xs text-gray-500 mt-0.5">{record.hijo_numerology_keyword}</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-400 mb-1">Lectura simbólica</p>
            <p className="text-sm text-gray-700">{record.lectura_simbolica_interna}</p>
          </div>
        </div>

        {/* Nota interna editable */}
        <div className="bg-white rounded-2xl border p-5">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Tu nota interna</h3>
          <NotaEditor record={record} adminPassword={adminPassword} onSaved={onNotaSaved} />
        </div>
      </div>
    </div>
  )
}

export default function AdminPage() {
  const [view, setView] = useState<View>('login')
  const [password, setPassword] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [records, setRecords] = useState<DiagnosticoRecord[]>([])
  const [selected, setSelected] = useState<DiagnosticoRecord | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [filtroPrioridad, setFiltroPrioridad] = useState<FiltroPrioridad>('todas')
  const [filtroOla, setFiltroOla] = useState<FiltroOla>('todas')

  const filtered = useMemo(() => {
    return records.filter((r) => {
      if (filtroPrioridad !== 'todas' && r.prioridad_comercial !== filtroPrioridad) return false
      if (filtroOla !== 'todas' && r.ola_principal !== filtroOla) return false
      return true
    })
  }, [records, filtroPrioridad, filtroOla])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/admin/data?password=${encodeURIComponent(password)}`)
      const json = await res.json()
      if (!res.ok) { setError(json.error ?? 'Contraseña incorrecta'); return }
      setRecords(json.data ?? [])
      setAdminPassword(password)
      setView('table')
    } catch {
      setError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  function handleNotaSaved(id: string, nota: string) {
    setRecords((prev) => prev.map((r) => r.id === id ? { ...r, nota_interna: nota } : r))
    if (selected?.id === id) setSelected((prev) => prev ? { ...prev, nota_interna: nota } : prev)
  }

  if (view === 'login') {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 w-full max-w-sm shadow-sm">
          <h1 className="text-xl font-bold text-gray-800 mb-1">Panel interno</h1>
          <p className="text-sm text-gray-400 mb-6">SURF Diagnóstico Familiar</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="label" htmlFor="admin-pw">Contraseña</label>
              <input id="admin-pw" type="password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus required />
            </div>
            {error && <p className="error-msg">{error}</p>}
            <button type="submit" disabled={loading || !password} className="btn-primary w-full text-sm">
              {loading ? 'Verificando...' : 'Ingresar'}
            </button>
          </form>
        </div>
      </main>
    )
  }

  if (view === 'detail' && selected) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-8">
        <DetailView record={selected} adminPassword={adminPassword} onBack={() => setView('table')} onNotaSaved={handleNotaSaved} />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Panel de diagnósticos</h1>
            <p className="text-sm text-gray-400">{filtered.length} de {records.length} registros</p>
          </div>
          <button onClick={() => { setView('login'); setPassword(''); setRecords([]) }} className="text-sm text-gray-400 hover:text-gray-600 underline">
            Salir
          </button>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-4 flex flex-wrap gap-4">
          <div>
            <p className="text-xs text-gray-400 font-medium mb-2">Prioridad</p>
            <div className="flex gap-2 flex-wrap">
              {(['todas', 'Alta', 'Media', 'Baja'] as FiltroPrioridad[]).map((f) => (
                <button key={f} onClick={() => setFiltroPrioridad(f)}
                  className={`text-xs font-semibold px-3 py-1 rounded-full border transition-colors ${filtroPrioridad === f ? 'bg-[#50c4c6] text-white border-[#50c4c6]' : 'border-gray-200 text-gray-500 hover:border-[#50c4c6]'}`}>
                  {f === 'todas' ? 'Todas' : f}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium mb-2">Ola</p>
            <div className="flex gap-2 flex-wrap">
              {(['todas', 'Ola de Silencio Emocional', 'Ola de Límites Difusos', 'Ola de Desconexión Después del Conflicto', 'Ola de Cansancio Parental'] as FiltroOla[]).map((f) => (
                <button key={f} onClick={() => setFiltroOla(f)}
                  className={`text-xs font-semibold px-3 py-1 rounded-full border transition-colors ${filtroOla === f ? 'bg-[#50c4c6] text-white border-[#50c4c6]' : 'border-gray-200 text-gray-500 hover:border-[#50c4c6]'}`}>
                  {f === 'todas' ? 'Todas' : OLA_SHORT[f]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p>{records.length === 0 ? 'No hay diagnósticos registrados aún.' : 'Ningún registro coincide con los filtros.'}</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    {['Fecha', 'Adulto', 'Email', 'WhatsApp', 'Rol', 'Hijo/a', 'Edad', 'Preocupación', 'Ola', 'Fase', 'N° Adulto', 'N° Hijo/a', 'C° Adulto', 'C° Hijo/a', 'Prioridad'].map((h) => (
                      <th key={h} className="text-left text-xs font-semibold text-gray-500 px-3 py-3 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((r) => (
                    <tr key={r.id} onClick={() => { setSelected(r); setView('detail') }}
                      className="hover:bg-[#e8f9f9]/50 cursor-pointer transition-colors">
                      <td className="px-3 py-3 whitespace-nowrap text-gray-500 text-xs">{formatDate(r.created_at)}</td>
                      <td className="px-3 py-3 font-medium text-gray-800 whitespace-nowrap">{r.nombre_adulto}</td>
                      <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{r.email}</td>
                      <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{r.whatsapp}</td>
                      <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{r.rol}</td>
                      <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{r.nombre_hijo}</td>
                      <td className="px-3 py-3 text-gray-600 text-center">{r.edad_hijo}</td>
                      <td className="px-3 py-3 text-gray-600 max-w-[140px] truncate">{r.principal_preocupacion}</td>
                      <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{OLA_SHORT[r.ola_principal] ?? r.ola_principal}</td>
                      <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{r.fase_surf}</td>
                      <td className="px-3 py-3 text-center font-bold text-[#50c4c6]">{r.adulto_final_number}</td>
                      <td className="px-3 py-3 text-center font-bold text-[#50c4c6]">{r.hijo_final_number}</td>
                      <td className="px-3 py-3 text-center text-gray-500">{r.adulto_compound_number}</td>
                      <td className="px-3 py-3 text-center text-gray-500">{r.hijo_compound_number}</td>
                      <td className="px-3 py-3"><Badge text={r.prioridad_comercial} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
