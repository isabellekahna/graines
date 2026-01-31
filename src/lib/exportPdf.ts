import { jsPDF } from 'jspdf'
import type { ProjetPedagogique } from '@/types/project'
import { formatCurrency, formatDate } from '@/lib/utils'

export function exportProjectToPDF(projet: ProjetPedagogique) {
  const doc = new jsPDF('p', 'mm', 'a4')
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 20
  const contentWidth = pageWidth - margin * 2
  let y = margin

  function addPage() {
    doc.addPage()
    y = margin
  }

  function checkPageBreak(needed: number) {
    if (y + needed > doc.internal.pageSize.getHeight() - margin) {
      addPage()
    }
  }

  function addTitle(text: string) {
    checkPageBreak(15)
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(30, 64, 175)
    doc.text(text, margin, y)
    y += 3
    doc.setDrawColor(30, 64, 175)
    doc.line(margin, y, pageWidth - margin, y)
    y += 8
  }

  function addSubtitle(text: string) {
    checkPageBreak(10)
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(15, 23, 42)
    doc.text(text, margin, y)
    y += 6
  }

  function addField(label: string, value: string) {
    if (!value || value.trim() === '') return
    checkPageBreak(8)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(100, 116, 139)
    doc.text(`${label} :`, margin, y)
    const labelWidth = doc.getTextWidth(`${label} : `)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(15, 23, 42)
    const lines = doc.splitTextToSize(value, contentWidth - labelWidth)
    if (lines.length === 1) {
      doc.text(value, margin + labelWidth, y)
      y += 5
    } else {
      y += 5
      const allLines = doc.splitTextToSize(value, contentWidth - 5)
      for (const line of allLines) {
        checkPageBreak(5)
        doc.text(line, margin + 5, y)
        y += 4.5
      }
      y += 1
    }
  }

  function addTextBlock(label: string, value: string) {
    if (!value || value.trim() === '') return
    checkPageBreak(15)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(15, 23, 42)
    doc.text(label, margin, y)
    y += 5
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(71, 85, 105)
    const lines = doc.splitTextToSize(value, contentWidth - 5)
    for (const line of lines) {
      checkPageBreak(5)
      doc.text(line, margin + 5, y)
      y += 4.5
    }
    y += 3
  }

  const { generalInfo, objectifs, programme, encadrement, budget, organisation, preparation } = projet

  // Page 1 - Cover
  doc.setFontSize(22)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(30, 64, 175)
  const title = 'PROJET PÉDAGOGIQUE'
  doc.text(title, pageWidth / 2, 50, { align: 'center' })

  doc.setFontSize(16)
  doc.setTextColor(15, 23, 42)
  doc.text('VOYAGE SCOLAIRE', pageWidth / 2, 62, { align: 'center' })

  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')
  doc.text('Dossier de présentation au Conseil d\'Administration', pageWidth / 2, 75, { align: 'center' })

  doc.setDrawColor(30, 64, 175)
  doc.setLineWidth(0.5)
  doc.line(60, 82, pageWidth - 60, 82)

  y = 95
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(15, 23, 42)
  if (generalInfo.intituleProjet) {
    doc.text(generalInfo.intituleProjet, pageWidth / 2, y, { align: 'center' })
    y += 10
  }

  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(71, 85, 105)

  if (generalInfo.destination) {
    doc.text(`Destination : ${generalInfo.destination}${generalInfo.pays ? ` (${generalInfo.pays})` : ''}`, pageWidth / 2, y, { align: 'center' })
    y += 7
  }
  if (generalInfo.dateDepart && generalInfo.dateRetour) {
    doc.text(`Du ${formatDate(generalInfo.dateDepart)} au ${formatDate(generalInfo.dateRetour)}`, pageWidth / 2, y, { align: 'center' })
    y += 7
  }
  if (generalInfo.classesParticipantes) {
    doc.text(`Classes : ${generalInfo.classesParticipantes}`, pageWidth / 2, y, { align: 'center' })
    y += 7
  }
  if (generalInfo.nombreEleves > 0) {
    doc.text(`${generalInfo.nombreEleves} élèves`, pageWidth / 2, y, { align: 'center' })
    y += 12
  }

  doc.setFontSize(10)
  if (generalInfo.etablissement) {
    doc.text(generalInfo.etablissement, pageWidth / 2, y, { align: 'center' })
    y += 6
  }
  if (generalInfo.prenomOrganisateur || generalInfo.nomOrganisateur) {
    doc.text(
      `Organisé par : ${generalInfo.prenomOrganisateur} ${generalInfo.nomOrganisateur}`,
      pageWidth / 2,
      y,
      { align: 'center' },
    )
    y += 6
  }

  const dateGeneration = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
  doc.setFontSize(9)
  doc.setTextColor(148, 163, 184)
  doc.text(`Document généré le ${dateGeneration}`, pageWidth / 2, doc.internal.pageSize.getHeight() - 20, { align: 'center' })

  // Page 2 - General Info
  addPage()
  addTitle('1. INFORMATIONS GÉNÉRALES')

  addSubtitle('Établissement')
  addField('Établissement', generalInfo.etablissement)
  addField('Adresse', generalInfo.adresseEtablissement)
  addField('Téléphone', generalInfo.telephoneEtablissement)
  addField('Email', generalInfo.emailEtablissement)
  addField('Chef d\'établissement', generalInfo.nomChefEtablissement)
  y += 3

  addSubtitle('Organisateur du voyage')
  addField('Nom', `${generalInfo.prenomOrganisateur} ${generalInfo.nomOrganisateur}`)
  addField('Qualité', generalInfo.qualiteOrganisateur)
  addField('Discipline', generalInfo.disciplineOrganisateur)
  addField('Email', generalInfo.emailOrganisateur)
  addField('Téléphone', generalInfo.telephoneOrganisateur)
  y += 3

  addSubtitle('Le Voyage')
  addField('Intitulé', generalInfo.intituleProjet)
  addField('Destination', `${generalInfo.destination}${generalInfo.pays ? ` (${generalInfo.pays})` : ''}`)
  addField('Dates', `Du ${formatDate(generalInfo.dateDepart)} au ${formatDate(generalInfo.dateRetour)}`)
  addField('Durée', `${generalInfo.nombreJours} jour(s), ${generalInfo.nombreNuits} nuit(s)`)
  addField('Classes', generalInfo.classesParticipantes)
  addField('Niveaux', generalInfo.niveaux)
  addField('Nombre d\'élèves', String(generalInfo.nombreEleves || ''))

  // Page 3 - Objectifs
  addPage()
  addTitle('2. OBJECTIFS PÉDAGOGIQUES')
  addTextBlock('Objectifs généraux', objectifs.objectifsGeneraux)
  addTextBlock('Lien avec les programmes scolaires', objectifs.lienProgramme)
  addTextBlock('Compétences du socle commun visées', objectifs.competencesVisees)
  addTextBlock('Objectifs disciplinaires', objectifs.objectifsDisciplinaires)
  addTextBlock('Objectifs transversaux', objectifs.objectifsTransversaux)
  addTextBlock('Objectifs éducatifs', objectifs.objectifsEducatifs)
  if (objectifs.disciplinesConcernees.length > 0) {
    addField('Disciplines concernées', objectifs.disciplinesConcernees.join(', '))
  }
  addTextBlock('Modalités d\'évaluation', objectifs.modalitesEvaluation)

  // Page 4 - Programme
  addPage()
  addTitle('3. PROGRAMME DU VOYAGE')
  if (programme.joursProgramme.length > 0) {
    for (const jour of programme.joursProgramme) {
      checkPageBreak(30)
      addSubtitle(`Jour ${jour.jour}${jour.date ? ` — ${formatDate(jour.date)}` : ''}`)
      addField('Matin', jour.matin)
      addField('Après-midi', jour.apresMidi)
      addField('Soirée', jour.soiree)
      addField('Hébergement', jour.hebergement)
      y += 2
    }
  }
  addTextBlock('Activités pédagogiques', programme.activitesPedagogiques)
  addTextBlock('Visites prévues', programme.visitesPrevues)
  addField('Temps de déplacement', programme.tempsDeplacement)

  // Page 5 - Encadrement
  addPage()
  addTitle('4. ENCADREMENT')
  if (encadrement.accompagnateurs.length > 0) {
    for (const acc of encadrement.accompagnateurs) {
      checkPageBreak(12)
      addField('Accompagnateur', `${acc.prenom} ${acc.nom} — ${acc.qualite}${acc.discipline ? ` (${acc.discipline})` : ''} — Rôle : ${acc.role}`)
    }
    y += 3
  }
  addField('Nombre d\'accompagnateurs', String(encadrement.accompagnateurs.length))
  addField('Taux d\'encadrement', encadrement.tauxEncadrement)
  addTextBlock('Dispositions particulières', encadrement.dispositionsParticulieres)
  addTextBlock('Accompagnement médical', encadrement.accompagnementMedical)

  // Page 6 - Budget
  addPage()
  addTitle('5. BUDGET PRÉVISIONNEL')

  const totalDep = budget.depenses.reduce((s, d) => s + (d.montant || 0), 0)
  const totalRec = budget.recettes.reduce((s, r) => s + (r.montant || 0), 0)

  addSubtitle('Dépenses')
  for (const dep of budget.depenses) {
    if (dep.montant > 0) {
      addField(dep.poste, `${formatCurrency(dep.montant)}${dep.description ? ` — ${dep.description}` : ''}`)
    }
  }
  checkPageBreak(8)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(220, 38, 38)
  doc.text(`TOTAL DÉPENSES : ${formatCurrency(totalDep)}`, margin, y)
  y += 8

  addSubtitle('Recettes / Financements')
  for (const rec of budget.recettes) {
    if (rec.montant > 0) {
      addField(rec.source, `${formatCurrency(rec.montant)}${rec.description ? ` — ${rec.description}` : ''} (${rec.statut === 'confirme' ? 'Confirmé' : rec.statut === 'en_attente' ? 'En attente' : 'Demandé'})`)
    }
  }
  checkPageBreak(8)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(22, 163, 74)
  doc.text(`TOTAL RECETTES : ${formatCurrency(totalRec)}`, margin, y)
  y += 8

  const s = totalRec - totalDep
  checkPageBreak(8)
  doc.setTextColor(s >= 0 ? 22 : 220, s >= 0 ? 163 : 38, s >= 0 ? 74 : 38)
  doc.text(`SOLDE : ${formatCurrency(s)}`, margin, y)
  y += 6

  doc.setTextColor(15, 23, 42)
  if (generalInfo.nombreEleves > 0) {
    addField('Coût par élève', formatCurrency(totalDep / generalInfo.nombreEleves))
  }
  if (budget.participationFamille > 0) {
    addField('Participation par famille', formatCurrency(budget.participationFamille))
  }
  addTextBlock('Observations', budget.observations)

  // Page 7 - Organisation
  addPage()
  addTitle('6. ORGANISATION MATÉRIELLE')

  addSubtitle('Transport')
  addField('Mode de transport', organisation.modeTransport)
  addField('Compagnie', organisation.compagnieTransport)
  addTextBlock('Détails', organisation.detailsTransport)

  addSubtitle('Hébergement')
  addField('Type', organisation.typeHebergement)
  addField('Nom', organisation.nomHebergement)
  addField('Adresse', organisation.adresseHebergement)
  addField('Téléphone', organisation.telephoneHebergement)

  addTextBlock('Restauration', organisation.restauration)

  addSubtitle('Assurance')
  addField('Assureur', organisation.nomAssureur)
  addField('N° contrat', organisation.numeroContrat)

  if (organisation.documentsNecessaires.length > 0) {
    addField('Documents nécessaires', organisation.documentsNecessaires.join(', '))
  }
  addTextBlock('Informations aux parents', organisation.informationsParents)
  addTextBlock('Protocole d\'urgence', organisation.protocoleUrgence)

  // Page 8 - Preparation
  addPage()
  addTitle('7. PRÉPARATION ET EXPLOITATION PÉDAGOGIQUE')

  addTextBlock('Travail préparatoire avec les élèves', preparation.travailPreparatoire)
  addTextBlock('Activités préparatoires en classe', preparation.activitesPreparatoires)
  addTextBlock('Intégration dans la progression pédagogique', preparation.intégrationCours)
  addTextBlock('Exploitation pédagogique au retour', preparation.exploitationRetour)
  addTextBlock('Productions attendues des élèves', preparation.productionsAttendues)
  addTextBlock('Communication et valorisation', preparation.communicationResultats)
  addTextBlock('Modalités de bilan', preparation.bilanPrevu)

  // Footer on each page
  const totalPages = doc.getNumberOfPages()
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(148, 163, 184)
    doc.text(
      `${generalInfo.etablissement || 'Projet Pédagogique'} — Voyage scolaire — Page ${i}/${totalPages}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' },
    )
  }

  const filename = `projet-pedagogique${generalInfo.destination ? `-${generalInfo.destination.toLowerCase().replace(/\s+/g, '-')}` : ''}.pdf`
  doc.save(filename)
}
