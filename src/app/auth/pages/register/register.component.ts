import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  public emailPattern: string = "^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  // Usar para ver que funciona
  registerForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.registerForm.reset({
      email: 'eve.holt@reqres.in',
      password: 'cityslicka'
    })
  }
  // Obtiene el valor del formulario para comprobarlo
  campoNoValido(campo: string) {
    return this.registerForm.get(campo)?.invalid
      && this.registerForm.get(campo)?.touched
  }

  // Envia el tipo de error personalizado a su variable correspondiente del HTML
  get emailErrorMsg(): string {
    const errors = this.registerForm.get('email')?.errors;

    if (errors?.['required']) {
      return 'Email is Required';
    }

    if (errors?.['pattern']) {
      return 'The text entered must have email format';
    }

    return '';
  }

  // Envia el tipo de error personalizado a su variable correspondiente del HTML
  get passwordErrorMsg(): string {
    const errors = this.registerForm.get('password')?.errors;
    if (errors?.['required']) {
      return 'Password is Required';
    }

    if (errors?.['minlength']) {
      return 'Password Must Have More Than 6 Characters';
    }

    return '';
  }

  register() {
    const { email, password } = this.registerForm.value;

    this.authService.register(email, password)
      .subscribe(resp => {
        if (resp.token) { // si la respuesta, devuelve un token, podrá entrar
          // navega a la pantalla principal de la app si existe el usuario
          this.router.navigateByUrl('/list/users');
        } else {
          // Mostrará el msg de error, con una alerta:
          Swal.fire('Error', resp, 'error')
        }
      });
  }
}
