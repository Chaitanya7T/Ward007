import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.page.html',
  styleUrls: ['./case-details.page.scss'],
})
export class CaseDetailsPage implements OnInit {
  cases;
  constructor(public viewCtrl: ModalController,navParams: NavParams) { 
    this.cases=navParams.get('cases');
    console.log("cases",this.cases)
  }

  ngOnInit() {
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
