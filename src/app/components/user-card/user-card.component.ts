import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interfaces';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}


  onViewDetails() {
    this.router.navigate(['/user', this.user._id]);
  }

  onEditUser() {
    this.router.navigate(['/user/update/', this.user._id]);
  }

  onDeleteUser() {
    this.deleteUser.emit(this.user.id);
  }
}