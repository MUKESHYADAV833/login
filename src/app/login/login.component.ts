import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from'@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rememberMe: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.errorMessage = null;

      this.authService.login(this.loginForm.value).subscribe({
        next: (result:any) => {
          this.loading = false;
          if (result.success) {
            if (this.loginForm.value.rememberMe) {
              localStorage.setItem('rememberMe', JSON.stringify(this.loginForm.value));
            }
            localStorage.setItem('login', JSON.stringify(this.loginForm.value));
            this.router.navigate(['/dashboard']);
          } else {
            this.errorMessage = 'Invalid username or password';
          }
        },
        error: (err:any) => {
          this.loading = false;
          this.errorMessage = 'An error occurred. Please try again.';
        }
      });
    }
  }
}
