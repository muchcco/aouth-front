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

  activeNodeId: number | null = null;
  selectedPath: string = '';


  constructor (private documentService: DocumentService) {}

  ngOnInit(): void {
    this.getTreeview();
    this.getDetail();
  }

  getTreeview(): void {
    this.documentService.getTreeview().subscribe(
      response => {
        if (response.status === true) {
          this.documents = response.data;
          // console.log(this.documents);
        } else {
          console.error('Error:', response.message);
        }
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  getDetail(category: string = ''): void {
    this.documentService.getDetail(category).subscribe(
      response => {
        if (response.status == true) {
          this.details = response.category;
          // console.log(this.details);
        } else {
          console.error('Error:', response.message);
        }
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  searchByCategory(categoryId: number, node: any): void {
    this.getDetail(categoryId.toString());
    this.activeNodeId = categoryId; // Set the active node ID
    this.selectedPath = this.getNodePath(categoryId, this.documents, ''); // Update the selected path
  }

  isActive(nodeId: number): boolean {
    return this.activeNodeId === nodeId;
  }

  getStyle(nodeId: number): any {
    return {
      'text-decoration': this.isActive(nodeId) ? 'underline' : 'none'
    };
  }

  getNodePath(nodeId: number, nodes: any[], path: string): string {
    for (const node of nodes) {
      console.log(nodeId)
      if (node.id === nodeId) {
        return `${path} > ${node.id} - ${node.denominacion}`;
      }
      if (node.children?.length) {
        const result = this.getNodePath(nodeId, node.children, `${path} > ${node.id} - ${node.denominacion}`);
        console.log(result);
        if (result) {
          return result;
        }
      }
    }
    return path;
  }
}
