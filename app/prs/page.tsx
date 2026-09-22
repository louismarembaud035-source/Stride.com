'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface PersonalRecord {
  id: string;
  exercise: string;
  weight: number;
  reps: number;
  date: string;
}

export default function PrsPage() {
  const [records, setRecords] = useState<PersonalRecord[]>([
    { id: '1', exercise: 'Squat Barre Nuque', weight: 120, reps: 5, date: '2026-06-01' },
    { id: '2', exercise: 'Développé Couché', weight: 95, reps: 3, date: '2026-06-05' },
    { id: '3', exercise: 'Soulevé de Terre (Deadlift)', weight: 150, reps: 1, date: '2026-06-10' },
    { id: '4', exercise: 'Tractions Lestées', weight: 25, reps: 5, date: '2026-06-12' },
  ]);

  const [exerciseName, setExerciseName] = useState('');
  const [weight, setWeight] = useState<number>(0);
  const [reps, setReps] = useState<number>(1);

  useEffect(() => {
    const saved = localStorage.getItem('stride_personal_records');
    if (saved) {
      setRecords(JSON.parse(saved));
    }
  }, []);

  const saveRecords = (updated: PersonalRecord[]) => {
    setRecords(updated);
    localStorage.setItem('stride_personal_records', JSON.stringify(updated));
  };

  const handleAddPr = (e: React.FormEvent) => {
    e.preventDefault();
    if (!exerciseName.trim() || weight <= 0) return;

    const newRecord: PersonalRecord = {
      id: Date.now().toString(),
      exercise: exerciseName.trim(),
      weight,
      reps,
      date: new Date().toISOString().split('T')[0],
    };

    saveRecords([newRecord, ...records]);
    setExerciseName('');
    setWeight(0);
    setReps(1);
  };

  const handleDeletePr = (id: string) => {
    const updated = records.filter(r => r.id !== id);
    saveRecords(updated);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="screen-top-bar">
        <Link href="/" className="back-home-btn">← Accueil</Link>
        <span className="view-indicator">Records Personnels (PRs)</span>
      </div>

      <div className="screen-heading">
        <h2>Suivi de Force & PRs</h2>
        <p>Consigne tes performances maximales et observe l'évolution de ta force au fil du temps.</p>
      </div>

      {/* Formulaire d'ajout de PR */}
      <div className="modern-card">
        <h3 className="text-sm font-bold mb-3">Enregistrer un nouveau record</h3>
        <form onSubmit={handleAddPr} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">Nom de l'exercice</label>
            <input
              type="text"
              placeholder="Ex: Développé Incliné, Curl Biceps..."
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
              className="bg-[var(--bg-core)] border border-[var(--border-subtle)] text-[var(--text-primary)] p-2.5 rounded-[var(--radius-sm)] text-xs outline-none focus:border-[var(--brand-cyan)]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[var(--text-secondary)]">Charge (kg)</label>
              <input
                type="number"
                value={weight === 0 ? '' : weight}
                onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                placeholder="0"
                className="bg-[var(--bg-core)] border border-[var(--border-subtle)] text-[var(--text-primary)] p-2.5 rounded-[var(--radius-sm)] text-xs outline-none focus:border-[var(--brand-cyan)]"
                required
                min={0.5}
                step={0.5}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[var(--text-secondary)]">Répétitions</label>
              <input
                type="number"
                value={reps}
                onChange={(e) => setReps(parseInt(e.target.value) || 1)}
                className="bg-[var(--bg-core)] border border-[var(--border-subtle)] text-[var(--text-primary)] p-2.5 rounded-[var(--radius-sm)] text-xs outline-none focus:border-[var(--brand-cyan)]"
                required
                min={1}
              />
            </div>
          </div>

          <button type="submit" className="hero-cta text-center justify-center mt-2">
            Ajouter ce record
          </button>
        </form>
      </div>

      {/* Liste des PRs enregistrés */}
      <div className="modern-card">
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-sm font-bold">Historique des PRs</h4>
          <span className="text-xs text-[var(--text-tertiary)]">{records.length} enregistré(s)</span>
        </div>

        <ul className="styled-item-list">
          {records.length === 0 ? (
            <li className="text-[var(--text-tertiary)] justify-center py-4">Aucun record enregistré pour le moment.</li>
          ) : (
            records.map((item) => (
              <li key={item.id} className="flex justify-between items-center">
                <div>
                  <b>{item.exercise}</b>
                  <span className="text-[11px] text-[var(--text-secondary)] block">
                    {item.weight} kg • {item.reps} rép(s) • Validé le {item.date}
                  </span>
                </div>
                <button
                  onClick={() => handleDeletePr(item.id)}
                  className="delete-food-btn"
                  title="Supprimer"
                >
                  ✕
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
