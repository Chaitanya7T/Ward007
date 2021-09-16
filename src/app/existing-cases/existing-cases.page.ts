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
  casesList =[];
  public currentCount: number;
  page =1;
  searchText ='';
  constructor(
    private modalCtrl: ModalController,
    private kavaludhal: Kavaludhala,
    private loader: LoaderService,
    private toastServiceService: ToastServiceService  ) {}

  ngOnInit() {
    this.getCasesList();
  }

  public onSearchInput(data) {
    this.casesList =[];
    this.page = 1;
    this.searchText =data.detail.value;
    this.getCasesList();
  }
  public getCasesList() {
    this.loader.startLoader("Please wait, loading");
    const config = {
      url:  urlConstants.API_URLS.GET_CASE + this.searchText+'&pageNo='+ this.page
    };
    this.kavaludhal.get(config).subscribe(
      (data) => {
        this.loader.stopLoader();
        this.currentCount = data?.count || 0;
        if (data.data) {
          this.casesList =this.casesList.concat(data.data.data);
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

  loadMore(){
    this.page = this.page +1;
    this.getCasesList();
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
