import { toast } from 'ngx-sonner';
import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interfaces';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  @Input() idUser: string = ""
  userForm: FormGroup = new FormGroup({}, [])
  user!: IUser;
  usersServices = inject(UserService);
  title: string = "NUEVO";
  router = inject(Router);

  async ngOnInit() {
    // si recibimos id, tengo que llamar getById traerme los datos y pintarlos dentro del formulario, y si no recibimos id lo unico que tengo que hacer es recoger los datos y posteriormente insertarlos con ayuda del servicio.
    // CRUD - Create - Read - Update - Delete un elemento o entidad
    if (this.idUser) {
      //llamamos al servicio y cargamos los datos del empleado.
      try {
        this.user = await this.usersServices.getUserById(this.idUser);
        this.title = 'ACTUALIZAR';
      } catch (msg: any) {
        toast.error(msg.error.error)
      }
    }

    this.userForm = new FormGroup({
      _id: new FormControl(this.idUser || null, []),
      first_name: new FormControl(this.user?.first_name || "", []),
      last_name: new FormControl(this.user?.last_name || "", []),
      username: new FormControl(this.user?.username || "", []),
      email: new FormControl(this.user?.email || "", []),
      image: new FormControl(this.user?.image || "", []),
    }, [])

  }

  async getDataForm() {
    let response: IUser | any
    try {
      if (this.userForm.value._id) {
        //actualizando
        response = await this.usersServices.updateUser(this.userForm.value);
      } else {
        //insertando
        response = await this.usersServices.createUser(this.userForm.value)
      }
      if (response.createdAt || response.updateAt) {
        this.router.navigate(['/dashboard', 'empleados'])
      }


    } catch (msg: any) {
      if (msg.status === 400) {
        msg.error.forEach((oneError: any) => toast.error(oneError.message))
      }
    }
  }
}
