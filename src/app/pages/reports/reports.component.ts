import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {

  constructor(private router: Router) {}

  ngOnInit() {    
    // console.log("redireccion");  // Este mensaje debería aparecer en la consola
    this.router.navigate(['/reports/dashboard'])
  } 
}