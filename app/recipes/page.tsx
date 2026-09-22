'use client';

import { useState } from 'react';
import Link from 'next/link';
import { recipesDatabase, Recipe } from '../../data/recipes';

export default function RecipesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);

  const filteredRecipes = recipesDatabase.filter(r => {
    if (selectedCategory === 'all') return true;
    return r.category === selectedCategory;
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <Link href="/" className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-800 transition-all">
          ← Accueil
        </Link>
        <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
          RECETTES & MENUS
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-black tracking-tight text-white">Bibliothèque Culinaire</h1>
        <p className="text-xs text-slate-400">Sélectionne tes repas par catégorie et consulte les détails nutritionnels.</p>
      </div>

      {/* Filtres par catégorie */}
      <div className="flex flex-col gap-2.5">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Catégories</span>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'Toutes' },
            { id: 'petit-dejeuner', label: 'Petits-déjeuners' },
            { id: 'dejeuner', label: 'Déjeuners' },
            { id: 'diner', label: 'Dîners' },
            { id: 'collation', label: 'Collations' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                selectedCategory === cat.id
                  ? 'bg-cyan-400 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-400/20'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center text-xs text-slate-500 pt-1">
        <span>Recettes disponibles</span>
        <span className="font-bold text-slate-300">{filteredRecipes.length} recette(s)</span>
      </div>

      {/* Grille des recettes */}
      <div className="flex flex-col gap-4">
        {filteredRecipes.map(recipe => (
          <div
            key={recipe.id}
            onClick={() => setActiveRecipe(recipe)}
            className="relative overflow-hidden bg-slate-900 border border-slate-800 rounded-3xl p-6 cursor-pointer hover:border-cyan-500/50 transition-all shadow-xl group"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-cyan-400" />

            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-slate-950 text-cyan-400 border border-slate-800">
                {recipe.category}
              </span>
              <span className="text-xs font-bold text-emerald-400">{recipe.calories} kcal</span>
            </div>
            
            <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
              {recipe.name}
            </h3>

            <div className="flex justify-between text-xs text-slate-300 pt-3 border-t border-slate-800 font-medium">
              <span>Protéines : <b className="text-white">{recipe.proteins}g</b></span>
              <span>Glucides : <b className="text-white">{recipe.carbs}g</b></span>
              <span>Lipides : <b className="text-white">{recipe.fats}g</b></span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de détail */}
      {activeRecipe && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-[480px] w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col gap-5">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
                  {activeRecipe.category}
                </span>
                <h2 className="text-xl font-bold text-white mt-2">{activeRecipe.name}</h2>
              </div>
              <button
                onClick={() => setActiveRecipe(null)}
                className="w-8 h-8 rounded-full bg-slate-950 border border-slate-800 text-slate-400 hover:text-white font-bold flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="flex justify-around p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-semibold">
              <span className="text-slate-200">🔥 {activeRecipe.calories} kcal</span>
              <span className="text-slate-200">⏱ Prépa : {activeRecipe.prepTime}</span>
              <span className="text-slate-200">🍳 Cuisson : {activeRecipe.cookingTime}</span>
            </div>

            <div className="flex justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-medium">
              <span><b>Protéines :</b> {activeRecipe.proteins}g</span>
              <span><b>Glucides :</b> {activeRecipe.carbs}g</span>
              <span><b>Lipides :</b> {activeRecipe.fats}g</span>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Ingrédients ({activeRecipe.ingredients.length})
              </h4>
              <ul className="flex flex-col gap-1.5 pl-4 text-xs text-slate-300">
                {activeRecipe.ingredients.map((ing, idx) => (
                  <li key={idx} className="list-disc leading-relaxed">{ing}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Étapes de préparation
              </h4>
              <ol className="flex flex-col gap-2 pl-4 text-xs text-slate-300">
                {activeRecipe.steps.map((step, idx) => (
                  <li key={idx} className="list-decimal leading-relaxed">
                    <b>Étape {idx + 1} :</b> {step}
                  </li>
                ))}
              </ol>
            </div>

            <button
              onClick={() => setActiveRecipe(null)}
              className="w-full py-3.5 rounded-2xl bg-cyan-400 text-slate-950 font-bold text-sm tracking-wide hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-500/20 text-center"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
