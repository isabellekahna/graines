import { Calendar, Plus, Trash2, CheckCircle } from 'lucide-react'
import { useProject } from '@/context/ProjectContext'
import type { JourProgramme } from '@/types/project'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { formatDate } from '@/lib/utils'

export default function ProgrammeForm() {
  const { projet, updateSection, markStepCompleted } = useProject()
  const programme = projet.programme

  const handleChange = (field: string, value: string) => {
    updateSection('programme', { [field]: value })
  }

  const addJour = () => {
    const newJour: JourProgramme = {
      jour: programme.joursProgramme.length + 1,
      date: '',
      matin: '',
      apresMidi: '',
      soiree: '',
      hebergement: '',
    }
    updateSection('programme', {
      joursProgramme: [...programme.joursProgramme, newJour],
    })
  }

  const removeJour = (index: number) => {
    const updated = programme.joursProgramme
      .filter((_, i) => i !== index)
      .map((jour, i) => ({ ...jour, jour: i + 1 }))
    updateSection('programme', { joursProgramme: updated })
  }

  const updateJour = (index: number, field: keyof JourProgramme, value: string) => {
    const updated = programme.joursProgramme.map((jour, i) =>
      i === index ? { ...jour, [field]: value } : jour
    )
    updateSection('programme', { joursProgramme: updated })
  }

  return (
    <div className="space-y-8">
      {/* Programme journalier */}
      <div>
        <h2 className="form-section-title">
          <Calendar className="h-5 w-5" />
          Programme du Voyage
        </h2>
        <Separator className="mb-6" />

        <div className="space-y-4">
          {programme.joursProgramme.map((jour, index) => (
            <Card key={index}>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    Jour {jour.jour}
                    {jour.date && (
                      <span className="ml-2 text-sm font-normal text-muted-foreground">
                        — {formatDate(jour.date)}
                      </span>
                    )}
                  </CardTitle>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeJour(index)}
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="form-field md:col-span-2">
                    <Label htmlFor={`jour-date-${index}`}>Date</Label>
                    <Input
                      id={`jour-date-${index}`}
                      type="date"
                      value={jour.date}
                      onChange={(e) => updateJour(index, 'date', e.target.value)}
                    />
                  </div>
                  <div className="form-field">
                    <Label htmlFor={`jour-matin-${index}`}>Matin</Label>
                    <Textarea
                      id={`jour-matin-${index}`}
                      value={jour.matin}
                      onChange={(e) => updateJour(index, 'matin', e.target.value)}
                      placeholder="Activités du matin..."
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="form-field">
                    <Label htmlFor={`jour-apresmidi-${index}`}>Après-midi</Label>
                    <Textarea
                      id={`jour-apresmidi-${index}`}
                      value={jour.apresMidi}
                      onChange={(e) => updateJour(index, 'apresMidi', e.target.value)}
                      placeholder="Activités de l'après-midi..."
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="form-field">
                    <Label htmlFor={`jour-soiree-${index}`}>Soirée</Label>
                    <Textarea
                      id={`jour-soiree-${index}`}
                      value={jour.soiree}
                      onChange={(e) => updateJour(index, 'soiree', e.target.value)}
                      placeholder="Activités en soirée..."
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="form-field">
                    <Label htmlFor={`jour-hebergement-${index}`}>Hébergement</Label>
                    <Input
                      id={`jour-hebergement-${index}`}
                      value={jour.hebergement}
                      onChange={(e) => updateJour(index, 'hebergement', e.target.value)}
                      placeholder="Lieu d'hébergement pour la nuit"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button type="button" variant="outline" onClick={addJour} className="w-full gap-2">
            <Plus className="h-4 w-4" />
            Ajouter un jour
          </Button>
        </div>
      </div>

      {/* Détails complémentaires */}
      <div>
        <h2 className="form-section-title">
          <Calendar className="h-5 w-5" />
          Détails complémentaires
        </h2>
        <Separator className="mb-6" />

        <div className="space-y-6">
          <div className="form-field">
            <Label htmlFor="activitesPedagogiques">Détail des activités pédagogiques</Label>
            <Textarea
              id="activitesPedagogiques"
              value={programme.activitesPedagogiques}
              onChange={(e) => handleChange('activitesPedagogiques', e.target.value)}
              placeholder="Décrivez en détail les activités pédagogiques prévues..."
              className="min-h-[100px]"
            />
          </div>
          <div className="form-field">
            <Label htmlFor="visitesPrevues">Visites et lieux culturels prévus</Label>
            <Textarea
              id="visitesPrevues"
              value={programme.visitesPrevues}
              onChange={(e) => handleChange('visitesPrevues', e.target.value)}
              placeholder="Listez les visites et lieux culturels prévus..."
              className="min-h-[100px]"
            />
          </div>
          <div className="form-field">
            <Label htmlFor="tempsDeplacement">Temps de déplacement estimé</Label>
            <Textarea
              id="tempsDeplacement"
              value={programme.tempsDeplacement}
              onChange={(e) => handleChange('tempsDeplacement', e.target.value)}
              placeholder="Estimez les temps de déplacement entre les différentes étapes..."
              className="min-h-[100px]"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={() => markStepCompleted(2)} className="gap-2">
          <CheckCircle className="h-4 w-4" />
          Valider cette section
        </Button>
      </div>
    </div>
  )
}
