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
@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    constructor(
        private auth: AuthService
    ) {
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.handle(request, next))
    }

    async handle(req: HttpRequest<any>, next: HttpHandler) {
        let authReq;
        // send skip param as true in header to disable headers
        if (!req.headers.get("skip") || req.headers.get("skip") === 'false') {
            authReq = req.clone({
                setHeaders: {
                    
                }
            })
        } else {
            authReq = req.clone({
                headers: req.headers.delete('skip')
            })
        }
        return next.handle(authReq).toPromise()
    }
}