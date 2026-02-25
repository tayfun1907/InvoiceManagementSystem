import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  registerModel = {
    UserName: '',
    Password: ''
  };

  onRegister() {
    this.authService.register(this.registerModel).subscribe({
      next: (res) => {
        alert("Kayıt Başarılı! Şimdi giriş yapabilirsiniz.");
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert(err.error || "Kayıt sırasında hata oluştu.");
      }
    });
  }
}