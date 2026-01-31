import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { type ProjetPedagogique, defaultProjet } from '@/types/project'

interface ProjectContextType {
  projet: ProjetPedagogique
  updateSection: <K extends keyof ProjetPedagogique>(
    section: K,
    data: Partial<ProjetPedagogique[K]>
  ) => void
  resetProject: () => void
  currentStep: number
  setCurrentStep: (step: number) => void
  isStepCompleted: (step: number) => boolean
  markStepCompleted: (step: number) => void
  completedSteps: Set<number>
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

const STORAGE_KEY = 'projet-pedagogique-data'
const STEPS_KEY = 'projet-pedagogique-steps'

function loadFromStorage(): ProjetPedagogique {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      return JSON.parse(saved)
    }
  } catch {
    // ignore parse errors
  }
  return defaultProjet
}

function loadCompletedSteps(): Set<number> {
  try {
    const saved = localStorage.getItem(STEPS_KEY)
    if (saved) {
      return new Set(JSON.parse(saved))
    }
  } catch {
    // ignore
  }
  return new Set()
}

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projet, setProjet] = useState<ProjetPedagogique>(loadFromStorage)
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(loadCompletedSteps)

  const updateSection = useCallback(<K extends keyof ProjetPedagogique>(
    section: K,
    data: Partial<ProjetPedagogique[K]>
  ) => {
    setProjet(prev => {
      const updated = {
        ...prev,
        [section]: { ...prev[section], ...data },
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const resetProject = useCallback(() => {
    setProjet(defaultProjet)
    setCompletedSteps(new Set())
    setCurrentStep(0)
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(STEPS_KEY)
  }, [])

  const isStepCompleted = useCallback((step: number) => {
    return completedSteps.has(step)
  }, [completedSteps])

  const markStepCompleted = useCallback((step: number) => {
    setCompletedSteps(prev => {
      const next = new Set(prev)
      next.add(step)
      localStorage.setItem(STEPS_KEY, JSON.stringify([...next]))
      return next
    })
  }, [])

  return (
    <ProjectContext.Provider
      value={{
        projet,
        updateSection,
        resetProject,
        currentStep,
        setCurrentStep,
        isStepCompleted,
        markStepCompleted,
        completedSteps,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}

export function useProject() {
  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider')
  }
  return context
}
