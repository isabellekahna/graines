import { Building2, User, MapPin, Users, CheckCircle } from 'lucide-react'
import { useProject } from '@/context/ProjectContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function GeneralInfoForm() {
  const { projet, updateSection, markStepCompleted } = useProject()
  const info = projet.generalInfo

  const handleChange = (field: string, value: string | number) => {
    updateSection('generalInfo', { [field]: value })
  }

  return (
    <div className="space-y-8">
      {/* Établissement */}
      <div>
        <h2 className="form-section-title">
          <Building2 className="h-5 w-5" />
          Établissement
        </h2>
        <Separator className="mb-6" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="form-field md:col-span-2">
            <Label htmlFor="etablissement">Nom de l'établissement</Label>
            <Input
              id="etablissement"
              value={info.etablissement}
              onChange={(e) => handleChange('etablissement', e.target.value)}
              placeholder="Nom de l'établissement"
            />
          </div>
          <div className="form-field md:col-span-2">
            <Label htmlFor="adresseEtablissement">Adresse</Label>
            <Input
              id="adresseEtablissement"
              value={info.adresseEtablissement}
              onChange={(e) => handleChange('adresseEtablissement', e.target.value)}
              placeholder="Adresse complète"
            />
          </div>
          <div className="form-field">
            <Label htmlFor="telephoneEtablissement">Téléphone</Label>
            <Input
              id="telephoneEtablissement"
              value={info.telephoneEtablissement}
              onChange={(e) => handleChange('telephoneEtablissement', e.target.value)}
              placeholder="Numéro de téléphone"
            />
          </div>
          <div className="form-field">
            <Label htmlFor="emailEtablissement">Email</Label>
            <Input
              id="emailEtablissement"
              type="email"
              value={info.emailEtablissement}
              onChange={(e) => handleChange('emailEtablissement', e.target.value)}
              placeholder="Email de l'établissement"
            />
          </div>
          <div className="form-field md:col-span-2">
            <Label htmlFor="nomChefEtablissement">Nom du chef d'établissement</Label>
            <Input
              id="nomChefEtablissement"
              value={info.nomChefEtablissement}
              onChange={(e) => handleChange('nomChefEtablissement', e.target.value)}
              placeholder="Nom du chef d'établissement"
            />
          </div>
        </div>
      </div>

      {/* Organisateur */}
      <div>
        <h2 className="form-section-title">
          <User className="h-5 w-5" />
          Organisateur du projet
        </h2>
        <Separator className="mb-6" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="form-field">
            <Label htmlFor="nomOrganisateur">Nom</Label>
            <Input
              id="nomOrganisateur"
              value={info.nomOrganisateur}
              onChange={(e) => handleChange('nomOrganisateur', e.target.value)}
              placeholder="Nom de l'organisateur"
            />
          </div>
          <div className="form-field">
            <Label htmlFor="prenomOrganisateur">Prénom</Label>
            <Input
              id="prenomOrganisateur"
              value={info.prenomOrganisateur}
              onChange={(e) => handleChange('prenomOrganisateur', e.target.value)}
              placeholder="Prénom de l'organisateur"
            />
          </div>
          <div className="form-field">
            <Label htmlFor="qualiteOrganisateur">Qualité</Label>
            <Select
              value={info.qualiteOrganisateur}
              onValueChange={(value) => handleChange('qualiteOrganisateur', value)}
            >
              <SelectTrigger id="qualiteOrganisateur">
                <SelectValue placeholder="Sélectionner une qualité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Professeur">Professeur</SelectItem>
                <SelectItem value="CPE">CPE</SelectItem>
                <SelectItem value="Documentaliste">Documentaliste</SelectItem>
                <SelectItem value="Autre">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="form-field">
            <Label htmlFor="disciplineOrganisateur">Discipline</Label>
            <Input
              id="disciplineOrganisateur"
              value={info.disciplineOrganisateur}
              onChange={(e) => handleChange('disciplineOrganisateur', e.target.value)}
              placeholder="Discipline enseignée"
            />
          </div>
          <div className="form-field">
            <Label htmlFor="emailOrganisateur">Email</Label>
            <Input
              id="emailOrganisateur"
              type="email"
              value={info.emailOrganisateur}
              onChange={(e) => handleChange('emailOrganisateur', e.target.value)}
              placeholder="Email de contact"
            />
          </div>
          <div className="form-field">
            <Label htmlFor="telephoneOrganisateur">Téléphone</Label>
            <Input
              id="telephoneOrganisateur"
              value={info.telephoneOrganisateur}
              onChange={(e) => handleChange('telephoneOrganisateur', e.target.value)}
              placeholder="Numéro de téléphone"
            />
          </div>
        </div>
      </div>

      {/* Projet */}
      <div>
        <h2 className="form-section-title">
          <MapPin className="h-5 w-5" />
          Projet de voyage
        </h2>
        <Separator className="mb-6" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="form-field md:col-span-2">
            <Label htmlFor="intituleProjet">Intitulé du projet</Label>
            <Input
              id="intituleProjet"
              value={info.intituleProjet}
              onChange={(e) => handleChange('intituleProjet', e.target.value)}
              placeholder="Intitulé du projet pédagogique"
            />
          </div>
          <div className="form-field">
            <Label htmlFor="destination">Destination</Label>
            <Input
              id="destination"
              value={info.destination}
              onChange={(e) => handleChange('destination', e.target.value)}
              placeholder="Ville ou région de destination"
            />
          </div>
          <div className="form-field">
            <Label htmlFor="pays">Pays</Label>
            <Input
              id="pays"
              value={info.pays}
              onChange={(e) => handleChange('pays', e.target.value)}
              placeholder="Pays de destination"
            />
          </div>
          <div className="form-field">
            <Label htmlFor="dateDepart">Date de départ</Label>
            <Input
              id="dateDepart"
              type="date"
              value={info.dateDepart}
              onChange={(e) => handleChange('dateDepart', e.target.value)}
            />
          </div>
          <div className="form-field">
            <Label htmlFor="dateRetour">Date de retour</Label>
            <Input
              id="dateRetour"
              type="date"
              value={info.dateRetour}
              onChange={(e) => handleChange('dateRetour', e.target.value)}
            />
          </div>
          <div className="form-field">
            <Label htmlFor="nombreJours">Nombre de jours</Label>
            <Input
              id="nombreJours"
              type="number"
              min={0}
              value={info.nombreJours || ''}
              onChange={(e) => handleChange('nombreJours', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
          <div className="form-field">
            <Label htmlFor="nombreNuits">Nombre de nuits</Label>
            <Input
              id="nombreNuits"
              type="number"
              min={0}
              value={info.nombreNuits || ''}
              onChange={(e) => handleChange('nombreNuits', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {/* Élèves */}
      <div>
        <h2 className="form-section-title">
          <Users className="h-5 w-5" />
          Élèves participants
        </h2>
        <Separator className="mb-6" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="form-field">
            <Label htmlFor="classesParticipantes">Classes participantes</Label>
            <Input
              id="classesParticipantes"
              value={info.classesParticipantes}
              onChange={(e) => handleChange('classesParticipantes', e.target.value)}
              placeholder="Ex: 4eA, 4eB, 3eC"
            />
          </div>
          <div className="form-field">
            <Label htmlFor="niveaux">Niveaux</Label>
            <Input
              id="niveaux"
              value={info.niveaux}
              onChange={(e) => handleChange('niveaux', e.target.value)}
              placeholder="Ex: 4e, 3e"
            />
          </div>
          <div className="form-field">
            <Label htmlFor="nombreEleves">Nombre total d'élèves</Label>
            <Input
              id="nombreEleves"
              type="number"
              min={0}
              value={info.nombreEleves || ''}
              onChange={(e) => handleChange('nombreEleves', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
          <div className="form-field">
            <Label htmlFor="nombreElevesSpecifiques">Nombre d'élèves à besoins spécifiques</Label>
            <Input
              id="nombreElevesSpecifiques"
              type="number"
              min={0}
              value={info.nombreElevesSpecifiques || ''}
              onChange={(e) => handleChange('nombreElevesSpecifiques', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
          <div className="form-field md:col-span-2">
            <Label htmlFor="precisionElevesSpecifiques">Précisions sur les élèves à besoins spécifiques</Label>
            <Input
              id="precisionElevesSpecifiques"
              value={info.precisionElevesSpecifiques}
              onChange={(e) => handleChange('precisionElevesSpecifiques', e.target.value)}
              placeholder="Précisions sur les aménagements nécessaires"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={() => markStepCompleted(0)} className="gap-2">
          <CheckCircle className="h-4 w-4" />
          Valider cette section
        </Button>
      </div>
    </div>
  )
}
