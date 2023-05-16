import { Component, OnInit } from '@angular/core';
import { UserService} from '../../core/services/user.service';
import { FormBuilder, FormGroup, Validators, NgModel, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/core/services/login.service';
@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.css']
})
export class UserRolesComponent implements OnInit {
  orgdataRes:any={
    orgInfo:[{}]
  }
  loading = false;
  page  = 1;
  pageSize = 10;
  rolesdata:any = {Roles:[]};
  userRoleForm:FormGroup;
  singleRoleData:any = {role:'',finalResult:[]};
  tokenData:any;
  userRolePermissions:any = {read:'',write:'',update:''};
  roles:any = [
    {
      index:0,
      roleName:'',
      description:''
    }
  ];
  finalData:any = [];
  availableRolesRecords = 0;
  constructor(private service:UserService,private modalService: NgbModal,private formBuilder: FormBuilder,private loginService:LoginService) { 
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
    this.getRoles();
    this.tokenData = this.loginService.getToken();
    const roleIDs = this.tokenData.roles;
      this.service.getpermissions(roleIDs).subscribe(res=>{
        const role = res;
        const rolePermissions = role.permissionSet;
        rolePermissions.forEach(element => {
          if(element.permissionsName === 'Users'){
            this.userRolePermissions = element.permission
          }
        })
      })
   
  }

  // get roles list

  getRoles(){
    this.service.getAllRoles().subscribe(res=>{
      this.rolesdata = res;
      this.roles =   this.rolesdata.Roles;
      var index = 1;
  this.loading = false;
      this.roles.filter(x=>{
        x.index = index;
        index++;
      });
      this.finalData =  this.roles;
      this.availableRolesRecords = this.finalData.length;
    },err=>{
      console.log(err.error);
    });
  }

  // search 
  search(term){
    if (!term) {
      this.roles = this.finalData;
    } else {
      this.roles = this.finalData.filter(x =>       
        x.roleName.trim().toLowerCase().includes(term.trim().toLowerCase())     
      );
    } 
    this.availableRolesRecords = this.roles.length;
  }

  viewRoleData(viewRolesData,id){
    this.modalService.open(viewRolesData, { size: 'lg' , scrollable: true });
    this.service.getRolePermissionsById(id).subscribe(res=>{
      this.singleRoleData = res;
    },err=>{
      console.log(err.error)
    })
  }

}
