'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BmrPage() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(25);
  const [weight, setWeight] = useState<number>(75);
  const [height, setHeight] = useState<number>(178);
  const [activity, setActivity] = useState<number>(1.375);
  const [goalType, setGoalType] = useState<'maintenance' | 'cut' | 'bulk'>('maintenance');

  const [bmr, setBmr] = useState<number>(0);
  const [tdee, setTdee] = useState<number>(0);
  const [targetCalories, setTargetCalories] = useState<number>(0);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  useEffect(() => {
    calculateMetrics();
  }, [gender, age, weight, height, activity, goalType]);

  const calculateMetrics = () => {
    // Formule de Mifflin-St Jeor
    let calculatedBmr = (10 * weight) + (6.25 * height) - (5 * age);
    if (gender === 'male') {
      calculatedBmr += 5;
    } else {
      calculatedBmr -= 161;
    }

    const calculatedTdee = Math.round(calculatedBmr * activity);
    let finalCalories = calculatedTdee;

    if (goalType === 'cut') {
      finalCalories = calculatedTdee - 450;
    } else if (goalType === 'bulk') {
      finalCalories = calculatedTdee + 350;
    }

    setBmr(Math.round(calculatedBmr));
    setTdee(calculatedTdee);
    setTargetCalories(Math.max(1200, Math.round(finalCalories)));
  };

  const handleSaveToTracker = () => {
    localStorage.setItem('stride_cal_goal', targetCalories.toString());
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="screen-top-bar">
        <Link href="/" className="back-home-btn">← Accueil</Link>
        <span className="view-indicator">Bilan Métabolique</span>
      </div>

      <div className="screen-heading">
        <h2>Calculateur BMR & TDEE</h2>
        <p>Détermine tes besoins énergétiques réels pour ajuster ta nutrition selon tes objectifs.</p>
      </div>

      {/* Formulaire de saisie */}
      <div className="modern-card flex flex-col gap-4">
        <h3 className="text-sm font-bold">Paramètres corporels</h3>

        {/* Sexe */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-[var(--text-secondary)]">Profil biologique</span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setGender('male')}
              className={`py-2.5 text-xs font-bold rounded-[var(--radius-sm)] border transition-all ${
                gender === 'male'
                  ? 'bg-[var(--brand-cyan)] text-[#04202c] border-[var(--brand-cyan)]'
                  : 'bg-[var(--bg-core)] text-[var(--text-secondary)] border-[var(--border-subtle)]'
              }`}
            >
              Homme
            </button>
            <button
              onClick={() => setGender('female')}
              className={`py-2.5 text-xs font-bold rounded-[var(--radius-sm)] border transition-all ${
                gender === 'female'
                  ? 'bg-[var(--brand-cyan)] text-[#04202c] border-[var(--brand-cyan)]'
                  : 'bg-[var(--bg-core)] text-[var(--text-secondary)] border-[var(--border-subtle)]'
              }`}
            >
              Femme
            </button>
          </div>
        </div>

        {/* Inputs Âge, Poids, Taille */}
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">Âge (ans)</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value) || 0)}
              className="bg-[var(--bg-core)] border border-[var(--border-subtle)] text-[var(--text-primary)] p-2.5 rounded-[var(--radius-sm)] text-xs outline-none focus:border-[var(--brand-cyan)]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">Poids (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
              className="bg-[var(--bg-core)] border border-[var(--border-subtle)] text-[var(--text-primary)] p-2.5 rounded-[var(--radius-sm)] text-xs outline-none focus:border-[var(--brand-cyan)]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">Taille (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value) || 0)}
              className="bg-[var(--bg-core)] border border-[var(--border-subtle)] text-[var(--text-primary)] p-2.5 rounded-[var(--radius-sm)] text-xs outline-none focus:border-[var(--brand-cyan)]"
            />
          </div>
        </div>

        {/* Niveau d'activité */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-[var(--text-secondary)]">Niveau d'activité hebdomadaire</span>
          <select
            value={activity}
            onChange={(e) => setActivity(parseFloat(e.target.value))}
            className="bg-[var(--bg-core)] border border-[var(--border-subtle)] text-[var(--text-primary)] p-2.5 rounded-[var(--radius-sm)] text-xs outline-none focus:border-[var(--brand-cyan)]"
          >
            <option value={1.2}>Sédentaire (peu ou pas d'exercice)</option>
            <option value={1.375}>Légèrement actif (exercice léger 1-3j/semaine)</option>
            <option value={1.55}>Modérément actif (exercice modéré 3-5j/semaine)</option>
            <option value={1.725}>Très actif (exercice intense 6-7j/semaine)</option>
            <option value={1.9}>Extrêmement actif (sport + travail physique)</option>
          </select>
        </div>

        {/* Objectif */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-[var(--text-secondary)]">Objectif recherché</span>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setGoalType('cut')}
              className={`py-2 text-xs font-bold rounded-[var(--radius-sm)] border transition-all ${
                goalType === 'cut'
                  ? 'bg-[var(--brand-rose)] text-white border-[var(--brand-rose)]'
                  : 'bg-[var(--bg-core)] text-[var(--text-secondary)] border-[var(--border-subtle)]'
              }`}
            >
              Sèche / Perte
            </button>
            <button
              onClick={() => setGoalType('maintenance')}
              className={`py-2 text-xs font-bold rounded-[var(--radius-sm)] border transition-all ${
                goalType === 'maintenance'
                  ? 'bg-[var(--brand-primary)] text-[#042f1f] border-[var(--brand-primary)]'
                  : 'bg-[var(--bg-core)] text-[var(--text-secondary)] border-[var(--border-subtle)]'
              }`}
            >
              Maintien
            </button>
            <button
              onClick={() => setGoalType('bulk')}
              className={`py-2 text-xs font-bold rounded-[var(--radius-sm)] border transition-all ${
                goalType === 'bulk'
                  ? 'bg-[var(--brand-amber)] text-[#2d1b02] border-[var(--brand-amber)]'
                  : 'bg-[var(--bg-core)] text-[var(--text-secondary)] border-[var(--border-subtle)]'
              }`}
            >
              Prise de masse
            </button>
          </div>
        </div>
      </div>

      {/* Résultats du calcul */}
      <div className="modern-card tracker-summary-card">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="tracker-stat-box">
            <span className="stat-label">BMR (Base)</span>
            <span className="stat-val">{bmr} <span className="text-xs font-normal">kcal</span></span>
          </div>
          <div className="tracker-stat-box">
            <span className="stat-label">TDEE (Total)</span>
            <span className="stat-val">{tdee} <span className="text-xs font-normal">kcal</span></span>
          </div>
        </div>

        <div className="tracker-remaining-box">
          <span className="remaining-label">Objectif Calorique Conseillé</span>
          <div className="remaining-digits">
            <span className="text-[var(--brand-primary)]">{targetCalories}</span>
            <span className="remaining-unit">kcal / jour</span>
          </div>
          <span className="text-xs text-[var(--text-secondary)] mt-2 block">
            {goalType === 'cut' && "Déficit calorique calculé pour une perte de poids saine et progressive."}
            {goalType === 'maintenance' && "Maintien de la masse corporelle et stabilisation énergétique."}
            {goalType === 'bulk' && "Surplus calorique modéré optimisé pour la prise de muscle propre."}
          </span>
        </div>

        <button
          onClick={handleSaveToTracker}
          className="hero-cta text-center justify-center mt-2"
        >
          {savedSuccess ? "Objectif enregistré avec succès !" : "Appliquer cet objectif au Journal de Nutrition"}
        </button>
      </div>
    </div>
  );
}
