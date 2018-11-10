import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppboolService } from '../appbool.service';
import { UserService } from '../users/user.service';
import { AuthService } from '../auth.service';
//TODO
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  clicked = '';
  username: "";
  password: "";
  hide = true;

  @Output() Loginform = true;
  constructor(private router: Router, private app: AppboolService, private UserService: UserService,private auth:AuthService) {
  }

  ngOnInit() {
  }

  calltype(value) {
    this.clicked = value;
  }

  change() {
    this.Loginform = false;

  }

  clk() {

  }
  onSubmit() {
    for (let index = 0; index < this.UserService.usersList.length; index++) {
      if (this.UserService.usersList[index].username == this.username) {
        if (this.UserService.usersList[index].password == this.password) {
          if (this.UserService.usersList[index].Freeze == false) {
            this.router.navigate(["/Header/main"]);
            this.UserService.activeUser=this.UserService.usersList[index];
            this.auth.login();
            return;
          } else {
            alert("please contact the admin");
            return;
          }
        }
      }
      if (index == this.UserService.usersList.length - 1) {
        alert("אחד או יותר מהנתונים שגויים");
        return;
      }
    }
   }
        
       
     
}