import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FormNavigationProps {
  currentStep: number
  totalSteps: number
  onPrevious: () => void
  onNext: () => void
}

export function FormNavigation({ currentStep, totalSteps, onPrevious, onNext }: FormNavigationProps) {
  const isFirst = currentStep === 0
  const isLast = currentStep === totalSteps - 1

  return (
    <div className="flex items-center justify-between pt-6 no-print">
      <button
        onClick={onPrevious}
        disabled={isFirst}
        className={cn(
          'inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors',
          isFirst
            ? 'cursor-not-allowed text-muted-foreground/50'
            : 'border border-border text-foreground hover:bg-muted',
        )}
        type="button"
      >
        <ChevronLeft className="h-4 w-4" />
        Précédent
      </button>

      <span className="text-sm text-muted-foreground">
        Étape {currentStep + 1} sur {totalSteps}
      </span>

      <button
        onClick={onNext}
        disabled={isLast}
        className={cn(
          'inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors',
          isLast
            ? 'cursor-not-allowed bg-muted text-muted-foreground/50'
            : 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90',
        )}
        type="button"
      >
        Suivant
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}
