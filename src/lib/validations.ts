import { z } from 'zod'

export const step1Schema = z.object({
  nombre_adulto: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100)
    .transform((v) => v.trim()),
  email: z.string().email('Ingresa un correo electrónico válido').toLowerCase(),
  whatsapp: z
    .string()
    .min(7, 'Ingresa un número de WhatsApp válido')
    .max(20)
    .regex(/^[\d\s\+\-\(\)]+$/, 'Solo números y caracteres válidos'),
  rol: z.enum(['Mamá', 'Papá', 'Cuidador/a', 'Familiar', 'Otro'], {
    errorMap: () => ({ message: 'Selecciona tu rol' }),
  }),
  cumple_adulto: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Ingresa una fecha válida'),
  acepta_contacto: z
    .boolean()
    .refine((v) => v === true, 'Debes aceptar para continuar'),
})

export const step2Schema = z.object({
  nombre_hijo: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100)
    .transform((v) => v.trim()),
  edad_hijo: z.coerce
    .number()
    .int()
    .min(10, 'La edad debe ser entre 10 y 25 años')
    .max(25, 'La edad debe ser entre 10 y 25 años'),
  cumple_hijo: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Ingresa una fecha válida'),
  genero_hijo: z.enum(['Hija', 'Hijo', 'Prefiero no decirlo', 'Otro'], {
    errorMap: () => ({ message: 'Selecciona una opción' }),
  }),
  principal_preocupacion: z.enum(
    [
      'Peleas frecuentes',
      'Límites y autoridad',
      'Pantallas y hábitos',
      'Silencio o distancia emocional',
      'Rebeldía o desafío',
      'Baja autoestima',
      'Ansiedad, tristeza o aislamiento',
      'Estudio y responsabilidad',
      'Otro',
    ],
    { errorMap: () => ({ message: 'Selecciona una preocupación' }) }
  ),
})

const scaleField = z.coerce
  .number()
  .int()
  .min(1, 'Selecciona una respuesta')
  .max(5)

export const step3Schema = z.object({
  q_cierre: scaleField,
  q_discusion_limites: scaleField,
  q_consecuencias: scaleField,
  q_reparacion: scaleField,
  q_culpa_cansancio: scaleField,
  q_comunicacion_emocional: scaleField,
  q_acuerdos: scaleField,
  q_rechazo: scaleField,
  q_miedo_perder_vinculo: scaleField,
  q_sin_ruta: scaleField,
})

export const fullFormSchema = step1Schema.merge(step2Schema).merge(step3Schema)

export type Step1Data = z.infer<typeof step1Schema>
export type Step2Data = z.infer<typeof step2Schema>
export type Step3Data = z.infer<typeof step3Schema>
export type FullFormData = z.infer<typeof fullFormSchema>
