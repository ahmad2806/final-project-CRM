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
  birthday: String;
  amount: number;
  privateDonor = false;
  FoundationDonor = false;
  description = "";
  hisEvent: Event[] = [];//check here
  donate: Donate[] = [];
  newAmount;
  newAmountDate;
  tempDonor = []
  searchFor = "donor"
  queryIn = ""
  
  constructor(private donorList: DonorService, public donorEvents: EventService, private serverService: ServerService) {
    

  }

  ngOnInit() {

  }

  saveNewAmount() {

    let newDonate: Donate = new Donate(0, new Date);

    newDonate.donateAmount = this.newAmount;
    
    if (this.newAmountDate){

      newDonate.donateDate = this.newAmountDate;
      
      
      this.donorEvents.addNewEvent(this.donorEvents.m_all_items[this.i], this.newAmountDate)
      this.donorEvents.m_all_items[this.i].donate.push(newDonate);
      this.newAmount = "";
      this.newAmountDate = "";
    }
    else{
      alert("תאריך לא חוקי, נסה שוב")
    }
    
  }

  edit(item) {
    this.i = this.donorEvents.m_all_items.indexOf(item);
    console.log(item)
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
    if (item.birthday)
      this.birthday = item.birthday;
   
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

    this.i = this.donorEvents.m_all_items.indexOf(item)
    if (item.description) {
      this.description = item.description;
    }
    if (item.donate[0] != null) {
      this.donate = item.donate
    }
    if (item.hisEvent)
      this.hisEvent = item.hisEvent

  }


  save() {
  
    this.donorEvents.m_all_items[this.i].name = this.name;
    this.donorEvents.m_all_items[this.i].id = this.id;
    this.donorEvents.m_all_items[this.i].phone = this.phone;
    this.donorEvents.m_all_items[this.i].email = this.email;
    this.donorEvents.m_all_items[this.i].homePhone = this.extraphone;
    this.donorEvents.m_all_items[this.i].amount += this.amount;
    this.donorEvents.m_all_items[this.i].birthday = this.birthday;
    this.donorEvents.m_all_items[this.i].address = this.address;
    this.donorEvents.m_all_items[this.i].description = this.description;

    this.serverService.editDonor(this.donorEvents.m_all_items[this.i]).subscribe((res) => {

    }, (e) => alert(e));


  }

  delete(item) {

    const index = this.donorEvents.m_all_items.indexOf(item);
    this.serverService.deleteDonor(this.donorEvents.m_all_items[index]).subscribe((res) => {
      this.donorEvents.m_all_items.splice(index, 1);
    }, (e) => alert(e))
  }


}
