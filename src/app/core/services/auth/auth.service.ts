import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CurrentUserService } from '../current-user/current-user.service';
import { LocalStorageService } from '../local-storage/local-storage.service';
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth_url: string;

  constructor(private http: HttpClient) { }

}