import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService, Kavaludhala, urlConstants, ToastServiceService, AttachmentService } from '../core';
import {TranslateStore} from '@ngx-translate/core';

@Component({
  selector: 'app-create-case',
  templateUrl: './create-case.page.html',
  styleUrls: ['./create-case.page.scss'],
})
export class CreateCasePage implements OnInit {
  create: FormGroup;
  showMenu: boolean = false;
  idProof;
  vehicleImg;
  suspectImg
  fields = [
    {
      type: "text",
      label: 'Name',
      required: true,
      name: 'name',
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
    },{
    type: "text",
    label: 'Vehicle number',
    required: true,
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
  {
    type: "date",
    label: 'Date',
    required: true,
    name: 'date',
    value: '',
    icons: []
  },
  ]
  constructor(
    public router: Router,
    private loader: LoaderService,
    private translate: TranslateStore,
    private kavaludhala: Kavaludhala,
    private toastServiceService: ToastServiceService,
    private route: ActivatedRoute,
    private attachmentService:AttachmentService
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
    this.create = new FormGroup(
      controls
    );
  }

  createCase(){
    console.log(this.create.value,"this.create");
  }

  addFrontId() {
    this.attachmentService.selectImage().then((data) => {
      data.data ? this.idProof={
        front: data.data 
      } : "";
    });
  }

  backFrontId() {
    this.attachmentService.selectImage().then((data) => {
      data.data ? this.idProof={
        back: data.data 
      } : "";
    });
  }

  suspect() {
    this.attachmentService.selectImage().then((data) => {
      data.data ? this.suspectImg=data.data : "";
    });
  }
  vehicle() {
    this.attachmentService.selectImage().then((data) => {
      data.data ? this.vehicleImg= data.data : "";
    });
  }
}
