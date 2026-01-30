# Projet Pédagogique - Voyage Scolaire

Application web permettant aux professeurs de remplir leur projet pédagogique pour un voyage scolaire, destiné à être présenté au Conseil d'Administration.

## Fonctionnalités

- Formulaire multi-étapes couvrant toutes les sections requises
- Sauvegarde automatique dans le navigateur (localStorage)
- Export PDF du dossier complet
- Page récapitulatif avec suivi de progression
- Interface responsive et accessible

## Sections du formulaire

1. **Informations générales** - Établissement, organisateur, destination, dates, élèves
2. **Objectifs pédagogiques** - Objectifs, lien avec les programmes, compétences visées
3. **Programme du voyage** - Planning jour par jour, activités, visites
4. **Encadrement** - Accompagnateurs, taux d'encadrement, dispositions médicales
5. **Budget prévisionnel** - Dépenses, recettes, solde, coût par élève
6. **Organisation matérielle** - Transport, hébergement, restauration, assurance, documents
7. **Préparation pédagogique** - Travail préparatoire, exploitation au retour, bilan

## Stack technique

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- shadcn/ui (Radix UI)
- jsPDF (export PDF)
- lucide-react (icônes)

## Développement

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
