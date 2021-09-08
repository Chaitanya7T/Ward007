import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { RequestParams } from '../../interfaces/request-params';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastServiceService } from '../toast-message/toast-service.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  popOpen: boolean = false;
  baseUrl: string;
  auth: AuthService;
  router: Router;
  alertController: AlertController
  constructor(public http: HttpClient,
    private toastService : ToastServiceService
  ) { }

  get(requestParam: RequestParams): Observable<any> {
    return this.http.get(environment.apiBaseUrl + this.baseUrl + requestParam.url).pipe(
      tap(data => {
        return data
      }, error => {
      }),
      catchError(this.handleError([]))
    )
  }

  post(requestParam: RequestParams): Observable<any> {
    return this.http.post(environment.apiBaseUrl + this.baseUrl + requestParam.url, requestParam.payload).pipe(
      tap(data => {
        return data;
      }, error => {
        console.log(error.error,"error 56");
        this.toastService.displayMessage(error.error.message,'danger');
        return error.error
      }),
      catchError(this.handleError([]))
    )
  }

  put(requestParam: RequestParams): Observable<any> {
    return this.http.put(environment.apiBaseUrl + this.baseUrl + requestParam.url, requestParam.payload).pipe(
      tap(data => {
        return data
      }, error => {
      }),
      catchError(this.handleError([]))
    )
  }

  delete(requestParam: RequestParams): Observable<any> {
    return this.http.delete(environment.apiBaseUrl + this.baseUrl + requestParam.url).pipe(
      tap(data => {
        return data
      }, error => {
      }),
      catchError(this.handleError([]))
    )
  }

  // postWithHeader(url, data, id): Observable<any> {

  //   const headers = new HttpHeaders()
  //     .set('vendorid', id);
  //   return this.http.post(environment.apiBaseUrl + this.baseUrl + url.url,{headers}).pipe(
  //     tap(data => {
  //       console.log(data, " data innnn ******");
  //       return data
  //     }, error => {
  //       console.log('error ====>', error);
  //     }),
  //     catchError(this.handleError([]))
  //   )
  // }

  private handleError(result) {
    return (error: any): Observable<any> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      if (error.status === 401) {

      } else {

      }
      return of(result);
    };
  }
}
