import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {LoaderService, Kavaludhala, urlConstants,ToastServiceService } from '../core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";

import {TranslateStore} from '@ngx-translate/core';
import { Location } from '@angular/common';
import { CurrentUserService } from '../core/services/current-user/current-user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login: FormGroup;
  userData;
  fields = [
    {
      type: "text",
      label: 'Username',
      required: true,
      name: 'username',
      placeholder:'Username',
      value: '',
      icons: []
    },{
    type: "text",
    label: 'Password',
    required: true,
    name: 'password',
    value: '',
    icons: []
  }
  ]
  constructor(
    public router: Router,
    private loader: LoaderService,
    private translate: TranslateStore,
    private kavaludhal: Kavaludhala,
    private toastServiceService: ToastServiceService,
    private route: ActivatedRoute,
    private location: Location,
    private userService : CurrentUserService

  ) {
    translate.defaultLang ='en';
    console.log('in login');
  }

  ngOnInit() {
    this.prepareForm();
  }

  checkPattern(field) {
    if (field.value && field.pattern) {
      let result = field.pattern.test(field.value);
      field.patternMatch = result;
    } else {
      field.patternMatch = false;
    }
  }

  public prepareForm() {
    const controls = {};
    this.fields.forEach(res => {
      const validationsArray = [];
      if (res.required) {
        validationsArray.push(
          Validators.required
        );
      }
      controls[res.name] = new FormControl('', validationsArray);
    });
    this.login = new FormGroup(
      controls
    );
  }

  doLogin() {
    this.loader.startLoader('Please wait, loading');
    const config = {
      url: urlConstants.API_URLS.LOGIN,
      payload: this.login.value
    }
    this.kavaludhal.post(config).subscribe(data => {
      this.loader.stopLoader();
      if (data.data) {
        this.userService.setUser(data.data).then(data =>{
          this.router.navigate(['menu/home']);
        })
        this.toastServiceService.displayMessage(data.message, 'danger');
      } else {
        this.toastServiceService.displayMessage(data.message, 'danger');
      }
    }, error => {
      this.toastServiceService.displayMessage('Something went wrong, please try again later', 'danger');
      this.loader.stopLoader();
    })
  }

  goToRegister(){
    this.router.navigate(['register']);
  }
}
