import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  public emailPattern: string = "^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, , Validators.pattern(this.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm.reset({
      email: 'eve.holt@reqres.in',
      password: 'cityslicka'
    })
  }
  // Obtiene el valor del formulario para comprobarlo
  campoNoValido(campo: string) {
    return this.loginForm.get(campo)?.invalid
      && this.loginForm.get(campo)?.touched
  }
  // Envia el tipo de error personalizado a su variable correspondiente del HTML
  get emailErrorMsg(): string {
    const errors = this.loginForm.get('email')?.errors;

    if (errors?.['required']) {
      return 'El Correo es Obligatorio';
    }

    if (errors?.['pattern']) {
      return 'El Texto Introducido Debe Tener Formato Correo';
    }

    return '';
  }
  // Envia el tipo de error personalizado a su variable correspondiente del HTML
  get passwordErrorMsg(): string {
    const errors = this.loginForm.get('password')?.errors;
    if (errors?.['required']) {
      return 'La Contraseña es Obligatoria';
    }

    if (errors?.['minlength']) {
      return 'La Contraseña Debe Tener Más de 6 Carácteres';
    }
    return '';
  }

  login() {
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password)
      .subscribe(resp => {
        // console.log('login resp: ', resp); // devolverá el usuario autenticado

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
