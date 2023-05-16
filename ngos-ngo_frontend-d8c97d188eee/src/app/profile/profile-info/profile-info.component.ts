import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, NgModel } from '@angular/forms';
import { LoginService } from '../../core/services/login.service';
import {UserService } from '../../core/services/user.service';

import csc from 'country-state-city';
@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {
  orgdataRes:any={
    orgInfo:[{}]
  }
  loading = false;
  checkUser;
  isAdmin = false;
  isMember = false;
  result:any;
  profileForm:FormGroup;
  profileData:any;
  profileInfo:any = {firstName:'',lastName:'',birthday:'',address:'',companyName:'',country:'',email:'',city:'',phone:'',salutation:'',state:'',street:'',summary:'',zipcode:''};
  userToken:any;
  userDetails:any ={profileImage:'',firstName:'',lastName:'',role:{roleName:''},birthDay:'',phone:{phoneNumber:''},email:'',address:'',street:'',description:'',userId:'',accountHolderName:'',accountNumber:'',bankName:'',branchName:'',ifscCode:'',_id:'',gender:'',indiaAccountDetails:[],usaAccountDetails:[]};
  cityDetails:any = {name:''};
  stateDetails:any = {name:''};
  countryDetails:any = {name:''};
  participationCertificates:any;
  ModalRef:any;
  closeResult:any;
  singleCertificateData:any ={userId:'',eventId:'',generatedDate:'',_id:''};
  donationCertificates:any = [];
  singleDonationDetails:any = {memberName:'',memberId:'',projectId:'',dateAdded:''}
  indianAccounts:any ={accountHolderName:'',accountNumber:'',bankName:'',branchName:'',ifscCode:''};
  usaAccounts:any ={accountHolderName:'',accountNumber:'',address:'',routingNumber:''};
  constructor(private modalService: NgbModal,private formBuilder: FormBuilder,private http:HttpClient, private loginService:LoginService, private service:UserService) { 
  this.loading = true;}


  ngOnInit(): void {
    this.service.getOrgInfo().subscribe(res=>{
      console.log(res);
      this.orgdataRes=res
      console.log(this.orgdataRes); 
    
    },err=>{
      console.log(err.error);
     
    })
    this.userToken = this.loginService.getToken();
    this.getCertificates(this.userToken.id);
    this.getDonationCertificates(this.userToken.id)
    this.service.getUserById( this.userToken.id).subscribe(res=>{
      this.loading = false;
    this.userDetails = res;
    const inadianAccount =  this.userDetails.indiaAccountDetails;
      this.indianAccounts =inadianAccount[0]; 
    const usaAccount = this.userDetails.usaAccountDetails;
    this.usaAccounts = usaAccount[0];
    this.cityDetails = csc.getCityById(this.userDetails.city);
    this.stateDetails = csc.getStateById(this.userDetails.state);
    this.countryDetails = csc.getCountryById(this.userDetails.country);
   },err=>{
     console.log(err.error)
   })


    this.profileForm = this.formBuilder.group({
      salutation:[''],
      firstName: ['', Validators.required],
      lastName: [''],
      companyName:[''],
      birthday: [''],
      phone:[''],
      email: [''],
      address:[''],
      street: [''],
      city:[''],
      state:[''],
      country: [''],
      zipcode:[''],
      summary:[''],
      _id:[''],
    });
    
    // this.profiileData();
    
  }

  //get user certificates 
  getCertificates(id){
    const userDetails = {
      userId:''
    }
    userDetails.userId = id;
    this.service.getCertificateByUserId(  userDetails.userId).subscribe(res=>{
      this.participationCertificates = res;
    },err=>{
      console.log(err.error)
    })
  }

  getDonationCertificates(id){
    const userDetails = {
      memberId:''
    }
    userDetails.memberId = id;
    this.service.getDonationByMemberId(userDetails).subscribe(res=>{
      this.donationCertificates = res;
    },err=>{
      console.log(err.error)
    })
  }
  openPreview(previewCertificate,id){
    this.service.getCertificateById(id).subscribe(res=>{
      this.singleCertificateData =res;
      this.openCertificateModal(previewCertificate)
    },err=>{
      console.log(err.error)
    })
  }

  openDonationPreview(previewDonaorCertificate,id){
   
    this.service.getDonationByDonationId(id).subscribe(res=>{
      this.singleDonationDetails = res;
      console.log(this.singleDonationDetails)
    },err=>{
      console.log(err.error)
    })
    this.openCertificateModal(previewDonaorCertificate);
  }

  openCertificateModal(content){
    // console.log("enter the home");
    // this.projectModalRef = this.modalService.open(content ,{ariaLabelledBy: 'modal-basic-title',size: 'xl'});
    // this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size: 'lg'}).result.then((result) => {
    //   this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });
    this.ModalRef = this.modalService.open(content ,{ariaLabelledBy: 'modal-basic-title',size: 'xl'});
    this.ModalRef.result.then((result) => {
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
// profiileData(){
//   this.http.get('http://localhost:3000/members/memberData').subscribe(res=>{
//       console.log(res);
//       this.profileData= res;
//       this.profileInfo =  this.profileData.profile[0];
//       console.log( this.profileInfo);
//       this.profileInfo.birthday = new DatePipe('en-US').transform ( this.profileInfo.birthday, 'yyyy-MM-dd');
//     });
// }
  openModel(updateData) {
    this.modalService.open(updateData, { size: 'lg' });
    // this.http.get('http://localhost:3000/members/memberData').subscribe(res=>{
    //   console.log(res);
    //   this.profileData= res;
    //   this.profileInfo =  this.profileData.profile[0];
    //   console.log( this.profileInfo);
    //   this.profileInfo.birthday = new DatePipe('en-US').transform ( this.profileInfo.birthday, 'yyyy-MM-dd');
    //   this.profileForm = this.formBuilder.group({
    //     salutation:[ this.profileInfo.salutation],
    //     firstName: [this.profileInfo.firstName, Validators.required],
    //     lastName: [this.profileInfo.lastName],
    //     companyName:[this.profileInfo.companyName],
    //     birthday: [this.profileInfo.birthday],
    //     phone:[this.profileInfo.phone],
    //     email: [this.profileInfo.email],
    //     address:[this.profileInfo.address],
    //     street: [this.profileInfo.street],
    //     city:[this.profileInfo.city],
    //     state:[this.profileInfo.state],
    //     country: [this.profileInfo.country],
    //     zipcode:[this.profileInfo.zipcode],
    //     summary:[this.profileInfo.summary],
    //     _id:[this.profileInfo._id],
    //   });
    // });
  }
  updateProfile(){
    console.log(this.profileForm.value);
    // this.http.post('http://localhost:3000/members/addMember',this.profileForm.value).subscribe(res=>{
    //   console.log(res);
    //   this.result = res;
    //   this.profileForm.reset();
    //   console.log(res);
    // });
    console.log(this.profileForm.value._id)
    // this.http.post('http://localhost:3000/members/updateProfile/'+this.profileForm.value._id,this.profileForm.value).subscribe(res=>{
    //       console.log(res);
    //       this.result = res;
    //       // this.profileForm.reset();
    //       console.log(res);
    //     });

  }

}
