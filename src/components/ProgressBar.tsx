interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

const STEP_LABELS = ['Tus datos', 'Tu hijo/a', 'Diagnóstico', 'Confirmación']

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-3">
        {STEP_LABELS.map((label, i) => {
          const step = i + 1
          const isCompleted = step < currentStep
          const isCurrent = step === currentStep

          return (
            <div key={step} className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  isCompleted
                    ? 'bg-[#50c4c6] text-white'
                    : isCurrent
                    ? 'bg-[#50c4c6] text-white ring-4 ring-[#50c4c6]/20'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {isCompleted ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  step
                )}
              </div>
              <span
                className={`text-xs mt-1 font-medium hidden sm:block ${
                  isCurrent ? 'text-[#50c4c6]' : isCompleted ? 'text-gray-500' : 'text-gray-300'
                }`}
              >
                {label}
              </span>
            </div>
          )
        })}
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#50c4c6] rounded-full transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />
      </div>

      <p className="text-xs text-gray-400 text-center mt-2">
        Paso {currentStep} de {totalSteps}
      </p>
    </div>
  )
}
