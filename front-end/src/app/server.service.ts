import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { User } from "./users/user.model";
//meanwhile chrome extention need to be installed to Allow-Control-Allow-Origin
//at  https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi/related?hl=en
@Injectable()
export class ServerService {
    url = 'http://localhost:3000';

    constructor(private http: Http) {
    }
    addNewUser(user: User) {
        return this.http.post(`${this.url}/add/user`, user);
    }
    getAllUsers() {
        return this.http.get(`${this.url}/allUsers`)
    }
} 