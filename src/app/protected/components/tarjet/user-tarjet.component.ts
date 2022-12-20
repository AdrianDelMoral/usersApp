import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../interface/users.interface';
import { UsersListService } from '../../services/users.service';

@Component({
  selector: 'app-user-tarjet',
  templateUrl: './user-tarjet.component.html',
  styleUrls: ['./user-tarjet.component.css']
})
export class UserTarjetComponent {

  @Input() user!: User;

  getStyles(user: User) {
    return {
      backgroundImage: `url('${user.avatar}')`
    };
  }


  constructor() { }
}
