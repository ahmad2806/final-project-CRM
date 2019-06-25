import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';
import { User } from '../user.model';
import { ServerService } from '../../server.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  constructor(public userService: UserService, private serverService: ServerService) {
    // this.userService.UserEditing =   new User("omar","0987098709","omar.b__95@hotmail.com","bsdasd","123456",true,true,true,true);

  }

  ngOnInit() {
  }

  onSumbit(form: NgForm, Vper, Dper, Freeze, exit) {
    
    if (Vper == false && Dper == false && Freeze == false) {
      alert("freeze the account or delete it give at least 1 permission");
      return;
    }

    let newUser = new User(form.value.name, form.value.phone, form.value.email, this.userService.UserEditing.username, form.value.password, Vper, Dper, Freeze);
    this.userService.UserEditing.name = form.value.name;
    this.userService.UserEditing.phone = form.value.phone;
    this.userService.UserEditing.email = form.value.email;
    this.userService.UserEditing.password = form.value.password;
    this.userService.UserEditing.VolPer = Vper;
    this.userService.UserEditing.DonorPer = Dper;
    this.userService.UserEditing.Freeze = Freeze;
    this.serverService.editUser(this.userService.UserEditing)
      .subscribe((res) => {
        if (res.status === 400)
          return alert('הפרטים שהוזנו שגויים');

        if (res.status === 200)
          exit.click();
        else
          return alert('בעיה מצד שרת');

      }, (e) => alert(e));
  }
}
