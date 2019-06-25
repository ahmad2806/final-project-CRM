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
  validToSave = []
  searchFor = "event-list"
  // for edit modal
  name = "";
  m_date;
  description = "";
  // *************************
  modelType = '';
  dismissModal = false;
  m_relatedTo = [];
  queryIn = ""
  queryOut = ""
  DateQuery = ""
  private eventListOnSearch: EventModel[] = [];

  public relevant_persons_to_event: any[] = [];

  constructor(
    private volunteerService: VolunteersService,
    public eventService: EventService,
    public router: Router,
    private donors: DonorService,
    private serverService: ServerService) {
    for (let i = 0; i < this.eventService.generalEvents.length; ++i) {
      this.validToSave.push(false);
    }
  }


  ngDoCheck() {

  }


  ngOnInit() {

    // TODO way too much time to copy all that data, fix it later
    if (this.router.url == "/Header/donor/donorEvent") {
      this.eventService.generalEvents = this.eventService.privateDonorEvents
      this.eventService.generalEvents = this.eventService.generalEvents.concat(this.eventService.donorsEvents);
    }
    else if (this.router.url == "/Header/volenteer/VolunteerEvents/eventsList") {
      this.eventService.generalEvents = this.eventService.volunteersEvents;
    }
    // this.eventService.pageDivider(this.eventService.generalEvents);
  }
  // TODO editing the arrived and didnt arrived arrays needs to be sent to the server also
  addToList(item, i) {
    const index = this.eventService.elementsToShow[i].didntArrived.indexOf(item);

    this.validToSave[i] = true

    this.eventService.elementsToShow[i].arrived.push(this.eventService.generalEvents[i].didntArrived[index]);
    this.eventService.elementsToShow[i].didntArrived.splice(index, 1);

  }
  delFromList(item, i) {
    this.validToSave[i] = true
    const index = this.eventService.elementsToShow[i].arrived.indexOf(item);
    this.eventService.elementsToShow[i].didntArrived.push(this.eventService.elementsToShow[i].arrived[index]);
    this.eventService.elementsToShow[i].arrived.splice(index, 1);
  }

  addToRelativeList(item, i) {
    const index = this.relevant_persons_to_event.indexOf(item);
    this.m_relatedTo.push(this.relevant_persons_to_event[index]);
    this.relevant_persons_to_event.splice(index, 1);


  }
  delFromRelativeList(item, i) {
    const index = this.m_relatedTo.indexOf(item);
    this.relevant_persons_to_event.push(this.m_relatedTo[index]);
    this.m_relatedTo.splice(index, 1);


  }

  arrayOfPersons(i) {
    this.i = i;
    let m_event = this.eventService.elementsToShow[i]
    this.name = m_event.name;
    this.m_date = m_event.date;
    this.description = m_event.description;

    this.relevant_persons_to_event = [];// left
    this.m_relatedTo = m_event.relativeTo; // right

    let every_one = [];
    if (m_event.type == this.eventService.privateDonorType)
      every_one = this.donors.private_donor
    else if (m_event.type == this.eventService.organizationDonorType)
      every_one = this.donors.org_donor
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
      this.eventService.elementsToShow[i].name = eventName;
      this.eventService.elementsToShow[i].date = eventDate;
      this.eventService.elementsToShow[i].description = eventDescription;
      // this.eventService.generalEvents[i].type = this.modelType;
      this.eventService.elementsToShow[i].relativeTo = this.m_relatedTo;
      this.eventService.elementsToShow[i].didntArrived = this.m_relatedTo

      this.serverService.editEvent(this.eventService.elementsToShow[i])
        .subscribe((res) => {
        }, (e) => alert(e));

      back.click();
    }

  }
  index(i) {
    this.i = i;
  }
  removeEvent() {
    let m_index = (this.eventService.CurrentPageNumber * this.eventService.elementsPerPage) + this.i
    // this.eventService.deletedEvents.push(this.eventService.generalEvents[m_index]);
    let event_to_remove = this.eventService.generalEvents[m_index];
    if (event_to_remove.type == this.eventService.privateDonorType) {
      let temp_index = this.eventService.privateDonorEvents.indexOf(event_to_remove)
      this.eventService.privateDonorEvents.splice(temp_index, 1)
    } else if (event_to_remove.type == this.eventService.organizationDonorType) {
      let temp_index = this.eventService.donorsEvents.indexOf(event_to_remove)
      this.eventService.donorsEvents.splice(temp_index, 1)
    }

    this.eventService.generalEvents.splice(m_index, 1);
    this.eventService.elementsToShow.splice(this.i, 1);
    this.serverService.deleteEvent(event_to_remove).subscribe((res) => {
      this.eventService.deletedEvents.push(res.json())
    }, (e) => alert(e));
    this.eventService.generalEvents = this.eventService.generalEvents;
  }

  update(m_date) {
    //  TODO replace filter pipe with function to make it faster
  }

  saveChanges(i) {
    this.serverService.editEvent(this.eventService.elementsToShow[i])
      .subscribe((res) => {
        this.validToSave[i] = false
      }, (e) => alert(e));
  }
}
