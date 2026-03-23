import { Auth } from './../../../core/services/auth';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegisterRequest } from '../../../core/models';
import { Theme } from '../../../core/services/theme';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

  formData : RegisterRequest = {
    name : '',
    email : '',
    password : ''
  }

  confirmPassword= '';
  isLoading=false;
  errorMessage = '';

  constructor (
    private authServie: Auth,
    private router: Router,
    private themeService: Theme
  ){}

  isDark(): boolean {
    return this.themeService.isDark();
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }


  passwordsMatch(): boolean{
    return this.formData.password === this.confirmPassword;
  }

  onSubmit(): void {
    if (!this.passwordsMatch()) {
      this.errorMessage = 'Les mots de passe ne correspondent pas';
      return;
    }

    this.errorMessage = '';
    this.isLoading = true;

    this.authServie.register(this.formData).subscribe({
      next: () => {

        this.router.navigate(['/generator']);
      },
      error: (err) => {
        this.errorMessage = err.status === 409
          ? 'Cet email est déjà utilisé'
          : 'Une erreur est survenue, réessayez';
        this.isLoading = false;
      }
    });
  }


}
