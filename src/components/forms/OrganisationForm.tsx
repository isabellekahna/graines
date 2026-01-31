import { ClipboardList, Bus, Building, UtensilsCrossed, Shield, FileText, CheckCircle } from 'lucide-react'
import { useProject } from '@/context/ProjectContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const DOCUMENTS_OPTIONS = [
  'Passeport / CNI',
  'Autorisation parentale',
  'Fiche sanitaire',
  "Carte européenne d'assurance maladie",
  "Autorisation droit à l'image",
  'Carnet de correspondance',
]

export default function OrganisationForm() {
  const { projet, updateSection, markStepCompleted } = useProject()
  const organisation = projet.organisation

  const handleChange = (field: string, value: string) => {
    updateSection('organisation', { [field]: value })
  }

  const handleDocumentToggle = (document: string) => {
    const current = organisation.documentsNecessaires
    const updated = current.includes(document)
      ? current.filter((d) => d !== document)
      : [...current, document]
    updateSection('organisation', { documentsNecessaires: updated })
  }

  const getDocumentCheckboxClass = (isChecked: boolean) => {
    return isChecked
      ? 'flex cursor-pointer items-center gap-2 rounded-lg border border-primary bg-primary/5 px-3 py-2.5 text-sm font-medium text-primary transition-colors'
      : 'flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2.5 text-sm transition-colors hover:bg-muted'
  }

  return (
    <div className="space-y-8">
      {/* Transport */}
      <div>
        <h2 className="form-section-title">
          <Bus className="h-5 w-5" />
          Transport
        </h2>
        <Separator className="mb-6" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="form-field">
            <Label htmlFor="modeTransport">Mode de transport</Label>
            <Select
              value={organisation.modeTransport}
              onValueChange={(value) => handleChange('modeTransport', value)}
            >
              <SelectTrigger id="modeTransport">
                <SelectValue placeholder="Sélectionner un mode de transport" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Autocar">Autocar</SelectItem>
                <SelectItem value="Train">Train</SelectItem>
                <SelectItem value="Avion">Avion</SelectItem>
                <SelectItem value="Bateau">Bateau</SelectItem>
                <SelectItem value="Autre">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="form-field">
            <Label htmlFor="compagnieTransport">Compagnie de transport</Label>
            <Input
              id="compagnieTransport"
              value={organisation.compagnieTransport}
              onChange={(e) => handleChange('compagnieTransport', e.target.value)}
              placeholder="Nom de la compagnie"
            />
          </div>
          <div className="form-field md:col-span-2">
            <Label htmlFor="detailsTransport">Détails du transport</Label>
            <Textarea
              id="detailsTransport"
              value={organisation.detailsTransport}
              onChange={(e) => handleChange('detailsTransport', e.target.value)}
              placeholder="Horaires, itinéraire, points de départ et d'arrivée..."
              className="min-h-[100px]"
            />
          </div>
        </div>
      </div>

      {/* Hébergement */}
      <div>
        <h2 className="form-section-title">
          <Building className="h-5 w-5" />
          Hébergement
        </h2>
        <Separator className="mb-6" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="form-field">
            <Label htmlFor="typeHebergement">Type d'hébergement</Label>
            <Select
              value={organisation.typeHebergement}
              onValueChange={(value) => handleChange('typeHebergement', value)}
            >
              <SelectTrigger id="typeHebergement">
                <SelectValue placeholder="Sélectionner un type d'hébergement" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Hôtel">Hôtel</SelectItem>
                <SelectItem value="Auberge de jeunesse">Auberge de jeunesse</SelectItem>
                <SelectItem value="Famille d'accueil">Famille d'accueil</SelectItem>
                <SelectItem value="Camping">Camping</SelectItem>
                <SelectItem value="Centre de vacances">Centre de vacances</SelectItem>
                <SelectItem value="Autre">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="form-field">
            <Label htmlFor="nomHebergement">Nom de l'hébergement</Label>
            <Input
              id="nomHebergement"
              value={organisation.nomHebergement}
              onChange={(e) => handleChange('nomHebergement', e.target.value)}
              placeholder="Nom de l'établissement"
            />
          </div>
          <div className="form-field md:col-span-2">
            <Label htmlFor="adresseHebergement">Adresse</Label>
            <Input
              id="adresseHebergement"
              value={organisation.adresseHebergement}
              onChange={(e) => handleChange('adresseHebergement', e.target.value)}
              placeholder="Adresse complète"
            />
          </div>
          <div className="form-field">
            <Label htmlFor="telephoneHebergement">Téléphone</Label>
            <Input
              id="telephoneHebergement"
              value={organisation.telephoneHebergement}
              onChange={(e) => handleChange('telephoneHebergement', e.target.value)}
              placeholder="Numéro de téléphone"
            />
          </div>
        </div>
      </div>

      {/* Restauration */}
      <div>
        <h2 className="form-section-title">
          <UtensilsCrossed className="h-5 w-5" />
          Restauration
        </h2>
        <Separator className="mb-6" />
        <div className="form-field">
          <Label htmlFor="restauration">Modalités de restauration</Label>
          <Textarea
            id="restauration"
            value={organisation.restauration}
            onChange={(e) => handleChange('restauration', e.target.value)}
            placeholder="Décrivez les modalités de restauration prévues (petit-déjeuner, déjeuner, dîner, paniers-repas...)..."
            className="min-h-[100px]"
          />
        </div>
      </div>

      {/* Assurance */}
      <div>
        <h2 className="form-section-title">
          <Shield className="h-5 w-5" />
          Assurance
        </h2>
        <Separator className="mb-6" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="form-field md:col-span-2">
            <Label htmlFor="assurance">Détails de l'assurance</Label>
            <Textarea
              id="assurance"
              value={organisation.assurance}
              onChange={(e) => handleChange('assurance', e.target.value)}
              placeholder="Type de couverture, garanties..."
              className="min-h-[100px]"
            />
          </div>
          <div className="form-field">
            <Label htmlFor="nomAssureur">Nom de l'assureur</Label>
            <Input
              id="nomAssureur"
              value={organisation.nomAssureur}
              onChange={(e) => handleChange('nomAssureur', e.target.value)}
              placeholder="Compagnie d'assurance"
            />
          </div>
          <div className="form-field">
            <Label htmlFor="numeroContrat">Numéro de contrat</Label>
            <Input
              id="numeroContrat"
              value={organisation.numeroContrat}
              onChange={(e) => handleChange('numeroContrat', e.target.value)}
              placeholder="Numéro du contrat d'assurance"
            />
          </div>
        </div>
      </div>

      {/* Documents nécessaires */}
      <div>
        <h2 className="form-section-title">
          <FileText className="h-5 w-5" />
          Documents nécessaires
        </h2>
        <Separator className="mb-6" />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {DOCUMENTS_OPTIONS.map((document) => {
            const isChecked = organisation.documentsNecessaires.includes(document)
            return (
              <label
                key={document}
                className={getDocumentCheckboxClass(isChecked)}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleDocumentToggle(document)}
                  className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
                />
                {document}
              </label>
            )
          })}
        </div>
      </div>

      {/* Informations complémentaires */}
      <div>
        <h2 className="form-section-title">
          <ClipboardList className="h-5 w-5" />
          Informations complémentaires
        </h2>
        <Separator className="mb-6" />

        <div className="space-y-6">
          <div className="form-field">
            <Label htmlFor="informationsParents">Informations aux parents</Label>
            <Textarea
              id="informationsParents"
              value={organisation.informationsParents}
              onChange={(e) => handleChange('informationsParents', e.target.value)}
              placeholder="Informations à communiquer aux parents..."
              className="min-h-[100px]"
            />
          </div>
          <div className="form-field">
            <Label htmlFor="autorisationsSanitaires">Autorisations sanitaires</Label>
            <Textarea
              id="autorisationsSanitaires"
              value={organisation.autorisationsSanitaires}
              onChange={(e) => handleChange('autorisationsSanitaires', e.target.value)}
              placeholder="Autorisations sanitaires nécessaires..."
              className="min-h-[100px]"
            />
          </div>
          <div className="form-field">
            <Label htmlFor="protocoleUrgence">Protocole en cas d'urgence</Label>
            <Textarea
              id="protocoleUrgence"
              value={organisation.protocoleUrgence}
              onChange={(e) => handleChange('protocoleUrgence', e.target.value)}
              placeholder="Décrivez le protocole à suivre en cas d'urgence..."
              className="min-h-[100px]"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={() => markStepCompleted(5)} className="gap-2">
          <CheckCircle className="h-4 w-4" />
          Valider cette section
        </Button>
      </div>
    </div>
  )
}
