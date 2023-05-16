import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-org-info',
  templateUrl: './org-info.component.html',
  styleUrls: ['./org-info.component.css']
})
export class OrgInfoComponent implements OnInit {
  orgdataRes:any={};
  dataPresent:boolean;
  addSuccess: boolean;
  addDanger: boolean;
  message: string;
  errorMessageTitleReq
  orgEditDataForm:FormGroup
  loading = false;
  imageChangedEvent: any = '';
  image:any;
  resultModalRef:any;
  confirmResut:any;

  constructor(private modalService:NgbModal,private formBuilder: FormBuilder,private service:UserService) { }

  ngOnInit(): void {
    this.getOrgData();
    this.orgEditDataForm = this.formBuilder.group({
      title: ['',[Validators.required]],
      logo: [''],
      image:['']
    });
  }
  updateModel(updateData){
    if(this.dataPresent){
      this.orgEditDataForm.get('title').setValue(this.orgdataRes.orgInfo[0].title);
      this.image=this.orgdataRes.orgInfo[0].logo
    }
    this.modalService.open(updateData, { size: 'lg' });

  }
  fileChangeEvent(event: any): void {
    // console.log(event)
    this.imageChangedEvent = event;
    // this.image = event.base64;
    // console.log(this.image);
  }

   // image crop
   imageCropped(event: ImageCroppedEvent) {
    this.image = event.base64;
    // console.log(this.image);
  }

  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  updateOrg(resultModal){
    if(this.image){
      this.orgEditDataForm.value.logo =  this.image;
    }else{
      this.orgEditDataForm.value.logo =  this.orgdataRes.orgInfo[0].logo;
    }
   
    // console.log(this.orgEditDataForm.value);
    this.service.updateOrgInfo(this.orgEditDataForm.value).subscribe(res=>{
      // console.log(res);
      let orgRes:any=res
      if(orgRes.message="OrgInfo added successfully"){
        this.addSuccess=true;
        this.addDanger=false;
        this.message="OrgInfo updated successfully";
        this.getOrgData();
        window.location.reload();
        // this.confirm(resultModal);
      }
      else{
        this.addSuccess=false;
        this.addDanger=true;
        this.message="Cannot update data,try again"
        this.confirm(resultModal);
      }
     
    },err=>{
      console.log(err.error);
      // this.error = err.error.message;
      // this.confirmError(resultErrorModal);
      // this.loading = false;
    })
   

  }
  confirm(resultModal) {
    this.resultModalRef = this.modalService.open(resultModal , { ariaLabelledBy: 'modal-basic-title', centered: true,size:'sm' });
    this.resultModalRef.result.then((result) => {
     this.confirmResut = `Closed with: ${result}`;
   }, (reason) => {
     this.confirmResut = `Dismissed with: ${reason}`;
     this.modalService.dismissAll();
    
   });
 }
 getOrgData(){
  this.service.getOrgInfo().subscribe(res=>{
    // console.log(res);
    this.orgdataRes=res
    // console.log(this.orgdataRes); 
    if(this.orgdataRes.count>0){
      this.dataPresent=true;
    }
    else{
      this.dataPresent=false
    }
  },err=>{
    console.log(err.error);
    // this.error = err.error.message;
    // this.confirmError(resultErrorModal);
    // this.loading = false;
  })

 }

}
