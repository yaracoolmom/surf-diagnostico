import DiagnosticoForm from '@/components/DiagnosticoForm'

export const metadata = {
  title: 'Diagnóstico | SURF Diagnóstico Familiar',
}

export default function DiagnosticoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#e8f9f9] via-white to-[#f0fafa]">
      <DiagnosticoForm />
    </main>
  )
}
