import { Component, ViewEncapsulation } from '@angular/core';
import { UserService } from './services/user.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserModalComponent } from './user-modal/user-modal.component';

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
  bsModalRef!: BsModalRef;

  constructor(private userService: UserService, private modalService: BsModalService) {}

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

  openAddUserModal(): void {
    this.bsModalRef = this.modalService.show(UserModalComponent);
  
    // Suscribirse al evento userCreated del modal
    this.bsModalRef.content.userCreated.subscribe((user: any) => {
      this.reloadUsers();  // Recarga la tabla de usuarios
    });
  }

  reloadUsers(): void {
    this.userService.getUsers().subscribe(
      response => {
        if (response.status === 1) {
          this.users = response.data;
          console.log('Usuarios actualizados:', this.users);
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
