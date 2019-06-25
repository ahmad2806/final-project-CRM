import { Component, OnInit } from '@angular/core';
import { EventService } from '../event/event.service';
import { Router } from '@angular/router';
import { VolunteersService } from './volunteers.service';

@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.css']
})
export class VolunteerComponent implements OnInit {
  addVol = false;
  VolList = true;
  eventList = false;
  
  constructor(public eventService: EventService, private router: Router, private volunteerService: VolunteersService) {
    this.eventService.clicked = 'volunteer_list';
  }

  ngOnInit() {

  }

  add() {
    this.addVol = !this.addVol;
    this.VolList = false;
    this.eventList = false;
  }
  list() {
    this.addVol = false;
    this.VolList = !this.VolList;
    this.eventList = false;
  }
  events() {
    this.addVol = false;
    this.VolList = false;
    this.eventList = !this.VolList;
  }

  onclick() {
    this.eventService.reset_buttons();
    this.eventService.clicked = 'mainList';
    this.router.navigate(['/Header/volenteer/VolunteerEvents/eventsList']);
    this.eventService.pageDivider(this.eventService.volunteersEvents)
    // TODO
    // this.eventService.setClicked(' ');
  }

  change_color() {
    this.eventService.reset_buttons();
    this.eventService.clicked = "volunteer_list"
    this.eventService.pageDivider(this.volunteerService.volunteers)
  }
}
