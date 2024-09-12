import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loaderRef: any;

  constructor(private loader: LoadingController,
    public translate: TranslateService) { }

  async startLoader(message?: string) {
    let msg;
    if (message) {
      this.translate.get(message).subscribe((text: string) => {
        console.log(text, "translate");
        msg = text;
      })
    }
    this.loaderRef = await this.loader.create({
      cssClass: 'my-custom-class',
      spinner: 'circular',
      message: msg ? msg : 'Please wait while loading ...',
      translucent: true,
      backdropDismiss: true
    });

    await this.loaderRef.present()
  }

  stopLoader() {
    this.loaderRef ? this.loaderRef.dismiss() : null;
  }
}
