import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router'; 
import { AuthService } from '../auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink], 
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  loginModel = {
    UserName: '', 
    Password: '' 
  };

  onLogin() {
    this.authService.login(this.loginModel).subscribe({
      next: (userResponse: any) => {
        console.log('Gelen kullanıcı verisi:', userResponse);
        
         localStorage.setItem('userToken', JSON.stringify(userResponse));
        
        this.router.navigate(['/invoice-list']);
      },
      error: (err) => {
        console.error('Hata:', err);
        alert(err.error || 'Giriş Başarısız!');
      }
    });
  }
}