import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService, Kavaludhala, urlConstants, ToastServiceService } from '../core';
import {TranslateStore} from '@ngx-translate/core';
import { CurrentUserService } from '../core/services/current-user/current-user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  register: FormGroup;
  enableFields = false;
  fields = [
    {
      type: "text",
      label: 'Metal Number',
      required: true,
      name: 'metal_number',
      value: '',
      icons: [
        {
          name:'arrow-forward-outline',
          slot:'end',
          action:'verifyMetal'
        }
      ]
    },{
    type: "text",
    label: 'Full Name',
    required: true,
    name: 'name',
    value: '',
    icons: []
  },
  {
    type: "number",
    label: 'Mobile Number',
    required: true,
    name: 'mobile_number',
    pattern: /^[0-9]{10}/,
    value: '',
    icons: []
  },
  {
    type: "text",
    label: 'Email id',
    required: false,
    name: 'email',
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
    private userService : CurrentUserService
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

  doAction(type){
    console.log(type,"type");
    switch(type ){
      case 'verifyMetal' :
      this.metalVerify();
      break;
    }
  }
  metalVerify(){
    this.enableFields = false;

    console.log( this.register.value,"this.register.value");
    this.loader.startLoader('Please wait, loading');
    const config = {
      url: urlConstants.API_URLS.METAL_VERIFY,
      payload: { metal_number: this.register.value.metal_number}
    }
    this.kavaludhal.post(config).subscribe(data => {
      console.log(data,"data");
      this.loader.stopLoader();
      if (data.status == 200) {
        // this.userService.setUser(data.data).then(data =>{
        //   this.router.navigate(['menu/home']);
        // })
        this.enableFields = true;
        this.toastServiceService.displayMessage(data.message, 'success');
      } else {
    this.enableFields = false;
        this.toastServiceService.displayMessage(data.message, 'danger');
      }
    }, error => {
      this.enableFields = false;
      this.toastServiceService.displayMessage(error.message, 'danger');
      this.loader.stopLoader();
    })
  }
  doRegister(){
    console.log( this.register.value,"this.register.value");
    this.loader.startLoader('Please wait, loading');
    const config = {
      url: urlConstants.API_URLS.REGISTER,
      payload: this.register.value
    }
    this.kavaludhal.post(config).subscribe(data => {
      console.log(data,"data");
      this.loader.stopLoader();
      if (data.data) {
        this.userService.setUser(data.data).then(data =>{
          this.router.navigate(['menu/home']);
        })
        this.toastServiceService.displayMessage(data.message, 'success');
      } else {
        this.toastServiceService.displayMessage(data.message, 'danger');
      }
    }, error => {
      this.toastServiceService.displayMessage(error.message, 'danger');
      this.loader.stopLoader();
    })
  }
  goToLogin(){
    this.router.navigate(['login']);
  }
}
