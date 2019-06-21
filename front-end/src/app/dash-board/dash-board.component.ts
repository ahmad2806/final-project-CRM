import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { EventService } from '../event/event.service';
import { UserService } from '../users/user.service';
import { DatePipe } from '@angular/common';


// import { DatePipe } from '@angular/common';

//TODO
@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})

export class DashBoardComponent implements OnInit {

  @ViewChild('m') m: ElementRef;
  @Input() EventType: string = "";


  constructor(private events: EventService, private userService: UserService, private datePipe:DatePipe) {
  }
  ngOnInit() {
    let today = new Date();


    this.events.oldEvents = [];
    this.events.inProgressEvents = [];
    this.events.commingSoonEvents = [];
    this.events.deletedEvents = [];


    this.events.generalEvents = this.events.volunteersEvents;
    this.events.generalEvents = this.events.generalEvents.concat(this.events.donorsEvents);


    for (let index = 0; index < this.events.generalEvents.length; index++) {
      let d1 = new Date(today);
      let d2 = new Date(this.events.generalEvents[index].date);
      
      // Check if the dates are equal
      let same = this.datePipe.transform(d1, 'yyyy-MM-dd') === this.datePipe.transform(d2, 'yyyy-MM-dd');
      if (same) this.events.inProgressEvents.push(this.events.generalEvents[index]);

      // Check if the first is greater than second
      if (d1 > d2) this.events.oldEvents.push(this.events.generalEvents[index]);

      // Check if the first is less than second
      if (d1 < d2) this.events.commingSoonEvents.push(this.events.generalEvents[index]);

    }
  }



  View(type) {
    this.EventType = type;

    if (type == "done")
      this.events.generalEvents = this.events.oldEvents;


    else if (type == "donut_large")
      this.events.generalEvents = this.events.inProgressEvents;


    else if (type == "clear")
      this.events.generalEvents = this.events.deletedEvents;


    else if (type == "alarm")
      this.events.generalEvents = this.events.commingSoonEvents;

    this.events.pageDivider(this.events.generalEvents)

    this.m.nativeElement;

  }



}
