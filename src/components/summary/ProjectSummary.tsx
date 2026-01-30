import {
  FileText,
  Target,
  Calendar,
  Users,
  Euro,
  Bus,
  BookOpen,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'
import { useProject } from '@/context/ProjectContext'
import { formatCurrency, formatDate } from '@/lib/utils'

export function ProjectSummary() {
  const { projet, completedSteps } = useProject()
  const { generalInfo, objectifs, programme, encadrement, budget, organisation, preparation } = projet

  const totalSteps = 7
  const completed = completedSteps.size
  const progress = Math.round((completed / totalSteps) * 100)

  const totalDepenses = budget.depenses.reduce((sum, d) => sum + (d.montant || 0), 0)
  const totalRecettes = budget.recettes.reduce((sum, r) => sum + (r.montant || 0), 0)
  const solde = totalRecettes - totalDepenses

  return (
    <div className="space-y-8" id="project-summary">
      {/* Header */}
      <div className="text-center border-b-2 border-primary pb-6">
        <h1 className="text-2xl font-bold text-primary mb-1">
          PROJET PÉDAGOGIQUE DE VOYAGE SCOLAIRE
        </h1>
        <h2 className="text-lg text-foreground mb-1">
          Dossier de présentation au Conseil d'Administration
        </h2>
        {generalInfo.etablissement && (
          <p className="text-muted-foreground">{generalInfo.etablissement}</p>
        )}
      </div>

      {/* Progress */}
      <div className="form-section no-print">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">
            Progression du dossier : {completed}/{totalSteps} sections complétées
          </span>
          <span className="text-sm font-bold text-primary">{progress}%</span>
        </div>
        <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            'Informations générales',
            'Objectifs pédagogiques',
            'Programme',
            'Encadrement',
            'Budget',
            'Organisation',
            'Préparation',
          ].map((label, i) => (
            <span
              key={i}
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                completedSteps.has(i)
                  ? 'bg-green-100 text-green-700'
                  : 'bg-orange-100 text-orange-700'
              }`}
            >
              {completedSteps.has(i) ? (
                <CheckCircle2 className="h-3 w-3" />
              ) : (
                <AlertCircle className="h-3 w-3" />
              )}
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* 1. Informations Générales */}
      <section className="form-section">
        <h2 className="form-section-title">
          <FileText className="h-5 w-5" />
          1. Informations Générales
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-semibold text-foreground mb-2">Établissement</h3>
            <SummaryField label="Nom" value={generalInfo.etablissement} />
            <SummaryField label="Adresse" value={generalInfo.adresseEtablissement} />
            <SummaryField label="Téléphone" value={generalInfo.telephoneEtablissement} />
            <SummaryField label="Email" value={generalInfo.emailEtablissement} />
            <SummaryField label="Chef d'établissement" value={generalInfo.nomChefEtablissement} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">Organisateur</h3>
            <SummaryField
              label="Nom"
              value={`${generalInfo.prenomOrganisateur} ${generalInfo.nomOrganisateur}`}
            />
            <SummaryField label="Qualité" value={generalInfo.qualiteOrganisateur} />
            <SummaryField label="Discipline" value={generalInfo.disciplineOrganisateur} />
            <SummaryField label="Email" value={generalInfo.emailOrganisateur} />
            <SummaryField label="Téléphone" value={generalInfo.telephoneOrganisateur} />
          </div>
        </div>
        <div className="mt-4 border-t pt-4">
          <h3 className="font-semibold text-foreground mb-2">Le Voyage</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <SummaryField label="Intitulé du projet" value={generalInfo.intituleProjet} />
              <SummaryField label="Destination" value={`${generalInfo.destination}${generalInfo.pays ? ` (${generalInfo.pays})` : ''}`} />
              <SummaryField label="Dates" value={`Du ${formatDate(generalInfo.dateDepart)} au ${formatDate(generalInfo.dateRetour)}`} />
              <SummaryField label="Durée" value={`${generalInfo.nombreJours} jour(s), ${generalInfo.nombreNuits} nuit(s)`} />
            </div>
            <div>
              <SummaryField label="Classes" value={generalInfo.classesParticipantes} />
              <SummaryField label="Niveaux" value={generalInfo.niveaux} />
              <SummaryField label="Nombre d'élèves" value={String(generalInfo.nombreEleves || '')} />
              {generalInfo.nombreElevesSpecifiques > 0 && (
                <SummaryField
                  label="Élèves à besoins spécifiques"
                  value={`${generalInfo.nombreElevesSpecifiques} — ${generalInfo.precisionElevesSpecifiques}`}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Objectifs Pédagogiques */}
      <section className="form-section print-break">
        <h2 className="form-section-title">
          <Target className="h-5 w-5" />
          2. Objectifs Pédagogiques
        </h2>
        <div className="space-y-3 text-sm">
          <SummaryBlock label="Objectifs généraux" value={objectifs.objectifsGeneraux} />
          <SummaryBlock label="Lien avec les programmes scolaires" value={objectifs.lienProgramme} />
          <SummaryBlock label="Compétences du socle commun visées" value={objectifs.competencesVisees} />
          <SummaryBlock label="Objectifs disciplinaires" value={objectifs.objectifsDisciplinaires} />
          <SummaryBlock label="Objectifs transversaux" value={objectifs.objectifsTransversaux} />
          <SummaryBlock label="Objectifs éducatifs" value={objectifs.objectifsEducatifs} />
          {objectifs.disciplinesConcernees.length > 0 && (
            <div>
              <span className="font-semibold">Disciplines concernées : </span>
              <span>{objectifs.disciplinesConcernees.join(', ')}</span>
            </div>
          )}
          <SummaryBlock label="Modalités d'évaluation" value={objectifs.modalitesEvaluation} />
        </div>
      </section>

      {/* 3. Programme du Voyage */}
      <section className="form-section print-break">
        <h2 className="form-section-title">
          <Calendar className="h-5 w-5" />
          3. Programme du Voyage
        </h2>
        {programme.joursProgramme.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-primary/5">
                  <th className="border border-border px-3 py-2 text-left font-semibold">Jour</th>
                  <th className="border border-border px-3 py-2 text-left font-semibold">Date</th>
                  <th className="border border-border px-3 py-2 text-left font-semibold">Matin</th>
                  <th className="border border-border px-3 py-2 text-left font-semibold">Après-midi</th>
                  <th className="border border-border px-3 py-2 text-left font-semibold">Soirée</th>
                  <th className="border border-border px-3 py-2 text-left font-semibold">Hébergement</th>
                </tr>
              </thead>
              <tbody>
                {programme.joursProgramme.map((jour, i) => (
                  <tr key={i} className={i % 2 === 0 ? '' : 'bg-muted/30'}>
                    <td className="border border-border px-3 py-2 font-medium">J{jour.jour}</td>
                    <td className="border border-border px-3 py-2">{formatDate(jour.date)}</td>
                    <td className="border border-border px-3 py-2 whitespace-pre-line">{jour.matin}</td>
                    <td className="border border-border px-3 py-2 whitespace-pre-line">{jour.apresMidi}</td>
                    <td className="border border-border px-3 py-2 whitespace-pre-line">{jour.soiree}</td>
                    <td className="border border-border px-3 py-2">{jour.hebergement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted-foreground italic text-sm">Aucun programme défini</p>
        )}
        <div className="mt-4 space-y-3 text-sm">
          <SummaryBlock label="Activités pédagogiques" value={programme.activitesPedagogiques} />
          <SummaryBlock label="Visites prévues" value={programme.visitesPrevues} />
          <SummaryBlock label="Temps de déplacement" value={programme.tempsDeplacement} />
        </div>
      </section>

      {/* 4. Encadrement */}
      <section className="form-section print-break">
        <h2 className="form-section-title">
          <Users className="h-5 w-5" />
          4. Encadrement
        </h2>
        {encadrement.accompagnateurs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-primary/5">
                  <th className="border border-border px-3 py-2 text-left font-semibold">Nom</th>
                  <th className="border border-border px-3 py-2 text-left font-semibold">Prénom</th>
                  <th className="border border-border px-3 py-2 text-left font-semibold">Qualité</th>
                  <th className="border border-border px-3 py-2 text-left font-semibold">Discipline</th>
                  <th className="border border-border px-3 py-2 text-left font-semibold">Rôle</th>
                </tr>
              </thead>
              <tbody>
                {encadrement.accompagnateurs.map((acc, i) => (
                  <tr key={i} className={i % 2 === 0 ? '' : 'bg-muted/30'}>
                    <td className="border border-border px-3 py-2">{acc.nom}</td>
                    <td className="border border-border px-3 py-2">{acc.prenom}</td>
                    <td className="border border-border px-3 py-2">{acc.qualite}</td>
                    <td className="border border-border px-3 py-2">{acc.discipline}</td>
                    <td className="border border-border px-3 py-2">{acc.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted-foreground italic text-sm">Aucun accompagnateur défini</p>
        )}
        <div className="mt-4 space-y-2 text-sm">
          <SummaryField
            label="Nombre total d'accompagnateurs"
            value={String(encadrement.accompagnateurs.length)}
          />
          <SummaryField label="Taux d'encadrement" value={encadrement.tauxEncadrement} />
          <SummaryBlock label="Dispositions particulières" value={encadrement.dispositionsParticulieres} />
          <SummaryBlock label="Accompagnement médical" value={encadrement.accompagnementMedical} />
        </div>
      </section>

      {/* 5. Budget Prévisionnel */}
      <section className="form-section print-break">
        <h2 className="form-section-title">
          <Euro className="h-5 w-5" />
          5. Budget Prévisionnel
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Dépenses</h3>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-red-50">
                  <th className="border border-border px-3 py-2 text-left font-semibold">Poste</th>
                  <th className="border border-border px-3 py-2 text-right font-semibold">Montant</th>
                </tr>
              </thead>
              <tbody>
                {budget.depenses
                  .filter(d => d.montant > 0)
                  .map((dep, i) => (
                    <tr key={i}>
                      <td className="border border-border px-3 py-1.5">
                        {dep.poste}
                        {dep.description && <span className="text-muted-foreground"> — {dep.description}</span>}
                      </td>
                      <td className="border border-border px-3 py-1.5 text-right font-mono">
                        {formatCurrency(dep.montant)}
                      </td>
                    </tr>
                  ))}
                <tr className="bg-red-50 font-bold">
                  <td className="border border-border px-3 py-2">TOTAL DÉPENSES</td>
                  <td className="border border-border px-3 py-2 text-right font-mono">
                    {formatCurrency(totalDepenses)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Recettes / Financements</h3>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-green-50">
                  <th className="border border-border px-3 py-2 text-left font-semibold">Source</th>
                  <th className="border border-border px-3 py-2 text-right font-semibold">Montant</th>
                </tr>
              </thead>
              <tbody>
                {budget.recettes
                  .filter(r => r.montant > 0)
                  .map((rec, i) => (
                    <tr key={i}>
                      <td className="border border-border px-3 py-1.5">
                        {rec.source}
                        {rec.description && <span className="text-muted-foreground"> — {rec.description}</span>}
                      </td>
                      <td className="border border-border px-3 py-1.5 text-right font-mono">
                        {formatCurrency(rec.montant)}
                      </td>
                    </tr>
                  ))}
                <tr className="bg-green-50 font-bold">
                  <td className="border border-border px-3 py-2">TOTAL RECETTES</td>
                  <td className="border border-border px-3 py-2 text-right font-mono">
                    {formatCurrency(totalRecettes)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className={`rounded-lg p-3 text-center ${solde >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
            <p className="text-xs text-muted-foreground">Solde</p>
            <p className={`text-lg font-bold ${solde >= 0 ? 'text-green-700' : 'text-red-700'}`}>
              {formatCurrency(solde)}
            </p>
          </div>
          <div className="rounded-lg bg-blue-50 p-3 text-center">
            <p className="text-xs text-muted-foreground">Coût par élève</p>
            <p className="text-lg font-bold text-blue-700">
              {generalInfo.nombreEleves > 0
                ? formatCurrency(totalDepenses / generalInfo.nombreEleves)
                : '—'}
            </p>
          </div>
          <div className="rounded-lg bg-purple-50 p-3 text-center">
            <p className="text-xs text-muted-foreground">Part famille</p>
            <p className="text-lg font-bold text-purple-700">
              {budget.participationFamille > 0
                ? formatCurrency(budget.participationFamille)
                : '—'}
            </p>
          </div>
        </div>
        {budget.observations && (
          <div className="mt-3 text-sm">
            <SummaryBlock label="Observations" value={budget.observations} />
          </div>
        )}
      </section>

      {/* 6. Organisation Matérielle */}
      <section className="form-section print-break">
        <h2 className="form-section-title">
          <Bus className="h-5 w-5" />
          6. Organisation Matérielle
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-semibold mb-2">Transport</h3>
            <SummaryField label="Mode" value={organisation.modeTransport} />
            <SummaryField label="Compagnie" value={organisation.compagnieTransport} />
            <SummaryBlock label="Détails" value={organisation.detailsTransport} />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Hébergement</h3>
            <SummaryField label="Type" value={organisation.typeHebergement} />
            <SummaryField label="Nom" value={organisation.nomHebergement} />
            <SummaryField label="Adresse" value={organisation.adresseHebergement} />
            <SummaryField label="Téléphone" value={organisation.telephoneHebergement} />
          </div>
        </div>
        <div className="mt-4 space-y-3 text-sm">
          <SummaryBlock label="Restauration" value={organisation.restauration} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <SummaryField label="Assurance" value={organisation.nomAssureur} />
              <SummaryField label="N° contrat" value={organisation.numeroContrat} />
            </div>
          </div>
          {organisation.documentsNecessaires.length > 0 && (
            <div>
              <span className="font-semibold">Documents nécessaires : </span>
              <span>{organisation.documentsNecessaires.join(', ')}</span>
            </div>
          )}
          <SummaryBlock label="Protocole d'urgence" value={organisation.protocoleUrgence} />
        </div>
      </section>

      {/* 7. Préparation et Exploitation */}
      <section className="form-section print-break">
        <h2 className="form-section-title">
          <BookOpen className="h-5 w-5" />
          7. Préparation et Exploitation Pédagogique
        </h2>
        <div className="space-y-3 text-sm">
          <SummaryBlock label="Travail préparatoire" value={preparation.travailPreparatoire} />
          <SummaryBlock label="Activités préparatoires en classe" value={preparation.activitesPreparatoires} />
          <SummaryBlock label="Intégration dans la progression" value={preparation.intégrationCours} />
          <SummaryBlock label="Exploitation au retour" value={preparation.exploitationRetour} />
          <SummaryBlock label="Productions attendues" value={preparation.productionsAttendues} />
          <SummaryBlock label="Communication et valorisation" value={preparation.communicationResultats} />
          <SummaryBlock label="Modalités de bilan" value={preparation.bilanPrevu} />
        </div>
      </section>

      {/* Footer for print */}
      <div className="text-center text-xs text-muted-foreground border-t pt-4 mt-8">
        <p>
          Document généré le {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
        <p>Projet pédagogique — Voyage scolaire — {generalInfo.etablissement}</p>
      </div>
    </div>
  )
}

function SummaryField({ label, value }: { label: string; value: string }) {
  if (!value || value.trim() === '' || value === '0') return null
  return (
    <p className="py-0.5">
      <span className="font-medium text-muted-foreground">{label} : </span>
      <span>{value}</span>
    </p>
  )
}

function SummaryBlock({ label, value }: { label: string; value: string }) {
  if (!value || value.trim() === '') return null
  return (
    <div>
      <p className="font-semibold text-foreground">{label}</p>
      <p className="text-muted-foreground whitespace-pre-line pl-2 border-l-2 border-primary/20 mt-1">
        {value}
      </p>
    </div>
  )
}
