import { Component, OnInit, ViewChild } from '@angular/core';
import { DonorService } from '../donor.service';
import { DonorModel } from '../donor.model';
import { NgForm } from '@angular/forms';
import { Donate } from '../donate.model';
import { EventModel } from '../../event/event.model';
import { EventService } from '../../event/event.service';
import { ServerService } from '../../server.service';

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
  constructor(private donorList: DonorService, private donorEvents: EventService, private serverService: ServerService) {

  }

  ngOnInit() {

  }

  saveNewAmount() {
    
    let newDonate: Donate = new Donate(0, new Date);

    newDonate.donateAmount = this.newAmount;
    newDonate.donateDate = this.newAmountDate;

    this.donorEvents.addNewEvent(this.donorList.donor[this.i], this.newAmountDate)

    this.donorList.donor[this.i].donate.push(newDonate);
    this.newAmount = "";
    this.newAmountDate = "";
  }

  edit(item) {
    this.i = this.donorList.donor.indexOf(item);
    if (item.name)
      this.name = item.name;

    if (item.id)
      this.id = item.id;
    if (item.address)
      this.address = item.address;
    if (item.phone)
      this.phone = item.phone;
    if (item.email)
      this.email = item.email;
    if (item.homePhone)
      this.extraphone = item.homePhone;
    if (item.donate)
      this.donate = item.donate;
    if (item.description)

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
    if (item.description){
      console.log("inn");
      this.description = item.description;
    }
    if (item.donate[0] != null){
      
      console.log("inn");
      console.log(item.donate)
      this.donate = item.donate
    }
    console.log(item.donate)
    console.log(item.description)
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

    this.serverService.editDonor(this.donorList.donor[this.i]).subscribe((res) => {
      console.log(res.json());
    }, (e) => alert(e));

  }

  delete(item) {
    const index = this.donorList.donor.indexOf(item);
    this.serverService.deleteDonor(this.donorList.donor[index]).subscribe((res) => {
      console.log(res.json())
    }, (e) => alert(e))
    this.donorList.donor.splice(index, 1);
  }


}
