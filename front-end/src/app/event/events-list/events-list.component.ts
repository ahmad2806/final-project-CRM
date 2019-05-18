import { Component, OnInit, ViewChild, ElementRef, OnChanges, SimpleChanges, AfterViewInit, AfterViewChecked, DoCheck } from '@angular/core';
import { EventModel } from '../event.model';
import { VolunteersService } from '../../volunteer/volunteers.service';
import { EventService } from '../event.service';
import { VolunteerModel } from '../../volunteer/volunteer.model';
import { Router } from '@angular/router';
import { DonorService } from '../../donor/donor.service';
import { ServerService } from '../../server.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit, DoCheck {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('dateInput') dateInputRef: ElementRef;
  @ViewChild('descriptionInput') desInputRef: ElementRef;
  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;
  i = 0;
  searchFor = "event-list"
  // for edit modal
  name = "";
  m_date;
  description = "";
  // *************************
  modelType = '';
  dismissModal = false;
  m_relatedTo: VolunteerModel[] = [];


  private eventListOnSearch: EventModel[] = [];
  
  private relevant_persons_to_event: any[] = [];

  constructor(
    private volunteerService: VolunteersService,
    private eventService: EventService,
    private router: Router,
    private donors: DonorService,
    private serverService: ServerService) { }


  ngDoCheck() {

  }


  ngOnInit() {
    // console.log(this.router.url)
    // TODO way too much time to copy all that data, fix it later
    if (this.router.url == "/Header/donor/donorEvent") {
      this.eventService.generalEvents = this.eventService.donorsEvents;
    }
    else if (this.router.url == "/Header/volenteer/VolunteerEvents/eventsList") {
      this.eventService.generalEvents = this.eventService.volunteersEvents;
    }

  }

  addToList(item, i) {
    const index = this.eventService.generalEvents[i].didntArrived.indexOf(item);
    console.log(index, "addToList")
    this.eventService.generalEvents[i].arrived.push(this.eventService.generalEvents[i].didntArrived[index]);
    this.eventService.generalEvents[i].didntArrived.splice(index, 1);
    
  }
  delFromList(item, i) {
    const index = this.eventService.generalEvents[i].arrived.indexOf(item);
    console.log(index, "deletFrom")
    this.eventService.generalEvents[i].didntArrived.push(this.eventService.generalEvents[i].arrived[index]);
    this.eventService.generalEvents[i].arrived.splice(index, 1);
  }
  
  addToRelativeList(item, i) {
    const index = this.relevant_persons_to_event.indexOf(item);
    console.log(index, "AddtoRelat")
    this.m_relatedTo.push(this.relevant_persons_to_event[index]);
    this.relevant_persons_to_event.splice(index, 1);
    
    
  }
  delFromRelativeList(item, i) {
    const index = this.m_relatedTo.indexOf(item);
    console.log(index, "delFromRela")
    this.relevant_persons_to_event.push(this.m_relatedTo[index]);
    this.m_relatedTo.splice(index, 1);


  }

  arrayOfPersons(i) {
    this.i = i;
    let m_event = this.eventService.generalEvents[i] 
    this.name = m_event.name;
    this.m_date = m_event.date;
    this.description = m_event.description;

    this.relevant_persons_to_event = [];// left
    this.m_relatedTo = m_event.relativeTo; // right

    let every_one = [];
    if (m_event.type == "donor-Model")
      every_one =this.donors.donor
    else
      every_one = this.volunteerService.volunteers

    
    // TODO see why this line doesnt work, when it works, it can replace the two fors
    // this.relevantVolunteersToEvent = this.volunteerService.volunteers.filter(item => this.m_relatedTo.indexOf(item) < 0);
    for (let i = 0; i < every_one.length; i++) {
      for (let j = 0; j < this.m_relatedTo.length; j++) {
        if (every_one[i].id == this.m_relatedTo[j].id)
          break;
        else if (every_one[i].id != this.m_relatedTo[j].id && j == this.m_relatedTo.length - 1)
          this.relevant_persons_to_event.push(every_one[i]);
      }
    }
  }

  onEditEvent(back) {

    let i = this.i;

    const eventName = this.nameInputRef.nativeElement.value;
    const eventDate = this.dateInputRef.nativeElement.value;
    const eventDescription = this.desInputRef.nativeElement.value;
    if (eventName == "") {
      alert("תשלים את הנתונים הנדרשים");
    }
    else {
      this.dismissModal = true;
      this.eventService.generalEvents[i].name = eventName;
      this.eventService.generalEvents[i].date = eventDate;
      this.eventService.generalEvents[i].description = eventDescription;
      // this.eventService.generalEvents[i].type = this.modelType;
      this.eventService.generalEvents[i].relativeTo = this.m_relatedTo;
      this.eventService.generalEvents[i].didntArrived = this.m_relatedTo

      console.log(eventDate)
      console.log(typeof(eventDate))
      console.log(this.eventService.generalEvents[i].date)
      console.log(this.eventService.generalEvents[i].type)
      console.log(this.eventService.generalEvents[i])
      this.serverService.editEvent(this.eventService.generalEvents[i])
        .subscribe((res) => {
        }, (e) => alert(e));

      back.click();



    }

  }
  index(i) {
    this.i = i;
  }
  removeEvent() {
    this.eventService.deletedEvents.push(this.eventService.generalEvents[this.i]);
    this.eventService.generalEvents.splice(this.i, 1);
    this.eventService.generalEvents = this.eventService.generalEvents;
  }

  update(m_date) {
  //  TODO replace filter pipe with function to make it faster
  }


}
