import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interfaces';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-view',
  imports: [],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent {
  @Input() idUser: string = "";
  user!: IUser;
  userServices = inject(UserService);
  isLoading: boolean = false;

  async ngOnInit() {
    console.log(this.idUser)
    let id = this.idUser
    //tendremos que llamar al servicio para traernos los datos de este personaje
    this.isLoading = true;
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
}
