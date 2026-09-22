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
  const [workoutTitle, setWorkoutTitle] = useState('Push lourd & Abdos');
  const [workoutLieu, setWorkoutLieu] = useState<'salle' | 'street' | 'maison'>('salle');
  const [reposSerie, setReposSerie] = useState<number>(60);
  const [reposExo, setReposExo] = useState<number>(90);

  const [exercises, setExercises] = useState<CustomExercise[]>([]);

  const [exoName, setExoName] = useState('');
  const [exoSeries, setExoSeries] = useState<number>(3);
  const [exoReps, setExoReps] = useState<string>('10-12');

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
    setExoReps('10-12');
  };

  const handleRemoveExo = (id: string) => {
    setExercises(exercises.filter(e => e.id !== id));
  };

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
        <h2>Créer ma séance</h2>
        <p>Assemble tes mouvements et définis tes volumes d'effort.</p>
      </div>

      {/* Paramètres de la séance */}
      <div className="modern-card flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-300">Nom de la séance</label>
          <input
            type="text"
            value={workoutTitle}
            onChange={(e) => setWorkoutTitle(e.target.value)}
            placeholder="Ex. : Push lourd & Abdos"
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3.5 text-xs text-white outline-none focus:border-cyan-400 transition-all placeholder:text-slate-600"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-300">Lieu d'entraînement</label>
          <div className="grid grid-cols-3 gap-2">
            {(['salle', 'street', 'maison'] as const).map(l => (
              <button
                key={l}
                type="button"
                onClick={() => setWorkoutLieu(l)}
                className={`py-2.5 text-xs font-bold uppercase rounded-xl border transition-all ${
                  workoutLieu === l
                    ? 'bg-emerald-400 text-slate-950 border-emerald-400 shadow-md shadow-emerald-400/20'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-300">Repos / série (sec)</label>
            <input
              type="number"
              value={reposSerie}
              onChange={(e) => setReposSerie(parseInt(e.target.value) || 30)}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-xs text-white outline-none focus:border-cyan-400"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-300">Repos / exo (sec)</label>
            <input
              type="number"
              value={reposExo}
              onChange={(e) => setReposExo(parseInt(e.target.value) || 60)}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-xs text-white outline-none focus:border-cyan-400"
            />
          </div>
        </div>
      </div>

      {/* Résumé estimé */}
      <div className="modern-card tracker-summary-card">
        <div className="flex justify-around items-center text-center">
          <div>
            <span className="stat-label">Durée estimée</span>
            <span className="text-base font-bold text-cyan-400">{estimatedMinutes} min</span>
          </div>
          <div className="w-[1px] h-8 bg-slate-800" />
          <div>
            <span className="stat-label">Dépense brute</span>
            <span className="text-base font-bold text-emerald-400">~{estimatedCalories} kcal</span>
          </div>
          <div className="w-[1px] h-8 bg-slate-800" />
          <div>
            <span className="stat-label">Exercices</span>
            <span className="text-base font-bold text-white">{exercises.length}</span>
          </div>
        </div>
      </div>

      {/* Ajouter un exercice */}
      <div className="modern-card flex flex-col gap-4">
        <h3 className="text-sm font-bold text-white">Ajouter un exercice</h3>
        
        <div className="flex flex-col gap-1.5">
          <input
            type="text"
            placeholder="Nom du mouvement"
            value={exoName}
            onChange={(e) => setExoName(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3.5 text-xs text-white outline-none focus:border-cyan-400 transition-all placeholder:text-slate-600"
          />
        </div>

        <div className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
          <input
            type="number"
            placeholder="Séries (1-8)"
            value={exoSeries === 0 ? '' : exoSeries}
            onChange={(e) => setExoSeries(parseInt(e.target.value) || 0)}
            min={1}
            max={8}
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3.5 text-xs text-white outline-none focus:border-cyan-400 placeholder:text-slate-600"
          />
          <input
            type="text"
            placeholder="Reps (ex. : 10-12)"
            value={exoReps}
            onChange={(e) => setExoReps(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3.5 text-xs text-white outline-none focus:border-cyan-400 placeholder:text-slate-600"
          />
          <button
            type="button"
            onClick={handleAddExercise}
            className="h-[46px] w-[46px] rounded-2xl bg-emerald-400 text-slate-950 font-black text-lg flex items-center justify-center hover:bg-emerald-300 transition-all shadow-lg shadow-emerald-400/20 flex-shrink-0"
            title="Ajouter l'exercice"
          >
            +
          </button>
        </div>
      </div>

      {/* Mouvements enregistrés */}
      <div className="modern-card flex flex-col gap-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Exercices enregistrés ({exercises.length})
        </h4>

        <ul className="styled-item-list">
          {exercises.length === 0 ? (
            <li className="text-slate-500 justify-center py-4 text-xs">Aucun exercice enregistré.</li>
          ) : (
            exercises.map((item, idx) => (
              <li key={item.id} className="flex justify-between items-center bg-slate-950 border border-slate-800 p-3.5 rounded-2xl">
                <div>
                  <span className="font-bold text-white text-xs">{idx + 1}. {item.nom}</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    {item.series} séries × {item.reps} reps
                  </span>
                </div>
                <button 
                  onClick={() => handleRemoveExo(item.id)} 
                  className="w-7 h-7 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 flex items-center justify-center text-xs transition-colors" 
                  title="Supprimer"
                >
                  ✕
                </button>
              </li>
            ))
          )}
        </ul>

        {exercises.length > 0 && (
          <button
            onClick={handleSaveWorkout}
            className="w-full py-4 rounded-2xl bg-emerald-400 text-slate-950 font-extrabold text-sm tracking-wide hover:bg-emerald-300 transition-all shadow-lg shadow-emerald-400/20 text-center mt-2"
          >
            Valider la séance
          </button>
        )}
      </div>
    </div>
  );
}
