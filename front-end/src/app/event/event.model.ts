import {  VolunteerModel } from "../volunteer/volunteer.model";

export class EventModel{
    constructor(public name: string, public type: string,
                public date: Date,public description: string,
                public relativeTo= [], public arrived:VolunteerModel[],
                public didntArrived= []){

    }
}