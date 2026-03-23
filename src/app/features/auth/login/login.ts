import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LoginRequest } from '../../../core/models';
import { Auth } from '../../../core/services/auth';
import { Theme } from '../../../core/services/theme';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  credentials : LoginRequest = {
    email : '',
    password : ''
  };

  isLoading = false;
  errorMessage = '';

  constructor(
    private authService : Auth,
    private router : Router,
    private route : ActivatedRoute,
    private themeService: Theme
  ){}

  isDark(): boolean {
    return this.themeService.isDark();
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }

  onSubmit(): void {
    this.errorMessage = '',
    this.isLoading = true,

    this.authService.login(this.credentials).subscribe({
      next:()=>{
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/generator';
        this.router.navigate([returnUrl]);
      },
      error:(err) =>{
        this.errorMessage =err.status === 401
          ? 'Email ou mot de passe incorrect'
          : 'Une erreur est survenue, réessayez';
        this.isLoading = false;
      }
    })
  }
}
