import { Component, OnInit } from "@angular/core";
import { ModalController, NavParams } from "@ionic/angular";
import { Case } from "../cases";

@Component({
  selector: "app-case-details",
  templateUrl: "./case-details.page.html",
  styleUrls: ["./case-details.page.scss"],
})
export class CaseDetailsPage implements OnInit {
  public case: Case;
  constructor(public viewCtrl: ModalController, navParams: NavParams) {
    this.case = navParams.get("case");
    console.log("cases", this.case);
  }

  ngOnInit() {}
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
