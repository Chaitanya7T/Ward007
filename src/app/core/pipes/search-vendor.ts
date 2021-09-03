import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'searchVendors'
})
export class FilterPipe implements PipeTransform {
    constructor() { }
    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) {
            return items;
        }
        searchText = searchText.trim();
        searchText = searchText.toLowerCase();
        console.log(searchText, "searchText");
        console.log(items, "item")
        return items.filter(it => {
            console.log(it,"it");
            console.log( it.vendorname.toLowerCase()," it.vendorname.toLowerCase()");
            console.log(searchText,"searchText")
           return it.vendorname.toLowerCase().includes(searchText);
        });
    }
}