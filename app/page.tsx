'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [caloriesBurnedToday, setCaloriesBurnedToday] = useState(320);

  useEffect(() => {
    const burned = localStorage.getItem('stride_cal_burned');
    if (burned) setCaloriesBurnedToday(parseInt(burned, 10));
  }, []);

  const days = [
    { label: 'Lun', active: true },
    { label: 'Mar', active: true, current: true },
    { label: 'Mer', active: true },
    { label: 'Jeu', active: false },
    { label: 'Ven', active: false },
    { label: 'Sam', active: false },
    { label: 'Dim', active: false },
  ];

  const modules = [
    {
      num: '01',
      title: 'Journal & Calories',
      desc: 'Macros détaillées, favoris et solde journalier',
      href: '/tracker',
      highlight: true,
      badge: 'Nutrition'
    },
    {
      num: '02',
      title: 'Catalogue des Séances',
      desc: 'Programmes par lieu, durée et intensité',
      href: '/catalog',
      badge: 'Training'
    },
    {
      num: '03',
      title: 'Recettes & Menus',
      desc: 'Idées repas personnalisées et macros',
      href: '/recipes',
      badge: 'Nutrition'
    },
    {
      num: '04',
      title: 'Séance sur Mesure',
      desc: 'Constructeur de routine exercice par exercice',
      href: '/builder',
      badge: 'Training'
    },
    {
      num: '05',
      title: 'Bilan Métabolique BMR',
      desc: 'Calcule ton objectif calorique quotidien',
      href: '/bmr',
      badge: 'Santé'
    },
    {
      num: '06',
      title: 'Suivi d’Hydratation',
      desc: 'Gère ton eau bue et ta récupération',
      href: '/hydration',
      badge: 'Santé'
    },
    {
      num: '07',
      title: 'Records Personnels (PRs)',
      desc: 'Consigne tes charges maximales et ta force',
      href: '/prs',
      badge: 'Performance'
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl">
        <div className="absolute right-0 top-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <span className="text-[11px] font-black uppercase tracking-widest text-cyan-400 mb-2 block">
          Entraînement & Nutrition
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
          Dépasse tes limites aujourd'hui.
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
          Programmes complets, suivi de performance et gestion précise de tes apports journaliers.
        </p>
        <Link
          href="/catalog"
          className="w-full py-3.5 px-5 rounded-2xl bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-between hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-500/20"
        >
          <span>Trouver mon programme (QCM)</span>
          <span className="text-base font-black">→</span>
        </Link>
      </div>

      {/* Activité sur 7 jours */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-bold text-white">Activité sur 7 jours</h3>
            <span className="text-xs text-slate-400">Sélectionne un jour pour afficher le bilan</span>
          </div>
          <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-slate-950 text-emerald-400 border border-slate-800">
            🔥 {caloriesBurnedToday} kcal brûlées
          </span>
        </div>

        <div className="grid grid-cols-7 gap-2 pt-2">
          {days.map((d, i) => (
            <div
              key={i}
              className={`flex flex-col items-center justify-between h-24 rounded-2xl p-2 border transition-all ${
                d.current
                  ? 'bg-slate-950 border-emerald-400 shadow-md shadow-emerald-500/10'
                  : d.active
                  ? 'bg-slate-950/60 border-slate-800'
                  : 'bg-slate-950/30 border-slate-900 opacity-60'
              }`}
            >
              <span className={`text-[10px] font-bold ${d.current ? 'text-emerald-400' : 'text-slate-400'}`}>
                {d.label}
              </span>
              <div
                className={`w-full rounded-xl transition-all ${
                  d.active ? 'bg-cyan-400/80 h-12' : 'bg-slate-800 h-6'
                }`}
              />
              <span className="text-[9px] font-extrabold text-slate-500">
                {d.active ? '✓' : '-'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Hub Grid / Navigation principale vers tous les modules */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">Espaces de l'application</h3>
          <span className="text-xs text-slate-500">Navigation principale</span>
        </div>

        <div className="flex flex-col gap-3">
          {modules.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className={`flex items-center justify-between bg-slate-900 border rounded-2xl p-4 transition-all group ${
                m.highlight
                  ? 'border-emerald-500/50 bg-gradient-to-r from-emerald-950/20 via-slate-900 to-slate-900 hover:border-emerald-400'
                  : 'border-slate-800 hover:border-cyan-500/40 hover:bg-slate-850'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm tracking-tight border ${
                  m.highlight
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-slate-950 text-cyan-400 border-slate-800'
                }`}>
                  {m.num}
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {m.title}
                    </h4>
                    <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                      {m.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{m.desc}</p>
                </div>
              </div>
              <span className="text-slate-600 group-hover:text-cyan-400 text-lg font-black transition-colors px-2">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
