import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { Kavaludhala, LoaderService, urlConstants } from '../core';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Platform } from "@ionic/angular";
import { File } from "@ionic-native/file/ngx";
import { FileOpener } from '@ionic-native/file-opener/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  showMenu: boolean = true;
  path;
  constructor(
    private router: Router,
    private kavaludhala: Kavaludhala,
    private loader: LoaderService,
    public transfer: FileTransfer,
    private platform: Platform,
    private file: File,
    private fileOpener: FileOpener
  ) { }
  ngOnInit() {
    this.path = this.platform.is("ios") ? this.file.documentsDirectory : this.file.externalDataDirectory;
  }
  createCase() {
    this.router.navigate(['menu/create-case']);
  }

  goToCases() {
    this.router.navigate(['menu/existing-cases']);
  }
  downloadCases() {
    const config = {
      url: urlConstants.API_URLS.DOWNLOAD_CASES
    }
    this.kavaludhala.get(config).subscribe(
      (data) => {
        console.log(data, "data");
        this.loader.stopLoader();
        // this.currentCount = data?.count || 0;
        if (data.data) {
          this.downloadFile(data.data.filePath);
        } else {
          // this.toastServiceService.displayMessage(data.message, "danger");
        }
      },
      (error) => {
        console.log(error, "error");
        // this.toastServiceService.displayMessage(error.message, "danger");
        this.loader.stopLoader();
      }
    );
  }

  downloadFile(url) {
    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.download(url, this.path + '/' + 'cases.csv').then(success => {
      window.open(url);
      // this.fileOpener.open(this.path + '/' + 'cases.csv', 'text/plain')
      //   .then(() => console.log('File is opened'))
      //   .catch(e => console.log('Error opening file', e));
    }, error => {
      console.log(error, "error");
    })
  }
}