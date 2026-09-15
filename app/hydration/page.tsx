'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HydrationPage() {
  const [waterDrank, setWaterDrank] = useState<number>(1500);
  const [dailyGoal, setDailyGoal] = useState<number>(3000);

  useEffect(() => {
    const savedWater = localStorage.getItem('stride_water_drank');
    const savedGoal = localStorage.getItem('stride_water_goal');
    if (savedWater) setWaterDrank(parseInt(savedWater, 10));
    if (savedGoal) setDailyGoal(parseInt(savedGoal, 10));
  }, []);

  const saveHydration = (newWater: number, newGoal: number) => {
    setWaterDrank(newWater);
    setDailyGoal(newGoal);
    localStorage.setItem('stride_water_drank', newWater.toString());
    localStorage.setItem('stride_water_goal', newGoal.toString());
  };

  const addWater = (amount: number) => {
    const updated = Math.max(0, waterDrank + amount);
    saveHydration(updated, dailyGoal);
  };

  const handleReset = () => {
    if (confirm("Réinitialiser le compteur d'eau d'aujourd'hui ?")) {
      saveHydration(0, dailyGoal);
    }
  };

  const percentage = Math.min(100, Math.round((waterDrank / dailyGoal) * 100));

  return (
    <div className="flex flex-col gap-5">
      <div className="screen-top-bar">
        <Link href="/" className="back-home-btn">← Accueil</Link>
        <span className="view-indicator">Hydratation & Récupération</span>
      </div>

      <div className="screen-heading">
        <h2>Suivi d'Hydratation</h2>
        <p>Optimise ton niveau d'eau quotidien pour maximiser la performance et la récupération musculaire.</p>
      </div>

      {/* Carte principale de suivi */}
      <div className="modern-card tracker-summary-card">
        <div className="tracker-remaining-box">
          <span className="remaining-label">Volume Consommé</span>
          <div className="remaining-digits">
            <span style={{ color: percentage >= 100 ? "var(--brand-primary)" : "var(--brand-cyan)" }}>
              {waterDrank}
            </span>
            <span className="remaining-unit">/ {dailyGoal} ml</span>
          </div>
          <div className="budget-bar-track mt-4">
            <div
              className="budget-bar-fill"
              style={{
                width: `${percentage}%`,
                backgroundColor: percentage >= 100 ? "var(--brand-primary)" : "var(--brand-cyan)"
              }}
            />
          </div>
          <span className="text-xs text-[var(--text-secondary)] mt-3 block">
            Progression globale : <b>{percentage}%</b> de l'objectif journalier
          </span>
        </div>

        {/* Boutons d'incrément rapide */}
        <div className="flex flex-col gap-2 mt-2">
          <span className="text-xs font-semibold text-[var(--text-secondary)]">Ajout rapide</span>
          <div className="grid grid-cols-4 gap-2">
            <button onClick={() => addWater(250)} className="btn-primary py-2.5 text-xs font-bold text-center">
              +250 ml
            </button>
            <button onClick={() => addWater(500)} className="btn-primary py-2.5 text-xs font-bold text-center">
              +500 ml
            </button>
            <button onClick={() => addWater(750)} className="btn-primary py-2.5 text-xs font-bold text-center">
              +750 ml
            </button>
            <button onClick={() => addWater(1000)} className="btn-primary py-2.5 text-xs font-bold text-center">
              +1 L
            </button>
          </div>
        </div>

        {/* Ajustement manuel ou retrait */}
        <div className="flex justify-between items-center pt-3 border-t border-[var(--border-subtle)] mt-2">
          <button onClick={() => addWater(-250)} className="text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
            - Retirer 250 ml
          </button>
          <button onClick={handleReset} className="link-clear-btn">
            Réinitialiser la journée
          </button>
        </div>
      </div>

      {/* Conseils hydratation */}
      <div className="modern-card">
        <h4 className="text-sm font-bold mb-2">Recommandations Stride</h4>
        <ul className="flex flex-col gap-2 text-xs text-[var(--text-secondary)] pl-4">
          <li className="list-disc">Bois régulièrement par petites gorgées tout au long de la journée plutôt que de grandes quantités d'un coup.</li>
          <li className="list-disc">Augmente ton apport de 500 ml à 1L les jours d'entraînement intense en salle ou en extérieur.</li>
          <li className="list-disc</li>">Une bonne hydratation prévient les crampes et favorise la synthèse des protéines.</li>
        </ul>
      </div>
    </div>
  );
}
