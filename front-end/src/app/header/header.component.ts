import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { EventService } from '../event/event.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  badge = false;
  constructor(private auth: AuthService, private router: Router, public events: EventService) {
    if (this.events.inProgressEvents.length > 0) {
      this.badge = true;
    }
  }


  ngOnInit() {
  }

  openNav() {
    document.getElementById("mySidenav").style.width = "240px";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
  signOut() {
    this.auth.logout();
    this.router.navigate(["/"]);
  }
}
