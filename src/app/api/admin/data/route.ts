import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const password = searchParams.get('password')

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('diagnosticos_surf')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Supabase fetch error:', error)
    return NextResponse.json({ error: 'Error obteniendo datos' }, { status: 500 })
  }

  return NextResponse.json({ data })
}
