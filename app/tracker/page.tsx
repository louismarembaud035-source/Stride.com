'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FOOD_DATABASE, FoodItem } from '../../data/database';

interface LoggedFood {
  nom: string;
  displayQty: string;
  cal: number;
  prot: string;
  gluc: string;
  lip: string;
}

export default function TrackerPage() {
  const [userDailyGoal, setUserDailyGoal] = useState<number>(2200);
  const [userCaloriesBurned, setUserCaloriesBurned] = useState<number>(0);
  const [loggedFoods, setLoggedFoods] = useState<LoggedFood[]>([]);
  const [favoriteFoods, setFavoriteFoods] = useState<string[]>(["riz_blanc", "poulet_grille", "banane", "skyr"]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [portionQty, setPortionQty] = useState<number>(100);

  useEffect(() => {
    const goal = localStorage.getItem('stride_cal_goal');
    const burned = localStorage.getItem('stride_cal_burned');
    const foods = localStorage.getItem('stride_logged_foods');
    const favs = localStorage.getItem('stride_fav_foods');

    if (goal) setUserDailyGoal(parseInt(goal, 10));
    if (burned) setUserCaloriesBurned(parseInt(burned, 10));
    if (foods) setLoggedFoods(JSON.parse(foods));
    if (favs) setFavoriteFoods(JSON.parse(favs));
  }, []);

  const saveState = (updatedFoods: LoggedFood[], updatedBurned: number, updatedGoal: number) => {
    setLoggedFoods(updatedFoods);
    setUserCaloriesBurned(updatedBurned);
    setUserDailyGoal(updatedGoal);
    localStorage.setItem('stride_logged_foods', JSON.stringify(updatedFoods));
    localStorage.setItem('stride_cal_burned', updatedBurned.toString());
    localStorage.setItem('stride_cal_goal', updatedGoal.toString());
  };

  const totalEaten = loggedFoods.reduce((acc, item) => acc + item.cal, 0);
  const remaining = userDailyGoal - totalEaten + userCaloriesBurned;

  const totalProt = loggedFoods.reduce((acc, item) => acc + parseFloat(item.prot), 0).toFixed(1);
  const totalGluc = loggedFoods.reduce((acc, item) => acc + parseFloat(item.gluc), 0).toFixed(1);
  const totalLip = loggedFoods.reduce((acc, item) => acc + parseFloat(item.lip), 0).toFixed(1);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim().length < 2) {
      setSearchResults([]);
      return;
    }
    const matches = FOOD_DATABASE.filter(f => f.nom.toLowerCase().includes(query.toLowerCase()));
    setSearchResults(matches.slice(0, 8));
  };

  const selectFoodForPortion = (food: FoodItem) => {
    setSelectedFood(food);
    setPortionQty(food.unit === 'piece' ? 1 : 100);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleAddFood = () => {
    if (!selectedFood) return;
    let effectiveGrams = portionQty;
    let displayQty = `${portionQty}g`;

    if (selectedFood.unit === 'piece' && selectedFood.standardWeight) {
      effectiveGrams = portionQty * selectedFood.standardWeight;
      displayQty = `${portionQty} unité(s) (~${effectiveGrams}g)`;
    }

    const ratio = effectiveGrams / 100;
    const newEntry: LoggedFood = {
      nom: selectedFood.nom,
      displayQty,
      cal: Math.round(selectedFood.cal * ratio),
      prot: (selectedFood.prot * ratio).toFixed(1),
      gluc: (selectedFood.gluc * ratio).toFixed(1),
      lip: (selectedFood.lip * ratio).toFixed(1),
    };

    const updated = [...loggedFoods, newEntry];
    saveState(updated, userCaloriesBurned, userDailyGoal);
    setSelectedFood(null);
  };

  const handleRemoveFood = (index: number) => {
    const updated = loggedFoods.filter((_, i) => i !== index);
    saveState(updated, userCaloriesBurned, userDailyGoal);
  };

  const handleClearLog = () => {
    if (confirm("Réinitialiser le journal des repas d'aujourd'hui ?")) {
      saveState([], 0, userDailyGoal);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="screen-top-bar">
        <Link href="/" className="back-home-btn">← Accueil</Link>
        <span className="view-indicator">Journal de Nutrition</span>
      </div>

      <div className="screen-heading">
        <h2>Suivi Calorique & Macros</h2>
        <p>Ajuste tes apports et surveille ton solde énergétique quotidien.</p>
      </div>

      <div className="modern-card tracker-summary-card">
        <div className="tracker-equation-row">
          <div className="tracker-stat-box">
            <span className="stat-label">Objectif</span>
            <span className="stat-val">{userDailyGoal}</span>
          </div>
          <span className="math-operator">-</span>
          <div className="tracker-stat-box">
            <span className="stat-label">Ingéré</span>
            <span className="stat-val">{totalEaten}</span>
          </div>
          <span className="math-operator">+</span>
          <div className="tracker-stat-box">
            <span className="stat-label">Sport</span>
            <span className="stat-val">{userCaloriesBurned}</span>
          </div>
        </div>

        <div className="tracker-remaining-box">
          <span className="remaining-label">Solde Restant</span>
          <div className="remaining-digits">
            <span id="tracker-remaining-display" style={{ color: remaining < 0 ? "var(--brand-rose)" : "var(--brand-primary)" }}>
              {remaining}
            </span>
            <span className="remaining-unit">kcal</span>
          </div>
          <div className="budget-bar-track">
            <div
              className="budget-bar-fill"
              style={{
                width: `${Math.min(100, Math.max(0, (totalEaten / (userDailyGoal + userCaloriesBurned)) * 100))}%`,
                backgroundColor: remaining < 0 ? "var(--brand-rose)" : "var(--brand-primary)"
              }}
            />
          </div>
        </div>

        <div className="macros-breakdown-box">
          <div className="macro-labels">
            <span>Protéines: <b id="macro-prot-val">{totalProt}</b>g / 140g</span>
            <span>Glucides: <b id="macro-gluc-val">{totalGluc}</b>g / 250g</span>
            <span>Lipides: <b id="macro-lip-val">{totalLip}</b>g / 70g</span>
          </div>
          <div className="flex flex-col gap-1.5 mt-2">
            <div className="macro-bar-track"><div className="macro-bar-fill prot" style={{ width: `${Math.min(100, (parseFloat(totalProt) / 140) * 100)}%` }} /></div>
            <div className="macro-bar-track"><div className="macro-bar-fill gluc" style={{ width: `${Math.min(100, (parseFloat(totalGluc) / 250) * 100)}%` }} /></div>
            <div className="macro-bar-track"><div className="macro-bar-fill lip" style={{ width: `${Math.min(100, (parseFloat(totalLip) / 70) * 100)}%` }} /></div>
          </div>
        </div>
      </div>

      <div className="modern-card">
        <div className="section-title mb-3">
          <h3>Ajouter un aliment</h3>
          <span className="subtitle">Recherche dans la base de données</span>
        </div>

        <div className="search-food-box">
          <input
            type="text"
            placeholder="Rechercher (ex: Riz, Poulet, Banane)..."
            value={searchQuery}
            onChange={handleSearch}
          />
          {searchResults.length > 0 && (
            <div className="food-search-dropdown">
              {searchResults.map(item => (
                <div key={item.id} className="food-search-item" onClick={() => selectFoodForPortion(item)}>
                  <span>{item.nom}</span>
                  <span className="text-[11px] text-[var(--text-secondary)]">{item.cal} kcal / 100g</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedFood && (
          <div className="portion-panel mt-3">
            <div className="selected-food-meta">
              <h4>{selectedFood.nom}</h4>
              <span className="macros-tag">
                {selectedFood.unit === 'piece' ? 'Unité' : '100g'} = {selectedFood.cal} kcal (P: {selectedFood.prot}g • G: {selectedFood.gluc}g • L: {selectedFood.lip}g)
              </span>
            </div>
            <div className="portion-input-row">
              <input
                type="number"
                value={portionQty}
                onChange={(e) => setPortionQty(parseFloat(e.target.value) || 0)}
                min={1}
              />
              <span className="text-xs font-semibold text-[var(--text-secondary)]">
                {selectedFood.unit === 'piece' ? 'unité(s)' : 'grammes'}
              </span>
              <button onClick={handleAddFood} className="btn-primary ml-auto py-2 px-4 text-xs font-bold w-auto">
                Ajouter
              </button>
            </div>
          </div>
        )}

        <div className="mt-4">
          <span className="filter-section-label block mb-2">Favoris rapides</span>
          <div className="favorites-chips-stack">
            {favoriteFoods.map(favId => {
              const food = FOOD_DATABASE.find(f => f.id === favId);
              if (!food) return null;
              return (
                <div key={favId} className="fav-chip" onClick={() => selectFoodForPortion(food)}>
                  <span>{food.nom}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="modern-card logged-meals-section">
        <div className="meals-header">
          <h4>Repas du jour (<span id="logged-items-count">{loggedFoods.length}</span>)</h4>
          {loggedFoods.length > 0 && (
            <button onClick={handleClearLog} className="link-clear-btn">Réinitialiser</button>
          )}
        </div>
        <ul className="styled-item-list mt-3">
          {loggedFoods.length === 0 ? (
            <li className="text-[var(--text-tertiary)] justify-center py-4">Aucun aliment enregistré aujourd'hui.</li>
          ) : (
            loggedFoods.map((item, index) => (
              <li key={index}>
                <div>
                  <b>{item.nom}</b>
                  <span className="text-[11px] text-[var(--text-secondary)] block">
                    {item.displayQty} • P:{item.prot}g G:{item.gluc}g L:{item.lip}g
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[var(--brand-cyan)]">{item.cal} kcal</span>
                  <button className="delete-food-btn" onClick={() => handleRemoveFood(index)} title="Supprimer">✕</button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
