'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [loggedFoods, setLoggedFoods] = useState<any[]>([]);
  const [userGoal, setUserGoal] = useState<number>(2200);

  useEffect(() => {
    const savedGoal = localStorage.getItem('stride_cal_goal');
    if (savedGoal) setUserGoal(parseInt(savedGoal, 10));

    const savedFoods = localStorage.getItem('stride_logged_foods');
    if (savedFoods) setLoggedFoods(JSON.parse(savedFoods));
  }, []);

  const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  const fullDaysNames = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  const todayIdx = (new Date().getDay() + 6) % 7;

  const BADGES_CONFIG = [
    { id: "first_workout", name: "1er Entraînement" },
    { id: "five_workouts", name: "Régulier" },
    { id: "ten_workouts", name: "Machine" },
    { id: "burn_1000", name: "1000 kcal" },
    { id: "log_food", name: "Diète Carrée" },
    { id: "pong_champ", name: "Pong Master" },
    { id: "breath_zen", name: "Zen" },
    { id: "audio_fan", name: "Mélomane" }
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* En-tête Hero */}
      <div className="hero-card">
        <div className="hero-content">
          <span className="hero-tag">Entraînement & Nutrition</span>
          <h2>Dépasse tes limites aujourd'hui.</h2>
          <p>Programmes complets, suivi de performance et gestion précise de tes apports journaliers.</p>
        </div>
        <Link href="/quiz" className="hero-cta">
          <span>Trouver mon programme (QCM)</span>
          <span className="cta-arrow">→</span>
        </Link>
      </div>

      {/* Graphique hebdomadaire */}
      <div className="modern-card chart-card">
        <div className="section-title">
          <h3>Activité sur 7 jours</h3>
          <span className="subtitle">Sélectionne un jour pour afficher le bilan</span>
        </div>
        <div className="weekly-chart">
          {days.map((day, idx) => {
            const isToday = idx === todayIdx;
            const simulatedEaten = isToday ? loggedFoods.reduce((acc, i) => acc + i.cal, 0) : 2100 + (idx * 45) % 300;

            return (
              <div
                key={day}
                className="chart-col cursor-pointer"
                onClick={() => setSelectedDay(idx)}
              >
                <div className="chart-bar-container">
                  <div
                    className="chart-bar-fill"
                    style={{
                      height: `${Math.min(100, Math.max(15, (simulatedEaten / userGoal) * 100))}%`,
                      backgroundColor: isToday ? 'var(--brand-primary)' : 'var(--brand-cyan)'
                    }}
                  />
                </div>
                <span
                  className="chart-day-label"
                  style={{ color: isToday ? 'var(--brand-primary)' : 'var(--text-tertiary)' }}
                >
                  {day}
                </span>
              </div>
            );
          })}
        </div>

        {selectedDay !== null && (
          <div className="day-detail-box mt-4 bg-[var(--bg-core)] border border-[var(--border-subtle)] rounded-[var(--radius-md)] p-3 text-center">
            <span className="text-[13px] font-bold text-[var(--brand-cyan)] block mb-1">
              Bilan du {fullDaysNames[selectedDay]}
            </span>
            <span className="text-[12px] text-[var(--text-secondary)]">
              Nourriture : <b>2100 kcal</b> • Sport : <b>+350 kcal</b>
            </span>
          </div>
        )}
      </div>

      <div className="section-title">
        <h3>Espaces de l'application</h3>
        <span className="subtitle">Navigation principale</span>
      </div>

      {/* Grille de navigation */}
      <div className="hub-grid">
        <Link href="/tracker" className="hub-card tracker-card-highlight">
          <div className="hub-icon-wrapper bg-emerald">
            <span className="text-xs font-bold text-[var(--brand-primary)]">01</span>
          </div>
          <div className="hub-text">
            <h4>Journal & Calories restantes</h4>
            <p>Macros détaillées, favoris et solde journalier</p>
          </div>
          <span className="hub-chevron">›</span>
        </Link>

        <Link href="/history" className="hub-card">
          <div className="hub-icon-wrapper bg-purple">
            <span className="text-xs font-bold text-[var(--brand-purple)]">02</span>
          </div>
          <div className="hub-text">
            <h4>Historique des séances</h4>
            <p>Consulte tes entraînements passés et ta régularité</p>
          </div>
          <span className="hub-chevron">›</span>
        </Link>

        <Link href="/catalog" className="hub-card">
          <div className="hub-icon-wrapper bg-blue">
            <span className="text-xs font-bold text-[var(--brand-cyan)]">03</span>
          </div>
          <div className="hub-text">
            <h4>Catalogue complet</h4>
            <p>Programmes par lieu et intensité</p>
          </div>
          <span className="hub-chevron">›</span>
        </Link>

        <Link href="/custom" className="hub-card">
          <div className="hub-icon-wrapper bg-purple">
            <span className="text-xs font-bold text-[var(--brand-purple)]">04</span>
          </div>
          <div className="hub-text">
            <h4>Séance sur mesure</h4>
            <p>Construis ta routine exercice par exercice</p>
          </div>
          <span className="hub-chevron">›</span>
        </Link>

        <Link href="/nutrition" className="hub-card">
          <div className="hub-icon-wrapper bg-emerald">
            <span className="text-xs font-bold text-[var(--brand-primary)]">05</span>
          </div>
          <div className="hub-text">
            <h4>Bilan métabolique BMR</h4>
            <p>Calcule ton objectif calorique quotidien</p>
          </div>
          <span className="hub-chevron">›</span>
        </Link>

        <Link href="/recipes" className="hub-card">
          <div className="hub-icon-wrapper bg-emerald">
            <span className="text-xs font-bold text-[var(--brand-primary)]">06</span>
          </div>
          <div className="hub-text">
            <h4>Recettes & Menus du Jour</h4>
            <p>Génère tes repas personnalisés étape par étape</p>
          </div>
          <span className="hub-chevron">›</span>
        </Link>

        <Link href="/water" className="hub-card">
          <div className="hub-icon-wrapper bg-blue">
            <span className="text-xs font-bold text-[var(--brand-cyan)]">07</span>
          </div>
          <div className="hub-text">
            <h4>Suivi d'Hydratation</h4>
            <p>Gère ta consommation d'eau quotidienne</p>
          </div>
          <span className="hub-chevron">›</span>
        </Link>

        <Link href="/evolution" className="hub-card">
          <div className="hub-icon-wrapper bg-purple">
            <span className="text-xs font-bold text-[var(--brand-purple)]">08</span>
          </div>
          <div className="hub-text">
            <h4>Évolution & Records (PRs)</h4>
            <p>Suivi de ton poids corporel et de tes charges max</p>
          </div>
          <span className="hub-chevron">›</span>
        </Link>

        <Link href="/challenge" className="hub-card">
          <div className="hub-icon-wrapper bg-amber">
            <span className="text-xs font-bold text-[var(--brand-amber)]">09</span>
          </div>
          <div className="hub-text">
            <h4>Défi du Jour</h4>
            <p>Relève le challenge quotidien de remise en forme</p>
          </div>
          <span className="hub-chevron">›</span>
        </Link>
      </div>

      {/* Succès & Trophées */}
      <div className="modern-card badges-card mt-6">
        <div className="section-title">
          <h3>Succès & Trophées</h3>
          <span className="subtitle">Progression globale</span>
        </div>
        <div className="badges-grid grid grid-cols-4 gap-2 mt-3">
          {BADGES_CONFIG.map((badge, idx) => (
            <div key={badge.id} className={`badge-item ${idx < 3 ? 'unlocked' : ''}`}>
              <span className="badge-name">{badge.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
