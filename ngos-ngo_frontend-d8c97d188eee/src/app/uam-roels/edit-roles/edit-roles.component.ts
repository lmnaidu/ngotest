import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { UserService} from '../../core/services/user.service';
import { FormBuilder, FormGroup, Validators, NgModel, FormControl, FormArray } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { PatternService } from '../../core/services/pattern.service';

@Component({
  selector: 'app-edit-roles',
  templateUrl: './edit-roles.component.html',
  styleUrls: ['./edit-roles.component.css']
})
export class EditRolesComponent implements OnInit {
  loading = false;

  roleId:any;
  userEditRoleForm:FormGroup;
  permissions:FormArray;
  resultModalRef:any;
  confirmResut:any;
  message:string;
  error:any;
  PermissionsList:any ={Permissions:[]};
  singleRoleData:any = {role:'',finalResult:[]};
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
  selected = {
    permissionsValue:'',
    permissionsId:''
  }
  pattern:any;
  permissiosData:any = [];
  updateRoles:any = {role:'',roleId:'',description:'',rolePermissionsId:'',permissionsRoles:[]};
  updatedResult:any;
  orgdataRes:any={
    orgInfo:[{}]
  }
  constructor( private route: ActivatedRoute,private service:UserService,private modalService: NgbModal,private formBuilder: FormBuilder, private location:Location,private router:Router, private patternService:PatternService) {
    this.loading = true;
   }

