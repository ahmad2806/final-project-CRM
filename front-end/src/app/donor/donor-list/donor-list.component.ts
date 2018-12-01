import { Component, OnInit, ViewChild } from '@angular/core';
import { DonorService } from '../donor.service';
import { DonorModel } from '../donor.model';
import { NgForm } from '@angular/forms';
import { Donate } from '../donate.model';
import { EventModel } from '../../event/event.model';
import { EventService } from '../../event/event.service';

//TODO
@Component({
  selector: 'app-donor-list',
  templateUrl: './donor-list.component.html',
  styleUrls: ['./donor-list.component.css']
})
export class DonorListComponent implements OnInit {
  @ViewChild('f') newDonorForm: NgForm;
  i: number;
  name = "";
  lastname = "";
  id = "";
  address = "";
  phone = "";
  email = "";
  extraphone = "";
  birthday: Date;
  amount: number;
  privateDonor = false;
  FoundationDonor = false;
  description = "";
  hisEvent: Event[] = [];//check here
  donate: Donate[] = [];
  newAmount;
  newAmountDate;
  constructor(private donorList: DonorService, private donorEvents: EventService) {

  }

  ngOnInit() {

  }

  saveNewAmount() {
    let newDonate: Donate = new Donate(0, new Date);
    let date2 = new Date(this.newAmountDate);

    newDonate.donateAmount = this.newAmount;
    newDonate.donateDate = this.newAmountDate;
    date2.setDate(date2.getDate() + 365);

    this.donorList.donor[this.i].donate.push(newDonate);
    this.donorEvents.add(new EventModel("לתרום שוב", "donor-Model", date2, "האם רוצה לתרום שוב", [this.donorList.donor[this.i]], [], [this.donorList.donor[this.i]]), "donor");
    this.donorList.donor[this.i].hisEvent.push(new EventModel("לתרום שוב", "donor-Model", date2, "האם רוצה לתרום שוב", [this.donorList.donor[this.i]], [], [this.donorList.donor[this.i]]));

    this.newAmount = "";
    this.newAmountDate = "";
  }

  edit(item) {
    this.i = this.donorList.donor.indexOf(item);
    this.name = item.name;
    this.id = item.id;
    this.address = item.address;
    this.phone = item.phone;
    this.email = item.email;
    this.extraphone = item.homePhone;
    this.donate = item.donate;

    this.description = item.description;
    if (item.donorType === 'פרטי') {
      this.privateDonor = true;
      this.FoundationDonor = false;
    }
    if (item.donorType === 'קרן') {
      this.privateDonor = false;
      this.FoundationDonor = true;
    }

  }
  disc(item) {
    this.i = this.donorList.donor.indexOf(item)
    this.description = item.description;
    this.donate = item.donate
  }


  save() {

    this.donorList.donor[this.i].name = this.name;
    this.donorList.donor[this.i].id = this.id;
    this.donorList.donor[this.i].phone = this.phone;
    this.donorList.donor[this.i].email = this.email;
    this.donorList.donor[this.i].homePhone = this.extraphone;
    this.donorList.donor[this.i].amount += this.amount;
    this.donorList.donor[this.i].birthday = this.birthday;
    this.donorList.donor[this.i].address = this.address;
    this.donorList.donor[this.i].description = this.description;

  }

  delete(item) {
    const index = this.donorList.donor.indexOf(item);
    this.donorList.donor.splice(index, 1);
  }


}
