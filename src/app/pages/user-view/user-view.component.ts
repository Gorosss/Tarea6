import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interfaces';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-user-view',
  imports: [RouterLink],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent {
  @Input() idUser: string = "";
  user!: IUser;
  userServices = inject(UserService);
  isLoading: boolean = false;
  router = inject(Router)


  async ngOnInit() {
    this.isLoading = true;
    console.log(this.idUser)
    let id = this.idUser
    //tendremos que llamar al servicio para traernos los datos de este personaje
    
    try {
      console.log(id)
      this.user = await this.userServices.getUserById(id)
      console.log(this.user)
    } catch (error) {
      console.log(error)
    } finally {
      this.isLoading = false;
    }
  }

  deleteUser(user : IUser) {
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
            try {
              let res = await this.userServices.deleteUser(user._id);
              if ('error' in res) {
                toast.error('Error al eliminar el usuario');
              } else {
                this.router.navigate(['/home']);
                toast.success('Usuario eliminado con éxito');
              }
              
            } catch (error) {
              toast.error('Error al eliminar el usuario');
            }
              
            }
        })
  }
}
