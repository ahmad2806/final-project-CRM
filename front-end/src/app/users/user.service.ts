import { Injectable } from '@angular/core';
import { User } from './user.model';
@Injectable()
export class UserService {
  UserEditing: User;
  UserRemoving: number;
  activeUser: User;
  public usersList: User[] = [];
  constructor() {
    this.usersList = [ // users collection
    ]
    this.UserEditing = this.usersList[0];
  }
  public get UsersList() {
    return this.usersList;
  }
}
