import { Component } from '@angular/core';

/**
 * Loader global avec animation aux couleurs du drapeau ivoirien.
 * Affiché au démarrage de l'application.
 */
@Component({
  selector: 'app-loader',
  standalone: true,
  template: `
    <div class="loader-overlay">
      <div class="loader-content">
        <!-- Drapeau animé -->
        <div class="loader-flag">
          <div class="flag-stripe orange"></div>
          <div class="flag-stripe white"></div>
          <div class="flag-stripe green"></div>
        </div>

        <!-- Logo -->
        <p class="loader-brand">Scan<span class="accent">CI</span></p>

        <!-- Barre de progression -->
        <div class="loader-bar">
          <div class="loader-bar-fill"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .loader-overlay {
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: var(--color-bg);
      display: flex;
      align-items: center;
      justify-content: center;
      animation: loaderFadeOut 0.4s ease-out 2s forwards;
    }

    .loader-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 24px;
    }

    /* ——— Drapeau ——— */
    .loader-flag {
      display: flex;
      width: 64px;
      height: 48px;
      border-radius: 6px;
      overflow: hidden;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
      animation: flagPulse 1.2s ease-in-out infinite;
    }

    .flag-stripe {
      flex: 1;
    }

    .flag-stripe.orange { background: #FF8C00; }
    .flag-stripe.white  { background: #FFFFFF; }
    .flag-stripe.green  { background: #009E49; }

    /* ——— Logo ——— */
    .loader-brand {
      font-family: 'DM Sans', sans-serif;
      font-size: 28px;
      font-weight: 800;
      color: var(--color-text-primary);
      margin: 0;
      letter-spacing: -0.5px;
      animation: brandFadeIn 0.6s ease-out 0.3s both;
    }

    .loader-brand .accent {
      color: #FF8C00;
    }

    /* ——— Barre de progression ——— */
    .loader-bar {
      width: 120px;
      height: 3px;
      border-radius: 2px;
      background: var(--color-border);
      overflow: hidden;
      animation: brandFadeIn 0.6s ease-out 0.5s both;
    }

    .loader-bar-fill {
      height: 100%;
      border-radius: 2px;
      background: linear-gradient(90deg, #FF8C00, #009E49);
      animation: barProgress 1.6s ease-in-out 0.4s forwards;
      width: 0;
    }

    /* ——— Animations ——— */
    @keyframes flagPulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }

    @keyframes brandFadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes barProgress {
      0% { width: 0; }
      100% { width: 100%; }
    }

    @keyframes loaderFadeOut {
      to {
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
      }
    }
  `]
})
export class Loader {}
