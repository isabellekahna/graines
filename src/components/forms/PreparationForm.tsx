import { BookOpen, PenTool, Lightbulb, CheckCircle } from 'lucide-react'
import { useProject } from '@/context/ProjectContext'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

export default function PreparationForm() {
  const { projet, updateSection, markStepCompleted } = useProject()
  const preparation = projet.preparation

  const handleChange = (field: string, value: string) => {
    updateSection('preparation', { [field]: value })
  }

  return (
    <div className="space-y-8">
      {/* Préparation avant le voyage */}
      <div>
        <h2 className="form-section-title">
          <BookOpen className="h-5 w-5" />
          Préparation avant le voyage
        </h2>
        <Separator className="mb-6" />

        <div className="space-y-6">
          <div className="form-field">
            <Label htmlFor="travailPreparatoire">
              Travail de préparation avec les élèves avant le voyage
            </Label>
            <Textarea
              id="travailPreparatoire"
              value={preparation.travailPreparatoire}
              onChange={(e) => handleChange('travailPreparatoire', e.target.value)}
              placeholder="Décrivez le travail de préparation prévu avec les élèves en amont du voyage..."
              className="min-h-[150px]"
            />
          </div>

          <div className="form-field">
            <Label htmlFor="activitesPreparatoires">Activités préparatoires prévues en classe</Label>
            <Textarea
              id="activitesPreparatoires"
              value={preparation.activitesPreparatoires}
              onChange={(e) => handleChange('activitesPreparatoires', e.target.value)}
              placeholder="Listez les activités préparatoires prévues en classe..."
              className="min-h-[100px]"
            />
          </div>

          <div className="form-field">
            <Label htmlFor="intégrationCours">Intégration dans la progression pédagogique</Label>
            <Textarea
              id="intégrationCours"
              value={preparation.intégrationCours}
              onChange={(e) => handleChange('intégrationCours', e.target.value)}
              placeholder="Expliquez comment le voyage s'intègre dans la progression pédagogique annuelle..."
              className="min-h-[100px]"
            />
          </div>
        </div>
      </div>

      {/* Exploitation au retour */}
      <div>
        <h2 className="form-section-title">
          <PenTool className="h-5 w-5" />
          Exploitation pédagogique au retour
        </h2>
        <Separator className="mb-6" />

        <div className="space-y-6">
          <div className="form-field">
            <Label htmlFor="exploitationRetour">Exploitation pédagogique au retour</Label>
            <Textarea
              id="exploitationRetour"
              value={preparation.exploitationRetour}
              onChange={(e) => handleChange('exploitationRetour', e.target.value)}
              placeholder="Décrivez comment les acquis du voyage seront exploités pédagogiquement au retour..."
              className="min-h-[150px]"
            />
          </div>

          <div className="form-field">
            <Label htmlFor="productionsAttendues">Productions attendues des élèves</Label>
            <Textarea
              id="productionsAttendues"
              value={preparation.productionsAttendues}
              onChange={(e) => handleChange('productionsAttendues', e.target.value)}
              placeholder="Quelles productions sont attendues des élèves (exposés, carnets de voyage, compte-rendus...)..."
              className="min-h-[100px]"
            />
          </div>
        </div>
      </div>

      {/* Communication et bilan */}
      <div>
        <h2 className="form-section-title">
          <Lightbulb className="h-5 w-5" />
          Communication et bilan
        </h2>
        <Separator className="mb-6" />

        <div className="space-y-6">
          <div className="form-field">
            <Label htmlFor="communicationResultats">
              Communication et valorisation (exposition, journal, site web...)
            </Label>
            <Textarea
              id="communicationResultats"
              value={preparation.communicationResultats}
              onChange={(e) => handleChange('communicationResultats', e.target.value)}
              placeholder="Comment les résultats du voyage seront-ils communiqués et valorisés..."
              className="min-h-[100px]"
            />
          </div>

          <div className="form-field">
            <Label htmlFor="bilanPrevu">Modalités de bilan du projet</Label>
            <Textarea
              id="bilanPrevu"
              value={preparation.bilanPrevu}
              onChange={(e) => handleChange('bilanPrevu', e.target.value)}
              placeholder="Décrivez les modalités de bilan prévues pour évaluer le projet dans son ensemble..."
              className="min-h-[100px]"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={() => markStepCompleted(6)} className="gap-2">
          <CheckCircle className="h-4 w-4" />
          Valider cette section
        </Button>
      </div>
    </div>
  )
}
