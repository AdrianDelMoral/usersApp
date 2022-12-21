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

  private emailPattern: string = "^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  public registerForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.registerForm.reset({
      email: '',
      password: ''
    })
  }

  // Obtiene el valor del formulario para comprobarlo
  public campoNoValido(campo: string) {
    return this.registerForm.get(campo)?.invalid
      && this.registerForm.get(campo)?.touched
  }

  /** 
   * Getter para los errores, que devolverá un String
   * en base al tipo de error que tengamos 
   * en el formulario en el input de email
   */
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

  /** 
   * Getter para los errores, que devolverá un String
   * en base al tipo de error que tengamos 
   * en el formulario en el input de password
   */
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

  /** Método para iniciar sesión que comprobará 
   * si es una respuesta exitosa, enviará al usuario al home de la aplicación
   * o recibimos por el contrario un error 
   */
  public register() {
    const { email, password } = this.registerForm.value;

    this.authService.register(email, password)
      .subscribe(resp => {
        if (resp.token) {
          this.router.navigateByUrl('/list/users');
        } else {
          Swal.fire('', resp, 'error')
        }
      });
  }
}
