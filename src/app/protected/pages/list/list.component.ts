import { Component, OnInit } from '@angular/core';
import { User } from '../../interface/users.interface';
import { UsersListService } from '../../services/users.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  users: User[] = []

  get results() {
    return this.usersService.usersList;
  }

  constructor(private usersService: UsersListService) { }

  ngOnInit(): void {
    this.usersService.getUsers()
      .subscribe(resp => {
        this.users = resp.data;
      })
  }


}
