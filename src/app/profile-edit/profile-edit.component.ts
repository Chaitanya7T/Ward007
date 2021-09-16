import { Component, OnInit,Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoaderService, Kavaludhala, urlConstants, ToastServiceService,AttachmentService } from '../core';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent implements OnInit {
@Input() profile;
profileImg;
update: FormGroup;
  fields = [
    {
      type: "text",
      label: 'Metal Number',
      required: true,
      name: 'metal_number',
      disabled:true,
      value: '',
      icons: []
    },{
    type: "text",
    label: 'Full Name',
    required: true,
    disabled:false,
    name: 'name',
    value: '',
    icons: []
  },
  {
    type: "number",
    label: 'Mobile Number',
    disabled:false,
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
    disabled:false,
    name: 'email',
    pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
    value: '',
    icons: []
  }
  ]
  constructor(
    private loader: LoaderService,
    private kavaludhal: Kavaludhala,
    private toastServiceService: ToastServiceService,
    private route: ActivatedRoute,
    public viewCtrl: ModalController,
    private attachmentService: AttachmentService
  ) { 

  }
  ngOnInit() {
  this.prepareForm();
  this.profileImg = this.profile.profile_pic ? this.profile.profile_pic.image : 'assets/images/profile.png';
  if(this.profile.profile_pic){
    this.update.value.profile_pic = this.profile.profile_pic
  }
  this.update.value._id =  this.profile._id;
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
      controls[res.name] = new FormControl(this.profile?this.profile[res.name]: '', validationsArray);
    });
    this.update = new FormGroup(
      controls
    );
  }

  submit(){
  this.loader.startLoader('Loading... , Please wait');
  this.profile.name =this.update.value.name;
  this.profile.mobile_number =this.update.value.mobile_number;
  this.profile.metal_number =this.update.value.metal_number;
  this.profile.email =this.update.value.email;
    const config ={
      url : urlConstants.API_URLS.UPDATE_PROFILE,
      payload:this.profile
    }
    this.kavaludhal.post(config).subscribe(data =>{
      this.loader.stopLoader();
      this.dismiss();
      this.toastServiceService.displayMessage('Profile updated Successfully', 'success');
    },error =>{
      this.loader.stopLoader();
    })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

uploadPhoto(){
  this.attachmentService.selectImage().then((data) => {
    if (data.data) {
      let img = {
        value: data.data.value,
        type: 'png'
      }
      this.profileImg =  "data:image/jpeg;base64,"+data.data.value
      this.profile.profile_pic = img;
    }
  });
}
}
