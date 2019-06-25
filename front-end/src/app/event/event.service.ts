import { Injectable } from '@angular/core';
import { EventModel } from './event.model';
import { VolunteerModel } from '../volunteer/volunteer.model';
import { empty } from 'rxjs/Observer';
import { FreeDayes } from '../volunteer/free-days.model';
import { EventEmitter } from 'protractor';
import { ServerService } from '../server.service';
import { DonorService } from '../donor/donor.service';
import { VolunteersService } from '../volunteer/volunteers.service';

@Injectable()
export class EventService {


  volunteersEvents: EventModel[] = [];
  donorsEvents: EventModel[] = [];
  privateDonorEvents = []
  generalEvents: any[] = [];


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

  m_all_items: any[] = []
  elementsPerPage = 3
  pdisabled = "previous disabled";
  ndisabled = "next"
  elementsToShow: any[];

  CurrentPageNumber = 0;
  previousPage = 0;
  nextPage = 1;
  Pages: number[] = [];

  isEmpty = false;

  public privateDonorType = "private-donor-Model"
  public organizationDonorType = "organization-donor-Model"
  public volunteerType = "volunteer-Model"

  constructor(private serverService: ServerService, private donorService: DonorService, private volunteerService: VolunteersService) {

  }
  public add(event: EventModel, type) {
    if (type == "donor") {
      if (event.type == this.organizationDonorType) {
        this.donorsEvents.push(event);
        this.pageDivider(this.donorsEvents);
        this.pageDivider(this.donorService.org_donor);

      } else {
        this.privateDonorEvents.push(event);
        this.pageDivider(this.privateDonorEvents);
        this.pageDivider(this.donorService.private_donor);
      }

    }
    else {

      this.volunteersEvents.push(event);
      this.pageDivider(this.volunteersEvents);
      this.pageDivider(this.volunteerService.volunteers);
    }


  }

  public addNewEvent(donor, donation_date) {

    let m_type = ""
    if (donor.donorType == 'פרטי') {
      m_type = this.privateDonorType
    } else {
      m_type = this.organizationDonorType
    }
    let date2 = new Date(donation_date);
    date2.setDate(date2.getDate() + 365);


    let donor_to_add = { name: donor.name }
    let m_new_event = new EventModel("לתרום שוב", m_type, date2, "האם רוצה לתרום שוב", [donor_to_add], [], [donor_to_add])
    
    // maybe need to be moved
    this.serverService.addNewEvent(m_new_event).subscribe((res) => {
      donor.hisEvent.push({name: m_new_event.name, description: m_new_event.description, date: m_new_event.date});
      this.add(m_new_event, "donor");
    }, (e) => alert(e));
  }

  public get Clicked() {
    return this.clicked;
  }

  resetPageParams() {
    this.CurrentPageNumber = 0;
    this.previousPage = 0;
    this.nextPage = 1;
    this.Pages = []
    this.elementsToShow = []
  }


  public pageDivider(all_items) {
    
    this.m_all_items = all_items;
    this.resetPageParams();

    let lenght = all_items.length;
    let elementsOnPage = lenght / this.elementsPerPage;
    let restOfTheElements = lenght % this.elementsPerPage;

    if (all_items.length > 0) {

      if (elementsOnPage < 1) {
        if (restOfTheElements > 0) {
          for (let i = 0; i < restOfTheElements; i++) {
            this.elementsToShow.push(all_items[i]);
          }
        }
      }
      else {
        for (let i = 0; i < this.elementsPerPage; i++) {
          this.elementsToShow.push(all_items[i]);

        }
      }

      for (let i = 0; i < elementsOnPage; i++) {
        this.Pages[i] = i + 1;

      }
    } else {
      this.isEmpty = true;
    }

  }

  public ChangePage(pressedPage) {

    if (pressedPage == this.Pages.length - 1) {
      this.ndisabled = "next disabled";
    }
    else {
      this.ndisabled = "next";
      this.nextPage = pressedPage + 1;
      this.CurrentPageNumber = pressedPage;
    }
    if (pressedPage == 0) {
      this.pdisabled = "previous disabled";
    } else {
      this.pdisabled = "previous";
      this.previousPage = pressedPage - 1;
      this.CurrentPageNumber = pressedPage;

    }
    // TODO when searching, if number of result is more than this.elementsPerPage, problem my accure
    // git the vlounteer for pressed page
    this.elementsToShow = [];
    for (let i = 0; i < this.elementsPerPage; i++) {
      if (this.m_all_items[i + (pressedPage * this.elementsPerPage)] != undefined)
        this.elementsToShow[i] = this.m_all_items[i + (pressedPage * this.elementsPerPage)];
    }
  }
  public reset_buttons() {
    this.ndisabled = "next";
    this.pdisabled = "previous disabled";
  }

}

