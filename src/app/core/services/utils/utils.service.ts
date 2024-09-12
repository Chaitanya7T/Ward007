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
}
