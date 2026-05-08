import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

export async function PATCH(req: NextRequest) {
  try {
    const { password, id, nota } = await req.json()

    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    if (!id || typeof nota !== 'string') {
      return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })
    }

    const supabase = createServerClient()
    const { error } = await supabase
      .from('diagnosticos_surf')
      .update({ nota_interna: nota })
      .eq('id', id)

    if (error) {
      return NextResponse.json({ error: 'Error guardando nota' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
