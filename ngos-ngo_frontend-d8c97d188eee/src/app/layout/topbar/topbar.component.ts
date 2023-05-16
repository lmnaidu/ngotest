import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../core/services/login.service';
import {UserService } from '../../core/services/user.service';
import { from, interval, Subscription } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators,FormArray  } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { PatternService } from '../../core/services/pattern.service';
import {RouterModule, Routes } from '@angular/router';

// import { jquery } from '../../';
// import { threadId } from 'worker_threads';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  addSuccess: boolean;
  addDanger: boolean;
  message: string;
  resultModalRef:any;
  showError:boolean=false;
  passwordModal:any;
  confirmResut:any;
  passwordForm:FormGroup;

  orgdataRes:any={
    orgInfo:[{}]
  }
  notificationsList:any=[];
  proposerProjectsLength:any;
  checkUser;
  subscription1:Subscription;
  subscription:Subscription
  isAdmin = false;
  isMember = false;
  userToken:any;
  result:any={}
  projects:any={none:'',read:'',write:'',update:''}
  users:any ={none:'',read:'',write:'',update:''};
  userRoles:any={none:'',read:'',write:'',update:''};
  chapters:any={none:'',read:'',write:'',update:''};
  members:any={none:'',read:'',write:'',update:''};
  sponsorCompany:any={none:'',read:'',write:'',update:''};
  pledges:any={none:'',read:'',write:'',update:''};
  donations:any={none:'',read:'',write:'',update:''};
  financial:any={none:'',read:'',write:'',update:''};
  events:any={none:'',read:'',write:'',update:''};
  news:any={none:'',read:'',write:'',update:''};
  magazines:any={none:'',read:'',write:'',update:''};
  generateCertificates:any={none:'',read:'',write:'',update:''};
  advertisement:any={none:'',read:'',write:'',update:''};
  digitalConnect:any={none:'',read:'',write:'',update:''};
  requestforProposal:any={none:'',read:'',write:'',update:''};
  reports:any={none:'',read:'',write:'',update:''};
  ORGHierarchy:any={none:'',read:'',write:'',update:''};
  occasions:any={none:'',read:'',write:'',update:''};


  notifications = [
    {
      "id": "1",
      "name" : "Activity Completed",
      "message" : "Activity: Books Distributions Completed",
      "time" : "10 sec ago",
      "icon": "i-Data-Settings"
    },
    {
      "id": "2",
      "name" : "New Project Proposed",
      "message" : "Project: Swetcha",
      "time" : "2 days ago",
      "icon": "i-Library"
    },
    {
      "id": "3",
      "name" : "Project Status",
      "message" : "Accepted By Admin",
      "time" : "1 day ago",
      "icon": "i-Statistic"
    },
    
  ]
  userDetails:any = {profileImage:''};
  notificationsLength = this.notifications.length;

  navbarOpen = false;

  constructor(private _router:Router, private loginService:LoginService,private service:UserService,private formBuilder:FormBuilder,private modalService: NgbModal,private patternService:PatternService) {
    
  }

  ngOnInit(): void {
    this.passwordForm=this.formBuilder.group({
      newPassword: new FormControl('', [Validators.pattern(this.patternService.passwordPattern)]),
      cnfPassword: new FormControl('', ),
      userId:new FormControl('', ),
      type:new FormControl('', )
    });
    this.getOrgData();
    
    const source = interval(25000);
    const text="entered"
    this.subscription = source.subscribe(val => this.getAllProposalProjects());
    this.subscription1 = source.subscribe(val => this.getNotifications());
    this.userToken= this.loginService.getToken();
    console.log(this.userToken);
    if( this.userToken.activeUser == "admin"){
      this.isAdmin =true;
  
    }
    else{
      this.isAdmin =false;
    }
    console.log(this.isAdmin);
    // this.getNotifications();//16/06
    this.service.getUserById(this.userToken.id).subscribe(res=>{
      this.userDetails = res;
    });
    const roleIDs = this.userToken.roles;
     this.service.getpermissions(roleIDs).subscribe(res=>{
        const role = res;
        const rolePermissions = role.permissionSet;
        rolePermissions.forEach(element => {
          if(element.permissionsName === 'Projects'){
            this.projects = element.permission
          }else if(element.permissionsName === 'Users'){
            this.users = element.permission
          }else if(element.permissionsName === 'Chapters'){
            this.chapters = element.permission
          }else if(element.permissionsName === 'Members'){
            this.members = element.permission
          }else if(element.permissionsName === 'Sponsor Company'){
            this.sponsorCompany = element.permission
          }else if(element.permissionsName === 'Pledges'){
            this.pledges = element.permission
          }else if(element.permissionsName === 'Donations'){
            this.donations = element.permission
          }else if(element.permissionsName === 'User Roles'){
            this.userRoles = element.permission
          }else if(element.permissionsName === 'Financial'){
            this.financial = element.permission
          }else if(element.permissionsName === 'Events'){
            this.events = element.permission
          }else if(element.permissionsName === 'News'){
            this.news = element.permission
          }else if(element.permissionsName === 'Magazines'){
            this.magazines = element.permission
          }else if(element.permissionsName === 'Generate Certificates'){
            this.generateCertificates = element.permission
          }else if(element.permissionsName === 'Advertisement'){
            this.advertisement = element.permission
          }else if(element.permissionsName === 'Digital Connect'){
            this.digitalConnect = element.permission
          }else if(element.permissionsName === 'Request for Proposal'){
            this.requestforProposal = element.permission
          }else if(element.permissionsName === 'Reports'){
            this.reports = element.permission
          }else if(element.permissionsName === 'ORG Hierarchy'){
            this.ORGHierarchy = element.permission
          }else if(element.permissionsName === 'Occasions'){
            this.occasions = element.permission
          }
          
        });
       
      },err=>{
        console.log(err.error);
      })


  }
  getAllProposalProjects() {
    this.service.getProposedProjects().subscribe(res=>{
      this.result=res;
      if(this.result.proposedProjects){
       this.proposerProjectsLength=this.result.proposedProjects.length
      }
      else{
        this.proposerProjectsLength=0
      }
    },
      error=>{
       console.log(error.error.message); 
      }  
    )
   
  }

  signout(){
    this.loginService.logout();
  }
  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  //   this.subscription1.unsubscribe();
  // }
  getNotifications(){
    this.service.getNewNotifications(this.userToken.id).subscribe(res=>{
      let notData:any={

      }
      notData=res;
      this.notificationsList = notData.notifications;
      console.log(this.notificationsList);
    });

  }
  updateNot(id):void{
    console.log(id)
    this.service.changeViewStatus(id).subscribe(res=>{
      
        console.log(res);
      
    });


  }
  getOrgData(){
    this.service.getOrgInfo().subscribe(res=>{
      console.log(res);
      this.orgdataRes=res
      console.log(this.orgdataRes); 
    
    },err=>{
      console.log(err.error);
     
    })
  
   }
   changePassword(passModal){
    this.passwordModal = this.modalService.open(passModal , { ariaLabelledBy: 'modal-basic-title', centered: true,size:'sm' });
    this.passwordModal.result.then((result) => {
     this.confirmResut = `Closed with: ${result}`;
   }, (reason) => {
    this.confirmResut = `Dismissed with: ${reason}`;

   });

  }
  updateUserPassword(resultModal){
    this.showError=false;
    console.log(this.passwordForm.value)
    if((this.passwordForm.value.newPassword && this.passwordForm.value.cnfPassword) && (this.passwordForm.value.newPassword == this.passwordForm.value.cnfPassword)){
    this.passwordForm.get('userId').setValue(this.userToken.id);
    this.passwordForm.get('type').setValue('update');
    this.service.updatePassword(this.passwordForm.value).subscribe(res=>{
      let passRes:any={};
      passRes=res;
     console.log(passRes);
     if(passRes.message=="Password updated succesfully"){
      this.addSuccess=true;
      this.addDanger=false;
      this.message="Password updated succesfully";
      this.passwordForm.get('newPassword').setValue('');
      this.passwordForm.get('cnfPassword').setValue('');
      this.passwordModal.close()
      this.confirm(resultModal)
     }
     else{
      this.addSuccess=false;
      this.addDanger=true;
      this.message="Password cannot be updated, Please try again"
      this.confirm(resultModal)
     }
    });



    }
    else{
      this.showError=true;
    }
  }
  confirm(resultModal) {
    this.resultModalRef = this.modalService.open(resultModal , { ariaLabelledBy: 'modal-basic-title', centered: true,size:'sm' });
    this.resultModalRef.result.then((result) => {
     this.confirmResut = `Closed with: ${result}`;
   }, (reason) => {
     this.confirmResut = `Dismissed with: ${reason}`;
   });
 }

  toggleNavbar() {
    console.log("called");
    this.navbarOpen = !this.navbarOpen;
  }


}
