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
  constructor(
    private userService: UserService,
    private serverSerice: ServerService
  ) { }

  ngOnInit() {
  }

  onSumbit(form: NgForm, Vper, Dper, Aper, Freeze, exit) {
    // let newUser: User;
    // let swap: boolean = false;
    // let currIndex: number = 0;
    // if (Vper == false && Dper == false && Aper == false && Freeze == false) {
    //   alert("freeze the account or delete it give at least 1 permission");
    //   return;
    // }
    // for (let index = 0; index < this.userService.usersList.length; index++) {
    //   if (index == this.userService.usersList.length - 1) {
    //     swap = true;
    //   }
    //   if (this.userService.usersList[index].username == form.value.username) {
    //     if (this.userService.UserEditing.username == form.value.username) {
    //       currIndex = this.userService.usersList.indexOf(this.userService.UserEditing);
    //       newUser = new User(form.value.name, form.value.phone, form.value.email, this.userService.UserEditing.username, form.value.password, form.value.Vper, form.value.Dper, form.value.Aper, form.value.Freeze);	          this.userService.usersList[currIndex] = newUser;
    //       exit.click();
    //       return;
    //     }
    //     else {
    //       alert("username is already in use");
    //       return;
    //     }
    //   } else {
    //     if (swap == true) {
    //       currIndex = this.userService.usersList.indexOf(this.userService.UserEditing);
    //       newUser = new User(form.value.name, form.value.phone, form.value.email, this.userService.UserEditing.username, form.value.password, form.value.Vper, form.value.Dper, form.value.Aper, form.value.Freeze);	          this.userService.usersList[currIndex] = newUser;
    //       exit.click();
    //       return;
    //     }
    //   }
    // }

    // let newUser = new User(form.value.name, form.value.phone, form.value.email, this.userService.UserEditing.username, form.value.password, Vper, Dper, Aper, Freeze);
    // this.userService.UserEditing.name = form.value.name;
    // this.userService.UserEditing.phone = form.value.phone;
    // this.userService.UserEditing.email = form.value.email;
    // this.userService.UserEditing.password = form.value.password;
    // this.userService.UserEditing.VolPer = Vper;
    // this.userService.UserEditing.DonorPer = Dper;
    // this.userService.UserEditing.AdoptPer = Aper;
    // this.userService.UserEditing.Freeze = Freeze;

    //TODO
    this.serverSerice.editUser(this.userService.UserEditing)
      .subscribe((res) => {
        if (res.status === 400) {
          return alert('הפרטים שהוזנו שגויים');
        }
        if (res.status === 200) {
          var currIndex = this.userService.usersList.indexOf(this.userService.UserEditing);
          this.userService.usersList[currIndex] = this.userService.UserEditing;
        } else {
          return alert('בעיה מצד שרת');
        }
      });
  }
}
