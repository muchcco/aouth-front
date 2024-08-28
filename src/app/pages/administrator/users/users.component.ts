import { Component, ViewEncapsulation } from '@angular/core';
import { UserService } from './services/user.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserModalComponent } from './user-modal/user-modal.component';
import { PasswordModalComponent } from './password-modal/password-modal.component';
import Swal from 'sweetalert2';
import { EditModalComponent } from './edit-modal/edit-modal.component';

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

  getRoleNames(user: any): string {
    if (user && user.roles) {
      return user.roles.map((role: any) => role.name).join(', ');
    }
    return '';
  }

  deleteUser(user: any): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user.id).subscribe(
          response => {
            if (response.status) {
              Swal.fire(
                'Eliminado',
                'El usuario ha sido eliminado.',
                'success'
              );
              this.reloadUsers();
            } else {
              Swal.fire(
                'Error',
                response.message,
                'error'
              );
            }
          },
          error => {
            Swal.fire(
              'Error',
              'No se pudo eliminar el usuario.',
              'error'
            );
          }
        );
      }
    });
  }

  openEditUserModal(user: any): void {
    if (!user || !user.id) {
      console.error('El usuario no tiene un ID válido:', user);
      return;
    }
  
    this.bsModalRef = this.modalService.show(EditModalComponent, {
      initialState: {
        userId: user.id  // Asegúrate de que el ID del usuario está disponible aquí
      }
    });
  
    this.bsModalRef.content.userUpdated.subscribe(() => {
      this.reloadUsers();
    });
  }

  openChangePasswordModal(user: any): void {
    this.bsModalRef = this.modalService.show(PasswordModalComponent, {
      initialState: {
        user: user
      }
    });

    this.bsModalRef.content.passwordUpdated.subscribe(() => {
      this.reloadUsers();
    });
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
