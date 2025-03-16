import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/iuser.interfaces';
import { IResponse } from '../../interfaces/iresponse.interfaces';
import { UserCardComponent } from "../../components/user-card/user-card.component";

@Component({
  selector: 'app-home',
  imports: [UserCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  users: IUser[] = [];

  userServices = inject(UserService);

  async ngOnInit() {
    try {
      let response: IResponse = await this.userServices.getUsers();
      console.log(response);
      this.users = response.results;
    } catch (error) {
      console.log("Error fetching users");
      console.log(error);
    }
  }
}
