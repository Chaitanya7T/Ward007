import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root'
})
export class ToastServiceService {

  constructor(
    public toastController: ToastController,
    public translate: TranslateService
  ) { }
  async displayMessage(msg, color) {
    let message;
    this.translate.get(msg).subscribe((text: string) => {
      console.log(text, "translate");
      message = text;
    })
    console.log(message,"text");
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color
    });
    toast.present();
  }
}
