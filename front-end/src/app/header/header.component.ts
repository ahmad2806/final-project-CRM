import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { EventService } from '../event/event.service';
import * as XLSX from 'xlsx';
import { ServerService } from '../server.service';
import { DonorService } from '../donor/donor.service';
import { element } from 'protractor';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  badge = false;
  constructor(private auth: AuthService, private router: Router, public events: EventService, public serverService: ServerService, public donorService: DonorService) {
    if (this.events.inProgressEvents.length > 0) {
      this.badge = true;
    }
  }


  ngOnInit() {
  }

  openNav() {
    document.getElementById("mySidenav").style.width = "240px";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
  signOut() {
    this.auth.logout();
    this.router.navigate(["/"]);
  }

  data: any;
  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = (XLSX.utils.sheet_to_json(ws));

      this.saveDataInDataBase();

    };
    reader.readAsBinaryString(target.files[0]);
  }

  saveDataInDataBase() {
    console.log(this.data);
    console.log(this.events.data_formate);
    if (this.data.length <= 0) {
      alert("הקובץ ריק");
      return
    }
    if (!this.validateFormate()) {
      return
    }
    this.data.forEach(function (element) {
      element.donate = []
      element.donateDate = new Date()
      element.hisEvent = []
    });

    this.serverService.saveImportedData(this.data).subscribe((res) => {

      let elements = res.json();
      let len = elements.length;
      for (let i = 0; i < len; ++i) {

        if (elements[i].donorType == "פרטי") {
          this.donorService.private_donor.push(elements[i])
        } else {
          this.donorService.org_donor.push(elements[i])
        }
      }
      console.log(res.json())

      this.donorService.donor.push.apply(this.donorService.donor, res.json())
    }, (e) => {
      // all the errors that accuered
    });


  }

  validateFormate() {

    let input_formate = this.data[0]
    delete input_formate.__rowNum__
    input_formate = Object.keys(input_formate);

    let error_flag = false
    let data_formate_len = this.events.data_formate.length
    let input_data_formate_len = input_formate.length

    for (let j = 0; j < input_data_formate_len; ++j) {
      for (let i = 0; i <= data_formate_len; ++i) {
        if (i == data_formate_len) {
          alert(`שדה ${input_formate[j]} לא חוקי, הקובץ חייב להיות בפורמת הבא \n ${this.events.data_formate}`)
          error_flag = true

        }
        if (input_formate[j] == this.events.data_formate[i]) {
          break;
        }
      }
      if (error_flag)
        return false

    }
    return true;
  }
}