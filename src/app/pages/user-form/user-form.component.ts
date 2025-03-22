import { toast } from 'ngx-sonner';
import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

    if (this.idUser) {
      try {
        this.user = await this.usersServices.getUserById(this.idUser);
        this.title = 'ACTUALIZAR';
      } catch (msg: any) {
        toast.error(msg.error.error)
      }
    }

    this.userForm = new FormGroup({
      _id: new FormControl(this.idUser || null, []),
      first_name: new FormControl(this.user?.first_name || "",  Validators.required),
      last_name: new FormControl(this.user?.last_name || "",  Validators.required),
      username: new FormControl(this.user?.username || "",  Validators.required),
      email: new FormControl(this.user?.email || "",  [Validators.required, Validators.email]),
      image: new FormControl(this.user?.image || "",  [Validators.required, Validators.pattern('https?://.+')]),
    })

  }

  async getDataForm() {
    let response: IUser | any
    try {
      if (this.userForm.value._id) {
        //update
        response = await this.usersServices.updateUser(this.userForm.value);
      } else {
        //insert
        response = await this.usersServices.createUser(this.userForm.value)
      }
      
      console.log("response",response)
      this.router.navigate(['/home']);


    } catch (msg: any) {
      if (msg.status === 400) {
        msg.error.forEach((oneError: any) => toast.error(oneError.message))
      }
    }
  }
}
