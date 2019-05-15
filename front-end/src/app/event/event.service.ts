import { Injectable } from '@angular/core';
import { EventModel } from './event.model';
import { VolunteerModel } from '../volunteer/volunteer.model';
import { empty } from 'rxjs/Observer';
import { FreeDayes } from '../volunteer/free-days.model';
import { EventEmitter } from 'protractor';

@Injectable()
export class EventService {


  volunteersEvents: EventModel[] = [];
  donorsEvents: EventModel[] = [];
  generalEvents: EventModel[] = [];


  commingSoonEvents: EventModel[] = [];
  oldEvents: EventModel[] = [];
  deletedEvents: EventModel[] = [];
  inProgressEvents: EventModel[] = [];

  relatedTo: VolunteerModel[] = [];
  arrived: VolunteerModel[] = [];
  arrived1: VolunteerModel[] = [];
  didntarrived: VolunteerModel[] = [];

  date: Date;

  clicked: string = "";
  constructor() {

  }
  public get CommingSoonEvents() {
    return this.commingSoonEvents.slice;
  }
  public get DeletedEvents() {
    return this.deletedEvents.slice;
  }
  public get OldEvents() {
    return this.oldEvents.slice;
  }
  public get InProgressEvents() {
    return this.inProgressEvents.slice;
  }
  public add(event: EventModel, type) {
    if (type == "donor")
      this.donorsEvents.push(event);
    else
      this.volunteersEvents.push(event);
  }
  public get Clicked() {
    return this.clicked;
  }

}

