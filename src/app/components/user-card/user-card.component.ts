import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interfaces';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {

  @Input() user!: IUser;
  @Output() viewDetails = new EventEmitter<number>();
  @Output() editUser = new EventEmitter<number>();
  @Output() deleteUser = new EventEmitter<number>();

  onViewDetails() {
    this.viewDetails.emit(this.user.id);
  }

  onEditUser() {
    this.editUser.emit(this.user.id);
  }

  onDeleteUser() {
    this.deleteUser.emit(this.user.id);
  }
}