import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService, Kavaludhala, urlConstants, ToastServiceService } from '../core';
import {TranslateStore} from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  register: FormGroup;
  fields = [
    {
      type: "text",
      label: 'Matal number',
      required: true,
      name: 'matal_number',
      value: '',
      icons: []
    },{
    type: "text",
    label: 'Full name',
    required: true,
    name: 'fullName',
    value: '',
    icons: []
  },
  {
    type: "number",
    label: 'Mobile number',
    required: true,
    name: 'mobile_number',
    pattern: /^[0-9]{10}/,
    value: '',
    icons: []
  },
  {
    type: "text",
    label: 'Email id',
    required: true,
    name: 'email_id',
    pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
    value: '',
    icons: []
  },
  {
    type: "password",
    label: 'Password',
    required: true,
    name: 'password',
    value: '',
    icons: []
  },
  ]
  constructor(
    public router: Router,
    private loader: LoaderService,
    private translate: TranslateStore,
    private kavaludhal: Kavaludhala,
    private toastServiceService: ToastServiceService,
    private route: ActivatedRoute,
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
      if (res.pattern) {
        validationsArray.push(
          Validators.pattern(new RegExp(res.pattern))
        );
      }
      controls[res.name] = new FormControl('', validationsArray);
    });
    this.register = new FormGroup(
      controls
    );
  }
  doRegister(){
    console.log( this.register.value,"this.register.value");
  }
  goToLogin(){
    this.router.navigate(['login']);
  }
}
