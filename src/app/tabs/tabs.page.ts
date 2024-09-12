import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  tabs = [
    {
      icon: "home",
      name: "LABELS.HOME",
      path: 'home',
    },
    {
      icon: "list",
      name: "LABELS.MY_ORDERS",
      path: "orders",
    },
    // {
    //   icon: "cart",
    //   name: "LABELS.CART",
    //   path: "cart",
    // },
    {
      icon: "business-sharp",
      name: "LABELS.SERVICE_STATIONS",
      path: "serviceStation",
    },
    {
      icon: "cart",
      name: "LABELS.CART",
      path: "cart",
    },
  ]

  constructor() {
  }
}
