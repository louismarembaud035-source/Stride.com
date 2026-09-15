'use client';

import { useState } from 'react';
import Link from 'next/link';
import { catalogue, calculateWorkoutMetrics, WorkoutProgram } from '../../data/database';

export default function CatalogPage() {
  const [currentLocFilter, setCurrentLocFilter] = useState<string>('all');
  const [currentExoCountFilter, setCurrentExoCountFilter] = useState<string>('all');
  const [activeWorkout, setActiveWorkout] = useState<WorkoutProgram | null>(null);

  const filtered = catalogue.filter(prog => {
    const matchLoc = (currentLocFilter === 'all' || prog.lieu === currentLocFilter);
    const count = prog.exos.length;
    let matchCount = true;
    if (currentExoCountFilter === 'express') matchCount = (count >= 3 && count <= 4);
    else if (currentExoCountFilter === 'medium') matchCount = (count >= 5 && count <= 6);
    else if (currentExoCountFilter === 'intense') matchCount = (count >= 7);
    return matchLoc && matchCount;
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="screen-top-bar">
        <Link href="/" className="back-home-btn">← Accueil</Link>
        <span className="view-indicator">Catalogue des Séances</span>
      </div>

      <div className="screen-heading">
        <h2>Bibliothèque d'Entraînement</h2>
        <p>Choisis un programme adapté à ton lieu de pratique et à ton format.</p>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-[var(--text-secondary)]">Lieu d'entraînement</span>
        <div id="filter-location" className="flex gap-2 flex-wrap">
          {['all', 'salle', 'street', 'maison'].map(loc => (
            <button
              key={loc}
              className={`filter-pill px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-bold border transition-all ${
                currentLocFilter === loc
                  ? 'bg-[var(--brand-primary)] text-[#042f1f] border-[var(--brand-primary)]'
                  : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)]'
              }`}
              onClick={() => setCurrentLocFilter(loc)}
            >
              {loc === 'all' ? 'Tous les lieux' : loc.charAt(0).toUpperCase() + loc.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-[var(--text-secondary)]">Format de séance</span>
        <div id="filter-exo-count" className="flex gap-2 flex-wrap">
          {[
            { id: 'all', label: 'Tous formats' },
            { id: 'express', label: 'Express (3-4 exos)' },
            { id: 'medium', label: 'Intermédiaire (5-6 exos)' },
            { id: 'intense', label: 'Intense (7+ exos)' }
          ].map(f => (
            <button
              key={f.id}
              className={`filter-pill px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-bold border transition-all ${
                currentExoCountFilter === f.id
                  ? 'bg-[var(--brand-cyan)] text-[#04202c] border-[var(--brand-cyan)]'
                  : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)]'
              }`}
              onClick={() => setCurrentExoCountFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center text-xs text-[var(--text-tertiary)] mt-2">
        <span>Résultats correspondants</span>
        <span className="font-bold text-[var(--text-primary)]">{filtered.length} séance(s) trouvée(s)</span>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {filtered.map(prog => {
          const metrics = calculateWorkoutMetrics(prog.exos, prog.reposSerie, prog.reposExo);
          return (
            <div
              key={prog.id + prog.titre}
              className="modern-card cursor-pointer hover:border-[var(--brand-cyan)] transition-all"
              onClick={() => setActiveWorkout(prog)}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="tag-badge uppercase text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--bg-core)] text-[var(--brand-cyan)] border border-[var(--border-subtle)]">
                  {prog.lieu}
                </span>
                <span className="text-xs font-bold text-[var(--brand-primary)]">~{metrics.calories} kcal</span>
              </div>
              <h4 className="text-base font-bold mb-1">{prog.titre}</h4>
              <p className="text-xs text-[var(--text-secondary)] mb-4">{prog.desc}</p>
              <div className="flex justify-between text-xs text-[var(--text-tertiary)] pt-3 border-t border-[var(--border-subtle)]">
                <span>Durée : {metrics.minutes} min</span>
                <span>Exercices : {prog.exos.length}</span>
              </div>
            </div>
          );
        })}
      </div>

      {activeWorkout && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="modern-card max-w-[480px] w-full max-h-[90vh] overflow-y-auto bg-[var(--bg-surface)] border-[var(--border-strong)]">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-cyan)]">
                  {activeWorkout.lieu}
                </span>
                <h3 className="text-xl font-bold mt-1">{activeWorkout.titre}</h3>
              </div>
              <button
                onClick={() => setActiveWorkout(null)}
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-bold text-lg px-2"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[var(--text-secondary)] mb-4">{activeWorkout.desc}</p>

            <div className="flex gap-4 p-3 rounded-[var(--radius-md)] bg-[var(--bg-core)] mb-4 text-xs font-semibold">
              <span>⏱ Durée : {calculateWorkoutMetrics(activeWorkout.exos, activeWorkout.reposSerie, activeWorkout.reposExo).minutes} min</span>
              <span>🔥 Dépense : ~{calculateWorkoutMetrics(activeWorkout.exos, activeWorkout.reposSerie, activeWorkout.reposExo).calories} kcal</span>
            </div>

            <div className="mb-5">
              <h5 className="text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
                Liste des mouvements ({activeWorkout.exos.length})
              </h5>
              <ul className="flex flex-col gap-2">
                {activeWorkout.exos.map((e, idx) => (
                  <li key={idx} className="flex justify-between items-center text-xs p-2 bg-[var(--bg-core)] rounded-[var(--radius-sm)] border border-[var(--border-subtle)]">
                    <span><b>{idx + 1}.</b> {e.nom}</span>
                    <span className="text-[var(--brand-cyan)] font-semibold">{e.series} séries × {e.reps}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => {
                alert(`L'entraînement "${activeWorkout.titre}" est prêt.`);
                setActiveWorkout(null);
              }}
              className="hero-cta text-center justify-center"
            >
              Lancer cette séance
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
