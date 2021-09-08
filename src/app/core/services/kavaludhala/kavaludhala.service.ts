import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpClient } from '@angular/common/http';
import { urlConstants } from '../../constants';
import { ToastServiceService } from '../toast-message/toast-service.service';

@Injectable({
  providedIn: 'root'
})
export class Kavaludhala extends ApiService {

  baseUrl: string;
  constructor(public http: HttpClient,
    private toast : ToastServiceService) {
    super(http,toast);
    this.baseUrl = urlConstants.SERVICES.APP;
  }
}
