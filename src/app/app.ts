import { Component, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';
import { Loader } from './shared/components/loader/loader';
import { Auth } from './core/services/auth';
import { Theme } from './core/services/theme';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Loader],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('qrcode-frontend');
  showLoader = true;

  constructor(
    private authService: Auth,
    private themeService: Theme,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Masque le loader après la première navigation
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        this.showLoader = false;
      });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
