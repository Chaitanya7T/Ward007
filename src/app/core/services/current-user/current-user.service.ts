import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  constructor(private storage: LocalStorageService) {
  }

  setUser(data): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.setLocalStorage('userDetails', data).then(success => {
        console.log(success,"success")
        resolve(data);
      }).catch(error => {
        reject(error)
      })
    })
  }

  getToken():Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.getLocalStorage('userDetails').then(data => {
        console.log(data,"data 143")
        resolve(data.token);
      }).catch(error => {
        reject()
      })
    })
  }

  getUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.getLocalStorage('userDetails').then(data => {
        console.log(data,"data 123")
        resolve(data);
      }).catch(error => {
        reject()
      })
    })
  }

  deleteUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.deleteAllStorage().then(data => {
        resolve(data)
      }).catch(error => {
        reject()
      })
    })
  }
  // getAccessToken(): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     this.storage.getLocalStorage('userDetails').then(data => {
  //       data ? resolve(data) : resolve()
  //     }).catch(error => {
  //       resolve()
  //     })
  //   })
  // }

}