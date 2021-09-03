import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { AlertController } from '@ionic/angular';
import * as _ from 'underscore';
import { validate } from 'json-schema';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private storage: LocalStorageService,
    private alertCtrl: AlertController
  ) { }

  incrementQty(menu, vendorId) {
    return new Promise((resolve, reject) => {
      this.storage.getLocalStorage('localCart').then(data => {
        console.log(data, "data 20");
        !menu.qty ? menu.qty : '';
        if (data.vendorId == vendorId) {
          let index = _.findIndex(data.productinfo, (item) => {
            console.log(item.productid, "item.id", menu.id);
            return item.productid == menu.id;
          });
          console.log(index, "index 27");
          if (index != -1) {
            data.productinfo[index].quantity++;
            menu.qty++;
            data.totalprice = data.totalprice + menu.validPrice.price;
            this.storage.setLocalStorage('localCart', data).then(data => {
              console.log(data, "updateCart 84");
            })
            resolve(this.updateCart(data))
          } else {
            menu.qty++;
            data.totalprice = data.totalprice + menu.validPrice.price;
            let sampleJson = {
              productid: menu.id,
              quantity: menu.qty,
              name: menu.name,
              variantdetails: menu.validPrice.priceQty,
              productprice: menu.validPrice
            }
            data.productinfo.push(sampleJson);
          }
          this.storage.setLocalStorage('localCart', data).then(data => {
          })
          resolve(this.updateCart(data))

        } else {
          this.clearCart();
        }
      }, error => {
        menu.validPrice.price;
        menu.qty++;
        let sampleJson: any =
        {
          totalprice: menu.validPrice.price,
          vendorId: vendorId,
          productinfo: [{
            productid: menu.id,
            quantity: menu.qty,
            name: menu.name,
            variantdetails: menu.validPrice.priceQty,
            productprice: menu.validPrice
          }]
        }
        this.storage.setLocalStorage('localCart', sampleJson).then(data => {
          console.log(data, "updateCart");
        })
        resolve(this.updateCart(sampleJson))
      })
    })
  }


  decrementQty(menu, vendorId) {
    return new Promise((resolve, reject) => {
      this.storage.getLocalStorage('localCart').then(data => {
        if (data) {
          let index = _.findIndex(data.productinfo, (item) => {
            return item.productid == menu.id;
          });
          data.productinfo[index].quantity--;

          data.totalprice = data.totalprice - menu.validPrice.price
          menu.qty--;
          resolve(this.updateCart(data))
        }
      })
    })
  }

  updateCart(data) {
    this.storage.setLocalStorage('localCart', data).then(data => {
      console.log(data, "updateCart 84");
      return data
    })
  }
  async clearCart() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Clear cart ?',
      message: 'Your cart contains items from  different Vendor. Do you want to clear the cart and add items from other vendor',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.storage.deleteOneStorage('localCart');
          }
        }
      ]
    });

    await alert.present();
  }

  deleteQTY(menu) {
    this.storage.getLocalStorage('localCart').then(data => {
      console.log(data, "data 20",menu,"menu");
      let index = _.findIndex(data.productinfo, (item) => {
        return item.productid == menu.id;
      });
      data.productinfo[index].qty = 0;
    })
  }
}
