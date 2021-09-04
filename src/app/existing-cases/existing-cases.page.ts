import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import {
  Kavaludhala,
  LoaderService,
  ToastServiceService,
  urlConstants,
} from "../core";
import { CaseDetailsPage } from "./case-details/case-details.page";
import { Case } from "./cases";
@Component({
  selector: "app-existing-cases",
  templateUrl: "./existing-cases.page.html",
  styleUrls: ["./existing-cases.page.scss"],
})
export class ExistingCasesPage implements OnInit {
  showMenu: boolean = false;
  casesList: Case[] =[];
  public curentCount: number;

  constructor(
    private modalCtrl: ModalController,

    private kavaludhal: Kavaludhala,
    private loader: LoaderService,
    private toastServiceService: ToastServiceService
  ) {}

  ngOnInit() {
    this.getCasesList("");
  }

  public onSearchInput(data) {
    this.getCasesList(data.detail.value);
  }
  public getCasesList(serchQury: string) {
    this.loader.startLoader("Please wait, loading");
    let apiUrl = urlConstants.API_URLS.GET_CASE;
    if (serchQury) {
      apiUrl = `${urlConstants.API_URLS.GET_CASE}?search=${serchQury}&pageNo=1&pageSize=1`;
    }
    debugger
    const config = {
      url: apiUrl,
    };
    this.kavaludhal.get(config).subscribe(
      (data) => {
        this.loader.stopLoader();
        this.curentCount = data?.count || 0;
        if (data.data) {
          this.casesList = data.data;
        } else {
          this.toastServiceService.displayMessage(data.message, "danger");
        }
      },
      (error) => {
        this.toastServiceService.displayMessage(error.message, "danger");
        this.loader.stopLoader();
      }
    );
  }

  viewDetails(cases: Case) {
    this.modalCtrl
      .create({
        component: CaseDetailsPage,
        componentProps: { case: cases },
      })
      .then((modalres) => {
        modalres.present();
      });
  }
}
