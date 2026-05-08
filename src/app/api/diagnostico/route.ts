import { NextRequest, NextResponse } from 'next/server'
import { fullFormSchema } from '@/lib/validations'
import { calcularResultado } from '@/lib/diagnostico'
import { calculateNumerology, getLecturaSimbolica } from '@/lib/numerologia'

const supabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const parsed = fullFormSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const data = parsed.data

    const { resultado_visible, promedio_total, prioridad_comercial } = calcularResultado(
      {
        q_cierre: data.q_cierre,
        q_discusion_limites: data.q_discusion_limites,
        q_consecuencias: data.q_consecuencias,
        q_reparacion: data.q_reparacion,
        q_culpa_cansancio: data.q_culpa_cansancio,
        q_comunicacion_emocional: data.q_comunicacion_emocional,
        q_acuerdos: data.q_acuerdos,
        q_rechazo: data.q_rechazo,
        q_miedo_perder_vinculo: data.q_miedo_perder_vinculo,
        q_sin_ruta: data.q_sin_ruta,
      },
      data.edad_hijo
    )

    const adultoNum = calculateNumerology(data.cumple_adulto)
    const hijoNum = calculateNumerology(data.cumple_hijo)
    const lecturaSimbolica = getLecturaSimbolica(adultoNum.final_number, hijoNum.final_number)

    const nota_interna = [
      `Adulto: número ${adultoNum.final_number} (${adultoNum.keyword}).`,
      `Hijo/a: número ${hijoNum.final_number} (${hijoNum.keyword}).`,
      `Lectura simbólica: ${lecturaSimbolica}`,
      `Prioridad comercial: ${prioridad_comercial}.`,
    ].join(' ')

    const record = {
      nombre_adulto: data.nombre_adulto,
      nombre_hijo: data.nombre_hijo,
      genero_hijo: data.genero_hijo,
      principal_preocupacion: data.principal_preocupacion,
      ola_principal: resultado_visible.ola_principal,
      fase_surf: resultado_visible.fase_surf,
      resultado_visible,
      prioridad_comercial,
    }

    // Modo demo: sin Supabase configurado
    if (!supabaseConfigured) {
      const demoId = `demo-${Date.now()}`
      return NextResponse.json({ id: demoId, record }, { status: 201 })
    }

    // Modo producción: guardar en Supabase
    const { createServerClient } = await import('@/lib/supabase-server')
    const supabase = createServerClient()

    const { data: inserted, error } = await supabase
      .from('diagnosticos_surf')
      .insert({
        nombre_adulto: data.nombre_adulto,
        email: data.email,
        whatsapp: data.whatsapp,
        rol: data.rol,
        cumple_adulto: data.cumple_adulto,
        nombre_hijo: data.nombre_hijo,
        edad_hijo: data.edad_hijo,
        cumple_hijo: data.cumple_hijo,
        genero_hijo: data.genero_hijo,
        principal_preocupacion: data.principal_preocupacion,
        acepta_contacto: data.acepta_contacto,
        q_cierre: data.q_cierre,
        q_discusion_limites: data.q_discusion_limites,
        q_consecuencias: data.q_consecuencias,
        q_reparacion: data.q_reparacion,
        q_culpa_cansancio: data.q_culpa_cansancio,
        q_comunicacion_emocional: data.q_comunicacion_emocional,
        q_acuerdos: data.q_acuerdos,
        q_rechazo: data.q_rechazo,
        q_miedo_perder_vinculo: data.q_miedo_perder_vinculo,
        q_sin_ruta: data.q_sin_ruta,
        promedio_total,
        ola_principal: resultado_visible.ola_principal,
        fase_surf: resultado_visible.fase_surf,
        resultado_visible,
        adulto_compound_number: adultoNum.compound_number,
        adulto_final_number: adultoNum.final_number,
        adulto_numerology_keyword: adultoNum.keyword,
        hijo_compound_number: hijoNum.compound_number,
        hijo_final_number: hijoNum.final_number,
        hijo_numerology_keyword: hijoNum.keyword,
        lectura_simbolica_interna: lecturaSimbolica,
        prioridad_comercial,
        nota_interna,
      })
      .select('id')
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json(
        { error: 'Error guardando el diagnóstico. Intenta de nuevo.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ id: inserted.id, record }, { status: 201 })
  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
