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
  casesList: Case[] = [
    {
        "status": "submit",
        "_id": "6133385b57232d04b7294322",
        "name": "rocky",
        "vehicle_number": "KA 15 l 2345",
        "description": "req.body.description",
        "id_proof": {
            "front": {
                "type": "png",
                "path": "8_2021/airp0m1fhykt5khmdf_front.png",
                "image": "https://kavaludahala.in/images/8_2021/airp0m1fhykt5khmdf_front.png"
            },
            "back": {
                "type": "png",
                "path": "8_2021/airp0m1fhykt5khmdg_back.png",
                "image": "https://kavaludahala.in/images/8_2021/airp0m1fhykt5khmdg_back.png"
            }
        },
        "mobile_number": "123434534",
        "createdBy": "61324d323316fdf0dc131f68",
        "suspect_photo": {
            "type": "png",
            "path": "8_2021/airp0m1fhykt5khmdi_suspect_photo.png",
            "image": "https://kavaludahala.in/images/8_2021/airp0m1fhykt5khmdi_suspect_photo.png"
        },
        "vehicle_photo": {
            "type": "png",
            "path": "8_2021/airp0m1fhykt5khmdh_vehicle_photo.png",
            "image": "https://kavaludahala.in/images/8_2021/airp0m1fhykt5khmdh_vehicle_photo.png"
        },
        "date": "2021-09-04T09:11:55.014Z",
        "createdAt": "2021-09-04T09:11:55.018Z",
        "updatedAt": "2021-09-04T09:11:55.018Z"
    }
];

  constructor(
    private modalCtrl: ModalController,

    private kavaludhal: Kavaludhala,
    private loader: LoaderService,
    private toastServiceService: ToastServiceService
  ) {}

  ngOnInit() {
   this.getCasesList('');
  }
public getCasesList(serchQury:string){
  this.loader.startLoader("Please wait, loading");
  const config = {
    url: `${urlConstants.API_URLS.GET_CASE}${serchQury}&pageNo=1&pageSize=1`,
  };
  this.kavaludhal.get(config).subscribe(
    (data) => {
      this.loader.stopLoader();
      if (data.data) {
        this.casesList = data.data;
      } else {
        this.toastServiceService.displayMessage(
          data.message,
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
