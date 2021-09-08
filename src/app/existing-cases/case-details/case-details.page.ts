import { Component, OnInit } from "@angular/core";
import { ModalController, NavParams } from "@ionic/angular";
import { Case } from "../cases";
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Platform } from "@ionic/angular";
import { File } from "@ionic-native/file/ngx";
import { LoaderService } from "src/app/core";

@Component({
  selector: "app-case-details",
  templateUrl: "./case-details.page.html",
  styleUrls: ["./case-details.page.scss"],
})
export class CaseDetailsPage implements OnInit {
  public case: Case;
  path;
  constructor(public viewCtrl: ModalController, navParams: NavParams,
    public transfer: FileTransfer,
    private photoViewer: PhotoViewer,
    private platform: Platform,
    private file: File,
    private loader: LoaderService
  ) {
    this.case = navParams.get("case");
  }

  ngOnInit() {
    this.path = this.platform.is("ios") ? this.file.documentsDirectory : this.file.externalDataDirectory;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  preview(url,name) {
    this.photoViewer.show(url,name, { share: true });
  }

  downloadFile(url, name) {
    this.loader.startLoader("Please wait, loading");
    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.download(url, this.path + '/' + name).then(success => {
      this.loader.stopLoader();
      this.preview(url,name);
    }, error => {
      this.loader.stopLoader();
    })
  }
}
