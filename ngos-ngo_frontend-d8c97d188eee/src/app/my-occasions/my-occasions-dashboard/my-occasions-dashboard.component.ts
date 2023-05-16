import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PatternService } from '../../core/services/pattern.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../core/services/user.service';
import { LoginService } from '../../core/services/login.service';
import { Location, DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-occasions-dashboard',
  templateUrl: './my-occasions-dashboard.component.html',
  styleUrls: ['./my-occasions-dashboard.component.css']
})
export class MyOccasionsDashboardComponent implements OnInit {
  confirmResult:any;
  resultModalRef:any;
  addSuccess: boolean;
  addDanger: boolean;
  message: string;
  addOcassion:FormGroup;
  editOcassion:FormGroup;
  loading:boolean;
  ocassions:any;
  orgdataRes:any={
    orgInfo:[{}]
  }
  userToken:any;

  constructor(private formBuilder : FormBuilder, private patterns : PatternService, private modalService: NgbModal,private service:UserService,private loginService:LoginService) {
  }

  ngOnInit(): void {
    this.userToken = this.loginService.getToken();
    this.service.getOrgInfo().subscribe(res=>{
      console.log(res);
      this.orgdataRes=res
      console.log(this.orgdataRes); 
    
    },err=>{
      console.log(err.error);
     
    })

    this.getAllOcassions();
    this.addOcassion = this.formBuilder.group({
      ocassionName : new FormControl('', [Validators.required]),
      date : new FormControl('', [Validators.required ]),
      memberId : new FormControl('', )
    })
    this.editOcassion = this.formBuilder.group({
      ocassionName : new FormControl('', [Validators.required]),
      date : new FormControl('', [Validators.required ]),
      objId:new FormControl('',)
    })
  }

  openModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'md', centered: true })
    .result.then((result) => {
      console.log(result);
    }, (reason) => {
      console.log('Err!', reason);
    });
  }
  openEditModal(ocassionData,editModal){
    this.editOcassion.get('ocassionName').setValue(ocassionData.ocassionName);
    this.editOcassion.get('date').setValue(new Date(ocassionData.date));
    this.editOcassion.get('objId').setValue(ocassionData._id);
    this.modalService.open(editModal, { ariaLabelledBy: 'modal-basic-title', size: 'md', centered: true })
    .result.then((result) => {
      console.log(result);
    }, (reason) => {
      console.log('Err!', reason);
    });

  }
  getAllOcassions(){
    this.service.getAllOcassionsByMemberId(this.userToken).subscribe(res=>{
      console.log(res);
      let result:any={};
      result=res
      this.ocassions=result.ocassions;
      var index = 1;
      this.loading = false;
      if(this.ocassions){
      this.ocassions.filter(x=>{
        x.index = index;
        index++;
      });
     }
     },
       error=>{
       }  
     )
  }
  onAddOcassionSubmit(resultModal){
    this.loading = true;
    console.log(this.addOcassion.value);
    const date = new DatePipe('en-US').transform(this.addOcassion.value.date, 'MM-dd-yyyy');
    this.addOcassion.get('date').setValue(date);
    this.addOcassion.get('memberId').setValue(this.userToken.id);

    this.service.addOcassion(this.addOcassion.value).subscribe(res=>{
      console.log(res);
    this.loading = false;
      let addRes:any={
      }
      addRes=res
      if(addRes.message=="Ocassion added successfully"){
        this.addSuccess=true;
        this.addDanger=false;
        this.message="Ocassion added successfully"
        this.confirm(resultModal);
        this.addOcassion.reset();
        this.getAllOcassions()
      }
      else{
        this.addSuccess=false;
        this.addDanger=true;
        this.message="Cannot add data,try again"
        this.confirm(resultModal);
  
      }
      // else{
      //   this.message="Cannot add the project, try again"
      // }
    })
    // this.modalService.dismissAll();
  }
  confirm(resultModal) {
    this.resultModalRef = this.modalService.open(resultModal , { ariaLabelledBy: 'modal-basic-title', centered: true,size:'sm' });
    this.resultModalRef.result.then((result) => {
     this.confirmResult = `Closed with: ${result}`;
     
   }, (reason) => {
     this.confirmResult = `Dismissed with: ${reason}`;
     this.modalService.dismissAll();
   });
   //
 }
 submitEditOcassion(resultModal){
  const date = new DatePipe('en-US').transform(this.editOcassion.value.date, 'MM-dd-yyyy');
  this.editOcassion.get('date').setValue(date);
  this.service.editOcassion(this.editOcassion.value).subscribe(res=>{
    console.log(res);
  this.loading = false;
    let addRes:any={
    }
    addRes=res
    if(addRes.message=="Ocassion updated successfully"){
      this.addSuccess=true;
      this.addDanger=false;
      this.message="Ocassion updated successfully"
      this.confirm(resultModal);
      this.getAllOcassions()
    }
    else{
      this.addSuccess=false;
      this.addDanger=true;
      this.message="Cannot add data,try again"
      this.confirm(resultModal);

    }
    // else{
    //   this.message="Cannot add the project, try again"
    // }
  })

 }
}
