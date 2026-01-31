import { Target, CheckCircle } from 'lucide-react'
import { useProject } from '@/context/ProjectContext'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

const DISCIPLINES = [
  'Français',
  'Mathématiques',
  'Histoire-Géographie',
  'Langues vivantes',
  'Sciences',
  'EPS',
  'Arts',
  'Technologie',
  'EMC',
  'Autre',
]

export default function ObjectifsForm() {
  const { projet, updateSection, markStepCompleted } = useProject()
  const objectifs = projet.objectifs

  const handleChange = (field: string, value: string) => {
    updateSection('objectifs', { [field]: value })
  }

  const handleDisciplineToggle = (discipline: string) => {
    const current = objectifs.disciplinesConcernees
    const updated = current.includes(discipline)
      ? current.filter((d) => d !== discipline)
      : [...current, discipline]
    updateSection('objectifs', { disciplinesConcernees: updated })
  }

  return (
    <div className="space-y-8">
      {/* Objectifs généraux */}
      <div>
        <h2 className="form-section-title">
          <Target className="h-5 w-5" />
          Objectifs Pédagogiques
        </h2>
        <Separator className="mb-6" />

        <div className="space-y-6">
          <div className="form-field">
            <Label htmlFor="objectifsGeneraux">Objectifs généraux du projet</Label>
            <Textarea
              id="objectifsGeneraux"
              value={objectifs.objectifsGeneraux}
              onChange={(e) => handleChange('objectifsGeneraux', e.target.value)}
              placeholder="Décrivez les objectifs généraux du voyage scolaire..."
              className="min-h-[150px]"
            />
          </div>

          <div className="form-field">
            <Label htmlFor="lienProgramme">Lien avec les programmes scolaires</Label>
            <Textarea
              id="lienProgramme"
              value={objectifs.lienProgramme}
              onChange={(e) => handleChange('lienProgramme', e.target.value)}
              placeholder="Expliquez comment ce projet s'inscrit dans les programmes scolaires..."
              className="min-h-[100px]"
            />
          </div>

          <div className="form-field">
            <Label htmlFor="competencesVisees">Compétences du socle commun visées</Label>
            <Textarea
              id="competencesVisees"
              value={objectifs.competencesVisees}
              onChange={(e) => handleChange('competencesVisees', e.target.value)}
              placeholder="Listez les compétences du socle commun visées..."
              className="min-h-[100px]"
            />
          </div>

          <div className="form-field">
            <Label htmlFor="objectifsDisciplinaires">Objectifs disciplinaires</Label>
            <Textarea
              id="objectifsDisciplinaires"
              value={objectifs.objectifsDisciplinaires}
              onChange={(e) => handleChange('objectifsDisciplinaires', e.target.value)}
              placeholder="Détaillez les objectifs propres à chaque discipline impliquée..."
              className="min-h-[100px]"
            />
          </div>

          <div className="form-field">
            <Label htmlFor="objectifsTransversaux">Objectifs transversaux</Label>
            <Textarea
              id="objectifsTransversaux"
              value={objectifs.objectifsTransversaux}
              onChange={(e) => handleChange('objectifsTransversaux', e.target.value)}
              placeholder="Objectifs communs à plusieurs disciplines..."
              className="min-h-[100px]"
            />
          </div>

          <div className="form-field">
            <Label htmlFor="objectifsEducatifs">
              Objectifs éducatifs (savoir-être, autonomie, ouverture culturelle...)
            </Label>
            <Textarea
              id="objectifsEducatifs"
              value={objectifs.objectifsEducatifs}
              onChange={(e) => handleChange('objectifsEducatifs', e.target.value)}
              placeholder="Décrivez les objectifs éducatifs : savoir-être, autonomie, ouverture culturelle..."
              className="min-h-[100px]"
            />
          </div>
        </div>
      </div>

      {/* Disciplines concernées */}
      <div>
        <h2 className="form-section-title">
          <Target className="h-5 w-5" />
          Disciplines concernées
        </h2>
        <Separator className="mb-6" />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
          {DISCIPLINES.map((discipline) => {
            const isChecked = objectifs.disciplinesConcernees.includes(discipline)
            return (
              <label
                key={discipline}
                className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2.5 text-sm transition-colors ${
                  isChecked
                    ? 'border-primary bg-primary/5 text-primary font-medium'
                    : 'border-border hover:bg-muted'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleDisciplineToggle(discipline)}
                  className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
                />
                {discipline}
              </label>
            )
          })}
        </div>
      </div>

      {/* Évaluation */}
      <div>
        <h2 className="form-section-title">
          <Target className="h-5 w-5" />
          Modalités d'évaluation
        </h2>
        <Separator className="mb-6" />

        <div className="form-field">
          <Label htmlFor="modalitesEvaluation">Modalités d'évaluation prévues</Label>
          <Textarea
            id="modalitesEvaluation"
            value={objectifs.modalitesEvaluation}
            onChange={(e) => handleChange('modalitesEvaluation', e.target.value)}
            placeholder="Comment seront évalués les acquis des élèves suite à ce voyage..."
            className="min-h-[100px]"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={() => markStepCompleted(1)} className="gap-2">
          <CheckCircle className="h-4 w-4" />
          Valider cette section
        </Button>
      </div>
    </div>
  )
}
