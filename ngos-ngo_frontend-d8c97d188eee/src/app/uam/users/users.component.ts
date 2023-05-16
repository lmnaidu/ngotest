import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, NgModel, FormControl, AbstractControl } from '@angular/forms';
import { Users } from '../../model/user';
import { UserService } from '../../core/services/user.service';
import { LoginService } from '../../core/services/login.service';
import { Router } from '@angular/router';
import { PatternService } from '../../core/services/pattern.service';
import csc from 'country-state-city';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  loading = false;
  orgdataRes:any={
    orgInfo:[{}]
  }
  page  = 1;
  pageSize = 10;
  userForm: FormGroup;
  updatedUserForm: FormGroup;
  roleSettings: any = {};
  roleData:any = [];
  rolesData:any = [];
  resultData:any;
  resultModalRef:any;
  confirmResut:any;
  message:string;
  error:any;
  allUsersData:any ={users:[]};
  tokenData:any;
  singleUserData:any = {firstName:'',lastName:'',email:'',role:[],status:'',_id:'',phone:''};
  updatedResult:any;
  rolesResult:any;
  singleUserDetails:any = {email:'',name:'',userId:'',role:[],phone:{phoneNumber:''},_id:'',status:''};
  firstNameMinLength:any;
  firstNameMaxLength:any;
  lastNameMinLength:any;
  lastNameMaxLength:any;
  emailMaxLength:any;
  userTypesList:any = {UserTypes:[]};
  usersList:any = [];
  filter = new FormControl('');
  filterData:any = {
    index:0,
    name:'',
    firstName:'',
    lastName:'',
    _id:'',
    userType:'',
    email:'',
    status:'',
    role:'',
    userId:''
  };
  userPermissions:any = {read:'',write:'',update:''};
  errorMessagePhnoInvalid;
  errorMessagePhnoReq;
  availableRecords = 0;
  finalData:any = [];
  userDetails:any ={profileImage:'',firstName:'',lastName:'',role:{roleName:''},birthDay:'',phone:{phoneNumber:''},email:'',address:'',street:'',description:'',userId:'',accountHolderName:'',accountNumber:'',bankName:'',branchName:'',ifscCode:'',indiaAccountDetails:[],usaAccountDetails:[]};
  cityDetails:any = {name:''};
  stateDetails:any = {name:''};
  countryDetails:any = {name:''};
  indianAccounts:any ={accountHolderName:'',accountNumber:'',bankName:'',branchName:'',ifscCode:''};
  usaAccounts:any ={accountHolderName:'',accountNumber:'',address:'',routingNumber:''};
  constructor(private modalService: NgbModal,private formBuilder: FormBuilder,private service:UserService, private loginService:LoginService ,private router:Router, private patternService:PatternService) { 
    this.firstNameMinLength = this.patternService.firstNameMinLength;
    this.firstNameMaxLength = this.patternService.firstNameMaxLength;
    this.lastNameMinLength = this.patternService.lastNameMinLength;
    this.lastNameMaxLength = this.patternService.lastNameMaxLength;
    this.emailMaxLength = this.patternService.emailMaxLength;
    this.errorMessagePhnoReq = this.patternService.errorMessagePhnoReq;
    this.errorMessagePhnoInvalid = this.patternService.errorMessagePhnoInvalid;

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
    this.getUsersData();
    this.userForm = this.formBuilder.group({
      firstName: new FormControl('',  [Validators.required,Validators.pattern(this.patternService.firstNamePattern),Validators.minLength(  this.firstNameMinLength ),Validators.maxLength(this.firstNameMaxLength)] ),
      lastName: new FormControl('', [Validators.required,Validators.pattern(this.patternService.lastNamePattern),Validators.minLength(  this.lastNameMinLength ),Validators.maxLength(this.lastNameMaxLength)] ),
      email: new FormControl('',[Validators.required,Validators.maxLength(this.emailMaxLength)] ),
      role: new FormControl('',[Validators.required] ),
      status:new FormControl('', [Validators.required]),
      password: new FormControl('',[Validators.required,Validators.pattern(this.patternService.passwordPattern)]),
      confPassword: new FormControl('', [Validators.required]),
      preferredPhone : new FormControl(''),
      phoneNumber : new FormControl('',[Validators.required]),    
      _id:new FormControl ('')
    });

    
    this.tokenData = this.loginService.getToken();
    const roleIDs = this.tokenData.roles;
      this.service.getpermissions(roleIDs).subscribe(res=>{
        const role = res;
        const rolePermissions = role.permissionSet;
        rolePermissions.forEach(element => {
          if(element.permissionsName === 'Users'){
            this.userPermissions = element.permission
          }
        })
      })

   
    this.updatedUserForm = this.formBuilder.group({
      firstName: new FormControl( '',  [Validators.required,Validators.pattern(this.patternService.firstNamePattern),Validators.minLength(  this.firstNameMinLength ),Validators.maxLength(this.firstNameMaxLength)] ),
      lastName: new FormControl('',  [Validators.required,Validators.pattern(this.patternService.lastNamePattern),Validators.minLength(  this.lastNameMinLength ),Validators.maxLength(this.lastNameMaxLength)] ),
      email: new FormControl( '', [Validators.required,Validators.maxLength(this.emailMaxLength)] ),
      role: new FormControl( '', [Validators.required]),
      status:new FormControl('',  [Validators.required]),
      preferredPhone: new FormControl('',Validators.required),
      phoneNumber : new FormControl('',[Validators.required]),
      _id:new FormControl (''),
    });
    
    // get roles 
    this.service.getAllRoles().subscribe(res=>{
      this.rolesResult = res;
      this.rolesData = this.rolesResult.Roles;
    },err=>{
      console.log(err.error);
      this.error = err.error.message;
    });
      
    this.roleSettings = {
      singleSelection: true,
      idField: '_id',
      textField: 'roleName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      enableCheckAll: false,
      // limitSelection:4
    }
    this.getAllUserTypes();
  }

  getAllUserTypes(){
    this.service.allUserTypes().subscribe(res=>{
      this.userTypesList = res;
  this.loading = false;
    },err=>{
      console.log(err.error);
    })
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confPassword').value) {
        return {invalid: true};
    }
}
 
  getUsersData(){
    this.usersList=[];
    this.service.allUsers().subscribe(res=>{
      this.allUsersData = res;
      var index = 1;
  this.loading = false;
      for (let i = 0; i < this.allUsersData.users.length; i++) {
       
        this.filterData.index = index;
        this.filterData._id = this.allUsersData.users[i]._id;
        if (this.allUsersData.users[i].firstName) {
          this.filterData.name = this.allUsersData.users[i].firstName.trim()+ ' ' + this.allUsersData.users[i].lastName;
          console.log(this.filterData.name);
        } else {
          this.filterData.name = ' ';
        }
        if (this.allUsersData.users[i].email) {
          this.filterData.email = this.allUsersData.users[i].email;
        } else {
          this.filterData.email = ' ';
        }
        if (this.allUsersData.users[i].userId) {
          this.filterData.userId = this.allUsersData.users[i].userId;
        } else {
          this.filterData.userId = ' ';
        }
        if (this.allUsersData.users[i].status) {
          this.filterData.status = this.allUsersData.users[i].status;
        } else {
          this.filterData.status = ' ';
        }
        if (this.allUsersData.users[i].role) {
          this.filterData.role = this.allUsersData.users[i].role;
        } else {
          this.filterData.role = ' ';
        }

        this.usersList.push(this.filterData);
        this.filterData = {
          index:0,
          name:'',
          firstName:'',
          lastName:'',
          _id:'',
          userType:'',
          email:'',
          status:'',
          role:'',
          userId:'',
         
        };
         index++;
      } 
      
      this.finalData= this.usersList
      this.availableRecords = this.finalData.length;
      console.log(this.usersList)
   },
    err=>{
      console.log(err.error);
      if(err.error.status === 401){
        console.log(err.error);
       
      }else{
        console.log(err.error);
      
      }
    
    }
   )
  }

  search(term: string){
    console.log(term)
    if (!term) {
      this.usersList = this.finalData;
    } else {
      this.usersList = this.finalData.filter(x =>       
        x.name.trim().toLowerCase().includes(term.trim().toLowerCase())     
      );

      // const email= this.finalData.filter(x =>
      //   x.email.trim().toLowerCase().includes(term.trim().toLowerCase()),
      // );
      
      //   if(email && email.length){
      //     email.map(x=>x).filter(x=>{
      //       if(this.usersList && this.usersList.length){
      //         this.usersList.map(y=>y).filter(y=>{
      //           if(y.name===x.name && y.email===x.email)
      //           {
      //               console.log('no data')
      //           }
      //           else{
      //             this.usersList.push(x);
      //           }                          
      //         });
      //     }
      //     else{
      //       this.usersList.push(x);
      //     }
      //   });
      // } 
    }
    this.availableRecords = this.usersList.length;
  }
  
  onItemSelect(item: any) {
    
      this.roleData.push(item._id);  
  }
  onItemDeSelect(items: any) {
    this.roleData.pop(items._id);
  }
  addUserModel(addingUser){
    this.modalService.open(addingUser, { size: 'lg' });
  }

  confirm(resultModal) {
    this.resultModalRef = this.modalService.open(resultModal , { ariaLabelledBy: 'modal-basic-title', centered: true,size:'sm' });
    this.resultModalRef.result.then((result) => {
     this.confirmResut = `Closed with: ${result}`;
   }, (reason) => {
     this.confirmResut = `Dismissed with: ${reason}`;
     this.modalService.dismissAll()
   });
   this.getUsersData();
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

  addUser(resultModal,resultErrorModal){
    this.loading = true;
    this.userForm.value.preferredPhone = '3';
    this.userForm.value.role = this.userForm.value.role[0]._id;
    this.service.addUser(this.userForm.value).subscribe(res=>{
      this.resultData = res;
    this.loading = false;
      if(this.resultData.status === '200'){
        this.userForm.reset();
          this.confirm(resultModal);
          this.message = this.resultData.message
      }
    },error=>{
      this.error = error.error.message;
      this.confirm(resultErrorModal);
    }
    )
    
  }

  editUserModel(editingUser,id){
    const userId= id;
    
    this.service.getUserById(userId).subscribe(res=>{
     const roles  = [];

      this.singleUserData = res;
      roles.push(this.singleUserData.role);
      this.updatedUserForm = this.formBuilder.group({
        firstName: new FormControl( this.singleUserData.firstName, [Validators.required,Validators.pattern(this.patternService.firstNamePattern),Validators.minLength(  this.firstNameMinLength ),Validators.maxLength(this.firstNameMaxLength)] ),
        lastName: new FormControl( this.singleUserData.lastName,  [Validators.required,Validators.pattern(this.patternService.lastNamePattern),Validators.minLength(  this.lastNameMinLength ),Validators.maxLength(this.lastNameMaxLength)] ),
        email: new FormControl( this.singleUserData.email, [Validators.required,Validators.maxLength(this.emailMaxLength)] ),
        status:new FormControl( this.singleUserData.status,  [Validators.required]),
        // userType: new FormControl(this.singleUserData.userType._id,Validators.required),
        role: new FormControl( roles, [Validators.required]  ),
        phoneNumber : new FormControl(this.singleUserData.phone.phoneNumber,[Validators.required]),
        _id: new FormControl (this.singleUserData._id)
      });
      this.modalService.open(editingUser, { size: 'lg' });
    },
      error=>{
        console.log(error.error);
      }
    )
   
  };

  updateUser(resultModal,resultErrorModal){
    this.updatedUserForm.value.preferredPhone = this.singleUserData.phone.preferredPhone;
    this.updatedUserForm.value.phoneNumber = this.updatedUserForm.value.phoneNumber;
    this.updatedUserForm.value.role = this.updatedUserForm.value.role[0]._id;
    // this.updatedUserForm.value.role = this.roleData;
    this.service.updateUser(this.singleUserData._id,this.updatedUserForm.value).subscribe(res=>{
      this.updatedResult = res;
      this.confirm(resultModal);
      this.message = this.updatedResult.message
    },
      err=>{
        console.log(err.error);
        this.error = err.error.message;
        this.confirm(resultErrorModal);
      }
    )
  }

  // viiew user details

  viewUsersData(viewUserData,id){
   
    this.service.getUserById(id).subscribe(res=>{
      this.userDetails = res;
      const inadianAccount =  this.userDetails.indiaAccountDetails;
      this.indianAccounts =inadianAccount[0]; 
      const usaAccount = this.userDetails.usaAccountDetails;
      this.usaAccounts = usaAccount[0];
      this.cityDetails = csc.getCityById(this.userDetails.city);
      this.stateDetails = csc.getStateById(this.userDetails.state)
      this.countryDetails = csc.getCountryById(this.userDetails.country)
    },err=>{
      console.log(err.error)
    })
    this.modalService.open(viewUserData ,{ariaLabelledBy: 'modal-basic-title',size: 'xl'});
    // this.modalService.open(viewUserData, { size: 'lg' });
    // this.allUsersData.users.forEach(element => {
    //   this.singleUserDetails.email = element.email;
    //   this.singleUserDetails.name = element.firstName + ' '+element.lastName;
    //   this.singleUserDetails.userId = element.userId;
    //   this.singleUserDetails.role = element.role;

    // });
    // this.service.getUserById(id).subscribe(res=>{
    //   this.singleUserDetails.email = res.email;
    //     this.singleUserDetails.name = res.firstName + ' '+res.lastName;
    //     this.singleUserDetails.userId = res.userId;
    //     this.singleUserDetails.role = res.role;
    //     this.singleUserDetails.userType = res.userType;
    //     this.singleUserDetails.phone = res.phone;
    // })
  }

}
