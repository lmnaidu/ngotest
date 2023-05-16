import { Component, OnInit } from '@angular/core';
import { UserService} from '../../core/services/user.service';
import { FormBuilder, FormGroup, Validators, NgModel, FormControl, FormArray } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { PatternService } from '../../core/services/pattern.service';

@Component({
  selector: 'app-add-roles',
  templateUrl: './add-roles.component.html',
  styleUrls: ['./add-roles.component.css']
})
export class AddRolesComponent implements OnInit {
  orgdataRes:any={
    orgInfo:[{}]
  }
  loading = false;
  userRoleForm:FormGroup;
  permissions:FormArray;
  resultModalRef:any;
  confirmResut:any;
  message:string;
  error:any;
  resultRoleData:any;
  PermissionsList:any ={Permissions:[]};
  permissionstatus :any = [
    {status:'No Permission',statusValue:'0'},
    {status:'Read',statusValue:'1'},
    {status:'Write',statusValue:'3'},
    {status:'All',statusValue:'7'}
  ];
  selectedPermission :any = {};
  selectedResult= new Array();
  selectedData:any = {};
  flagTest:boolean = false;
  roleNmaeMinLength:any;
  roleNamemaxLength:any;
  read;
  write;
  update;
  none;
  permissiosData:any = [];
  checked;
  checked7;
  checked3;
  checked1
  constructor(private service:UserService,private modalService: NgbModal,private formBuilder: FormBuilder, private location:Location,private router:Router,private pattern:PatternService) { 
    this.roleNmaeMinLength = this.pattern.firstNameMinLength;
    this.roleNamemaxLength = this.pattern.firstNameMaxLength
  }

  ngOnInit(): void {
    this.service.getOrgInfo().subscribe(res=>{
      console.log(res);
      this.orgdataRes=res
      console.log(this.orgdataRes); 
    
    },err=>{
      console.log(err.error);
     
    })
    this.checked = true;
    console.log(this.permissionstatus);
    this.userRoleForm = this.formBuilder.group({
      roleName: new FormControl('', [Validators.required,Validators.minLength(  this.roleNmaeMinLength ),Validators.maxLength(this.roleNamemaxLength)] ), 
      description: new FormControl ('', [Validators.required]),
      permissions:this.formBuilder.array([ this.createItem() ]),
      permissionsId: new FormControl(''),
      permissionsValues: new FormControl(''),
      permissionsRoles: new FormControl(''),
      _id:['']
    });

    this.service.permission().subscribe(res=>{
      console.log(res);
      this.PermissionsList = res;

      this.permissiosData =  this.PermissionsList.Permissions
      this.permissiosData.forEach(ele=>{
            ele.permissionStatus = {
                none:true,
                read:false,
                write:false,
                update:false
            };
            ele.permissionsValue = '0';
        })
        console.log( this.permissiosData)
    },err=>{
      console.log(err.error);
    })
  }
  createItem(): FormGroup {
    return this.formBuilder.group({
      permissionsId:new FormControl(),
      permissionsValue: new FormControl()
    });
  }

  CheckboxReadOnly(event) {
    if(event.target.checked === false){
      return false;
    }
      
  }
 
