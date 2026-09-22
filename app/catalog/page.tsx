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
      <div className="screen-top-bar flex justify-between items-center">
        <Link href="/" className="back-home-btn">← Accueil</Link>
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">{catalogue.length} SÉANCES</span>
      </div>

      <div className="screen-heading">
        <h2 className="text-2xl font-extrabold tracking-tight">Catalogue des séances</h2>
        <p className="text-sm text-[var(--text-secondary)] mt-1">Programmes complets avec durée et dépense calorique estimées.</p>
      </div>

      {/* Filtre Volume d'exercices */}
      <div className="flex flex-col gap-2.5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">Volume d'exercices</span>
        <div className="flex gap-2 flex-wrap">
          {[
            { id: 'all', label: 'Tous volumes' },
            { id: 'express', label: 'Court (3-4 exos)' },
            { id: 'medium', label: 'Moyen (5-6 exos)' },
            { id: 'intense', label: 'Long (7-8 exos)' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setCurrentExoCountFilter(f.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                currentExoCountFilter === f.id
                  ? 'bg-[var(--brand-primary)] text-[#042f1f] border-[var(--brand-primary)] shadow-md'
                  : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-[var(--border-strong)]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filtre Lieu d'entraînement */}
      <div className="flex flex-col gap-2.5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">Lieu d'entraînement</span>
        <div className="flex gap-2 flex-wrap">
          {[
            { id: 'all', label: 'Tous lieux' },
            { id: 'salle', label: 'Salle' },
            { id: 'street', label: 'Street' },
            { id: 'maison', label: 'Maison' }
          ].map(l => (
            <button
              key={l.id}
              onClick={() => setCurrentLocFilter(l.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                currentLocFilter === l.id
                  ? 'bg-[var(--brand-primary)] text-[#042f1f] border-[var(--brand-primary)] shadow-md'
                  : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-[var(--border-strong)]'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center text-xs text-[var(--text-tertiary)] pt-1">
        <span>Résultats correspondants</span>
        <span className="font-bold text-[var(--text-primary)]">{filtered.length} séance(s) trouvée(s)</span>
      </div>

      {/* Grille des séances */}
      <div className="grid grid-cols-1 gap-4">
        {filtered.map(prog => {
          const metrics = calculateWorkoutMetrics(prog.exos, prog.reposSerie, prog.reposExo);
          return (
            <div
              key={prog.id + prog.titre}
              onClick={() => setActiveWorkout(prog)}
              className="modern-card cursor-pointer hover:border-[var(--brand-cyan)] transition-all relative overflow-hidden group"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--brand-primary)] opacity-80 group-hover:bg-[var(--brand-cyan)] transition-colors" />
              
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-[var(--radius-sm)] bg-[var(--bg-core)] text-[var(--brand-cyan)] border border-[var(--border-subtle)]">
                  {prog.lieu}
                </span>
              </div>

              <h4 className="text-lg font-bold text-[var(--text-primary)] mb-1 group-hover:text-[var(--brand-cyan)] transition-colors">
                {prog.titre}
              </h4>
              <p className="text-xs text-[var(--text-secondary)] mb-4">{prog.desc}</p>

              <div className="flex justify-between items-center pt-3 border-t border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-secondary)]">
                <span className="flex items-center gap-1.5">
                  ⏱ {metrics.minutes} min
                </span>
                <span className="flex items-center gap-1.5 font-bold text-[var(--brand-primary)]">
                  🔥 ~{metrics.calories} kcal
                </span>
                <span className="flex items-center gap-1.5">
                  🏆 {prog.exos.length} exos
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal de détail */}
      {activeWorkout && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="modern-card max-w-[480px] w-full max-h-[90vh] overflow-y-auto bg-[var(--bg-surface)] border-[var(--border-strong)] shadow-2xl">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--brand-cyan)] bg-[var(--bg-core)] px-2 py-0.5 rounded border border-[var(--border-subtle)]">
                  {activeWorkout.lieu}
                </span>
                <h3 className="text-xl font-bold mt-2 text-[var(--text-primary)]">{activeWorkout.titre}</h3>
              </div>
              <button
                onClick={() => setActiveWorkout(null)}
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-bold text-lg p-2 rounded-full bg-[var(--bg-core)] border border-[var(--border-subtle)] w-8 h-8 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[var(--text-secondary)] mb-4 leading-relaxed">{activeWorkout.desc}</p>

            <div className="flex justify-around p-3 rounded-[var(--radius-md)] bg-[var(--bg-core)] mb-5 text-xs font-semibold border border-[var(--border-subtle)]">
              <span className="flex items-center gap-1">⏱ {calculateWorkoutMetrics(activeWorkout.exos, activeWorkout.reposSerie, activeWorkout.reposExo).minutes} min</span>
              <span className="flex items-center gap-1 text-[var(--brand-primary)]">🔥 ~{calculateWorkoutMetrics(activeWorkout.exos, activeWorkout.reposSerie, activeWorkout.reposExo).calories} kcal</span>
              <span className="flex items-center gap-1">🏆 {activeWorkout.exos.length} exos</span>
            </div>

            <div className="mb-6">
              <h5 className="text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)] mb-2.5">
                Liste des mouvements ({activeWorkout.exos.length})
              </h5>
              <ul className="flex flex-col gap-2">
                {activeWorkout.exos.map((e, idx) => (
                  <li key={idx} className="flex justify-between items-center text-xs p-3 bg-[var(--bg-core)] rounded-[var(--radius-sm)] border border-[var(--border-subtle)]">
                    <span className="font-medium"><b>{idx + 1}.</b> {e.nom}</span>
                    <span className="text-[var(--brand-cyan)] font-bold">{e.series} séries × {e.reps}</span>
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
