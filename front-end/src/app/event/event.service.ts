import { Injectable } from '@angular/core';
import { EventModel } from './event.model';
import { VolunteerModel } from '../volunteer/volunteer.model';
import { empty } from 'rxjs/Observer';
import { FreeDayes } from '../volunteer/free-days.model';
import { EventEmitter } from 'protractor';

@Injectable()
export class EventService {
  CSEDB: EventModel[] = [];
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


    this.relatedTo =  [
      new VolunteerModel("אחמד", "20541774", new Date, "beit-hanina", "0524651749","", 
        "025859294", "AHMADLOXIZ@gmail.com", "cat", new FreeDayes(true, false, true, true, true, false, false), true, false, "software engineering", ""),
      new VolunteerModel("אחמד", "20541774", new Date, "beit-hanina", "0524651749", "",
        "025859294", "AHMADLOXIZ@gmail.com", "cat", new FreeDayes(true, false, true, true, true, false, false), true, false, "software engineering", ""),
      new VolunteerModel("אחמד", "20541774", new Date, "beit-hanina", "0524651749", "",
        "025859294", "AHMADLOXIZ@gmail.com", "cat", new FreeDayes(true, false, true, true, true, false, false), true, false, "software engineering", ""),
    ];
    this.didntarrived = this.relatedTo;
    this.commingSoonEvents = [ //year,month,date	   
      new EventModel("1", "volunteer-Model", new Date(2018, 1, 8), "שלח כרטיס מתנה", this.relatedTo, [], this.didntarrived),	
      new EventModel("2", "volunteer-Model", new Date(2018, 2, 8), "שלח כרטיס מתנה", this.relatedTo, [], this.didntarrived),	
      new EventModel("3", "volunteer-Model", new Date(2018, 3, 8), "שלח כרטיס מתנה", this.relatedTo, [], this.didntarrived),	
      new EventModel("4", "volunteer-Model", new Date(2018, 0, 8), "שלח כרטיס מתנה", this.relatedTo, [], this.didntarrived),	
      new EventModel("5", "volunteer-Model", new Date(2018, 4, 8), "שלח כרטיס מתנה", this.relatedTo, [], this.didntarrived),	
      new EventModel("6", "volunteer-Model", new Date(2018, 5, 3), "שלח כרטיס מתנה", this.relatedTo, [], this.didntarrived),	
      new EventModel("7", "volunteer-Model", new Date(2018, 6, 8), "שלח כרטיס מתנה", this.relatedTo, [], this.didntarrived),	
      new EventModel("8", "volunteer-Model", new Date(2018, 7, 8), "שלח כרטיס מתנה", this.relatedTo, [], this.didntarrived),	
      new EventModel("9", "volunteer-Model", new Date(2018, 8, 8), "שלח כרטיס מתנה", this.relatedTo, [], this.didntarrived),	
      new EventModel("10", "volunteer-Model", new Date(2018, 5, 12), "שלח כרטיס מתנה", this.relatedTo, [], this.didntarrived),	
      new EventModel("11", "volunteer-Model", new Date(2018, 10, 8), "שלח כרטיס מתנה", this.relatedTo, [], this.didntarrived),	
      new EventModel("12", "volunteer-Model", new Date(2018, 11, 8), "שלח כרטיס מתנה", this.relatedTo, [], this.didntarrived),	
      new EventModel("13", "volunteer-Model", new Date(2019, 0, 8), "שלח כרטיס מתנה", this.relatedTo, [], this.didntarrived),	
      new EventModel("14", "volunteer-Model", new Date(2019, 1, 13), "שלח כרטיס מתנה", this.relatedTo, [], this.didntarrived),	
      new EventModel("15", "volunteer-Model", new Date(2019, 2, 19), "שלח כרטיס מתנה", this.relatedTo, [], this.didntarrived),	
      new EventModel("16", "volunteer-Model", new Date(2019, 3, 30), "שלח כרטיס מתנה", this.relatedTo, [], this.didntarrived),	
      new EventModel("17", "volunteer-Model", new Date(2018, 4, 20), "שלח כרטיס תנה", this.relatedTo, [], this.didntarrived),	
      new EventModel("18", "volunteer-Model", new Date(2018, 4, 20), "שלח כרטיס מתנה", this.relatedTo, [], this.didntarrived),	
    ];
    this.deletedEvents = [
      new EventModel("x", "volunteer-Model", new Date(2019, 0, 8), "שלח כרטיס מתנה", this.relatedTo, [], this.didntarrived),
      new EventModel("y", "volunteer-Model", new Date(2019, 0, 8), "שלח כרטיס מתנה", this.relatedTo, [], this.didntarrived),
    ];
    this.generalEvents = this.commingSoonEvents;
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
  public add(event: EventModel) {

    this.commingSoonEvents.push(event);
  }
  public get Clicked() {
    return this.clicked;
  }
  public setClicked(input: string) {
    if (input === 'old')
      this.generalEvents = this.oldEvents;
    else if (input === 'inProgress')
      this.generalEvents = this.inProgressEvents;
    else if (input === 'deleted')
      this.generalEvents = this.deletedEvents;
    else if (input === 'commingSoon')
      this.generalEvents = this.CSEDB;
    else
      this.generalEvents = this.commingSoonEvents;
  }
}

