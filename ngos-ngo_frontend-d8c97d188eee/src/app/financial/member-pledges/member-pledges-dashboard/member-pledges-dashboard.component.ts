import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PatternService } from '../../../core/services/pattern.service';
//import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../../core/services/login.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-member-pledges-dashboard',
  templateUrl: './member-pledges-dashboard.component.html',
  styleUrls: ['./member-pledges-dashboard.component.css']
})
export class MemberPledgesDashboardComponent implements OnInit {
  resultModal:any;
  loading = false;
  orgdataRes:any={
    orgInfo:[{}]
  }
  message:any;
  resultModalRef:any;
  confirmResult:any;
  checkUser;
  isAdmin = false;
  isMember = false;
  closeResult:any;

  confirmResut:any;
  userToken:any;
  membername;
  addPledgesForm : FormGroup;
myPledgesList = [
  {
    "id" : "1",
    "pledgeInfo" : "Child Education",
    "donationFrequency" : "One Time",
    "amount" : "$500",
    "date" : "09-01-2020",
  },
  {
    "id" : "2",
    "pledgeInfo" : "Constructing a building for old age people",
    "donationFrequency" : "Monthly",
    "amount" : "$300",
    "date" : "25-08-2020",
  },
  {
    "id" : "3",
    "pledgeInfo" : "Adopt a school in Khammam",
    "donationFrequency" : "One Time",
    "amount" : "$600",
    "date" : "15-02-2021",
  },

]
// pledges list for admin login
PledgesList = [
  {
    "id" : "1",
    "memberName" : "Rakesh Malladi",
    "pledgeInfo" : "Child Education",
    "donationFrequency" : "One Time",
    "amount" : "$500",
    "date" : "09-01-2020",
  },
  {
    "id" : "2",
    "memberName" : "Surya batla",
    "pledgeInfo" : "Constructing a building for old age people",
    "donationFrequency" : "Monthly",
    "amount" : "$300",
    "date" : "25-08-2020",
  },
  {
    "id" : "3",
    "memberName" : "Kiran dhuvi",
    "pledgeInfo" : "Adopt a school in Khammam",
    "donationFrequency" : "One Time",
    "amount" : "$600",
    "date" : "15-02-2021",
  },

]

pledgePermissions:any = { none:'',read:'',write:'',update:''}
constructor(private formBuilder : FormBuilder, private patterns : PatternService, private modalService: NgbModal,private _router:Router, private loginService:LoginService,private service:UserService) {
  this.loading = true;

 }

  ngOnInit(): void {
    this.service.getOrgInfo().subscribe(res=>{
      // console.log(res);
      this.orgdataRes=res
      // console.log(this.orgdataRes); 
    
    },err=>{
      console.log(err.error);
     
    })
      this.addPledgesForm = this.formBuilder.group({
      pledgeInfo : new FormControl(''),
      pledgeAmount : new FormControl(''),
      donationFrequency : ['oneTime',Validators.required],
      date: new FormControl(''),

    })
    this.userToken = this.loginService.getToken();
    const roleIDs = this.userToken.roles;
    // console.log(roleIDs);
      this.service.getpermissions(roleIDs).subscribe(res=>{
  this.loading = true;
        const role = res;
        const rolePermissions = role.permissionSet;
        rolePermissions.forEach(element => {
          if(element.permissionsName === 'Pledges'){
            this.pledgePermissions = element.permission
          }
        })
      })
    // this block for nav links permission based on usertype
    this.checkUser = localStorage.getItem('usertype');
    //var currentUserType = this.checkUser;
    console.log('check User ' + this.checkUser);
    if( this.checkUser === "admin"){
      this.isAdmin =true;
  
    }
    else if(this.checkUser === "member"){
      this.isMember=true;
    }
    // Ends Here
  }

  openXLModal(content){
    
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size: 'xl'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  
  }
  openMDModal(content){
    
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size: 'md'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  
  }

  onAddPledgesSubmit(resultModal){
    // console.log(this.addPledgesForm.value);
    this.message="Pledges Added Successfully";
    this.confirm(resultModal);
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
}
