import { Component, EventEmitter, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EntitymacService } from '../../services/entitymac.service';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-entity',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './entity.component.html',
  styleUrl: './entity.component.css'
})
export class EntityComponent {
  @Output() userCreated = new EventEmitter<any>();

  data = {
    nombre: "" as string | null,
    nombre_corto: "" as string | null,
  };

  isLoading: boolean = false;
  saveLoading: boolean = false;

  constructor(public bsModalRef: BsModalRef, private EntitymacService: EntitymacService) {}


  onCancel(): void {
    this.bsModalRef.hide();
  }

  saveEntity(): void {
    this.isLoading = true;

    this.EntitymacService.saveModalEntity(this.data).subscribe(
      response => {
        console.log('Entidad guardada exitosamente', response);
        this.isLoading = false;
        this.userCreated.emit(this.data); // Emitir el evento para notificar al componente padre
        this.bsModalRef.hide(); // Cerrar el modal después de guardar
      },
      error => {
        console.error('Error al guardar la entidad', error);
        this.isLoading = false;
      }
    );
}

  
}
