import { Component, OnInit, ViewChild } from '@angular/core';
import { DonorService } from '../donor.service';
import { NgForm, FormControl } from '@angular/forms';
import { DonorModel } from '../donor.model';
import { Router } from '@angular/router';
import { EventService } from '../../event/event.service';
import { EventModel } from '../../event/event.model';
import { Donate } from '../donate.model';
//TODO
@Component({
  selector: 'app-add-donor',
  templateUrl: './add-donor.component.html',
  styleUrls: ['./add-donor.component.css']
})
export class AddDonorComponent implements OnInit {

  name = "";
  donateDate = new Date(2016, 2, 2);
  id = "";
  address = "";
  phone = "";
  email;
  extraphone = "";
  birthday: Date;
  amount;
  discription = "";
  date2: Date;
  donate = [];

  Foundation = false;
  private_donor = false;
  constructor(private donor: DonorService, private newEvent: EventService) { }

  ngOnInit() {
  }

  radioChoice(choice: string) {
    if (choice == 'Foundation') {
      this.Foundation = true;
      this.private_donor = false;
    }
    if (choice == 'private') {
      this.private_donor = true;
      this.Foundation = false;
    }
  }
  reset() {
    this.name = "";
    this.donateDate = new Date();;
    this.id = "";
    this.address = "";
    this.phone = "";
    this.email = undefined;
    this.extraphone = "";
    this.birthday;
    this.amount = "";
    this.discription = "";
    this.private_donor = false;
    this.Foundation = false;
  }

  save(exit) {
    let newDonor: DonorModel;
    this.donateDate = new Date(this.donateDate);

    newDonor = new DonorModel(this.name, this.donateDate, this.id, this.birthday, this.address, this.phone, this.extraphone, this.email, "קרן", this.amount, [], this.discription, [new Donate(this.amount, this.date2)]);

    if (this.Foundation == true) {
      this.date2 = new Date();
      this.date2.setDate(this.donateDate.getDate() + 365);
      this.donor.donor.push(newDonor);
    }
    if (this.private_donor == true) {
      newDonor = new DonorModel(this.name, this.donateDate, this.id, this.birthday, this.address, this.phone, this.extraphone, this.email, "פרטי", this.amount, [], this.discription, [new Donate(this.amount, this.date2)]);
      this.date2 = new Date();
      this.date2.setDate(this.donateDate.getDate() + 365);
      this.donor.donor.push(newDonor);
    }
    // this.newEvent.add(new EventModel("לתרום שוב", "donor-Model", new Date(2018, 0, 8), "האם רוצה לתרום שוב",[] , [],[]));	

    this.reset();
    exit.click();

  }
}

