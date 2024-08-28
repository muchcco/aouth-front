import { Component, EventEmitter, Input, Output, ChangeDetectorRef  } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/pages/administrator/users/services/user.service';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-edit-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule],
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent {
  @Input() userId!: number;  // Recibe el ID del usuario
  @Output() userUpdated = new EventEmitter<any>();

  user: any = {}; // Datos del usuario
  rolesCompletos: any = {}; // Todos los roles disponibles
  perfilesCompletos: any[] = []; // Todos los perfiles disponibles
  selectedRole: number | null = null; // ID del rol seleccionado
  selectedProfiles: number[] = []; // IDs de los perfiles seleccionados
  isLoading: boolean = true;
  saveLoading: boolean = false;

  constructor(public bsModalRef: BsModalRef, private userService: UserService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.userService.getUserEdit(this.userId).subscribe(response => {
      if (response.status) {
        this.user = response.user;
        this.rolesCompletos = response.roles_completo;
        this.perfilesCompletos = response.perfil;
  
        this.selectedRole = this.user.roles.length > 0 ? this.user.roles[0].id : null;
        console.log('Rol seleccionado:', this.selectedRole);
  
        this.selectedProfiles = response.profiles;
  
        this.isLoading = false;
        this.cd.detectChanges(); // Forzar la detección de cambios
      } else {
        console.error('Error al cargar datos del usuario', response.message);
        this.isLoading = false;
      }
    });
  }  

  updateUser(): void {
    this.saveLoading = true;

    const updateData = {
      id: this.userId,
      perfil_: this.selectedProfiles,
      rol_: this.selectedRole
    };

    this.userService.updateUser(updateData).subscribe(
      response => {
        if (response.status) {
          console.log('Usuario actualizado exitosamente', response);
          this.saveLoading = false;
          this.bsModalRef.hide();
          this.userUpdated.emit(this.user);
        } else {
          console.error('Error al actualizar el usuario', response.message);
          this.saveLoading = false;
        }
      },
      error => {
        console.error('Error al actualizar el usuario', error);
        this.saveLoading = false;
      }
    );
  }

  onCancel(): void {
    this.bsModalRef.hide();
  }

  onPerfilChange(event: any, perfilId: number): void {
    if (event.target.checked) {
      if (!this.selectedProfiles.includes(perfilId)) {
        this.selectedProfiles.push(perfilId);
      }
    } else {
      const index = this.selectedProfiles.indexOf(perfilId);
      if (index > -1) {
        this.selectedProfiles.splice(index, 1);
      }
    }
  }

  onRolesChange(event: any, rolId: number): void {
    this.selectedRole = rolId; // Solo se permite un rol seleccionado
  }

  objectKeys(obj: any): any[] {
    return Object.keys(obj);
  }
}
