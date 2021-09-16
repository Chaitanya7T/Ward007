import { Component, OnInit,  } from '@angular/core';
import { Router } from '@angular/router';
import { Kavaludhala, urlConstants } from '../core';
import { ApiService } from '../core/services/api/api.service';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Platform } from "@ionic/angular";
import { File } from "@ionic-native/file/ngx";
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { LoaderService } from "src/app/core";
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
 showMenu : boolean = true;
 path;
  constructor(
    private router: Router,
    private kavaludhalaService : Kavaludhala,
    public transfer: FileTransfer,
    private platform: Platform,
    private file: File,
    private loader: LoaderService,
    private fileOpener:FileOpener
  ) {}
  ngOnInit() {
    this.path = this.platform.is("ios") ? this.file.documentsDirectory : this.file.externalDataDirectory;
  }
  createCase(){
      this.router.navigate(['menu/create-case']);
  }

  goToCases(){
    this.router.navigate(['menu/existing-cases']);
  }

  downloadCases(){
    // const config ={
    //   url :urlConstants.API_URLS.DOWNLOAD_CAASES,
    //   payload:''
    // }
    // this.kavaludhalaService.get(config).subscribe(data =>{

    // })

    this.downloadAction('https://matfuvit.github.io/UVIT/predavanja/literatura/TutorialsPoint%20HTML.pdf','file.pdf');
  }

  downloadAction(url,name){
    // this.loader.startLoader("Please wait, loading");
    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.download(url, this.path + '/' + name).then(success => {
      // this.loader.stopLoader();
      this.openFile(url);
    }, error => {
      // this.loader.stopLoader();
    })
  }
  openFile(attachment) {
    this.fileOpener.open(this.path + '/' + attachment.name, attachment.type)
      .then(() => { console.log('File is opened'); })
      .catch(e => console.log('Error opening file', e));
  }
}