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
  this.activeUser=  this.UserEditing =   new User("CREATER","0123456789","CREATOR@hotmail.com","CREATER123 ","ADMIN", true,true,true);
  }
  public get UsersList() {
    return this.usersList;
  }
}
