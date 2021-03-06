import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  constructor() { }

  transform(value: any, query: string, arr: any, searchFor: string): any {
    // TODO filter is called many time causing shakes in the page
    if (value === null)
      return null;
    else {
      return query ? arr.reduce((prev, next) => {
        if (next != null) {
          if (searchFor === 'users') {
            if (next.name.includes(query)
              || next.username.includes(query)
              || next.phone.includes(query)
              || next.email.includes(query)) { prev.push(next); }
          }
          else if (searchFor === 'event') {
            if (next.name.includes(query)) { prev.push(next); }
          }
          else if (searchFor == "event-list") {
            if (next.date && (new Date(next.date).toDateString()) == (new Date(query).toDateString())) {prev.push(next); }
            
            else if (next.name && next.name.includes(query)) { 
              prev.push(next);
            }
          }
          else if (next.name.includes(query) 
            || next.id.includes(query)
            || next.address.includes(query)
            || next.phone.includes(query)
            || next.homePhone.includes(query)
            || next.email.includes(query)) { prev.push(next); }
            else if (searchFor == 'volunteer') {
              if (next.telePhone.includes(query)
              || next.job.includes(query)
              || next.volunteerType.includes(query)) { prev.push(next); }
          }

          // else if (searchFor == 'donor') {
          //   if (next.name.includes(query) 
          //   || next.email.includes(query)
          //   || next.id.includes(query)
          //   || next.address.includes(query)
          //   || next.phone.includes(query)
          //   ) { prev.push(next); }
          // }


          return prev;
        }
      }, []) : value;
    }


  }


}
