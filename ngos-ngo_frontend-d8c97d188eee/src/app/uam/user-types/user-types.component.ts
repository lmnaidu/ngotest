import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-user-types',
  templateUrl: './user-types.component.html',
  styleUrls: ['./user-types.component.css']
})
export class UserTypesComponent implements OnInit {
  orgdataRes:any={
    orgInfo:[{}]
  }
  userTypesForm:FormGroup;
  userTypesEditForm:FormGroup;
  message:any;
  error:any;
  userTypeaddingResult:any;
  resultModalRef:any;
  confirmResult:any;
  userTypesList:any = {UserTypes:[]};
  page  = 1;
  pageSize = 2;
  singleUsertype:any = {_id:'',userType:''};
  updatedResult:any;
  constructor(private formBuilder : FormBuilder, private modalService: NgbModal, private service:UserService) { }

  ngOnInit(): void {
    this.service.getOrgInfo().subscribe(res=>{
      console.log(res);
      this.orgdataRes=res
      console.log(this.orgdataRes); 
    
    },err=>{
      console.log(err.error);
     
    })
  
    this.userTypesForm = this.formBuilder.group({
      userType : new FormControl('',[Validators.required]),
      _id:['']
    });

    this.userTypesEditForm = this.formBuilder.group({
      userType : new FormControl('',[Validators.required]),
      _id:['']
    });
    this.getAllUserTypes();
  }

  getAllUserTypes(){
    this.service.allUserTypes().subscribe(res=>{
      console.log(res);
      this.userTypesList = res;
    },err=>{
      console.log(err.error);
    })
  }

  openAddUserType(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'sm', centered: true })
    .result.then((result) => {
      // console.log(result);
    }, (reason) => {
      console.log('Err!', reason);
    });
  }



  onUserTypeSubmit(resultModal,resultErrorModal){
    console.log(this.userTypesForm.value);
    this.modalService.dismissAll();
    this.service.addUserType(this.userTypesForm.value).subscribe(res=>{
      this.userTypeaddingResult = res;
      this.confirm(resultModal);
      this.message = this.userTypeaddingResult.message;
    },err=>{
      console.log(err.error);
      this.confirm(resultErrorModal);
      this.error = err.error.message;
    })
  }

  confirm(resultModal) {
    this.resultModalRef = this.modalService.open(resultModal , { ariaLabelledBy: 'modal-basic-title', centered: true,size:'sm' });
    this.resultModalRef.result.then((result) => {
     this.confirmResult = `Closed with: ${result}`;
   }, (reason) => {
     this.confirmResult = `Dismissed with: ${reason}`;
     this.modalService.dismissAll()
   });
   this.getAllUserTypes();
 }
 confirmError(resultErrorModal){
    this.resultModalRef = this.modalService.open(resultErrorModal , { ariaLabelledBy: 'modal-basic-title', centered: true,size:'sm' });
    this.resultModalRef.result.then((result) => {
    this.confirmResult = `Closed with: ${result}`;
  }
  //  , (reason) => {
  //    this.confirmResut = `Dismissed with: ${reason}`;
  //    this.modalService.open
  //  }
  );
 }

 editUserType(editUerTypes,id){
    console.log(id);
    this.modalService.open(editUerTypes, { ariaLabelledBy: 'modal-basic-title', size: 'sm', centered: true })
    .result.then((result) => {
    }, (reason) => {
      console.log('Err!', reason);
    });
    this.userTypesList.UserTypes.forEach(element => {
      if(element._id === id){
        this.singleUsertype._id = element._id;
        this.singleUsertype.userType = element.userType;
      }
    });
    this.userTypesEditForm = this.formBuilder.group({
      userType : new FormControl(this.singleUsertype.userType,[Validators.required]),
      _id:[this.singleUsertype._id]
    });
 }


 updateUserType(resultModal,resultErrorModal){
    console.log(this.userTypesEditForm.value);
    this.service.updateUserTypes(this.userTypesEditForm.value._id,this.userTypesEditForm.value).subscribe(res=>{
      this.updatedResult = res;
      this.confirm(resultModal);
      this.message = this.updatedResult.message;
    },err=>{
      console.log(err.error);
      this.error = err.error.message;
      this.confirm(resultErrorModal);
    })
 }  
 

}
