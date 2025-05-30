import { Component } from '@angular/core';
import { CustomFormsModule } from '../../../../shared/modules/custom-forms.module';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { MessageService } from 'primeng/api';
import { UserRole } from '../../../../core/models/user.model';
import { SocialUser } from '@abacritt/angularx-social-login';
import { NewCustomer } from '../../../../core/models/customer.model';
import { AvatarModule } from 'primeng/avatar';
import { UserService } from '../../../user/services/user.service';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [CustomFormsModule, AvatarModule, PasswordModule, DividerModule],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss',
})
export class CustomerFormComponent {
  customerData: NewCustomer = {
    customer: {
      name: 'teste',
      phone: '987654321'
    },
    user: {
      email: '',
      password: ''
    }
  };
  userGoogleData?: SocialUser;
  UserForm: FormGroup;
  showUserError: boolean = false;
  showPasswordError: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private userService: UserService, private router: Router, private messageService: MessageService) {
    this.UserForm = this.fb.group({
       user: this.fb.group({
              email: new FormControl('', [Validators.required, Validators.email]),
              password: new FormControl('', [Validators.required, Validators.minLength(8)]),
              confirmPassword: new FormControl('', [Validators.required]),
              role: new FormControl(UserRole.CUSTOMER)
            }),
    });
  }

  handleSubmit(): void {
    if (this.UserForm.valid && this.checkPasswordMatch()) {
      const userFormValue = this.UserForm.get('user')?.value;

      // Verificando se os valores foram obtidos
      if (userFormValue) {
        // Atribuindo os valores ao customerData.user
        this.customerData.user.email = userFormValue.email;
        this.customerData.user.password = userFormValue.password;
      }

      this.authService.createUserCustomer(this.customerData).subscribe({
        next: (res) => {
          this.uploadUserPhoto(res.user?.id!);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User created successfully!' });
          this.router.navigate(["/login"]);
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not create your user, please try again later.' });
        }
      })
    } else {
      this.UserForm.markAllAsTouched();
    }
  }

  getUserData(userData: SocialUser) {
    this.userGoogleData = userData;
    this.customerData.user.email = userData.email;
    this.customerData.user.role = UserRole.CUSTOMER;
    this.customerData.user.image = userData.photoUrl;
    this.customerData.customer.name = userData.name;

    this.showUserError = false;
  }

  onAddressFormReady(addressForm: FormGroup) {
    this.UserForm = addressForm;
  }

  async uploadUserPhoto(userId: string) {
    const response = await fetch(this.customerData.user.image);
    const blob = await response.blob();

    const file = new File([blob], "profile-image.jpg", { type: blob.type });

    const formData = new FormData();
    formData.append("file", file);
    this.userService.uploadPhoto(userId, formData).subscribe();
  }

    checkPasswordMatch(): boolean {
    let userData = this.UserForm.value['user'];

    if (userData.password === userData.confirmPassword) {
      this.showPasswordError = false;
      return true;
    }

    this.showPasswordError = true;
    return false;
  }
}
