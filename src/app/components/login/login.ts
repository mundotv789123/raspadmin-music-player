import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html'
})
export class Login {
  formGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  constructor(private auth: AuthService) { }

  submit() {
    if (this.formGroup.invalid) {
      return;
    }
    this.isLoading.set(true);
    this.auth.login({
      username: this.formGroup.value.username!,
      password: this.formGroup.value.password!,
    }).then(() => {
      location.reload();
    }).catch(error => {
      console.error(error);
      const defaultMessage = "Ocorreu um erro ao enviar requisição";
      this.errorMessage.set(error.error?.message ?? defaultMessage)
    }).finally(() => {
      this.isLoading.set(false)
    })
  }
}
