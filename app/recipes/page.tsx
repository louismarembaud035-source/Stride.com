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
    <div className="flex flex-col gap-5">
      <div className="screen-top-bar">
        <Link href="/" className="back-home-btn">← Accueil</Link>
        <span className="view-indicator">Recettes & Menus</span>
      </div>

      <div className="screen-heading">
        <h2>Bibliothèque Culinaire</h2>
        <p>Sélectionne tes repas par catégorie et consulte les détails nutritionnels.</p>
      </div>

      {/* Filtres par catégorie */}
      <div className="flex gap-2 flex-wrap">
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
            className={`px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-bold border transition-all ${
              selectedCategory === cat.id
                ? 'bg-[var(--brand-primary)] text-[#042f1f] border-[var(--brand-primary)]'
                : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center text-xs text-[var(--text-tertiary)] mt-1">
        <span>Recettes disponibles</span>
        <span className="font-bold text-[var(--text-primary)]">{filteredRecipes.length} recette(s)</span>
      </div>

      {/* Grille des recettes */}
      <div className="grid grid-cols-1 gap-3">
        {filteredRecipes.map(recipe => (
          <div
            key={recipe.id}
            onClick={() => setActiveRecipe(recipe)}
            className="modern-card cursor-pointer hover:border-[var(--brand-cyan)] transition-all flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--bg-core)] text-[var(--brand-cyan)] border border-[var(--border-subtle)]">
                {recipe.category}
              </span>
              <span className="text-xs font-bold text-[var(--brand-primary)]">{recipe.calories} kcal</span>
            </div>
            <h4 className="text-base font-bold">{recipe.name}</h4>
            <div className="flex justify-between text-xs text-[var(--text-secondary)] pt-2 border-t border-[var(--border-subtle)]">
              <span>Protéines : {recipe.proteins}g</span>
              <span>Glucides : {recipe.carbs}g</span>
              <span>Lipides : {recipe.fats}g</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal / Panneau de détail d'une recette */}
      {activeRecipe && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="modern-card max-w-[480px] w-full max-h-[90vh] overflow-y-auto bg-[var(--bg-surface)] border-[var(--border-strong)]">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-cyan)]">
                  {activeRecipe.category}
                </span>
                <h3 className="text-xl font-bold mt-1">{activeRecipe.name}</h3>
              </div>
              <button
                onClick={() => setActiveRecipe(null)}
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-bold text-lg px-2"
              >
                ✕
              </button>
            </div>

            <div className="flex gap-3 p-3 rounded-[var(--radius-md)] bg-[var(--bg-core)] mb-4 text-xs font-semibold">
              <span>🔥 {activeRecipe.calories} kcal</span>
              <span>⏱ Prépa : {activeRecipe.prepTime}</span>
              <span>🍳 Cuisson : {activeRecipe.cookingTime}</span>
            </div>

            <div className="flex justify-between p-2.5 rounded-[var(--radius-sm)] bg-[var(--bg-core)] border border-[var(--border-subtle)] mb-4 text-xs">
              <span><b>Protéines :</b> {activeRecipe.proteins}g</span>
              <span><b>Glucides :</b> {activeRecipe.carbs}g</span>
              <span><b>Lipides :</b> {activeRecipe.fats}g</span>
            </div>

            <div className="mb-4">
              <h5 className="text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
                Ingrédients ({activeRecipe.ingredients.length})
              </h5>
              <ul className="flex flex-col gap-1.5 pl-4 text-xs text-[var(--text-secondary)]">
                {activeRecipe.ingredients.map((ing, idx) => (
                  <li key={idx} className="list-disc">{ing}</li>
                ))}
              </ul>
            </div>

            <div className="mb-5">
              <h5 className="text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
                Étapes de préparation
              </h5>
              <ol className="flex flex-col gap-2 pl-4 text-xs text-[var(--text-secondary)]">
                {activeRecipe.steps.map((step, idx) => (
                  <li key={idx} className="list-decimal leading-relaxed">
                    <b>Étape {idx + 1} :</b> {step}
                  </li>
                ))}
              </ol>
            </div>

            <button
              onClick={() => setActiveRecipe(null)}
              className="hero-cta text-center justify-center"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
