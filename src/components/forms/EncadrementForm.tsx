import { ShieldCheck, Plus, Trash2, CheckCircle, Users } from 'lucide-react'
import { useProject } from '@/context/ProjectContext'
import type { Accompagnateur } from '@/types/project'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function EncadrementForm() {
  const { projet, updateSection, markStepCompleted } = useProject()
  const encadrement = projet.encadrement

  const handleChange = (field: string, value: string) => {
    updateSection('encadrement', { [field]: value })
  }

  const addAccompagnateur = () => {
    const newAccompagnateur: Accompagnateur = {
      nom: '',
      prenom: '',
      qualite: '',
      discipline: '',
      role: '',
    }
    const updated = [...encadrement.accompagnateurs, newAccompagnateur]
    updateSection('encadrement', {
      accompagnateurs: updated,
      nombreAccompagnateurs: updated.length,
    })
  }

  const removeAccompagnateur = (index: number) => {
    const updated = encadrement.accompagnateurs.filter((_, i) => i !== index)
    updateSection('encadrement', {
      accompagnateurs: updated,
      nombreAccompagnateurs: updated.length,
    })
  }

  const updateAccompagnateur = (
    index: number,
    field: keyof Accompagnateur,
    value: string
  ) => {
    const updated = encadrement.accompagnateurs.map((acc, i) =>
      i === index ? { ...acc, [field]: value } : acc
    )
    updateSection('encadrement', { accompagnateurs: updated })
  }

  return (
    <div className="space-y-8">
      {/* Liste des accompagnateurs */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="form-section-title">
            <ShieldCheck className="h-5 w-5" />
            Accompagnateurs
          </h2>
          <Badge variant="secondary" className="text-sm">
            <Users className="mr-1 h-3.5 w-3.5" />
            {encadrement.accompagnateurs.length} accompagnateur{encadrement.accompagnateurs.length !== 1 ? 's' : ''}
          </Badge>
        </div>
        <Separator className="mb-6" />

        <div className="space-y-4">
          {encadrement.accompagnateurs.map((acc, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="form-field">
                      <Label htmlFor={`acc-nom-${index}`}>Nom</Label>
                      <Input
                        id={`acc-nom-${index}`}
                        value={acc.nom}
                        onChange={(e) => updateAccompagnateur(index, 'nom', e.target.value)}
                        placeholder="Nom"
                      />
                    </div>
                    <div className="form-field">
                      <Label htmlFor={`acc-prenom-${index}`}>Prénom</Label>
                      <Input
                        id={`acc-prenom-${index}`}
                        value={acc.prenom}
                        onChange={(e) => updateAccompagnateur(index, 'prenom', e.target.value)}
                        placeholder="Prénom"
                      />
                    </div>
                    <div className="form-field">
                      <Label htmlFor={`acc-qualite-${index}`}>Qualité</Label>
                      <Select
                        value={acc.qualite}
                        onValueChange={(value) => updateAccompagnateur(index, 'qualite', value)}
                      >
                        <SelectTrigger id={`acc-qualite-${index}`}>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Enseignant">Enseignant</SelectItem>
                          <SelectItem value="Personnel de direction">Personnel de direction</SelectItem>
                          <SelectItem value="Personnel d'éducation">Personnel d'éducation</SelectItem>
                          <SelectItem value="Infirmier(ère)">Infirmier(ère)</SelectItem>
                          <SelectItem value="Parent d'élève">Parent d'élève</SelectItem>
                          <SelectItem value="Autre">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="form-field">
                      <Label htmlFor={`acc-discipline-${index}`}>Discipline</Label>
                      <Input
                        id={`acc-discipline-${index}`}
                        value={acc.discipline}
                        onChange={(e) => updateAccompagnateur(index, 'discipline', e.target.value)}
                        placeholder="Discipline enseignée"
                      />
                    </div>
                    <div className="form-field md:col-span-2">
                      <Label htmlFor={`acc-role-${index}`}>Rôle dans le voyage</Label>
                      <Input
                        id={`acc-role-${index}`}
                        value={acc.role}
                        onChange={(e) => updateAccompagnateur(index, 'role', e.target.value)}
                        placeholder="Rôle spécifique lors du voyage"
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeAccompagnateur(index)}
                    className="mt-6 shrink-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button type="button" variant="outline" onClick={addAccompagnateur} className="w-full gap-2">
            <Plus className="h-4 w-4" />
            Ajouter un accompagnateur
          </Button>
        </div>
      </div>

      {/* Détails de l'encadrement */}
      <div>
        <h2 className="form-section-title">
          <ShieldCheck className="h-5 w-5" />
          Détails de l'encadrement
        </h2>
        <Separator className="mb-6" />

        <div className="space-y-6">
          <div className="form-field">
            <Label htmlFor="tauxEncadrement">Taux d'encadrement (ex: 1 pour 12)</Label>
            <Input
              id="tauxEncadrement"
              value={encadrement.tauxEncadrement}
              onChange={(e) => handleChange('tauxEncadrement', e.target.value)}
              placeholder="Ex: 1 pour 12"
            />
          </div>
          <div className="form-field">
            <Label htmlFor="dispositionsParticulieres">
              Dispositions particulières pour élèves à besoins spécifiques
            </Label>
            <Textarea
              id="dispositionsParticulieres"
              value={encadrement.dispositionsParticulieres}
              onChange={(e) => handleChange('dispositionsParticulieres', e.target.value)}
              placeholder="Décrivez les dispositions prises pour les élèves à besoins spécifiques..."
              className="min-h-[100px]"
            />
          </div>
          <div className="form-field">
            <Label htmlFor="accompagnementMedical">Dispositions médicales et sanitaires</Label>
            <Textarea
              id="accompagnementMedical"
              value={encadrement.accompagnementMedical}
              onChange={(e) => handleChange('accompagnementMedical', e.target.value)}
              placeholder="Dispositions médicales, trousse de secours, accompagnement sanitaire..."
              className="min-h-[100px]"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={() => markStepCompleted(3)} className="gap-2">
          <CheckCircle className="h-4 w-4" />
          Valider cette section
        </Button>
      </div>
    </div>
  )
}
