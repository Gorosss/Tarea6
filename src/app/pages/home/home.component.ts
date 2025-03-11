import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/iuser.interfaces';
import { IResponse } from '../../interfaces/iresponse.interfaces';
import { UserCardComponent } from "../../components/user-card/user-card.component";
import { UserFormComponent } from '../../components/user-form/user-form.component';

@Component({
  selector: 'app-home',
  imports: [UserCardComponent, UserFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  users: IUser[] = [];

  userService = inject(UserService);

  async ngOnInit() {
    try {
      let response: IResponse = await this.userService.getUsers();
      console.log(response);
      this.users = response.results;
    } catch (error) {
      console.log("Error fetching users");
      console.log(error);
    }
  }
}
