import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CaseDetailsPage } from './case-details/case-details.page';
import { Cases} from './cases';
@Component({
  selector: 'app-existing-cases',
  templateUrl: './existing-cases.page.html',
  styleUrls: ['./existing-cases.page.scss'],
})
export class ExistingCasesPage implements OnInit {
  showMenu: boolean = false;
  casesList :Cases[]=[{name:"MKJ",date:'10/20/21',description:'asadsdf ssfffffffffffffffff ffffffffffff ffff sds    asadsdf ssfffffffffffffffff ffffffffffff ffff sdsdff asadsdf ssfffffffffffffffff ffffffffffff ffff sds   dff dff    fdssds',id:'123',mobileNumber:'122345',vehicleNumber:"1234"},{name:"MKJMs",date:'10/20/21',description:'asadsdf',id:'123',mobileNumber:'122345',vehicleNumber:"1234"}]
  
  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
  }
viewDetails(cases:Cases){
  this.modalCtrl.create({
    component: CaseDetailsPage,
    componentProps: { cases: cases }
  }).then(modalres=>{
    modalres.present()
  })
}
}
