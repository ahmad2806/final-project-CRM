import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { VolunteersService } from '../volunteers.service';
import { VolunteerModel } from '../volunteer.model';
import { NgForm } from '@angular/forms';
import { ServerService } from '../../server.service';
@Component({
  selector: 'app-vol-list',
  templateUrl: './vol-list.component.html',
  styleUrls: ['./vol-list.component.css']
})
export class VolListComponent implements OnInit {
  elementsPerPage = 5
  volunteersToView: VolunteerModel[] = [];
  pdisabled = "previous disabled";
  ndisabled = "next"
  lenght = this.volservice.volunteers.length;
  number = this.lenght / this.elementsPerPage;
  bakiNumber = this.lenght % this.elementsPerPage;
  CurrentPageNumber = 0;
  previousPage = 0;
  nextPage = 1;
  Pages: number[] = [];
  thereIsBaki = false;
  editingVolunteer: VolunteerModel;
  DeletedVolunteer = 0;
  mdlSampleIsOpen = false;
  index = 0;
  imageClicked;
  imageVolunteer;
  searchFor = 'volunteer';
  noVolunteers = true;


  // @ViewChild('jj') fileInput: ElementRef;




  constructor(public volservice: VolunteersService, private serverService: ServerService) {

  }

  ngOnInit() {
    if (this.volservice.volunteers.length > 0) {
      this.imageVolunteer = this.volservice.volunteers[0];

      // this.lenght=this.volservice.volunteers.length;
      // this.number =this.lenght/15;
      // this.bakiNumber=(this.lenght%15);

      this.editingVolunteer = this.volservice.volunteers[0];

      if (this.number < 1) {
        if (this.bakiNumber > 0) {
          for (let i = 0; i < this.bakiNumber; i++) {
            this.volunteersToView[i] = this.volservice.volunteers[i];
          }
        }
      }
      else {
        for (let i = 0; i < this.elementsPerPage; i++) {
          this.volunteersToView[i] = this.volservice.volunteers[i];

        }
      }
      if (this.bakiNumber > 0) {
        this.thereIsBaki = true;
      }

      for (let i = 0; i < this.number; i++) {
        this.Pages[i] = i + 1;

      }
    } else {
      this.noVolunteers = false;
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
    this.serverService.deleteVolunteer(this.volservice.volunteers[this.DeletedVolunteer])//*montaser* just put the volunteer you want to remove here
      .subscribe((res) => {
        this.volservice.volunteers.splice(this.DeletedVolunteer, 1);
        this.ChangePage(this.CurrentPageNumber);
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

  ChangePage(pressedPage) {

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
    this.volunteersToView = [];
    for (let i = 0; i < this.elementsPerPage; i++) {
      if (this.volservice.volunteers[i + (pressedPage * this.elementsPerPage)] != undefined)
        this.volunteersToView[i] = this.volservice.volunteers[i + (pressedPage * this.elementsPerPage)];
    }
  }

}
