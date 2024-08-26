import { Component } from '@angular/core';
import { EntitymacService } from './services/entitymac.service';
import { Entitymac } from './Entitymac.model';
import { Mac } from 'src/app/pages/administrator/entitymac/mac.model';
import Swal from 'sweetalert2';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EntityComponent } from './modal/entity/entity.component';

@Component({
  selector: 'app-entitymac',
  templateUrl: './entitymac.component.html',
  styleUrl: './entitymac.component.css'
})


export class EntitymacComponent {

  list: any[] = [];
  mac: Mac[] = [];
  page: number = 1;
  pageSize: number = 15;
  entitys: Entitymac[] = [];
  selectedMac: number | null = null;
  bsModalRef!: BsModalRef;

  entity = {
    nombre: '' as string | null,
    IDENTIDAD: null as number | null,
  }

  constructor(private EntitymacService: EntitymacService, private modalService: BsModalService){}

  ngOnInit(): void {

    this.getList();
    this.getMac();
    this.getEntity();

  }

  getList(): void{
    this.EntitymacService.getEntity().subscribe(
      response => {
        if (response.status === 1) {
          this.list = response.list;
          console.log(this.list);
        } else {
          console.error('Error al obtener usuarios', response.message);
        }
      },
      error => {
        console.error('Error al obtener usuarios', error);
      }
    );
  }

  getMac(): void{
    this.EntitymacService.getMac().subscribe(
      response => {
        if (response.status === 1) {
          if (Array.isArray(response.mac)) {
            this.mac = response.mac;
            console.log(this.mac);
          } else {
            console.error('La respuesta no es un array');
          }
          console.log(this.mac);
        } else {
          console.error('Error al obtener usuarios', response.message);
        }
      },
      error => {
        console.error('Error al obtener usuarios', error);
      }
    );
  }

  getEntity(): void {
    this.EntitymacService.getEntityName().subscribe(
      response => {
        if (response.status === 1) {
          this.entitys = response.entity.map((entity: Entitymac) => ({
            ...entity,
            customLabel: `${entity.ABREV_ENTIDAD} - ${entity.NOMBRE_ENTIDAD}`
          }));
          console.log("Entidades: ",this.entitys);
        } else {
          console.error('Error al obtener usuarios', response.message);
        }
      },
      error => {
        console.error('Error al obtener usuarios', error);
      }
    );
  }

  saveEntity(): void {

    if (!this.selectedMac) {
      Swal.fire({
        title: 'Falta seleccionar el Centro MAC',
        text: 'Por favor, selecciona un Centro MAC antes de guardar.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }
  
    if (!this.entity.IDENTIDAD) {
      Swal.fire({
        title: 'Falta seleccionar la Entidad',
        text: 'Por favor, selecciona una Entidad antes de guardar.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }

    const data = {
      mac: this.selectedMac,
      entity: this.entity.IDENTIDAD
    };

    console.log('Datos a enviar:', data);

    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Deseas guardar esta entidad?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.EntitymacService.getEntityStore(data).subscribe(
          response => {
            this.getList();
            Swal.fire(
              'Guardado',
              'La entidad ha sido guardada exitosamente.',
              'success'
            );            
            console.log('Entidad guardada exitosamente', response);
            // Aquí podrías actualizar la lista o hacer alguna acción posterior
          },
          error => {
            const errorMessage = error?.error?.message || 'Hubo un error al guardar la entidad.';
            Swal.fire(
              'Error',
              errorMessage,
              'warning'
            );
            console.error('Error al guardar la entidad', errorMessage);
          }
        );
      }
    });
  }

  deleteEntity(entity: any): void {



    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar la entidad ${entity.NOMBRE_ENTIDAD}? Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Llamada al servicio para eliminar la entidad
        this.EntitymacService.deleteEntity(entity.IDMAC_ENTIDAD).subscribe(
          response => {
            Swal.fire(
              'Eliminado',
              'La entidad ha sido eliminada exitosamente.',
              'success'
            );
            this.getList(); // Actualiza la lista después de eliminar
          },
          error => {
            const errorMessage = error?.error?.message || 'Hubo un error al eliminar la entidad.';
            Swal.fire(
              'Error',
              errorMessage,
              'error'
            );
            console.error('Error al eliminar la entidad', errorMessage);
          }
        );
      }
    });
  }
  

  /************************* modal ******************* */

  openAddUserModal(): void {
    this.bsModalRef = this.modalService.show(EntityComponent);
  
    // Suscribirse al evento userCreated del modal
    
  }

  openAddEntityModal(): void {
      this.bsModalRef = this.modalService.show(EntityComponent);

      if (this.bsModalRef.content) {
          this.bsModalRef.content.userCreated.subscribe((newEntity: any) => {
              this.getEntity(); // Vuelve a cargar la lista de entidades en el select
          });
      }
  }



}
