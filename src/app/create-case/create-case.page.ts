import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService, Kavaludhala, urlConstants, ToastServiceService, AttachmentService, NetworkService } from '../core';
import { TranslateStore } from '@ngx-translate/core';
import {Http, Headers} from '@angular/http';
import { CurrentUserService } from '../core/services/current-user/current-user.service';
import { AlertController } from "@ionic/angular";

@Component({
  selector: 'app-create-case',
  templateUrl: './create-case.page.html',
  styleUrls: ['./create-case.page.scss'],
})
export class CreateCasePage implements OnInit {
  create: FormGroup;
  showMenu: boolean = false;
  idProof;
  front;
  back;
  suspectImg;
  vehicleImg;
  frontPreview;
  suspectPreview
  backPreview
  vehiclePreview
  fields = [
    {
      type: "text",
      label: 'Name',
      required: false,
      name: 'name',
      value: '',
      icons: []
    },
    {
      type: "number",
      label: 'Mobile Number',
      required: false,
      name: 'mobile_number',
      pattern: /^[0-9]{10}/,
      value: '',
      icons: []
    }, {
      type: "text",
      label: 'Vehicle Number',
      required: false,
      name: 'vehicle_number',
      value: '',
      icons: []
    },

    {
      type: "text",
      label: 'Description',
      required: false,
      name: 'description',
      value: '',
      icons: []
    },
    // {
    //   type: "date",
    //   label: 'Date',
    //   required: true,
    //   name: 'date',
    //   value: '',
    //   icons: []
    // },
  ];
  user;
  constructor(
    public router: Router,
    private loader: LoaderService,
    private translate: TranslateStore,
    private kavaludhala: Kavaludhala,
    private toastServiceService: ToastServiceService,
    private route: ActivatedRoute,
    private attachmentService: AttachmentService,
    private userService : CurrentUserService,
    private alertController : AlertController,
    private network: NetworkService

  ) {
    translate.defaultLang = 'en';
  }

  ngOnInit() {
    this.prepareForm();
    console.log('in ngonit');
    this.userService.getUser().then(user =>{
      this.user = user;
      console.log( this.user ," this.user ");
    })
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
    this.create = new FormGroup(
      controls
    );
  }

  createCase() {
    if(this.network.isNetworkAvailable){
      this.create.value.date = new Date();
      this.loader.startLoader('Please wait, loading');
      let suspect,vehicle,idProof
   if(this.suspectImg){
     suspect ={
       value : this.suspectImg,
       type :'png'
     }
   } 
   if(this.vehicleImg){
     vehicle ={
       value : this.vehicleImg,
       type :'png'
     }
   }
   if(this.front || this.back){
     idProof ={
       front:{
         value:this.front ? this.front : '',
         type :'png'
       },
       back:{
        value:this.back ? this.back :'',
        type :'png'
      },
   }
     }
    
     this.create.value.suspect_photo = suspect;
     this.create.value.id_proof = idProof;
     this.create.value.vehicle_photo = vehicle;

     const config = {
       url: urlConstants.API_URLS.CREATE_CASE,
       payload: this.create.value,
     }
     this.kavaludhala.post(config).subscribe(data => {
       this.loader.stopLoader();
       if (data.data) {
         this.toastServiceService.displayMessage('Case created Successfully', 'success');
         this.router.navigate(['menu/home']);
       } else {
         this.toastServiceService.displayMessage('Something went wrong.', 'danger');
       }
     }, error => {
       this.toastServiceService.displayMessage('Something went wrong, please try again later', 'danger');
       this.loader.stopLoader();
     })
    }else{
      this.toastServiceService.displayMessage('You are Offline, Please move to online to access the App feauters','danger');
    }
  }

  addFrontId() {
    this.attachmentService.selectImage().then((data) => {
      if (data.data) {
        let img = {
          front:{
            value: data.data.value,
            type: 'png'
          }
        }
        this.front =data.data.value;
        this.frontPreview = "data:image/jpeg;base64,"+data.data.value;

        this.create.value.id_proof = img;
      }
    });
  }

  addBackId() {
    this.attachmentService.selectImage().then((data) => {
      if (data.data) {
        let img = {
          back:{
            value: data.data.value,
            type: 'png'
          }
        }
        this.back = data.data.value;
        this.backPreview  = "data:image/jpeg;base64," +data.data.value;
        this.create.value.id_proof = img;
      }
    });
  }

  suspect() {
    this.attachmentService.selectImage().then((data) => {
      if (data.data) {
        let img = {
          value: data.data.value,
          type: 'png'
        }
        this.suspectImg = data.data.value;
        this.suspectPreview  = "data:image/jpeg;base64," +data.data.value;
      }
    });
  }
  vehicle() {
    this.attachmentService.selectImage().then((data) => {
      if (data.data) {
        let img = {
          value: data.data.value,
          type: 'png'
        }
        this.vehicleImg =  data.data.value;
        this.vehiclePreview  = "data:image/jpeg;base64," +data.data.value;
      }
    });
  }

  async deleteImageAlert(type){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Are you sure!',
      message: 'You want to delete ' + type +' photo ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.deleteCpaturedImage(type)
          }
        }
      ]
    });
    await alert.present();
  }

  deleteCpaturedImage(type){
    if(type == 'Vehicle'){
      this.vehicleImg='';
      this.vehiclePreview='';
    }else if(type == 'Suspect'){
      this.suspectImg='';
      this.suspectPreview ='';
    }else if(type == 'Back id'){
      this.backPreview='';
      this.back='';
    }else if(type == 'Front id'){
      this.frontPreview='';
      this.front='';
    }
    this.toastServiceService.displayMessage(type + 'photo deleted successfully.', 'success');
  }
}