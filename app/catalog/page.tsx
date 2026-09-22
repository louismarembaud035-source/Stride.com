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
    <div className="flex flex-col gap-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center">
        <Link href="/" className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-800 transition-all">
          ← Accueil
        </Link>
        <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
          {catalogue.length} SÉANCES
        </span>
      </div>

      {/* Heading */}
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-black tracking-tight text-white">Catalogue des séances</h1>
        <p className="text-xs text-slate-400">Programmes complets avec durée et dépense calorique estimées.</p>
      </div>

      {/* Filtre Volume d'exercices */}
      <div className="flex flex-col gap-2.5">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Volume d'exercices</span>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'Tous volumes' },
            { id: 'express', label: 'Court (3-4 exos)' },
            { id: 'medium', label: 'Moyen (5-6 exos)' },
            { id: 'intense', label: 'Long (7-8 exos)' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setCurrentExoCountFilter(f.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                currentExoCountFilter === f.id
                  ? 'bg-emerald-400 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-400/20'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filtre Lieu d'entraînement */}
      <div className="flex flex-col gap-2.5">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Lieu d'entraînement</span>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'Tous lieux' },
            { id: 'salle', label: 'Salle' },
            { id: 'street', label: 'Street' },
            { id: 'maison', label: 'Maison' }
          ].map(l => (
            <button
              key={l.id}
              onClick={() => setCurrentLocFilter(l.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                currentLocFilter === l.id
                  ? 'bg-emerald-400 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-400/20'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center text-xs text-slate-500 pt-1">
        <span>Résultats correspondants</span>
        <span className="font-bold text-slate-300">{filtered.length} séance(s) trouvée(s)</span>
      </div>

      {/* Liste des cartes de séances */}
      <div className="flex flex-col gap-4">
        {filtered.map(prog => {
          const metrics = calculateWorkoutMetrics(prog.exos, prog.reposSerie, prog.reposExo);
          return (
            <div
              key={prog.id + prog.titre}
              onClick={() => setActiveWorkout(prog)}
              className="relative overflow-hidden bg-slate-900 border border-slate-800 rounded-3xl p-6 cursor-pointer hover:border-cyan-500/50 transition-all shadow-xl group"
            >
              {/* Barre verticale verte à gauche */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-400" />

              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-slate-950 text-cyan-400 border border-slate-800">
                  {prog.lieu}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-cyan-400 transition-colors">
                {prog.titre}
              </h3>
              <p className="text-xs text-slate-400 mb-6">{prog.desc}</p>

              <div className="flex justify-between items-center pt-4 border-t border-slate-800 text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1.5 text-slate-300">
                  ⏱ {metrics.minutes} min
                </span>
                <span className="flex items-center gap-1.5 font-bold text-amber-400">
                  🔥 ~{metrics.calories} kcal
                </span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  🏆 {prog.exos.length} exos
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal de détail */}
      {activeWorkout && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-[480px] w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col gap-5">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
                  {activeWorkout.lieu}
                </span>
                <h2 className="text-xl font-bold text-white mt-2">{activeWorkout.titre}</h2>
              </div>
              <button
                onClick={() => setActiveWorkout(null)}
                className="w-8 h-8 rounded-full bg-slate-950 border border-slate-800 text-slate-400 hover:text-white font-bold flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{activeWorkout.desc}</p>

            <div className="flex justify-around p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-semibold">
              <span className="flex items-center gap-1 text-slate-200">⏱ {calculateWorkoutMetrics(activeWorkout.exos, activeWorkout.reposSerie, activeWorkout.reposExo).minutes} min</span>
              <span className="flex items-center gap-1 text-amber-400 font-bold">🔥 ~{calculateWorkoutMetrics(activeWorkout.exos, activeWorkout.reposSerie, activeWorkout.reposExo).calories} kcal</span>
              <span className="flex items-center gap-1 text-slate-200">🏆 {activeWorkout.exos.length} exos</span>
            </div>

            <div className="flex flex-col gap-2.5">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Liste des mouvements ({activeWorkout.exos.length})
              </h4>
              <div className="flex flex-col gap-2">
                {activeWorkout.exos.map((e, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs p-3.5 bg-slate-950 rounded-2xl border border-slate-800">
                    <span className="font-medium text-slate-200"><b>{idx + 1}.</b> {e.nom}</span>
                    <span className="text-cyan-400 font-bold">{e.series} séries × {e.reps}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                alert(`L'entraînement "${activeWorkout.titre}" est lancé !`);
                setActiveWorkout(null);
              }}
              className="w-full py-3.5 rounded-2xl bg-cyan-400 text-slate-950 font-bold text-sm tracking-wide hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-500/20 text-center"
            >
              Lancer cette séance
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
