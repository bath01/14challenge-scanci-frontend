import { Injectable, signal } from '@angular/core';

/**
 * Service de gestion du thème (clair/sombre).
 * Persiste le choix dans localStorage et applique la classe sur <html>.
 */
@Injectable({ providedIn: 'root' })
export class Theme {
  private readonly storageKey = 'scanci-theme';
  readonly isDark = signal(true);

  constructor() {
    this.loadTheme();
  }

  toggle(): void {
    this.isDark.set(!this.isDark());
    this.applyTheme();
  }

  private loadTheme(): void {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      this.isDark.set(saved === 'dark');
    } else {
      // Détecte la préférence système
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDark.set(prefersDark);
    }
    this.applyTheme();
  }

  private applyTheme(): void {
    const theme = this.isDark() ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.storageKey, theme);
  }
}
