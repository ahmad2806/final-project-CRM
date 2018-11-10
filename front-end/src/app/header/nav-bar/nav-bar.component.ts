import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../users/user.service';
import { VolunteersService } from '../../volunteer/volunteers.service';



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private router: Router, private users:UserService,private volservice:VolunteersService) { }

  ngOnInit() {
  }
  setVolunteers(){
    this.router.navigate(["/Header/volenteer/VolunteersList"]);

  

  }
}
