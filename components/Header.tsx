'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <header className="app-header">
      <Link href="/" className="brand">
        <span className="brand-badge">PRO</span>
        <span className="brand-text">Stride</span>
      </Link>
      <div className="header-controls">
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`icon-toggle-btn ${!soundEnabled ? 'muted' : ''}`}
          title="Activer / Couper les bruitages"
        >
          {soundEnabled ? '🔊' : '🔇'}
        </button>
        <Link href="/settings" className="icon-toggle-btn settings-hamburger-btn" title="Paramètres">
          ☰
        </Link>
        <div className="header-status">
          <span className="status-dot"></span>
          <span className="status-text">Prêt à l'effort</span>
        </div>
      </div>
    </header>
  );
}
