import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup,FormControl, FormBuilder, Validators,FormArray } from '@angular/forms';
import { LoginService} from '../../../core/services/login.service';
import { Location, DatePipe } from '@angular/common';

@Component({
  selector: 'app-sponsor-company',
  templateUrl: './sponsor-company.component.html',
  styleUrls: ['./sponsor-company.component.css']
})
export class SponsorCompanyComponent implements OnInit {
  orgdataRes:any={
    orgInfo:[{}]
  }
  companyEditModalRef:any;
  active:"1";
  companyIndex:any;
  viewModalRef:any;
  membersList:any=[]
  members:FormGroup;
  companyAddForm:FormGroup
  message:any;
  confirmResut:any;
  resultModalRef:any;
  closeResult:any;
  companyModalRef:any;
  companies=[
    {
      "id":"1",
      "companyName":"Techno Soft",
      "loaction":"Aurora-USA",
      "partners":"BA Solutions",
      "amount":"2600$",
      "members":[
        {  "id":"1",
          "firstName":"John",
          "lastName":"Wick",
          "email":"john@gmail.com",
          "primaryContact":"yes"
        },
        {
          "id":"2",
          "firstName":"Will",
          "lastName":"Smitch",
          "email":"will@gmail.com",
          "primaryContact":"no"
        },
        {
          "id":"3",
          "firstName":"Emma",
          "lastName":"Wick",
          "email":"emma@gmail.com",
          "primaryContact":"yes"
        }
      ]
    },
    {
      "id":"2",
      "companyName":"Soft Solutions",
      "loaction":"illinois-USA",
      "partners":"BA Solutions",
      "amount":"6000$",
      "members":[
        {  "id":"1",
          "firstName":"John",
          "lastName":"Wick",
          "email":"john@gmail.com",
          "primaryContact":"yes"
        },
        {
          "id":"2",
          "firstName":"Will",
          "lastName":"Smitch",
          "email":"will@gmail.com",
          "primaryContact":"no"
        },
        {
          "id":"3",
          "firstName":"Emma",
          "lastName":"Wick",
          "email":"emma@gmail.com",
          "primaryContact":"yes"
        }
      ]
    },
    {
      "id":"3",
      "companyName":"Techno Sol",
      "loaction":"Aurora-USA",
      "partners":"BA Solutions",
      "amount":"5600$",
      "members":[
        {  "id":"1",
          "firstName":"John",
          "lastName":"Wick",
          "email":"john@gmail.com",
          "primaryContact":"yes"
        },
        {
          "id":"2",
          "firstName":"Will",
          "lastName":"Smitch",
          "email":"will@gmail.com",
          "primaryContact":"no"
        },
        {
          "id":"3",
          "firstName":"Emma",
          "lastName":"Wick",
          "email":"emma@gmail.com",
          "primaryContact":"yes"
        }
      ]
    }
  ];
  userToken:any;
  constructor(private modalService: NgbModal,private formBuilder:FormBuilder, private loginService:LoginService) { }

  ngOnInit(): void {
    this.companyAddForm = this.formBuilder.group({
      members:this.formBuilder.array([ this.createMember()]),
    });
    this.userToken = this.loginService.getToken();
  }
  createMember(){
    return this.formBuilder.group({
      firstName:'',
      lastName: '',
      email:''
    });
  }
 
  openSponsorCompanyModal(){

  }
  
  openEditModal(editCompany,index){
    this.companyIndex=index
    this.companyEditModalRef = this.modalService.open(editCompany ,{ariaLabelledBy: 'modal-basic-title',size: 'xl'});
    this.companyEditModalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  addMemberRow(){
    this.membersList = this.companyAddForm.get('members') as FormArray;
    // console.log(this.projectActivities);
    // this.projectActivities.value[this.projectActivities.length-1].prev=true;
    this.membersList.push(this.createMember());

  }
  deleteMemberRow(){
    this.membersList = this.companyAddForm.get('members') as FormArray;
    this.membersList.removeAt(this.membersList.length - 1);
    
  }

  
  openCompanyModal(addCompany){
    this.companyModalRef = this.modalService.open(addCompany ,{ariaLabelledBy: 'modal-basic-title',size: 'xl'});
    this.companyModalRef.result.then((result) => {
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
 addSponsorCompany(resultModal){
  this.message="Company Added Successfully.";
  this.confirm(resultModal);

 }
 confirm(resultModal) {
  this.resultModalRef = this.modalService.open(resultModal , { ariaLabelledBy: 'modal-basic-title', centered: true,size:'sm' });
  this.resultModalRef.result.then((result) => {
   this.confirmResut = `Closed with: ${result}`;
 }, (reason) => {
   this.confirmResut = `Dismissed with: ${reason}`;
 });
}
openViewSponsor(modal,index){
  this.companyIndex=index
  this.viewModalRef = this.modalService.open(modal , { ariaLabelledBy: 'modal-basic-title', centered: true,size:'xl' });
  this.viewModalRef.result.then((result) => {
   this.confirmResut = `Closed with: ${result}`;
 }, (reason) => {
   this.confirmResut = `Dismissed with: ${reason}`;
 });

}

}


