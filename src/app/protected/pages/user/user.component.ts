import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { UserTarjetComponent } from '../../components/tarjet/user-tarjet.component';

import { User } from '../../interface/users.interface';
import { UserService } from '../../services/users.service';
import { ConfirmComponent } from '../../components/confirm/confirm.component';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

  /**
    * Exclamación: No haga falta inicializarlo
    * 
    */
  user!: User;

  public infoUser(user: User) {
    return this.userService.getUserById(user.id);
  }

  constructor(private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        // Recibe, lo que el activatedRoute esté recibiendo
        switchMap(
          ({ id }) => this.userService.getUserById(id))
      )
      .subscribe(user => {
        this.user = user.data;
      })
  }

  /**
   * Eliminará el usuario, lanzando primero un dialog que tendrá dos botones (cancelar y eliminar)
   * Esto comprobará desùes de cerrar, si se a elegido borrar, o no el usuario.
   * Si se a eliminado, lo indicará con el primer if,
   * Si no se a eliminado, hará también ver al usuario que no se a eliminado el usuario que estaba viendo
   */
  public deleteUser() {
    // Hacer la pregunta, con el servicio de dialog
    const dialog = this.dialog.open(ConfirmComponent, {
      width: '250px',
      data: this.user
    })

    dialog.afterClosed().subscribe( // despues de cerrar, se suscribirá y nos enviará la resultado
      (result: boolean) => {

        if (result === true) {
          this.userService.deleteUser(this.user.id)
            .subscribe(() => {
              this.router.navigate(['/list/users']),
                this.showSnackBar(`User '${this.user.first_name}' Deleted Correctly`);
            })
        } else {
          return this.showSnackBar(`User '${this.user.first_name}' can't Deleted`);
        }

      }
    )
  }

  /**
   * Recibirá un mensaje, que se enviará una vez se llame a este método, 
   * y lo mostrará con una duración de 3 segundos
   * @param mensaje 
   */
  private showSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, ' Okay', {
      duration: 3000
    })
  }

}
