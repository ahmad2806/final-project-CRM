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
  this.activeUser=  this.UserEditing =   new User("omar","0987098709","omar.b__95@hotmail.com","bsdasd","123456",true,true,true,true);
  }
  public get UsersList() {
    return this.usersList;
  }
}
