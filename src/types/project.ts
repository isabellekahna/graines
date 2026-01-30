export interface GeneralInfo {
  etablissement: string
  adresseEtablissement: string
  telephoneEtablissement: string
  emailEtablissement: string
  nomChefEtablissement: string
  nomOrganisateur: string
  prenomOrganisateur: string
  qualiteOrganisateur: string
  disciplineOrganisateur: string
  emailOrganisateur: string
  telephoneOrganisateur: string
  intituleProjet: string
  destination: string
  pays: string
  dateDepart: string
  dateRetour: string
  nombreJours: number
  nombreNuits: number
  classesParticipantes: string
  niveaux: string
  nombreEleves: number
  nombreElevesSpecifiques: number
  precisionElevesSpecifiques: string
}

export interface ObjectifsPedagogiques {
  objectifsGeneraux: string
  lienProgramme: string
  competencesVisees: string
  objectifsDisciplinaires: string
  objectifsTransversaux: string
  objectifsEducatifs: string
  disciplinesConcernees: string[]
  modalitesEvaluation: string
}

export interface JourProgramme {
  jour: number
  date: string
  matin: string
  apresMidi: string
  soiree: string
  hebergement: string
}

export interface ProgrammeVoyage {
  joursProgramme: JourProgramme[]
  activitesPedagogiques: string
  visitesPrevues: string
  tempsDeplacement: string
}

export interface Accompagnateur {
  nom: string
  prenom: string
  qualite: string
  discipline: string
  role: string
}

export interface Encadrement {
  accompagnateurs: Accompagnateur[]
  nombreAccompagnateurs: number
  tauxEncadrement: string
  dispositionsParticulieres: string
  accompagnementMedical: string
}

export interface LigneBudget {
  poste: string
  description: string
  montant: number
}

export interface LigneFinancement {
  source: string
  description: string
  montant: number
  statut: 'confirme' | 'en_attente' | 'demande'
}

export interface BudgetPrevisionnel {
  depenses: LigneBudget[]
  recettes: LigneFinancement[]
  totalDepenses: number
  totalRecettes: number
  coutParEleve: number
  participationFamille: number
  subventions: string
  observations: string
}

export interface OrganisationMaterielle {
  modeTransport: string
  compagnieTransport: string
  detailsTransport: string
  typeHebergement: string
  nomHebergement: string
  adresseHebergement: string
  telephoneHebergement: string
  restauration: string
  assurance: string
  nomAssureur: string
  numeroContrat: string
  documentsNecessaires: string[]
  informationsParents: string
  autorisationsSanitaires: string
  protocoleUrgence: string
}

export interface PreparationExploitation {
  travailPreparatoire: string
  activitesPreparatoires: string
  intégrationCours: string
  exploitationRetour: string
  productionsAttendues: string
  communicationResultats: string
  bilanPrevu: string
}

export interface ProjetPedagogique {
  generalInfo: GeneralInfo
  objectifs: ObjectifsPedagogiques
  programme: ProgrammeVoyage
  encadrement: Encadrement
  budget: BudgetPrevisionnel
  organisation: OrganisationMaterielle
  preparation: PreparationExploitation
}

export const defaultProjet: ProjetPedagogique = {
  generalInfo: {
    etablissement: '',
    adresseEtablissement: '',
    telephoneEtablissement: '',
    emailEtablissement: '',
    nomChefEtablissement: '',
    nomOrganisateur: '',
    prenomOrganisateur: '',
    qualiteOrganisateur: '',
    disciplineOrganisateur: '',
    emailOrganisateur: '',
    telephoneOrganisateur: '',
    intituleProjet: '',
    destination: '',
    pays: '',
    dateDepart: '',
    dateRetour: '',
    nombreJours: 0,
    nombreNuits: 0,
    classesParticipantes: '',
    niveaux: '',
    nombreEleves: 0,
    nombreElevesSpecifiques: 0,
    precisionElevesSpecifiques: '',
  },
  objectifs: {
    objectifsGeneraux: '',
    lienProgramme: '',
    competencesVisees: '',
    objectifsDisciplinaires: '',
    objectifsTransversaux: '',
    objectifsEducatifs: '',
    disciplinesConcernees: [],
    modalitesEvaluation: '',
  },
  programme: {
    joursProgramme: [],
    activitesPedagogiques: '',
    visitesPrevues: '',
    tempsDeplacement: '',
  },
  encadrement: {
    accompagnateurs: [],
    nombreAccompagnateurs: 0,
    tauxEncadrement: '',
    dispositionsParticulieres: '',
    accompagnementMedical: '',
  },
  budget: {
    depenses: [
      { poste: 'Transport', description: '', montant: 0 },
      { poste: 'Hébergement', description: '', montant: 0 },
      { poste: 'Restauration', description: '', montant: 0 },
      { poste: 'Activités / Visites', description: '', montant: 0 },
      { poste: 'Assurance', description: '', montant: 0 },
      { poste: 'Divers', description: '', montant: 0 },
    ],
    recettes: [
      { source: 'Participation des familles', description: '', montant: 0, statut: 'en_attente' },
      { source: 'Établissement', description: '', montant: 0, statut: 'en_attente' },
      { source: 'FSE / MDL', description: '', montant: 0, statut: 'en_attente' },
    ],
    totalDepenses: 0,
    totalRecettes: 0,
    coutParEleve: 0,
    participationFamille: 0,
    subventions: '',
    observations: '',
  },
  organisation: {
    modeTransport: '',
    compagnieTransport: '',
    detailsTransport: '',
    typeHebergement: '',
    nomHebergement: '',
    adresseHebergement: '',
    telephoneHebergement: '',
    restauration: '',
    assurance: '',
    nomAssureur: '',
    numeroContrat: '',
    documentsNecessaires: [],
    informationsParents: '',
    autorisationsSanitaires: '',
    protocoleUrgence: '',
  },
  preparation: {
    travailPreparatoire: '',
    activitesPreparatoires: '',
    intégrationCours: '',
    exploitationRetour: '',
    productionsAttendues: '',
    communicationResultats: '',
    bilanPrevu: '',
  },
}
