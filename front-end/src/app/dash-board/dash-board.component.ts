import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { EventService } from '../event/event.service';
import { EventModel } from '../event/event.model';
import { VolunteerModel } from "../volunteer/volunteer.model";
import { UserService } from '../users/user.service';
//TODO
@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {
  @ViewChild('m') m: ElementRef;
  @Input() EventType: string = "";
  // public OldEvents = this.events.oldEvents.length;
  // public EventsInProgress = this.events.inProgressEvents.length;
  // public DeletedEvents = this.events.deletedEvents.length;
  // public CommingEvents = this.events.commingSoonEvents.length;
  constructor(private events: EventService, private userService: UserService) {

  }
  ngOnInit() {
    let today: Date = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let day = today.getDate();
    this.events.oldEvents = [];
    this.events.inProgressEvents = [];
    this.events.CSEDB = [];
    let choose;
    if (this.userService.activeUser.VolPer == true) {
      choose = this.events.commingSoonEvents;

    } else {
      choose = this.events.donorEvents;
    }


    for (let index = 0; index < choose.length; index++) {
      if (typeof (choose[index].date) == "string") {
        choose[index].date = new Date(choose[index].date);
      }
      if (choose[index].date.getFullYear() > year) {// comming soon
        this.events.CSEDB.push(choose[index]);
      } else if (choose[index].date.getFullYear() < year) { //  old events
        this.events.oldEvents.push(choose[index]);
      } else if (choose[index].date.getFullYear() == year) {
        if (choose[index].date.getMonth() > month) { //comming soon
          this.events.CSEDB.push(choose[index]);
        }
        else if (choose[index].date.getMonth() < month) { // old
          this.events.oldEvents.push(choose[index]);
        } else if (choose[index].date.getMonth() == month) {
          if (choose[index].date.getDay() > day) { // comming soon
          } else if (choose[index].date.getDate() < day) { //old
            this.events.oldEvents.push(choose[index]);
          } else if (choose[index].date.getDate() == day) { // ingprogress today
            this.events.inProgressEvents.push(choose[index]);
          }
        }
      }
    }
  }

  @Input() event: EventModel[] = [];

  View(type) {
    this.EventType = type;
    this.event = [];
    if (type == "done") {
      this.events.setClicked('old');
    }

    else if (type == "donut_large") {

      this.events.setClicked('inProgress');
    }

    else if (type == "clear") {

      this.events.setClicked('deleted');
    }

    else if (type == "alarm") {

      this.events.setClicked('commingSoon');
    }


    this.m.nativeElement;

  }



}
