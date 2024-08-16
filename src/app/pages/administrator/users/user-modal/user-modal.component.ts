import { Component, EventEmitter, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/pages/administrator/users/services/user.service';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { User } from 'src/app/pages/administrator/users/user.model'

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [CommonModule, FormsModule,NgSelectModule],  
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.css'
})
export class UserModalComponent {
  @Output() userCreated = new EventEmitter<any>();

  user = {
    nombre: '' as string | null, 
    IDPERSONAL: null as number | null,
    perfil_: [] as number[],  // Array para almacenar múltiples perfiles seleccionados
    rol_: null as number | null, // Valor único para el rol seleccionado
  };

  selectedUser: any;
  users: User[] = [];
  perfiles: any[] = [];
  roles: any[] = [];
  selectedPerfiles: number[] = [];
  selectedRoles: number | null = null;
  isLoading: boolean = false;
  saveLoading: boolean = false;

  constructor(public bsModalRef: BsModalRef, private userService: UserService) {}



  ngOnInit(): void {
    this.userCreated.emit(this.user);
    this.Personal();
    this.Perfiles();
    this.Rol();
  }

  Personal(): void{
    this.userService.getPersonalM().subscribe(
      response => {
        if (response.status === 1) {
          this.users = response.personal.map((user: User) => ({
            ...user,
            customLabel: `${user.NUM_DOC} - ${user.APE_PAT} ${user.APE_MAT}, ${user.NOMBRE} - ${user.NOMBRE_MAC}`
          }));
        } else {
          console.error('Error al obtener usuarios', response.message);
        }
      },
      error => {
        console.error('Error al obtener usuarios', error);
      }
    );
  }

  Perfiles(): void {
    this.isLoading = true;
    this.userService.getPersonalM().subscribe(
      response => {
        if (response.status === 1) {
          this.perfiles = response.profile;
          this.isLoading = false;
        } else {
          console.error('Error al obtener usuarios', response.message);
          this.isLoading = false;
        }
      },
      error => {
        console.error('Error al obtener usuarios', error);
        this.isLoading = false;
      }
    );
  }

  Rol(): void {
    this.isLoading = true;
    this.userService.getPersonalM().subscribe(
      response => {
        console.log("Respuesta completa de roles", response); // Verifica toda la respuesta
  
        if (response.status === 1 && response.roles) {
          // Convierte el objeto roles a un array de objetos con id y description
          this.roles = Object.entries(response.roles).map(([key, value]) => ({
            id: Number(key),
            description: value
          }));
          console.log("Roles cargados", this.roles);
        } else {
          console.error('Error al obtener roles', response.message);
        }
        this.isLoading = false;
      },
      error => {
        console.error('Error al obtener roles', error);
        this.isLoading = false;
      }
    );
  }


  saveUser(): void {

    this.saveLoading = false;
   
    const selectedUser = this.users.find(user => user.IDPERSONAL === this.user.IDPERSONAL);
      
      // Guarda el nombre correspondiente al IDPERSONAL seleccionado
    this.user.nombre = selectedUser ? selectedUser.NOMBRE : null;
    console.log("id ersonal", this.user.nombre)
    this.user.perfil_ = this.selectedPerfiles;
    this.user.rol_ = this.selectedRoles;  

    // Emitir los datos del usuario creado
    this.userCreated.emit(this.user);
    console.log(this.user);

    this.userService.saveUser(this.user).subscribe(
        response => {
            console.log('Usuario guardado exitosamente', response);
            this.saveLoading = false;
            // Cierra el modal
            this.bsModalRef.hide();
            // Opcional: puedes emitir un evento o actualizar la lista de usuarios
            this.userCreated.emit(this.user);

        },
        error => {
            console.error('Error al guardar el usuario', error);
        }
    );
  }

  onCancel(): void {
    this.bsModalRef.hide();
  }

  onPerfilChange(event: any, perfilId: number): void {
      if (event.target.checked) {
          // Añadir perfilId al array si no está ya presente
          if (!this.selectedPerfiles.includes(perfilId)) {
              this.selectedPerfiles.push(perfilId);
          }
      } else {
          // Eliminar perfilId del array si está presente
          const index = this.selectedPerfiles.indexOf(perfilId);
          if (index > -1) {
              this.selectedPerfiles.splice(index, 1);
          }
      }

      // Verificar qué perfiles están seleccionados
      console.log('Perfiles seleccionados:', this.selectedPerfiles);
  }

  onRolesChange(event: any, rolId: number): void{
    this.selectedRoles = rolId;
  }


}
