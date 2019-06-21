import { Component, OnInit } from '@angular/core';
import { EventService } from '../event/event.service';
import { Router } from '@angular/router';
import { DonorService } from './donor.service';

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.css']
})
export class DonorComponent implements OnInit {

  constructor(private eventService: EventService, private router: Router, private donorService: DonorService) {
    this.eventService.clicked = "donor_list";
  }

  add() {

  }



  ngOnInit() {
  }

  onclick() {
    this.eventService.reset_buttons();
    this.eventService.clicked = 'mainList';
    if (this.eventService.elementsToShow[0].donorType == 'קרן')
    this.eventService.pageDivider(this.eventService.donorsEvents)
      else
      this.eventService.pageDivider(this.eventService.privateDonorEvents)
      
      // TODO
      // this.eventService.setClicked(' ');
      
    }
    change_color() {
      this.eventService.reset_buttons();
      this.eventService.clicked = "donor_list";
      if (this.eventService.elementsToShow[0].type == this.eventService.organizationDonorType)
      this.eventService.pageDivider(this.donorService.org_donor)
    else
      this.eventService.pageDivider(this.donorService.private_donor)
  }

}
