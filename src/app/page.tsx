import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#e8f9f9] via-white to-[#f0fafa] flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5 max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-[#50c4c6]">SURF</span>
          <span className="text-sm text-gray-400 font-medium hidden sm:inline">
            Diagnóstico Familiar
          </span>
        </div>
      </header>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
        <div className="max-w-xl w-full mx-auto">
          {/* Wave icon */}
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-[#50c4c6]/10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-[#50c4c6]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5c1.5 0 3-1.5 4.5-1.5s3 1.5 4.5 1.5 3-1.5 4.5-1.5 3 1.5 4.5 1.5M3 12c1.5 0 3-1.5 4.5-1.5s3 1.5 4.5 1.5 3-1.5 4.5-1.5 3 1.5 4.5 1.5"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 leading-snug mb-5">
            Descubre qué está pasando en la relación con tu adolescente
          </h1>

          <p className="text-lg text-gray-500 leading-relaxed mb-10 max-w-md mx-auto">
            Responde este diagnóstico inicial y recibe una primera ruta para empezar a
            reconectar sin gritos, culpa ni peleas.
          </p>

          <Link
            href="/diagnostico"
            className="inline-block bg-[#50c4c6] hover:bg-[#3db5b7] text-white font-semibold px-10 py-4 rounded-full text-lg transition-all duration-200 shadow-md hover:shadow-xl hover:-translate-y-0.5"
          >
            Iniciar diagnóstico
          </Link>

          {/* Trust signals */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-[#50c4c6]" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Toma solo 5 minutos
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-[#50c4c6]" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Resultado inmediato
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-[#50c4c6]" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              100% confidencial
            </span>
          </div>

          <p className="mt-8 text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
            Este diagnóstico no reemplaza un proceso psicológico o terapéutico. Es una
            herramienta inicial de orientación familiar.
          </p>
        </div>
      </div>
    </main>
  )
}
