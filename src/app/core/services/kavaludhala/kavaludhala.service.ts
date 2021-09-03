import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpClient } from '@angular/common/http';
import { urlConstants } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class Kavaludhala extends ApiService {

  baseUrl: string;
  constructor(public http: HttpClient) {
    super(http);
    this.baseUrl = urlConstants.SERVICES.APP;
  }
}
