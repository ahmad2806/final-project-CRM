import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../users/user.service';
import { VolunteersService } from '../../volunteer/volunteers.service';
import { EventService } from '../../event/event.service';
import { DonorService } from '../../donor/donor.service';



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private router: Router, public users:UserService,private eventService: EventService, private donorService: DonorService, private volunteerService: VolunteersService) { }

  ngOnInit() {
  }
  setVolunteers(){
    
    this.eventService.pageDivider(this.volunteerService.volunteers)
    

  }
  organization_donors(){
    this.eventService.clicked = "donor_list";
    this.eventService.pageDivider(this.donorService.org_donor);
  }
  private_donors(){
    this.eventService.clicked = "donor_list";
    this.eventService.pageDivider(this.donorService.private_donor);
  }

}
