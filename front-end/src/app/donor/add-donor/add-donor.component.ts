import { Component, OnInit, ViewChild } from '@angular/core';
import { DonorService } from '../donor.service';
import { NgForm, FormControl } from '@angular/forms';
import { DonorModel } from '../donor.model';
import { Router } from '@angular/router';
import { EventService } from '../../event/event.service';
import { EventModel } from '../../event/event.model';
import { Donate } from '../donate.model';
import { ServerService } from '../../server.service';
//TODO
@Component({
  selector: 'app-add-donor',
  templateUrl: './add-donor.component.html',
  styleUrls: ['./add-donor.component.css']
})
export class AddDonorComponent implements OnInit {

  name = "";
  donateDate = new Date();
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
  constructor(private donor: DonorService, private newEvent: EventService, private serverService: ServerService) { }

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
    this.donateDate = new Date();
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
    // this.donateDate = new Date(this.donateDate);
    if (this.donateDate == null || this.name == null || this.amount == null) {
      alert("תשלים את הפרטים\n תאריך תרומה, שם ו סכום תרומה חובה");

    }
    else {
      let m_type = ""
      if (this.Foundation == true) {
        m_type = "קרן"
        this.id = new Date().toString();
      }
      if (this.private_donor == true) {
        m_type = "פרטי"
        if (this.id == ""){
          this.id = new Date().toString();
        }

      }
      this.date2 = new Date(this.donateDate);
      this.date2.setDate(this.date2.getDate() + 365);
      newDonor = new DonorModel(this.name, this.donateDate, this.id, this.birthday, this.address, this.phone, this.extraphone, this.email, m_type, this.amount, [], this.discription, [new Donate(this.amount, this.date2)]);
      this.newEvent.addNewEvent(newDonor, this.donateDate)


      this.serverService.addNewDonor(newDonor).subscribe((res) => {
        this.donor.donor.push(res.json().donor);
      }, (e) => alert(e));
      // this.newEvent.add(new EventModel("לתרום שוב", "donor-Model", new Date(2018, 0, 8), "האם רוצה לתרום שוב",[] , [],[]));	

      this.reset();
      exit.click();
    }


  }
}

