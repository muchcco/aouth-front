import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-password-modal',
  templateUrl: './password-modal.component.html',
  styleUrl: './password-modal.component.css'
})
export class PasswordModalComponent {
  @Input() user: any;
  newPassword: string = '';

  passwordUpdated = new EventEmitter();

  constructor(public bsModalRef: BsModalRef, private userService: UserService) {}

  ngOnInit(): void {}

  changePassword(): void {
    const data = {
      id: this.user.id,
      password: this.newPassword
    };

    this.userService.changePassword(data).subscribe(response => {
      if (response.status) {
        this.passwordUpdated.emit();
        this.bsModalRef.hide();
      } else {
        console.error('Error al cambiar la contraseña', response.message);
      }
    });
  }
}
