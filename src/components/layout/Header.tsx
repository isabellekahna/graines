import { GraduationCap, FileDown, RotateCcw } from 'lucide-react'

interface HeaderProps {
  onExportPDF: () => void
  onReset: () => void
}

export function Header({ onExportPDF, onReset }: HeaderProps) {
  return (
    <header className="border-b border-border bg-white shadow-sm no-print">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">
                Projet Pédagogique
              </h1>
              <p className="text-sm text-muted-foreground">
                Voyage scolaire — Dossier Conseil d'Administration
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onExportPDF}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
              type="button"
            >
              <FileDown className="h-4 w-4" />
              Exporter PDF
            </button>
            <button
              onClick={onReset}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
              type="button"
            >
              <RotateCcw className="h-4 w-4" />
              Réinitialiser
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
