import { Pipe } from '@angular/core';

@Pipe({
  name: "sort"
})
export class CompanySortAlphabeticalPipe {
  transform(array: any[], args: any[]): any[] {
    if(array != null && array.length != 0)
    {
      array.sort((a: any, b: any) => {
        if (a.companyName < b.companyName) {
          return -1;
        } else if (a.companyName > b.companyName) {
          return 1;
        } else {
          return 0;
        }
      });
      return array;
    }
    return array;
  }
}