  ngOnInit(): void {
    this.service.getOrgInfo().subscribe(res=>{
      console.log(res);
      this.orgdataRes=res
      console.log(this.orgdataRes); 
    
    },err=>{
      console.log(err.error);
     
    })
    this.route.params.subscribe(res => {
      this.roleId = res.id;    
    });

    this.service.permission().subscribe(res=>{
      console.log(res);
      this.PermissionsList = res;
      this.loading = false;
    },err=>{
      console.log(err.error);
    })
    
    this.userEditRoleForm = this.formBuilder.group({
      roleName: new FormControl('', [Validators.required] ), 
      permissions:this.formBuilder.array([ this.createItem() ]),
      permissionsId: new FormControl(''),
      permissionsValues: new FormControl(''),
      permissionsRoles: new FormControl(''),
      description: new FormControl('', [Validators.required]),
      _id:['']
    });
    console.log( this.roleId);
    // get roles data by id
      this.service.getRolePermissionsById(this.roleId).subscribe(res=>{
        this.singleRoleData = res;
        console.log(this.singleRoleData);
        this.permissiosData =   this.singleRoleData.finalResult;
        // this.selectedResult =  this.permissiosData;
        // this.singleRoleData.finalResult.forEach(element => {
          
        //   this.selected.permissionsValue = element.permissionValue;
        //   this.selected.permissionsId = element.permissionDetails._id;
        //   this.selectedResult.push(this.selectedData)
        //   // console.log( this.selectedResult);
        // }); 
      
        this.userEditRoleForm = this.formBuilder.group({
          roleName: new FormControl(this.singleRoleData.role,[Validators.required,Validators.pattern(this.pattern)]), 
          roleId : new FormControl(this.singleRoleData.roleId),
          permissions:this.formBuilder.array([ this.createItem() ]),
          permissionsId: new FormControl(''),
          permissionsValues: new FormControl(''),
          permissionsRoles: new FormControl(''),
          description: new FormControl(this.singleRoleData.description, [Validators.required]),
          _id:[this.singleRoleData.rolePermissionsId]
        });
      },err=>{
        console.log(err.error)
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

  checkPermission(event,index,id){
    console.log(event);
    console.log(index);
    console.log(id);
    if(event.target.value === '1'){
      this.permissiosData[index].permissionStatus.none = false;
      this.permissiosData[index].permissionStatus.read = true;
      this.permissiosData[index].permissionStatus.write = false;
      this.permissiosData[index].permissionStatus.update = false;
      this.permissiosData[index].permissionValue = event.target.value;
     
    }else if(event.target.value === '3'){
      this.permissiosData[index].permissionStatus.none = false;
      this.permissiosData[index].permissionStatus.read = false;
      this.permissiosData[index].permissionStatus.write = true;
      this.permissiosData[index].permissionStatus.update = false;
      this.permissiosData[index].permissionValue = event.target.value;
    }else if(event.target.value  === '7'){
      this.permissiosData[index].permissionStatus.none = false;
      this.permissiosData[index].permissionStatus.read = false;
      this.permissiosData[index].permissionStatus.write = false;
      this.permissiosData[index].permissionStatus.update = true;
      this.permissiosData[index].permissionValue = event.target.value;
    }else if(event.target.value  === '0'){
      this.permissiosData[index].permissionStatus.none = true;
      this.permissiosData[index].permissionStatus.read = false;
      this.permissiosData[index].permissionStatus.write = false;
      this.permissiosData[index].permissionStatus.update = false;
      this.permissiosData[index].permissionValue = event.target.value;
    }
    // if(this.permissiosData[index].permissionStatus.read === true)
    // this.permissiosData[index].permissionStatus.write = false;

    // if(this.selectedResult.length === 0){
    //   // console.log("enter0")
    //   this.selectedPermission.permissionsValue = event.target.value;
    //   this.selectedPermission.permissionsId = id;
    //   this.selectedData = this.selectedPermission;
    //   this.selectedResult.push( this.selectedData);
    //   // this.selectedResult = [ ...this.selectedResult];
    //   // console.log(this.selectedResult)
    // }else{
      
      // for (let index = 0; index < this.selectedResult.length; index++) {
      //   // console.log(this.selectedResult[index]);
      //   if(this.selectedResult[index].permissionsId === id && this.selectedResult[index].permissionsValue != event.target.value){
      //     // console.log("same id but diff value")
      //     this.selectedResult[index].permissionsId= id;
      //     this.selectedResult[index].permissionsValue= event.target.value;
      //     this.flagTest=true;
      //     break;
      //   }
      // }
      // if(!this.flagTest){
          // console.log("diff id diff value")
          // console.log(this.selectedResult);
          // let selected = {
          //   permissionsValue:'',
          //   permissionsId:''
          // }
          // this.selected.permissionsValue = event.target.value;
          // this.selected.permissionsId = id;
          // this.selectedData = this.selected;
          // // console.log(this.selected);
          // this.selectedResult.push(this.selectedData)
          // setTimeout(()=>{ }, 50);
          // this.selectedResult = [ ...this.selectedResult];
          // console.log(this.selectedResult);
        // }  
    // } 
   
   
    
    console.log( this.selectedResult)
  }

  updateUserroles(resultModal,resultErrorModal){
    this.loading = true;
    this.updateRoles.roleName = this.userEditRoleForm.value.roleName;
    this.updateRoles.description = this.userEditRoleForm.value.description;
    this.updateRoles.roleId =this.singleRoleData.roleId
    this.updateRoles.rolePermissionsId = this.singleRoleData.rolePermissionsId
    console.log(this.permissiosData);
    for (let i = 0; i < this.permissiosData.length; i++) {
      let selected = {
          permissionsValue:'',
          permissionsId:''
        }
      selected.permissionsId = this.permissiosData[i].permissionDetails._id;
      selected.permissionsValue = this.permissiosData[i].permissionValue;
      this.selectedResult.push(selected)
     
    }
    
    this.updateRoles.permissionsRoles =  this.selectedResult;
    // this.permissiosData.forEach(element => {
    //   this.selected.permissionsId = element.permissionDetails._id;
    //   this.selected.permissionsValue = element.permissionValue;
    //   this.selectedResult.push(this.selected)
    //   this.updateRoles.permissionsRoles =  this.selectedResult;
    // });
   
   
    console.log(this.updateRoles)
    this.userEditRoleForm.value.permissionsRoles= this.selectedResult;
    console.log( this.userEditRoleForm.value);
    this.service.updateRolePermissions( this.updateRoles.roleId,this.updateRoles).subscribe(res=>{
    this.loading = false;
      console.log(res);
      this.updatedResult = res;
      this.message = this.updatedResult.message;
      this.confirm(resultModal)
    },err=>{
      console.log(err.error);
      this.error = err.error.message;
      this.confirmError(resultErrorModal);
    this.loading = false;
    })
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
  
  );
 }

}
