import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CustomFormsModule } from '../../../../shared/modules/custom-forms.module';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DividerModule } from 'primeng/divider';
import { GoogleAuthComponent } from '../../../../shared/components/google-auth/google-auth.component';
import { LoginResponse } from '../../../../core/auth/models/login.model';
import { SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CustomFormsModule, InputGroupModule, InputGroupAddonModule, DividerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute, private messageService: MessageService) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {

  }

loginDefault(): void {
  if (this.loginForm.valid) {
    const { email, password } = this.loginForm.value;
    // Busca usuários cadastrados no localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (user) {
      // Simula login
      this.authService.setAuthToken('fake-jwt-token');
      this.authService.setRefreshToken('fake-refresh-token');
      this.authService.init();
      this.router.navigateByUrl(this.route.snapshot.queryParamMap.get('stateUrl') || '/home');
      this.authService.authenticate();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login simulado com sucesso.' });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Usuário ou senha inválidos.' });
    }
  } else {
    this.loginForm.markAllAsTouched();
  }
}

  loginWithGoogle(userData: SocialUser) {
    this.authService.loginGoogle(userData.email).subscribe({
      next: (res: LoginResponse) => {
        this.authService.setAuthToken(res.token);
        this.authService.setRefreshToken(res.refreshToken);
        this.authService.init();
        this.router.navigateByUrl(this.route.snapshot.queryParamMap.get('stateUrl') || '');
        console.log('oi');
        this.authService.authenticate();

      },
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Unable to login, user not registered.' });
      }
    });
    
  }
}

