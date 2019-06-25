
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { VolunteerModel } from '../../volunteer/volunteer.model';
import { EventService } from '../event.service';
import { EventModel } from '../event.model';
import { VolunteersService } from '../../volunteer/volunteers.service';
import { Router } from '@angular/router';
import { DonorService } from '../../donor/donor.service';
import { ServerService } from '../../server.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('dateInput') dateInputRef: ElementRef;
  @ViewChild('descriptionInput') desInputRef: ElementRef;
  searchFor = 'event';
  modelType = '';
  relatedTo = [];
  arrived = [];
  didntarrived = [];


  arrayToView = [];
  tempArr = [];

  queryIn = ""
  queryOut = ""
  constructor(private volunteerService: VolunteersService, private eventService: EventService, private router: Router, private donors: DonorService, private serverService: ServerService) {

    eventService.relatedTo = this.relatedTo;

    if (this.router.url == "/Header/donor/donorEvent") {
      if (this.eventService.m_all_items)
        if (this.eventService.m_all_items[0].type == this.eventService.privateDonorType){
          this.tempArr = this.donors.private_donor
        } else {
          this.tempArr = this.donors.org_donor
        }
      
      else {
        this.tempArr = this.donors.private_donor
        this.tempArr = this.tempArr.concat(this.donors.org_donor)
      }
    }
    else {
      this.tempArr = volunteerService.volunteers;
    }

    for (let i = 0; i < this.tempArr.length; i++) {
      this.arrayToView.push(this.tempArr[i]);

    }
  }
  addToList(item) {
    const index = this.arrayToView.indexOf(item);
    this.relatedTo.push(this.arrayToView[index]);
    this.arrayToView.splice(index, 1);
  }
  delFromList(item) {
    const index = this.relatedTo.indexOf(item);
    this.arrayToView.push(this.relatedTo[index]);
    this.relatedTo.splice(index, 1);
  }
  
  
  onAddEvent(dis) {
    
    for (let i = 0; i < this.relatedTo.length; i++) {
      this.relatedTo[i] = (({ name, id }) => ({ name, id }))(this.relatedTo[i]);
    }

    const eventName = this.nameInputRef.nativeElement.value;
    const eventDate = this.dateInputRef.nativeElement.value;
    let d = new Date(eventDate);
    const eventDescription = this.desInputRef.nativeElement.value;



    if (eventName == "" || this.relatedTo.length == 0 || d.toString() == "Invalid Date") {
      alert("תשלים את הנתונים הנדרשים");
    }
    else {
      this.modelType = this.eventService.elementsToShow[0].type
      const eventAdded = new EventModel(eventName, this.modelType, d, eventDescription, this.relatedTo, this.arrived, this.relatedTo);
      // TODO person Events
      // if (this.router.url == "/Header/donor/donorEvent") {
      //   for (let i = 0; i < this.relatedTo.length; i++) {
      //     this.relatedTo[i].hisEvent.push(eventAdded);
      //   }

      // }
      if (this.router.url != "/Header/donor/donorEvent") {
        // for (let i = 0; i < this.relatedTo.length; i++) {
        //   this.relatedTo[i].myEvents.push(eventAdded);

        // }
        this.eventService.volunteersEvents.push(eventAdded)
        this.eventService.pageDivider(this.eventService.volunteersEvents)
      } else {
        if (eventAdded.type == this.eventService.privateDonorType){
          this.eventService.privateDonorEvents.push(eventAdded)
          this.eventService.pageDivider(this.eventService.privateDonorEvents)
        }else {
          this.eventService.donorsEvents.push(eventAdded)
          this.eventService.pageDivider(this.eventService.donorsEvents)
        }
        
      }

      this.serverService.addNewEvent(eventAdded)
        .subscribe((res) => {
        }, (e) => alert(e))
      dis.click();
    }
    this.clearInputs();

  }
  
  clearInputs() {
    this.nameInputRef.nativeElement.value = '';
    this.dateInputRef.nativeElement.value = '';
    this.desInputRef.nativeElement.value = '';
  }



  ngOnInit() {
  }

}
