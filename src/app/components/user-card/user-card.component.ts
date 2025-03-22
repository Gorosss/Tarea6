import { UserService } from './../../services/user.service';
import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interfaces';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-card',
  imports: [RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {

  @Input() user!: IUser;
  @Output() deleteUserEmit: EventEmitter<string> = new EventEmitter();

  UserServices = inject(UserService);

  onDeleteUser(user : IUser) {

    Swal.fire({
      title : `¿Deseas borrar al usuario ${user.first_name} ${user.last_name}?`,
      icon : 'warning',
      showCancelButton : true,
      confirmButtonText : 'Borrar',
      cancelButtonText : 'Cancelar',
      confirmButtonColor : '#dc3545',
      cancelButtonColor : '#6c757d',
      allowOutsideClick : false
    }).then(async (result) => {
      if (result.isConfirmed) {
          let res = await this.UserServices.deleteUser(user._id);
          this.deleteUserEmit.emit(res._id);
      }
    })




  }
}