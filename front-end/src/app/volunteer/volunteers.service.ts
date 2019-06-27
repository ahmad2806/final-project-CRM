import { Injectable } from '@angular/core';
import { VolunteerModel } from './volunteer.model';
import { FreeDayes } from './free-days.model';
import { EmailValidator } from '@angular/forms';
import { ServerService } from '../server.service';

@Injectable()
export class VolunteersService {
  volunteers: VolunteerModel[] = [
  ];
  constructor(public serverService:ServerService) {
  }
  public get Volunteers() {
    return this.volunteers.slice;
  }

  public add(vol: VolunteerModel) {
    this.volunteers.push(vol);
  }
  template_volunteer = ["name", "id", "birthday", "address", "phone", "telePhone", "homePhone", "email", "volunteerType", "hasCar", "agreeToLeft", "job"]
  
  m_fun(data) {

    data.forEach(function (element) {
      element.freeDays = [];
      element.avatar = undefined;
      element.my_events = [];
      element.birthday = new Date(element.birthday)

    });
    return data;
  }
  arrangeInUi(elements) {
    return [elements];
  }
}
