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
  pageSize: number = 10;
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
            customLabel: `${entity.NOMBRE_ENTIDAD}`
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
            Swal.fire(
              'Error',
              'Hubo un error al guardar la entidad.',
              'error'
            );
            console.error('Error al guardar la entidad', error);
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
