import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DocumentService } from '../../service/document.service';

@Component({
  selector: 'app-adddocument',
  templateUrl: './adddocument.component.html',
  styleUrl: './adddocument.component.css'
})
export class AdddocumentComponent {
  documents: any[] = [];
  data: string = '';

  constructor(public bsModalRef: BsModalRef, private documentService: DocumentService) {}

  ngOnInit(): void {
    this.getDoc();    
  }

  getDoc(): void {
    this.documentService.getTreeview().subscribe(
      response => {
        if (response.status === true) {
          this.documents = response.data;
          console.log(this.documents, 'modal ');
        } else {
          console.error('Error:', response.message);
        }
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  onSave(): void {
    // Lógica para guardar el documento
    this.bsModalRef.hide();
  }

  onCancel(): void {
    this.bsModalRef.hide();
  }
}