  checkPermission(event,index){
    console.log(event)
    console.log(index)
    if(event.target.value === '0'){
      this.permissiosData[index].permissionStatus.none = true;
      this.permissiosData[index].permissionStatus.read = false;
      this.permissiosData[index].permissionStatus.write = false;
      this.permissiosData[index].permissionStatus.update = false;
      this.permissiosData[index].permissionsValue = event.target.value;
    }else if(event.target.value === '1'){
      this.permissiosData[index].permissionStatus.none = false;
      this.permissiosData[index].permissionStatus.read = true;
      this.permissiosData[index].permissionStatus.write = false;
      this.permissiosData[index].permissionStatus.update = false;
      this.permissiosData[index].permissionsValue = event.target.value;
    }else if(event.target.value === '3'){
      this.permissiosData[index].permissionStatus.none = false;
      this.permissiosData[index].permissionStatus.read = false;
      this.permissiosData[index].permissionStatus.write = true;
      this.permissiosData[index].permissionStatus.update = false;
      this.permissiosData[index].permissionsValue = event.target.value;
    }else if(event.target.value === '7'){
      this.permissiosData[index].permissionStatus.none = false;
      this.permissiosData[index].permissionStatus.read = false;
      this.permissiosData[index].permissionStatus.write = false;
      this.permissiosData[index].permissionStatus.update = true;
      this.permissiosData[index].permissionsValue = event.target.value;
    }

    console.log(this.permissiosData)
    // if(this.selectedResult.length === 0){
    //   console.log("enter0")
    //   this.selectedPermission.permissionsValue = value;
    //   this.selectedPermission.permissionsId = id;
    //   this.selectedData = this.selectedPermission;
    //   this.selectedResult.push( this.selectedData);
    //   // this.selectedResult = [ ...this.selectedResult];
    //   console.log(this.selectedResult)
    // }else{
      
    //   for (let index = 0; index < this.selectedResult.length; index++) {
    //     console.log(this.selectedResult[index]);
    //     if(this.selectedResult[index].permissionsId === id && this.selectedResult[index].permissionsValue != value){
    //       console.log("same id but diff value")
    //       this.selectedResult[index].permissionsId= id;
    //       this.selectedResult[index].permissionsValue= value
    //       this.flagTest=true;
    //       break;
    //     }
    //   }
    //   if(!this.flagTest){
    //       console.log("diff id diff value")
    //       console.log(this.selectedResult);
    //       let selected = {
    //         permissionsValue:'',
    //         permissionsId:''
    //       }
    //       selected.permissionsValue = value;
    //       selected.permissionsId = id;
    //       this.selectedData = selected;
    //       console.log(selected);
    //       this.selectedResult.push(this.selectedData)
    //       // setTimeout(()=>{ }, 50);
    //       // this.selectedResult = [ ...this.selectedResult];
    //       console.log(this.selectedResult);
    //     }  
    // } 
   
  }

  addUserroles(resultModal,resultErrorModal){
  this.loading = true;
    this.permissiosData.forEach(element => {
      let selected = {
        permissionsValue:'',
        permissionsId:''
      }
      selected.permissionsId = element._id;
      selected.permissionsValue = element.permissionsValue;
      this.selectedResult.push(selected);
    });  
    this.userRoleForm.value.permissionsRoles= this.selectedResult;
    
    console.log(this.userRoleForm.value);
    this.service.addRolePermissions(this.userRoleForm.value).subscribe(res=>{
  this.loading = false;
      console.log(res);
      this.resultRoleData = res
      this.message =   this.resultRoleData.message;
      this.confirm(resultModal);
    },err=>{
      console.log(err.error);
      this.confirmError(resultErrorModal);
      this.error = err.error.message;
  this.loading = false;
    });
  }

  cancel(){
    this.location.back();
  }

  confirm(resultModal) {
    this.resultModalRef = this.modalService.open(resultModal , { ariaLabelledBy: 'modal-basic-title', centered: true,size:'sm' });
    this.resultModalRef.result.then((result) => {
     this.confirmResut = `Closed with: ${result}`;
   }, (reason) => {
     this.confirmResut = `Dismissed with: ${reason}`;
     this.modalService.dismissAll();
     this.router.navigate(['/uam-roles/rolesList'])
   });
 }
 confirmError(resultErrorModal){
    this.resultModalRef = this.modalService.open(resultErrorModal , { ariaLabelledBy: 'modal-basic-title', centered: true,size:'sm' });
    this.resultModalRef.result.then((result) => {
    this.confirmResut = `Closed with: ${result}`;
  }
  //  , (reason) => {
  //    this.confirmResut = `Dismissed with: ${reason}`;
  //    this.modalService.open
  //  }
  );
 }


}
