import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { User } from "./users/user.model";
//meanwhile chrome extention need to be installed to Allow-Control-Allow-Origin
//at  https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi/related?hl=en
@Injectable()
export class ServerService {
    localhost_url = 'http://localhost:3000';
    heroku_url = 'https://stormy-plains-63553.herokuapp.com';
    url = this.localhost_url
    constructor(private http: Http) {
    }
    addNewUser(user: User) {
        return this.http.post(`${this.url}/add/user`, user);
    }
    getAllUsers() {
        return this.http.get(`${this.url}/allUsers`)
    }
    login(user) {
        return this.http.post(`${this.url}/users/login`, user)
    }
    editUser(user) {
        //tried to use patch but from some angular api problem
        //it doesnt take patch or delete... so will replace all with post
        return this.http.post(`${this.url}/edit/user`, user);
    }
    deleteUser(user) {
        return this.http.post(`${this.url}/delete/user`, user);
    }

    /*    Volunteers */
    addNewVolunteer(volunteer) {
        return this.http.post(`${this.url}/volunteer`, volunteer);
    }
    getAllVolunteers() {
        return this.http.get(`${this.url}/volunteers`);
    }
    deleteVolunteer(volunteer) {
        return this.http.post(`${this.url}/delete/volunteer`, volunteer);
    }

    editVolunteer(volunteer) {
        return this.http.post(`${this.url}/edit/volunteer`, volunteer);
    }

    /////////////////Event

    addNewEvent(event) {
        return this.http.post(`${this.url}/event`, event);
    }
    getDonorEvents() {
        return this.http.get(`${this.url}/donor/events`);
    }
    getVolunteerEvents() {
        return this.http.get(`${this.url}/volunteer/events`);
    }

    editEvent(event) {
        return this.http.post(`${this.url}/edit/event`, event);
    }

    deleteEvent(event) {
        return this.http.post(`${this.url}/delete/event`, event);
    }
    /************************Donor */
    addNewDonor(donor) {
        return this.http.post(`${this.url}/donor`, donor);
    }

    getAllDonors() {
        return this.http.get(`${this.url}/allDonors`);
    }

    editDonor(donor) {
        return this.http.post(`${this.url}/edit/donor`, donor);
    }
    deleteDonor(donor) {
        return this.http.post(`${this.url}/delete/donor`, donor);
    }
    getDeletedEvents() {
        return this.http.get(`${this.url}/deleted/event`);
    }

    
    /* this function updates in the donor and the volunteer component and the header usues it */
    addAttributeFunc = function (data) { };
    arrangeInUiFunc = function (element) { return [] };
    /* this param updates in the donor and the volunteer component and the header usues it */
    data_type = "";

    saveImportedData(data) {
        return this.http.post(`${this.url}/${this.data_type}`, data);
    }
    
  
} 