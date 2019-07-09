import {Pipe, PipeTransform} from '@angular/core';


interface CustomDate {
  year: number;

  dayOfMonth: number;

  month: string;
}

@Pipe({name: 'dateFormatPipe'})
export class DateFormatPipe implements PipeTransform {

  transform(value: any): Date {

    if (value) {
      const date: CustomDate = new class implements CustomDate {
        dayOfMonth = value.dayOfMonth;
        month = value.month;
        year = value.year;
      };

      return new Date(date.year, 4, date.dayOfMonth);
    }
  }
}



