import { useState, useCallback } from 'react'
import { ProjectProvider, useProject } from '@/context/ProjectContext'
import { Header } from '@/components/layout/Header'
import { Stepper } from '@/components/layout/Stepper'
import { FormNavigation } from '@/components/layout/FormNavigation'
import GeneralInfoForm from '@/components/forms/GeneralInfoForm'
import ObjectifsForm from '@/components/forms/ObjectifsForm'
import ProgrammeForm from '@/components/forms/ProgrammeForm'
import EncadrementForm from '@/components/forms/EncadrementForm'
import BudgetForm from '@/components/forms/BudgetForm'
import OrganisationForm from '@/components/forms/OrganisationForm'
import PreparationForm from '@/components/forms/PreparationForm'
import { ProjectSummary } from '@/components/summary/ProjectSummary'
import { exportProjectToPDF } from '@/lib/exportPdf'

const TOTAL_STEPS = 8

function AppContent() {
  const { projet, resetProject, currentStep, setCurrentStep, completedSteps } = useProject()
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  const handleExportPDF = useCallback(() => {
    exportProjectToPDF(projet)
  }, [projet])

  const handleReset = useCallback(() => {
    if (showResetConfirm) {
      resetProject()
      setShowResetConfirm(false)
    } else {
      setShowResetConfirm(true)
      setTimeout(() => setShowResetConfirm(false), 3000)
    }
  }, [showResetConfirm, resetProject])

  const handleNext = useCallback(() => {
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentStep, setCurrentStep])

  const handlePrevious = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentStep, setCurrentStep])

  const handleStepClick = useCallback(
    (step: number) => {
      setCurrentStep(step)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [setCurrentStep],
  )

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <GeneralInfoForm />
      case 1:
        return <ObjectifsForm />
      case 2:
        return <ProgrammeForm />
      case 3:
        return <EncadrementForm />
      case 4:
        return <BudgetForm />
      case 5:
        return <OrganisationForm />
      case 6:
        return <PreparationForm />
      case 7:
        return <ProjectSummary />
      default:
        return <GeneralInfoForm />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onExportPDF={handleExportPDF}
        onReset={handleReset}
      />

      {showResetConfirm && (
        <div className="bg-destructive text-destructive-foreground text-center py-2 text-sm font-medium no-print">
          Cliquez à nouveau sur Réinitialiser pour confirmer la suppression de toutes les données.
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <div className="mb-6 overflow-hidden rounded-xl border border-border bg-white shadow-sm">
          <Stepper
            currentStep={currentStep}
            completedSteps={completedSteps}
            onStepClick={handleStepClick}
          />
        </div>

        <main className="mb-8">
          {renderStep()}
        </main>

        <FormNavigation
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </div>
    </div>
  )
}

function App() {
  return (
    <ProjectProvider>
      <AppContent />
    </ProjectProvider>
  )
}

export default App
