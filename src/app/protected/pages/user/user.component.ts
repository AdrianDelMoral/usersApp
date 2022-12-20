import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { UserTarjetComponent } from '../../components/tarjet/user-tarjet.component';

import { User } from '../../interface/users.interface';
import { UsersListService } from '../../services/users.service';
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

  infoUser(user: User) {
    console.log(this.usersListService.getUserById(user.id));
    return this.usersListService.getUserById(user.id);
  }

  constructor(private activatedRoute: ActivatedRoute,
    private usersListService: UsersListService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        // Recibe, lo que el activatedRoute(o observable anterior) está recibiendo
        switchMap(
          //Para usar el servicio con el switchMap, usaremos un nuevo observable, que es el servicio
          ({ id }) => this.usersListService.getUserById(id))
      )
      .subscribe(user => {
        this.user = user.data;
      })
  }

  volverAlListado() {
    this.router.navigate(['/list/users'])
  }


  /*==========================================*/

  deleteUser() {
    // Hacer la pregunta, con el servicio de dialog
    const dialog = this.dialog.open(ConfirmComponent, {
      width: '250px',
      data: this.user
    })

    dialog.afterClosed().subscribe( // despues de cerrar, se suscribirá y nos enviará la resultado
      (result: boolean) => {
        console.log('antes del if(result)', result)

        if (result === true) {
          console.log('dentro del if(result)', result)

          this.usersListService.deleteUser(this.user.id)
            .subscribe(() => {
              console.log('Usuario que eliminado: ', this.user)
              this.router.navigate(['/list/users']),
                this.mostrarSnackBar(`User '${this.user.first_name}' Deleted Correctly`);
            })
        } else {
          // Si no desea eliminarlo, indicará que el usuario 'X' no se ha eliminado
          return this.mostrarSnackBar(`User '${this.user.first_name}' can't Deleted`);
        }
      }
    )
  }

  mostrarSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, ' Okay', {
      duration: 15000
    })
  }

}
