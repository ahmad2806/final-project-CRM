import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { VolunteerModel } from '../volunteer.model';

import { VolunteersService } from '../volunteers.service';
import { NgForm } from '@angular/forms';
import { FreeDayes } from '../free-days.model';
import { Router } from '@angular/router';
import { ServerService } from '../../server.service';
import { Ng2ImgMaxService } from 'ng2-img-max';

@Component({
  selector: 'app-create-vol',
  templateUrl: './create-vol.component.html',
  styleUrls: ['./create-vol.component.css']
})
export class CreateVolComponent implements OnInit {
  @Input() volunteersToView: VolunteerModel[];
  private volunteer: VolunteerModel;
  private week;
  private gender;
  private car;
  private incar;
  private tempform;
  public oneid = false;
  private volunteerIMG = undefined;


  constructor(public volservice: VolunteersService, private router: Router, private serverService: ServerService, private ng2ImgMax: Ng2ImgMaxService) { }

  ngOnInit() {
  }

  image(im) {
    let image = im.target.files[0];
    let image2;

    this.ng2ImgMax.resizeImage(image, 225, 225).subscribe(
      result => {
        this.volunteerIMG = result;
        this.getImagePreview(this.volunteerIMG);
      },
      error => {
        alert(`😢 Oh no! ${error}`);
      }
    );

    //this.volunteerIMG=btoa(this.volunteerIMG);
    // let reader = new FileReader();

    // reader.onload = (e: any) => {
    //     this.volunteerIMG = e.target.result;
    // }

    // reader.readAsDataURL(im.target.files[0]);

  }

  getImagePreview(file) {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.volunteerIMG = reader.result.toString();
    };
  }


  onSubmit(name, ID, date, address, extranum, phonenum, homenum, email, type, job) {
    console.log(name,  ID,  date,  address,  extranum,  phonenum,  homenum,  email,  type, job )
    // this.tempform = form;
    //   let i=0;
    //   let notAvailable:boolean=true;
    //   for(i;i<this.volservice.volunteers.length;i++){
    //     if(  ID==this.volservice.volunteers[i].id){
    //       notAvailable=false;

    //     }

    //   }
    // if(notAvailable==true){
    //   this.oneid=false;
    // console.log("sasa");
    // console.log(this.volunteerIMG);

    this.volunteer = new VolunteerModel(name, ID, date
      , address, extranum, phonenum, homenum, email, type
      , this.week, this.car, this.incar, job, this.volunteerIMG, []);


    this.serverService.addNewVolunteer(this.volunteer)
      .subscribe((res) => {
        console.log(res.json())
        this.volservice.add(res.json());
      }, (e) => {
        alert('תוודא שהמייל חוקי, מספר ת"ז לא תפוס, מספר טלפון 10 ספרות')
      });


    // }else{
    //   this.oneid=true;
    // }


  }
  days(saturday, sunday, monday, tuesday, wednesday, thursday, friday, car, incar) {
    // this.saturday=saturday;
    // this.sunday=sunday;
    // this.monday=monday;
    // this.tuesday=tuesday;
    // this.wednesday=wednesday;
    // this.thursday=thursday;
    // this.friday=friday;
    this.car = car;
    this.incar = incar;
    this.week = new FreeDayes(sunday, monday, tuesday, wednesday, thursday, friday, false);
  }


}
