import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../core/services/auth/auth.service';
import { CurrentUserService } from '../services/current-user/current-user.service';
import { urlConstants } from '../constants';
@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    constructor(
        private auth: AuthService,
        private currentUserService: CurrentUserService
    ) {
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.handle(request, next))
    }

    async handle(req: HttpRequest<any>, next: HttpHandler) {
        let authReq;
        if (req.url.indexOf(urlConstants.API_URLS.LOGIN) === -1 && req.url.indexOf(urlConstants.API_URLS.REGISTER) === -1) {
            let token;
            await this.currentUserService.getToken().then(token=>{
               token = token;
               if (token) {
                authReq = req.clone({
                     setHeaders: {
                        'x-access-token' :token
                     }
                 })
             }
            })
        } else {
            authReq = req.clone({
                headers: req.headers.delete('x-access-token')
            })
        }
        return next.handle(authReq).toPromise()
    }
}