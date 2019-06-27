import { Injectable } from '@angular/core';
import { DonorModel } from './donor.model';
import { EventModel } from '../event/event.model';
import { Donate } from './donate.model';
import { ServerService } from '../server.service';

@Injectable()
export class DonorService {
  public private_donor: DonorModel[] = [];
  public org_donor: DonorModel[] = [];
  template_donor = ["name", "donateDate", "id", "birthday", "address", "phone", "homePhone", "email", "donorType", "amount", "hisEvent", "description"]

  public Donor: DonorModel[] = [
    //TODO

    // new DonorModel("אברהים",new Date,"2058*****",new Date,"ירושלים","0549927495","","ibrahimidkedke@gmail.com","פרטי",1231,[],"discription", []),	
    // new DonorModel("victor",new Date,"id",new Date,"address","phone","homePhone","email","פרטי",31243,[],"discription", []),	
    // new DonorModel("omar",new Date,"id",new Date,"address","phone","homePhone","email","קרן",43243,[],"discription", []),	
    // new DonorModel("ahmad",new Date,"id",new Date,"address","phone","homePhone","email","קרן",3423,[],"discription", []),	
    // new DonorModel("dia",new Date,"id",new Date,"address","phone","homePhone","email","פרטי",12312,[],"discription", []),	
    // new DonorModel("adi",new Date,"id",new Date,"address","phone","homePhone","email","פרטי",31231,[],"discription", []),	
    // new DonorModel("no name",new Date,"id",new Date,"address","phone","homePhone","email","קרן",500,[],"discription", [])	
  ];

  constructor(public serverSercive: ServerService) { }
  public get donor() {
    return this.Donor;
  }

  public add(don: DonorModel) {
    this.Donor.push(don);
  }

  m_fun(data) {
    data.forEach(function (element) {
      element.donate = []
      element.donateDate = new Date()
      element.hisEvent = []
      if (element.birthday) {
        console.log(element.birthday)
        console.log(typeof (element.birthday))
        element.birthday = new Date((element.birthday - (25567 + 1)) * 86400 * 1000);
      }
    });
    return data;
  }
  arrangeInUi(elements) {

    let p_donor = [];
    let o_donor = [];
    let all_donors = [];

    for (let i = 0; i < elements.length; ++i) {
      if (elements[i].donorType == "פרטי") {
        p_donor.push(elements[i]);
      } else {
        o_donor.push(elements[i]);
      }
      all_donors.push(elements[i]);
    }

    return [p_donor, o_donor, all_donors]
  }

}
