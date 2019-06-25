import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { NgForm } from '@angular/forms';
import { equal } from 'assert';
import { ServerService } from '../../server.service';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  searchFor = 'users'
  today = Date.now();
  queryIn = ""
  constructor(public userService: UserService, private serverService: ServerService) {

  }
  ngOnInit() {

  }

  onRemove(removeUser: User) {
    this.userService.UserRemoving = this.userService.usersList.indexOf(removeUser);
  }
  onEdit(editUser: User, edit) {
    this.userService.UserEditing = editUser;
    edit.click();

  }

  SumbitRemove() {
    var userToDelete = this.userService.usersList[this.userService.UserRemoving];
    if (userToDelete.username == "admin") {
      return alert("אי אפשר למחוק את האדמין");
    }
    if (userToDelete) {//to make sure its not undefined
      this.serverService.deleteUser(userToDelete)
        .subscribe((res) => {
          if (res.status === 200) {
            this.userService.usersList.splice(this.userService.UserRemoving, 1);
          } else {
            alert(`משתמש ${userToDelete} לא נמחק, נא לנסות שוב`)
          }
        }, (e) => alert(JSON.stringify(e, undefined, 2)));
    }


  }
}
