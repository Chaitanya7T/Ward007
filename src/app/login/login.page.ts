import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {LoaderService, Kavaludhala, urlConstants,ToastServiceService } from '../core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";

import {TranslateStore} from '@ngx-translate/core';
import { Location } from '@angular/common';
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
    private location: Location

  ) {
    translate.defaultLang ='en';
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

      // IF required enable patterns

      // if (res.pattern) {
      //   validationsArray.push(
      //     Validators.pattern(new RegExp(res.pattern))
      //   );
      // }
      controls[res.name] = new FormControl('', validationsArray);
    });
    this.login = new FormGroup(
      controls
    );
  }

  doLogin() {
    // this.loader.startLoader('Please wait, loading');
    const config = {
      url: urlConstants.API_URLS.LOGIN,
      payload: this.login.value
    }
    // this.kavaludhal.post(config).subscribe(data => {
    //   this.loader.stopLoader();
    //   console.log(data,"data");
    //   if (data) {
      
    //   } else {
    //     this.toastServiceService.displayMessage('Something went wrong.', 'danger');
    //   }
    // }, error => {
    //   this.toastServiceService.displayMessage('Something went wrong, please try again later', 'danger');
    //   this.loader.stopLoader();
    // })
    this.router.navigate(['menu/home']);
  }

  goToRegister(){
    this.router.navigate(['register']);
  }
}
