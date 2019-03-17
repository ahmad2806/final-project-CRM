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

  }
  ngOnInit() {

  }

}
