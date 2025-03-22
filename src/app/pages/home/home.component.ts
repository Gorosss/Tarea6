import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/iuser.interfaces';
import { IResponse } from '../../interfaces/iresponse.interfaces';
import { UserCardComponent } from "../../components/user-card/user-card.component";
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-home',
  imports: [UserCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  users: IUser[] = [];
  total_pages: number = 0;
  actual_page: number = 1;

  userServices = inject(UserService);

  async ngOnInit() {
    this.loadUsers();
  }

  async loadUsers() {
    try {
      let response: IResponse = await this.userServices.getUsers(this.actual_page);
      this.users = response.results;
      this.total_pages = response.total_pages;

    } catch (msg : any) {
      toast.error(msg.error.error);
    }
  }

  async goToNext() {
    if (this.actual_page < this.total_pages) {
      this.actual_page++;
      await this.loadUsers();
    }
  }

  async goToPrev() {
    if (this.actual_page > 1) {
      this.actual_page--;
      await this.loadUsers();
    }
  }

  deleteUser(id: string) {
    this.users = this.users.filter(user => user._id !== id);
    toast.success('Usuario eliminado con éxito');
  }


}
