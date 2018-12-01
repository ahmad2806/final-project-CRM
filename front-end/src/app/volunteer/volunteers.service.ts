import { Injectable } from '@angular/core';
import { VolunteerModel } from './volunteer.model';
import { FreeDayes } from './free-days.model';
import { EmailValidator } from '@angular/forms';

@Injectable()
export class VolunteersService {
  volunteers:VolunteerModel[]=[                      
  ];
  constructor() { 
  }
  public get Volunteers(){
    return this.volunteers.slice;
  }
  
   public add(vol:VolunteerModel){
    this.volunteers.push(vol);
   }

}
