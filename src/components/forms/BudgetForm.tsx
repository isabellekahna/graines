import { Euro, Plus, Trash2 } from 'lucide-react'
import { useProject } from '@/context/ProjectContext'
import { formatCurrency } from '@/lib/utils'
import type { LigneBudget, LigneFinancement } from '@/types/project'

export default function BudgetForm() {
  const { projet, updateSection, markStepCompleted } = useProject()
  const data = projet.budget
  const nombreEleves = projet.generalInfo.nombreEleves

  const totalDepenses = data.depenses.reduce((sum, d) => sum + (d.montant || 0), 0)
  const totalRecettes = data.recettes.reduce((sum, r) => sum + (r.montant || 0), 0)
  const solde = totalRecettes - totalDepenses
  const coutParEleve = nombreEleves > 0 ? totalDepenses / nombreEleves : 0

  const updateDepense = (index: number, field: keyof LigneBudget, value: string | number) => {
    const updated = data.depenses.map((d, i) =>
      i === index ? { ...d, [field]: value } : d,
    )
    updateSection('budget', { depenses: updated })
  }

  const addDepense = () => {
    updateSection('budget', {
      depenses: [...data.depenses, { poste: '', description: '', montant: 0 }],
    })
  }

  const removeDepense = (index: number) => {
    updateSection('budget', {
      depenses: data.depenses.filter((_, i) => i !== index),
    })
  }

  const updateRecette = (index: number, field: keyof LigneFinancement, value: string | number) => {
    const updated = data.recettes.map((r, i) =>
      i === index ? { ...r, [field]: value } : r,
    )
    updateSection('budget', { recettes: updated })
  }

  const addRecette = () => {
    updateSection('budget', {
      recettes: [...data.recettes, { source: '', description: '', montant: 0, statut: 'en_attente' as const }],
    })
  }

  const removeRecette = (index: number) => {
    updateSection('budget', {
      recettes: data.recettes.filter((_, i) => i !== index),
    })
  }

  const updateField = (field: string, value: string | number) => {
    updateSection('budget', { [field]: value })
  }

  return (
    <div className="space-y-8">
      <div className="form-section">
        <h2 className="form-section-title">
          <Euro className="h-5 w-5" />
          Budget Prévisionnel
        </h2>

        {/* Dépenses */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-red-200">
            <h3 className="text-base font-semibold text-red-700">
              Dépenses
            </h3>
            <button
              type="button"
              onClick={addDepense}
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-300 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50 transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              Ajouter un poste
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-red-50">
                  <th className="text-left px-3 py-2 font-semibold text-red-800 rounded-tl-lg">Poste de dépense</th>
                  <th className="text-left px-3 py-2 font-semibold text-red-800">Description</th>
                  <th className="text-right px-3 py-2 font-semibold text-red-800 w-36">Montant (€)</th>
                  <th className="w-10 rounded-tr-lg"></th>
                </tr>
              </thead>
              <tbody>
                {data.depenses.map((dep, index) => (
                  <tr key={index} className="border-b border-border">
                    <td className="px-2 py-1.5">
                      <input
                        type="text"
                        className="w-full rounded border border-input bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        value={dep.poste}
                        onChange={e => updateDepense(index, 'poste', e.target.value)}
                        placeholder="Poste"
                      />
                    </td>
                    <td className="px-2 py-1.5">
                      <input
                        type="text"
                        className="w-full rounded border border-input bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        value={dep.description}
                        onChange={e => updateDepense(index, 'description', e.target.value)}
                        placeholder="Détails"
                      />
                    </td>
                    <td className="px-2 py-1.5">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        className="w-full rounded border border-input bg-background px-2 py-1.5 text-sm text-right font-mono focus:outline-none focus:ring-2 focus:ring-ring"
                        value={dep.montant || ''}
                        onChange={e => updateDepense(index, 'montant', parseFloat(e.target.value) || 0)}
                      />
                    </td>
                    <td className="px-1 py-1.5">
                      {index >= 6 && (
                        <button
                          type="button"
                          onClick={() => removeDepense(index)}
                          className="p-1 text-destructive hover:bg-destructive/10 rounded transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-red-50 font-bold">
                  <td colSpan={2} className="px-3 py-2 text-red-800 rounded-bl-lg">
                    TOTAL DÉPENSES
                  </td>
                  <td className="px-3 py-2 text-right text-red-800 font-mono">
                    {formatCurrency(totalDepenses)}
                  </td>
                  <td className="rounded-br-lg"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Recettes */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-green-200">
            <h3 className="text-base font-semibold text-green-700">
              Recettes / Financements
            </h3>
            <button
              type="button"
              onClick={addRecette}
              className="inline-flex items-center gap-1.5 rounded-lg border border-green-300 px-3 py-1.5 text-xs font-medium text-green-700 hover:bg-green-50 transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              Ajouter une source
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-green-50">
                  <th className="text-left px-3 py-2 font-semibold text-green-800 rounded-tl-lg">Source</th>
                  <th className="text-left px-3 py-2 font-semibold text-green-800">Description</th>
                  <th className="text-right px-3 py-2 font-semibold text-green-800 w-36">Montant (€)</th>
                  <th className="text-center px-3 py-2 font-semibold text-green-800 w-32">Statut</th>
                  <th className="w-10 rounded-tr-lg"></th>
                </tr>
              </thead>
              <tbody>
                {data.recettes.map((rec, index) => (
                  <tr key={index} className="border-b border-border">
                    <td className="px-2 py-1.5">
                      <input
                        type="text"
                        className="w-full rounded border border-input bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        value={rec.source}
                        onChange={e => updateRecette(index, 'source', e.target.value)}
                        placeholder="Source"
                      />
                    </td>
                    <td className="px-2 py-1.5">
                      <input
                        type="text"
                        className="w-full rounded border border-input bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        value={rec.description}
                        onChange={e => updateRecette(index, 'description', e.target.value)}
                        placeholder="Détails"
                      />
                    </td>
                    <td className="px-2 py-1.5">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        className="w-full rounded border border-input bg-background px-2 py-1.5 text-sm text-right font-mono focus:outline-none focus:ring-2 focus:ring-ring"
                        value={rec.montant || ''}
                        onChange={e => updateRecette(index, 'montant', parseFloat(e.target.value) || 0)}
                      />
                    </td>
                    <td className="px-2 py-1.5">
                      <select
                        className="w-full rounded border border-input bg-background px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-ring"
                        value={rec.statut}
                        onChange={e => updateRecette(index, 'statut', e.target.value)}
                      >
                        <option value="confirme">Confirmé</option>
                        <option value="en_attente">En attente</option>
                        <option value="demande">Demandé</option>
                      </select>
                    </td>
                    <td className="px-1 py-1.5">
                      {index >= 3 && (
                        <button
                          type="button"
                          onClick={() => removeRecette(index)}
                          className="p-1 text-destructive hover:bg-destructive/10 rounded transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-green-50 font-bold">
                  <td colSpan={3} className="px-3 py-2 text-green-800 rounded-bl-lg">
                    TOTAL RECETTES
                  </td>
                  <td className="px-3 py-2 text-right text-green-800 font-mono" colSpan={2}>
                    {formatCurrency(totalRecettes)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Résumé */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className={`rounded-lg p-4 text-center border ${solde >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <p className="text-xs font-medium text-muted-foreground mb-1">Solde</p>
            <p className={`text-xl font-bold ${solde >= 0 ? 'text-green-700' : 'text-red-700'}`}>
              {formatCurrency(solde)}
            </p>
          </div>
          <div className="rounded-lg p-4 text-center bg-blue-50 border border-blue-200">
            <p className="text-xs font-medium text-muted-foreground mb-1">Coût par élève</p>
            <p className="text-xl font-bold text-blue-700">
              {nombreEleves > 0 ? formatCurrency(coutParEleve) : '—'}
            </p>
            {nombreEleves > 0 && (
              <p className="text-xs text-muted-foreground mt-1">pour {nombreEleves} élèves</p>
            )}
          </div>
          <div className="rounded-lg p-4 text-center bg-purple-50 border border-purple-200">
            <p className="text-xs font-medium text-muted-foreground mb-1">Participation famille</p>
            <p className="text-xl font-bold text-purple-700">
              {data.participationFamille > 0 ? formatCurrency(data.participationFamille) : '—'}
            </p>
          </div>
        </div>

        {/* Complément */}
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground pb-2 border-b border-border">
            Informations complémentaires
          </h3>
          <div className="form-field">
            <label className="text-sm font-medium text-foreground">Participation demandée aux familles (€)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              className="w-full md:w-48 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              value={data.participationFamille || ''}
              onChange={e => updateField('participationFamille', parseFloat(e.target.value) || 0)}
              placeholder="0.00"
            />
          </div>
          <div className="form-field">
            <label className="text-sm font-medium text-foreground">Subventions demandées ou obtenues</label>
            <textarea
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring min-h-[80px]"
              value={data.subventions}
              onChange={e => updateField('subventions', e.target.value)}
              placeholder="Conseil départemental, Conseil régional, OFAJ, Erasmus+..."
            />
          </div>
          <div className="form-field">
            <label className="text-sm font-medium text-foreground">Observations</label>
            <textarea
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring min-h-[80px]"
              value={data.observations}
              onChange={e => updateField('observations', e.target.value)}
              placeholder="Précisions, commentaires sur le budget..."
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => markStepCompleted(4)}
          className="mt-6 w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Valider cette section
        </button>
      </div>
    </div>
  )
}
