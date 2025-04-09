import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    this.authService.register(this.name, this.email, this.password).subscribe({
      next: () => {
        alert('Usuário registrado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erro no registro:', err);
        alert('Erro ao registrar usuário');
      },
    });
  }
}
