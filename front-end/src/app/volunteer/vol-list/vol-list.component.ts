import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { VolunteersService } from '../volunteers.service';
import { VolunteerModel } from '../volunteer.model';
import { NgForm } from '@angular/forms';
import { ServerService } from '../../server.service';
import { EventService } from '../../event/event.service';
@Component({
  selector: 'app-vol-list',
  templateUrl: './vol-list.component.html',
  styleUrls: ['./vol-list.component.css']
})
export class VolListComponent implements OnInit {

  editingVolunteer: VolunteerModel;
  DeletedVolunteer = 0;
  index = 0;
  imageClicked;
  imageVolunteer;
  searchFor = 'volunteer';

  constructor(public volservice: VolunteersService, private serverService: ServerService, private eventService: EventService) {

  }

  ngOnInit() {

    if (this.volservice.volunteers.length > 0) {
      this.imageVolunteer = this.volservice.volunteers[0];
      this.editingVolunteer = this.volservice.volunteers[0];
      this.eventService.pageDivider(this.volservice.volunteers)
    }

  }


  viewImage(ImageBtn, item) {
    this.imageClicked = item.avatar;
    this.imageVolunteer = item;
    ImageBtn.click();

  }
  image(im) {
    this.imageVolunteer.avatar = im.target.files[0];

    let reader = new FileReader();

    reader.onload = (e: any) => {
      this.imageVolunteer.avatar = e.target.result;
    }

    reader.readAsDataURL(im.target.files[0]);

    this.imageClicked = this.imageVolunteer.avatar;


  }
  setDeletedVolunteer(item) {
    this.DeletedVolunteer = this.volservice.volunteers.indexOf(item);

  }
  removeVolunteer() {
    this.serverService.deleteVolunteer(this.volservice.volunteers[this.DeletedVolunteer])
      .subscribe((res) => {
        this.volservice.volunteers.splice(this.DeletedVolunteer, 1);
        this.eventService.ChangePage(this.eventService.CurrentPageNumber);
      });
  }

  volunteerForEdit(item, button) {
    this.index = this.volservice.volunteers.indexOf(item);
    this.editingVolunteer = item;

    button.click();
  }

  days(sunday, monday, tuesday, wednesday, thursday, friday, car, incar, back) {
    this.editingVolunteer.freeDays.sunday = sunday.checked;
    this.editingVolunteer.freeDays.monday = monday.checked;
    this.editingVolunteer.freeDays.tuesday = tuesday.checked;
    this.editingVolunteer.freeDays.wednesday = wednesday.checked;
    this.editingVolunteer.freeDays.thursday = thursday.checked;
    this.editingVolunteer.freeDays.friday = friday.checked;

    this.editingVolunteer.hasCar = car;
    this.editingVolunteer.agreeToLeft = incar;

    back.click();
  }
  onSubmit(form: NgForm) {
    this.editingVolunteer.name = form.value.name;
    this.editingVolunteer.id = form.value.ID;
    this.editingVolunteer.address = form.value.address;
    this.editingVolunteer.phone = form.value.extranum;
    this.editingVolunteer.telePhone = form.value.phonenum;
    this.editingVolunteer.homePhone = form.value.homenum;
    this.editingVolunteer.job = form.value.job;
    this.editingVolunteer.email = form.value.email;
    this.editingVolunteer.volunteerType = form.value.type;

    this.serverService.editVolunteer(this.volservice.volunteers[this.index])

      .subscribe((res) => {
        this.volservice.volunteers[this.index] = res.json().volunteer;
      }, (e) => alert(e));
  }



}
