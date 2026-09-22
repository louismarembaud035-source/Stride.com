'use client';

import { useState } from 'react';
import Link from 'next/link';

interface CustomExercise {
  id: string;
  nom: string;
  series: number;
  reps: string;
}

export default function CustomWorkoutBuilder() {
  const [workoutTitle, setWorkoutTitle] = useState('Ma Séance Personnalisée');
  const [workoutLieu, setWorkoutLieu] = useState<'salle' | 'street' | 'maison'>('salle');
  const [reposSerie, setReposSerie] = useState<number>(60);
  const [reposExo, setReposExo] = useState<number>(90);

  const [exercises, setExercises] = useState<CustomExercise[]>([
    { id: '1', nom: 'Développé Couché', series: 4, reps: '8-10' },
    { id: '2', nom: 'Écartés Poulie Vis-à-Vis', series: 3, reps: '12-15' },
  ]);

  const [exoName, setExoName] = useState('');
  const [exoSeries, setExoSeries] = useState<number>(3);
  const [exoReps, setExoReps] = useState<string>('10');

  const handleAddExercise = (e: React.FormEvent) => {
    e.preventDefault();
    if (!exoName.trim()) return;

    const newExo: CustomExercise = {
      id: Date.now().toString(),
      nom: exoName.trim(),
      series: exoSeries,
      reps: exoReps.trim(),
    };

    setExercises([...exercises, newExo]);
    setExoName('');
    setExoSeries(3);
    setExoReps('10');
  };

  const handleRemoveExo = (id: string) => {
    setExercises(exercises.filter(e => e.id !== id));
  };

  // Calcul dynamique des métriques
  let totalSeconds = 0;
  let totalSets = 0;
  exercises.forEach((exo, idx) => {
    totalSets += exo.series;
    totalSeconds += exo.series * 40;
    totalSeconds += (exo.series - 1) * reposSerie;
    if (idx < exercises.length - 1) totalSeconds += reposExo;
  });
  const estimatedMinutes = Math.max(5, Math.round(totalSeconds / 60));
  const estimatedCalories = Math.round(totalSets * 22);

  const handleSaveWorkout = () => {
    if (exercises.length === 0) {
      alert("Ajoute au moins un exercice à ta séance.");
      return;
    }
    const payload = { title: workoutTitle, lieu: workoutLieu, reposSerie, reposExo, exercises };
    localStorage.setItem('stride_custom_workout', JSON.stringify(payload));
    alert(`La séance "${workoutTitle}" a été enregistrée avec succès !`);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="screen-top-bar">
        <Link href="/" className="back-home-btn">← Accueil</Link>
        <span className="view-indicator">Séance sur mesure</span>
      </div>

      <div className="screen-heading">
        <h2>Constructeur de Routine</h2>
        <p>Conçois ton propre entraînement personnalisé exercice par exercice.</p>
      </div>

      {/* Paramètres généraux de la séance */}
      <div className="modern-card flex flex-col gap-3">
        <h3 className="text-sm font-bold">Paramètres de la séance</h3>
        
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-[var(--text-secondary)]">Nom du programme</label>
          <input
            type="text"
            value={workoutTitle}
            onChange={(e) => setWorkoutTitle(e.target.value)}
            className="bg-[var(--bg-core)] border border-[var(--border-subtle)] text-[var(--text-primary)] p-2.5 rounded-[var(--radius-sm)] text-xs outline-none focus:border-[var(--brand-cyan)]"
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
          {(['salle', 'street', 'maison'] as const).map(l => (
            <button
              key={l}
              onClick={() => setWorkoutLieu(l)}
              className={`py-2 text-xs font-bold uppercase rounded-[var(--radius-sm)] border transition-all ${
                workoutLieu === l
                  ? 'bg-[var(--brand-cyan)] text-[#04202c] border-[var(--brand-cyan)]'
                  : 'bg-[var(--bg-core)] text-[var(--text-secondary)] border-[var(--border-subtle)]'
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 mt-1">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">Repos / série (sec)</label>
            <input
              type="number"
              value={reposSerie}
              onChange={(e) => setReposSerie(parseInt(e.target.value) || 30)}
              className="bg-[var(--bg-core)] border border-[var(--border-subtle)] text-[var(--text-primary)] p-2 rounded-[var(--radius-sm)] text-xs outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">Repos / exo (sec)</label>
            <input
              type="number"
              value={reposExo}
              onChange={(e) => setReposExo(parseInt(e.target.value) || 60)}
              className="bg-[var(--bg-core)] border border-[var(--border-subtle)] text-[var(--text-primary)] p-2 rounded-[var(--radius-sm)] text-xs outline-none"
            />
          </div>
        </div>
      </div>

      {/* Résumé estimé */}
      <div className="modern-card tracker-summary-card">
        <div className="flex justify-around items-center text-center">
          <div>
            <span className="stat-label">Durée Estimée</span>
            <span className="text-lg font-bold text-[var(--brand-cyan)]">{estimatedMinutes} min</span>
          </div>
          <div className="w-[1px] h-8 bg-[var(--border-subtle)]" />
          <div>
            <span className="stat-label">Dépense Brute</span>
            <span className="text-lg font-bold text-[var(--brand-primary)]">~{estimatedCalories} kcal</span>
          </div>
          <div className="w-[1px] h-8 bg-[var(--border-subtle)]" />
          <div>
            <span className="stat-label">Exercices</span>
            <span className="text-lg font-bold text-[var(--text-primary)]">{exercises.length}</span>
          </div>
        </div>
      </div>

      {/* Formulaire d'ajout d'exercice */}
      <div className="modern-card">
        <h3 className="text-sm font-bold mb-3">Ajouter un exercice</h3>
        <form onSubmit={handleAddExercise} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">Mouvement</label>
            <input
              type="text"
              placeholder="Ex: Tractions, Squat, Dips..."
              value={exoName}
              onChange={(e) => setExoName(e.target.value)}
              className="bg-[var(--bg-core)] border border-[var(--border-subtle)] text-[var(--text-primary)] p-2.5 rounded-[var(--radius-sm)] text-xs outline-none focus:border-[var(--brand-cyan)]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[var(--text-secondary)]">Séries</label>
              <input
                type="number"
                value={exoSeries}
                onChange={(e) => setExoSeries(parseInt(e.target.value) || 1)}
                min={1}
                className="bg-[var(--bg-core)] border border-[var(--border-subtle)] text-[var(--text-primary)] p-2.5 rounded-[var(--radius-sm)] text-xs outline-none"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[var(--text-secondary)]">Répétitions / Format</label>
              <input
                type="text"
                value={exoReps}
                onChange={(e) => setExoReps(e.target.value)}
                placeholder="Ex: 10 ou 45 sec"
                className="bg-[var(--bg-core)] border border-[var(--border-subtle)] text-[var(--text-primary)] p-2.5 rounded-[var(--radius-sm)] text-xs outline-none"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-primary py-2.5 text-xs font-bold mt-1">
            Ajouter à la liste
          </button>
        </form>
      </div>

      {/* Liste des exercices de la séance */}
      <div className="modern-card">
        <h4 className="text-sm font-bold mb-3">Mouvements de la séance ({exercises.length})</h4>
        <ul className="styled-item-list">
          {exercises.length === 0 ? (
            <li className="text-[var(--text-tertiary)] justify-center py-4">Aucun exercice ajouté pour l'instant.</li>
          ) : (
            exercises.map((item, idx) => (
              <li key={item.id} className="flex justify-between items-center">
                <div>
                  <b>{idx + 1}. {item.nom}</b>
                  <span className="text-[11px] text-[var(--text-secondary)] block">
                    {item.series} séries × {item.reps}
                  </span>
                </div>
                <button onClick={() => handleRemoveExo(item.id)} className="delete-food-btn" title="Supprimer">
                  ✕
                </button>
              </li>
            ))
          )}
        </ul>

        {exercises.length > 0 && (
          <button onClick={handleSaveWorkout} className="hero-cta text-center justify-center mt-4">
            Sauvegarder cette séance sur mesure
          </button>
        )}
      </div>
    </div>
  );
}
