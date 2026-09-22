'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [caloriesBurned, setCaloriesBurned] = useState<number>(320);

  useEffect(() => {
    const burned = localStorage.getItem('stride_cal_burned');
    if (burned) setCaloriesBurned(parseInt(burned, 10));
  }, []);

  return (
    <div className="flex flex-col gap-5">
      {/* Hero Card */}
      <div className="hero-card">
        <span className="hero-tag">Entraînement & Nutrition</span>
        <h2>Dépasse tes limites aujourd'hui.</h2>
        <p>Programmes complets, suivi de performance et gestion précise de tes apports journaliers.</p>
        <Link href="/catalog" className="hero-cta">
          <span>Trouver mon programme (QCM)</span>
          <span>→</span>
        </Link>
      </div>

      {/* Activité sur 7 jours */}
      <div className="modern-card">
        <div className="section-title mb-2">
          <h3>Activité sur 7 jours</h3>
          <span className="subtitle">Sélectionne un jour pour afficher le bilan</span>
        </div>
        <div className="text-xs font-bold text-[var(--brand-primary)] mb-2">
          🔥 {caloriesBurned} kcal brûlées aujourd'hui
        </div>
        <div className="weekly-chart">
          {[
            { day: 'Lun', height: '60%', active: true },
            { day: 'Mar', height: '85%', active: true, current: true },
            { day: 'Mer', height: '40%', active: true },
            { day: 'Jeu', height: '20%', active: false },
            { day: 'Ven', height: '30%', active: false },
            { day: 'Sam', height: '70%', active: false },
            { day: 'Dim', height: '10%', active: false },
          ].map((item, idx) => (
            <div key={idx} className="chart-col">
              <div className="chart-bar-container">
                <div
                  className="chart-bar-fill"
                  style={{
                    height: item.active ? item.height : '8px',
                    backgroundColor: item.current
                      ? 'var(--brand-primary)'
                      : item.active
                      ? 'var(--brand-cyan)'
                      : 'var(--border-subtle)',
                  }}
                />
              </div>
              <span
                className="chart-day-label"
                style={{
                  color: item.current ? 'var(--brand-primary)' : 'var(--text-secondary)',
                }}
              >
                {item.day}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Espaces de l'application (Hub Grid) */}
      <div className="flex flex-col gap-3">
        <div className="section-title px-1">
          <h3>Espaces de l'application</h3>
          <span className="subtitle">Navigation principale</span>
        </div>

        <div className="hub-grid">
          <Link href="/tracker" className="hub-card tracker-card-highlight">
            <div className="hub-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--brand-primary)', borderColor: 'var(--brand-primary)' }}>
              01
            </div>
            <div className="hub-text">
              <h4>Journal & Calories restantes</h4>
              <p>Macros détaillées, favoris et solde journalier</p>
            </div>
            <span className="hub-chevron">→</span>
          </Link>

          <Link href="/catalog" className="hub-card">
            <div className="hub-icon-wrapper" style={{ background: 'var(--bg-core)', color: 'var(--brand-cyan)' }}>
              02
            </div>
            <div className="hub-text">
              <h4>Catalogue complet</h4>
              <p>Programmes par lieu et intensité</p>
            </div>
            <span className="hub-chevron">→</span>
          </Link>

          <Link href="/recipes" className="hub-card">
            <div className="hub-icon-wrapper" style={{ background: 'var(--bg-core)', color: 'var(--brand-amber)' }}>
              03
            </div>
            <div className="hub-text">
              <h4>Recettes & Menus du Jour</h4>
              <p>Génère tes repas personnalisés étape par étape</p>
            </div>
            <span className="hub-chevron">→</span>
          </Link>

          <Link href="/builder" className="hub-card">
            <div className="hub-icon-wrapper" style={{ background: 'var(--bg-core)', color: 'var(--brand-purple)' }}>
              04
            </div>
            <div className="hub-text">
              <h4>Séance sur mesure</h4>
              <p>Construis ta routine exercice par exercice</p>
            </div>
            <span className="hub-chevron">→</span>
          </Link>

          <Link href="/bmr" className="hub-card">
            <div className="hub-icon-wrapper" style={{ background: 'var(--bg-core)', color: 'var(--brand-rose)' }}>
              05
            </div>
            <div className="hub-text">
              <h4>Bilan métabolique BMR</h4>
              <p>Calcule ton objectif calorique quotidien</p>
            </div>
            <span className="hub-chevron">→</span>
          </Link>

          <Link href="/hydration" className="hub-card">
            <div className="hub-icon-wrapper" style={{ background: 'var(--bg-core)', color: 'var(--brand-cyan)' }}>
              06
            </div>
            <div className="hub-text">
              <h4>Suivi d'Hydratation</h4>
              <p>Gère ta consommation d'eau et ta récupération</p>
            </div>
            <span className="hub-chevron">→</span>
          </Link>

          <Link href="/prs" className="hub-card">
            <div className="hub-icon-wrapper" style={{ background: 'var(--bg-core)', color: 'var(--brand-amber)' }}>
              07
            </div>
            <div className="hub-text">
              <h4>Records Personnels (PRs)</h4>
              <p>Consigne tes charges maximales et ta force</p>
            </div>
            <span className="hub-chevron">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
