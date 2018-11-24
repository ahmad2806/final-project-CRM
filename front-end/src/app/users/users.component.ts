import { Component, OnInit, Input } from '@angular/core';
import { UserService } from './user.service';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserService, private serverService: ServerService) {
    this.userService.usersList = [];
    serverService.getAllUsers()
      .subscribe((res) => {
        let allUsers = res.json().users;
        for (let index = 0; index < allUsers.length; index++) {
          this.userService.usersList.push(allUsers[index]);
        }
      }, (e) => {
        alert('error while fetching users');
      });
  }
  ngOnInit() {

  }

}
