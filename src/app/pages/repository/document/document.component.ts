import { Component } from '@angular/core';
import { DocumentService } from './service/document.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrl: './document.component.css'
})
export class DocumentComponent {

  documents: any[] = [];
  details: any[] = [];

  page: number = 1;
  pageSize: number = 10;


  constructor (private documentService: DocumentService) {}

  ngOnInit(): void {
    this.getTreeview();
    this.getDetail();
  }

  getTreeview(): void {
    this.documentService.getTreeview().subscribe(
      response => {
        if (response.status == true) {
          this.documents = response.data;
          console.log(this.documents);
        } else {
          console.error('Error:', response.message);
        }
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  getDetail(): void {
    this.documentService.getDetail().subscribe(
      response => {
        if (response.status == true) {
          this.details = response.category
          // console.log(this.details, "detalles");
        }else{
          console.error('Error:', response.message);
        }
      }
    );
  }

}
