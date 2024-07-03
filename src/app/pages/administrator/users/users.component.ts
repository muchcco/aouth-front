import { Component, ViewEncapsulation } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent {
  users: any[] = [];
  //paginamos 
  page: number = 1;
  pageSize: number = 20;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      response => {
        if (response.status === 1) {
          this.users = response.data;
          console.log(this.users);
        } else {
          console.error('Error al obtener usuarios', response.message);
        }
      },
      error => {
        console.error('Error al obtener usuarios', error);
      }
    );
  }
}
