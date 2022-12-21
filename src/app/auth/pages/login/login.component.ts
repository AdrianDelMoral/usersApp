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

  private emailPattern: string = "^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  public loginForm: FormGroup = this.fb.group({
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
    });
  }

  // Obtiene el valor del formulario para comprobarlo
  public campoNoValido(campo: string) {
    return this.loginForm.get(campo)?.invalid
      && this.loginForm.get(campo)?.touched;
  }

  /** 
   * Getter para los errores, que devolverá un String
   * en base al tipo de error que tengamos 
   * en el formulario en el input de email
   */
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

  /** 
   * Getter para los errores, que devolverá un String
   * en base al tipo de error que tengamos 
   * en el formulario en el input de password
   */
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

  /** Método para iniciar sesión que comprobará 
   * si es una respuesta exitosa, enviará al usuario al home de la aplicación
   * o recibimos por el contrario un error 
   */
  public login() {
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password)
      .subscribe(resp => {
        if (resp.token) {
          this.router.navigateByUrl('/list/users');
        } else {
          Swal.fire('', resp, 'error')
        }
      });
  }
}
