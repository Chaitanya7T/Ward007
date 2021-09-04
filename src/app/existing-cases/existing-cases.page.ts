import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import {
  Kavaludhala,
  LoaderService,
  ToastServiceService,
  urlConstants,
} from "../core";
import { CaseDetailsPage } from "./case-details/case-details.page";
import { Cases } from "./cases";
@Component({
  selector: "app-existing-cases",
  templateUrl: "./existing-cases.page.html",
  styleUrls: ["./existing-cases.page.scss"],
})
export class ExistingCasesPage implements OnInit {
  showMenu: boolean = false;
  casesList: Cases[] = [
    {
      name: "MKJ",
      date: "10/20/21",
      description:
        "asadsdf ssfffffffffffffffff ffffffffffff ffff sds    asadsdf ssfffffffffffffffff ffffffffffff ffff sdsdff asadsdf ssfffffffffffffffff ffffffffffff ffff sds   dff dff    fdssds",
      id: "123",
      mobileNumber: "122345",
      vehicleNumber: "1234",
    },
    {
      name: "MKJMs",
      date: "10/20/21",
      description: "asadsdf",
      id: "123",
      mobileNumber: "122345",
      vehicleNumber: "1234",
    },
  ];

  constructor(
    private modalCtrl: ModalController,

    private kavaludhal: Kavaludhala,
    private loader: LoaderService,
    private toastServiceService: ToastServiceService
  ) {}

  ngOnInit() {
    this.loader.startLoader("Please wait, loading");
    const config = {
      url: urlConstants.API_URLS.GET_CASE,
    };
    this.kavaludhal.get(config).subscribe(
      (data) => {
        this.loader.stopLoader();
        if (data.data) {
          this.casesList = data.data;
        } else {
          this.toastServiceService.displayMessage(
            "Something went wrong.",
            "danger"
          );
        }
      },
      (error) => {
        this.toastServiceService.displayMessage(
          "Something went wrong, please try again later",
          "danger"
        );
        this.loader.stopLoader();
      }
    );
  }
  viewDetails(cases: Cases) {
    this.modalCtrl
      .create({
        component: CaseDetailsPage,
        componentProps: { cases: cases },
      })
      .then((modalres) => {
        modalres.present();
      });
  }
}
