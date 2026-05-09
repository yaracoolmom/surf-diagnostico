'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { FormData } from '@/types'
import ProgressBar from './ProgressBar'
import StepOne, { PAISES } from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'
import StepFour from './StepFour'

const TOTAL_STEPS = 4

const INITIAL_DATA: FormData = {
  nombre_adulto: '',
  email: '',
  whatsapp: '',
  whatsapp_codigo: '+57',
  rol: '',
  cumple_adulto: '',
  acepta_contacto: false,
  nombre_hijo: '',
  edad_hijo: '',
  cumple_hijo: '',
  genero_hijo: '',
  principal_preocupacion: '',
  q_cierre: 0,
  q_discusion_limites: 0,
  q_consecuencias: 0,
  q_reparacion: 0,
  q_culpa_cansancio: 0,
  q_comunicacion_emocional: 0,
  q_acuerdos: 0,
  q_rechazo: 0,
  q_miedo_perder_vinculo: 0,
  q_sin_ruta: 0,
}

type Errors = Partial<Record<keyof FormData, string>>

function validateStep(step: number, data: FormData): Errors {
  const errors: Errors = {}

  if (step === 1) {
    if (!data.nombre_adulto || data.nombre_adulto.trim().length < 2)
      errors.nombre_adulto = 'Ingresa tu nombre'
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      errors.email = 'Ingresa un correo válido'
    if (!data.whatsapp) {
      errors.whatsapp = 'Ingresa tu número de WhatsApp'
    } else {
      const pais = PAISES.find((p) => p.code === data.whatsapp_codigo)
      const digits = data.whatsapp.replace(/\D/g, '').length
      if (pais && digits !== pais.digits)
        errors.whatsapp = `El número debe tener ${pais.digits} dígitos para ${pais.name}`
    }
    if (!data.rol)
      errors.rol = 'Selecciona tu rol'
    if (!data.cumple_adulto) {
      errors.cumple_adulto = 'Ingresa tu fecha de cumpleaños'
    } else {
      const today = new Date()
      const adultBirth = new Date(data.cumple_adulto)
      const adultAge = (today.getTime() - adultBirth.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
      const esFamiliarOOtro = data.rol === 'Familiar' || data.rol === 'Otro'
      const edadMinima = esFamiliarOOtro ? 14 : 18
      const mensajeEdad = esFamiliarOOtro
        ? 'Debes tener al menos 14 años para usar esta herramienta'
        : 'Debes tener al menos 18 años para usar esta herramienta'
      if (adultAge < edadMinima)
        errors.cumple_adulto = mensajeEdad
      else if (adultAge > 100)
        errors.cumple_adulto = 'Verifica tu fecha de nacimiento'
    }
    if (!data.acepta_contacto)
      errors.acepta_contacto = 'Debes aceptar para continuar'
  }

  if (step === 2) {
    if (!data.nombre_hijo || data.nombre_hijo.trim().length < 2)
      errors.nombre_hijo = 'Ingresa el nombre de tu hijo/a'
    if (!data.cumple_hijo) {
      errors.cumple_hijo = 'Ingresa la fecha de cumpleaños'
    } else {
      const today = new Date()
      const childBirth = new Date(data.cumple_hijo)
      const ageFromBirth = (today.getTime() - childBirth.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
      const statedAge = Number(data.edad_hijo)
      if (childBirth > today) {
        errors.cumple_hijo = 'La fecha de nacimiento no puede ser en el futuro'
      } else if (statedAge && Math.abs(ageFromBirth - statedAge) > 1) {
        errors.cumple_hijo = 'La fecha de nacimiento no coincide con la edad ingresada'
      } else if (data.cumple_adulto) {
        const esFamiliarOOtro = data.rol === 'Familiar' || data.rol === 'Otro'
        if (!esFamiliarOOtro) {
          const adultBirth = new Date(data.cumple_adulto)
          const diffYears = (childBirth.getTime() - adultBirth.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
          if (diffYears < 14)
            errors.cumple_hijo = 'Verifica las fechas: la diferencia de edad entre tú y tu hijo/a parece incorrecta'
        }
      }
    }
    if (!data.genero_hijo)
      errors.genero_hijo = 'Selecciona una opción'
    if (!data.principal_preocupacion)
      errors.principal_preocupacion = 'Selecciona una preocupación'
  }

  if (step === 3) {
    const qFields = [
      'q_cierre', 'q_discusion_limites', 'q_consecuencias', 'q_reparacion',
      'q_culpa_cansancio', 'q_comunicacion_emocional', 'q_acuerdos',
      'q_rechazo', 'q_miedo_perder_vinculo', 'q_sin_ruta',
    ] as (keyof FormData)[]
    for (const f of qFields) {
      const v = Number(data[f])
      if (!v || v < 1 || v > 5)
        errors[f] = 'Selecciona una respuesta'
    }
  }

  return errors
}

export default function DiagnosticoForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA)
  const [errors, setErrors] = useState<Errors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  function updateField(field: keyof FormData, value: string | number | boolean) {
    if (field === 'cumple_hijo' && typeof value === 'string') {
      const birth = new Date(value)
      const today = new Date()
      const age = birth < today
        ? Math.floor((today.getTime() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000))
        : 0
      setFormData((prev) => ({ ...prev, cumple_hijo: value, edad_hijo: age > 0 ? String(age) : '' }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  function handleNext() {
    const stepErrors = validateStep(currentStep, formData)
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      // Scroll to first error
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    setErrors({})
    setCurrentStep((s) => Math.min(s + 1, TOTAL_STEPS))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleBack() {
    setErrors({})
    setCurrentStep((s) => Math.max(s - 1, 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleSubmit() {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const payload = {
        ...formData,
        edad_hijo: Number(formData.edad_hijo),
        whatsapp: formData.whatsapp_codigo + formData.whatsapp,
      }

      const res = await fetch('/api/diagnostico', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const json = await res.json()

      if (!res.ok) {
        setSubmitError(
          json.error ?? 'Hubo un error al procesar tu diagnóstico. Intenta de nuevo.'
        )
        return
      }

      // Guardar resultado en sessionStorage para que la página de resultado lo lea
      if (json.record) {
        sessionStorage.setItem(`resultado-${json.id}`, JSON.stringify(json.record))
      }

      if (json.fuera_de_rango) {
        router.push(`/resultado/${json.id}?fuera_de_rango=1`)
      } else {
        router.push(`/resultado/${json.id}`)
      }
    } catch {
      setSubmitError('No pudimos conectarnos. Verifica tu conexión e intenta de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      {/* Logo */}
      <div className="text-center mb-6">
        <a href="/" className="inline-flex items-center gap-2">
          <span className="text-2xl font-bold text-[#50c4c6]">SURF</span>
          <span className="text-sm text-gray-400">Diagnóstico Familiar</span>
        </a>
      </div>

      <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />

      <div className="card">
        {currentStep === 1 && (
          <StepOne
            data={formData}
            errors={errors}
            onChange={(f, v) => updateField(f, v as string | boolean)}
          />
        )}
        {currentStep === 2 && (
          <StepTwo
            data={formData}
            errors={errors}
            onChange={(f, v) => updateField(f, v as string | number)}
          />
        )}
        {currentStep === 3 && (
          <StepThree
            data={formData}
            errors={errors}
            onChange={(f, v) => updateField(f, v)}
          />
        )}
        {currentStep === 4 && (
          <StepFour
            data={formData}
            isSubmitting={isSubmitting}
            submitError={submitError}
          />
        )}

        {/* Navigation */}
        <div className={`mt-8 flex ${currentStep > 1 ? 'justify-between' : 'justify-end'}`}>
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handleBack}
              disabled={isSubmitting}
              className="btn-secondary text-sm"
            >
              ← Atrás
            </button>
          )}

          {currentStep < TOTAL_STEPS ? (
            <button type="button" onClick={handleNext} className="btn-primary text-sm">
              Continuar →
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn-primary text-sm"
            >
              {isSubmitting ? 'Procesando...' : 'Ver mi resultado →'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
