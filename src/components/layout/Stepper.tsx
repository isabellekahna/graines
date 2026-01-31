import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Step {
  label: string
  shortLabel: string
}

const STEPS: Step[] = [
  { label: 'Informations générales', shortLabel: 'Infos' },
  { label: 'Objectifs pédagogiques', shortLabel: 'Objectifs' },
  { label: 'Programme du voyage', shortLabel: 'Programme' },
  { label: 'Encadrement', shortLabel: 'Encadrement' },
  { label: 'Budget prévisionnel', shortLabel: 'Budget' },
  { label: 'Organisation matérielle', shortLabel: 'Organisation' },
  { label: 'Préparation pédagogique', shortLabel: 'Préparation' },
  { label: 'Récapitulatif', shortLabel: 'Résumé' },
]

interface StepperProps {
  currentStep: number
  completedSteps: Set<number>
  onStepClick: (step: number) => void
}

export function Stepper({ currentStep, completedSteps, onStepClick }: StepperProps) {
  return (
    <nav className="w-full overflow-x-auto no-print">
      <ol className="flex items-center gap-1 min-w-max p-2">
        {STEPS.map((step, index) => {
          const isActive = index === currentStep
          const isCompleted = completedSteps.has(index)
          const isClickable = true

          return (
            <li key={index} className="flex items-center">
              <button
                onClick={() => isClickable && onStepClick(index)}
                className={cn(
                  'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all',
                  isActive && 'bg-primary text-primary-foreground shadow-md',
                  isCompleted && !isActive && 'bg-green-50 text-green-700 hover:bg-green-100',
                  !isActive && !isCompleted && 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  isClickable && 'cursor-pointer',
                )}
                type="button"
              >
                <span
                  className={cn(
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                    isActive && 'bg-primary-foreground text-primary',
                    isCompleted && !isActive && 'bg-green-600 text-white',
                    !isActive && !isCompleted && 'bg-muted-foreground/20 text-muted-foreground',
                  )}
                >
                  {isCompleted ? <Check className="h-3.5 w-3.5" /> : index + 1}
                </span>
                <span className="hidden lg:inline">{step.label}</span>
                <span className="lg:hidden">{step.shortLabel}</span>
              </button>
              {index < STEPS.length - 1 && (
                <div
                  className={cn(
                    'mx-1 h-px w-4 shrink-0',
                    isCompleted ? 'bg-green-400' : 'bg-border',
                  )}
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export { STEPS }
