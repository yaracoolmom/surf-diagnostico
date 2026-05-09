export interface FormData {
  nombre_adulto: string
  email: string
  whatsapp: string
  whatsapp_codigo: string
  rol: string
  cumple_adulto: string
  acepta_contacto: boolean
  nombre_hijo: string
  edad_hijo: number | string
  cumple_hijo: string
  genero_hijo: string
  principal_preocupacion: string
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

export interface ResultadoVisible {
  ola_principal: string
  explicacion: string
  fase_surf: string
  reto: string
  frase_puente: string
  segunda_ola?: string
  intensidad?: string
}

export interface DiagnosticoRecord {
  id: string
  created_at: string
  nombre_adulto: string
  email: string
  whatsapp: string
  rol: string
  cumple_adulto: string
  nombre_hijo: string
  edad_hijo: number
  cumple_hijo: string
  genero_hijo: string
  principal_preocupacion: string
  acepta_contacto: boolean
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
  promedio_total: number
  ola_principal: string
  fase_surf: string
  resultado_visible: ResultadoVisible
  adulto_compound_number: number
  adulto_final_number: number
  adulto_numerology_keyword: string
  hijo_compound_number: number
  hijo_final_number: number
  hijo_numerology_keyword: string
  lectura_simbolica_interna: string
  prioridad_comercial: string
  nota_interna: string
}

export type PrioridadComercial = 'Alta' | 'Media' | 'Baja'
