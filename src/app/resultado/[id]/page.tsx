'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import type { ResultadoVisible } from '@/types'

interface ResultRecord {
  nombre_adulto: string
  nombre_hijo: string
  genero_hijo: string
  principal_preocupacion: string
  ola_principal: string
  fase_surf: string
  resultado_visible: ResultadoVisible
  prioridad_comercial: string
}

const SURF_COLORS: Record<string, string> = {
  'Ola de Silencio Emocional': 'from-blue-400 to-[#50c4c6]',
  'Ola de Límites Difusos': 'from-amber-400 to-orange-400',
  'Ola de Desconexión Después del Conflicto': 'from-purple-400 to-pink-400',
  'Ola de Cansancio Parental': 'from-rose-400 to-pink-400',
}

const SURF_EMOJI: Record<string, string> = {
  'S — Sintonizar': '🎯',
  'U — Ubicar': '🗺️',
  'R — Reparar': '🔧',
  'F — Fortalecer': '💪',
}

const INTENSIDAD_STYLES: Record<string, string> = {
  'Señal temprana': 'bg-green-100 text-green-700',
  'En proceso': 'bg-yellow-100 text-yellow-700',
  'Momento importante': 'bg-orange-100 text-orange-700',
  'Momento crítico': 'bg-red-100 text-red-700',
}

function ShareButton() {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#50c4c6] transition-colors border border-gray-200 hover:border-[#50c4c6] rounded-full px-4 py-2"
    >
      {copied ? (
        <>
          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="text-green-500">¡Link copiado!</span>
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Compartir resultado
        </>
      )}
    </button>
  )
}

export default function ResultadoPage() {
  const params = useParams()
  const id = params.id as string

  const [record, setRecord] = useState<ResultRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    async function load() {
      const cached = sessionStorage.getItem(`resultado-${id}`)
      if (cached) {
        setRecord(JSON.parse(cached))
        setLoading(false)
        return
      }

      if (!id.startsWith('demo-')) {
        try {
          const res = await fetch(`/api/resultado/${id}`)
          if (res.ok) {
            const json = await res.json()
            setRecord(json.record)
            setLoading(false)
            return
          }
        } catch {
          // silencioso
        }
      }

      setNotFound(true)
      setLoading(false)
    }

    load()
  }, [id])

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#e8f9f9] via-white to-[#f0fafa] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#50c4c6] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Cargando tu resultado...</p>
        </div>
      </main>
    )
  }

  if (notFound || !record) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#e8f9f9] via-white to-[#f0fafa] flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-gray-500 mb-4">No encontramos este diagnóstico.</p>
          <Link href="/" className="btn-primary text-sm">Volver al inicio</Link>
        </div>
      </main>
    )
  }

  const rv = record.resultado_visible
  const gradientClass = SURF_COLORS[rv.ola_principal] ?? 'from-[#50c4c6] to-teal-400'
  const intensidadStyle = rv.intensidad ? INTENSIDAD_STYLES[rv.intensidad] : ''

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''
  const whatsappMessage = encodeURIComponent(
    'Hola Yara, hice el diagnóstico SURF y quiero orientación para mi caso.'
  )
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#e8f9f9] via-white to-[#f0fafa]">
      <div className="max-w-xl mx-auto px-4 py-10">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="text-2xl font-bold text-[#50c4c6]">SURF</span>
            <span className="text-sm text-gray-400">Diagnóstico Familiar</span>
          </Link>
        </div>

        {/* Saludo */}
        <div className="text-center mb-6">
          <p className="text-gray-500 text-sm mb-1">Tu diagnóstico está listo,</p>
          <h1 className="text-2xl font-bold text-gray-800">{record.nombre_adulto} 👋</h1>
        </div>

        {/* Ola principal + intensidad */}
        <div className={`bg-gradient-to-br ${gradientClass} rounded-3xl p-6 text-white mb-5 shadow-lg`}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-medium text-white/70 uppercase tracking-wide">
              Tu ola principal
            </p>
            {rv.intensidad && (
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${intensidadStyle}`}>
                {rv.intensidad}
              </span>
            )}
          </div>
          <h2 className="text-2xl font-bold mb-4 leading-snug">{rv.ola_principal}</h2>
          <p className="text-sm text-white/90 leading-relaxed">{rv.explicacion}</p>
        </div>

        {/* Segunda ola */}
        {rv.segunda_ola && (
          <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-4 py-3 mb-4 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-gray-300 shrink-0" />
            <p className="text-sm text-gray-500">
              También hay señales de{' '}
              <span className="font-medium text-gray-700">{rv.segunda_ola}</span>
            </p>
          </div>
        )}

        {/* Fase SURF */}
        <div className="card mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#e8f9f9] flex items-center justify-center text-xl">
              {SURF_EMOJI[rv.fase_surf] ?? '🌊'}
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                Fase recomendada
              </p>
              <p className="font-bold text-gray-800">{rv.fase_surf}</p>
            </div>
          </div>
        </div>

        {/* Reto 24h */}
        <div className="card mb-4 border-l-4 border-[#50c4c6]">
          <p className="text-xs font-semibold text-[#50c4c6] uppercase tracking-wide mb-2">
            ⏱ Tu reto de 24 horas
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">{rv.reto}</p>
        </div>

        {/* Frase puente */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 mb-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
            💬 Frase para empezar
          </p>
          <blockquote className="text-gray-700 font-medium italic leading-relaxed text-sm">
            &ldquo;{rv.frase_puente}&rdquo;
          </blockquote>
          <p className="text-xs text-gray-400 mt-2">
            Puedes usarla tal cual o adaptarla con tus propias palabras.
          </p>
        </div>

        {/* Compartir */}
        <div className="flex justify-center mb-6">
          <ShareButton />
        </div>

        {/* CTA */}
        <div className="card text-center border-[#50c4c6]/20 bg-gradient-to-br from-[#50c4c6]/5 to-white">
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            ¿Quieres entender mejor tu caso?
          </h3>
          <p className="text-sm text-gray-500 mb-5 leading-relaxed">
            Este resultado es solo el primer mapa. Si quieres revisar lo que está pasando con
            más claridad y saber por dónde empezar, puedes solicitar una orientación conmigo.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#25D366] hover:bg-[#1ebe5a] text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
          >
            💬 Quiero orientación
          </a>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-gray-400 text-center mt-8 leading-relaxed max-w-sm mx-auto">
          Esta herramienta es una orientación inicial y no reemplaza acompañamiento
          psicológico, terapéutico, médico o legal.
        </p>

        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-[#50c4c6] hover:underline">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  )
}
