import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PatternService } from '../../../core/services/pattern.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../../../core/services/login.service';
import {UserService } from '../../../core/services/user.service';
import { interval, Subscription } from 'rxjs';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-request-project-dashboard',
  templateUrl: './request-project-dashboard.component.html',
  styleUrls: ['./request-project-dashboard.component.css']
})



export class RequestProjectDashboardComponent implements OnInit {
  orgdataRes:any={
    orgInfo:[{}]
  }
  finalData:any=[];
  availableRecords = 0;
  loading = false;
  addSuccess:boolean=false;
  addDanger:boolean=false;
  updateRes:any;
  projectData:any={};
  projectDetails:any={
    "projectName":'',
    "projectType":'',
    "projectDetails":'',
    "proposedUserName":'',
    "projectGoal":'',
    "projectLocation":'',
    "dateAdded":'',
    "projectDescription":'',
    "_id":''
  };
  viewModalRef:any;
  allProposedProjects;
  result:any={};
  addProjectRequest : FormGroup;
  resultModalRef:any;
  confirmResut:any
  message:any;
  errorMessageProjectNameReq;
  errorMessageProjectNameInvalid;
  errorMessageProjectNameMinMax;
  errorMessageProjectTypeReq;
  errorMessageGoalReq;
  errorMessageLocationReq;
  errorMessageDescriptionReq;
        // for Pagination starts
        allProposedProjectsLength;
        page  = 1;
        pageSize = 10;
        // for Pagination ends
  subscription:Subscription
  
  projectTypes=[
    {
      "id":"1",
      "name":"Educational"
    },
    {
      "id":"2",
      "name":"Health"
    },
    {
      "id":"3",
      "name":"Social"
    }
  ];
  actionTypes=[
    {
      "id":"1",
      "name":"Proposal"
    },
    {
      "id":"2",
      "name":"Accept"
    },
    {
      "id":"3",
      "name":"On Hold"
    },
    {
      "id":"4",
      "name":"Reject"
    }
  ]
  requestProposalsList = [
    {
      "id" : "1",
      "projectName":"Books Distribution",
      "projectType" : "Educational",
      "proposerName":"Anita",
      "goal" : "35,000",
      "location" : "visakhapatnam"
    },
    {
      "id" : "2",
      "projectName":"Adopt A School",
      "projectType" : "Educational",
      "proposerName":"Sunita",
      "goal" : "50,000",
      "location" : "vizayawada"
    },
    {
      "id" : "3",
      "projectName":"Health Check-ups for Senior Citizens",
      "projectType" : "Health",
      "proposerName":"Rajeev",
      "goal" : "15,000",
      "location" : "Khammam"
    },


  ];


  constructor(private formBuilder : FormBuilder, private patterns : PatternService, private modalService: NgbModal,private service:UserService) { 
    this.errorMessageProjectNameReq = this.patterns.errorMessageProjectNameReq;
    this.errorMessageProjectNameInvalid = this.patterns.errorMessageProjectNameInvalid;
    this.errorMessageProjectNameMinMax = this.patterns.errorMessageProjectNameMinMax;
    this.errorMessageProjectTypeReq = this.patterns.errorMessageProjectTypeReq;
    this.errorMessageGoalReq = this.patterns.errorMessageGoalReq;
    this.errorMessageLocationReq = this.patterns.errorMessageLocationReq;
    this.errorMessageDescriptionReq = this.patterns.errorMessageDescriptionReq;
  
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
    this.getAllProposalProjects();
    const source = interval(25000);
    const text="entered"
    this.subscription = source.subscribe(val => this.getAllProposalProjects());
    this.addProjectRequest = this.formBuilder.group({
      projectName:new FormControl('',[Validators.required,Validators.pattern(this.patterns.projectNamePattern),Validators.minLength(this.patterns.projectNameMin),Validators.maxLength(this.patterns.projectNameMax)]),
      projectType : new FormControl('',[Validators.required]),
      goal: new FormControl('', [Validators.required,Validators.pattern(this.patterns.goalPattern)]),
      location : new FormControl('',[Validators.pattern(this.patterns.locationName),Validators.required]),
      description : new FormControl('',[Validators.required]),
      details : new FormControl(''),
     
    });
  }

  
  submitProjectProposal(resultModal){
    console.log(this.addProjectRequest.value);
    this.message="Project Request Submitted Successfully";
    this.confirm(resultModal);
  }
  openModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true })
    .result.then((result) => {
      console.log(result);
    }, (reason) => {
      console.log('Err!', reason);
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

  viewProposals() {
  
      this.modalService.dismissAll();
     
  }
  confirm(resultModal) {
    this.resultModalRef = this.modalService.open(resultModal , { ariaLabelledBy: 'modal-basic-title', centered: true,size:'sm' });
    this.resultModalRef.result.then((result) => {
     this.confirmResut = `Closed with: ${result}`;
   }, (reason) => {
     this.confirmResut = `Dismissed with: ${reason}`;
   });
 }
 openView(viewModal) {
  this.viewModalRef = this.modalService.open(viewModal , { ariaLabelledBy: 'modal-basic-title', centered: true,size:'md' });
  this.viewModalRef.result.then((result) => {
   this.confirmResut = `Closed with: ${result}`;
 }, (reason) => {
   this.confirmResut = `Dismissed with: ${reason}`;
 });
}
 getAllProposalProjects() {
  this.service.getProposedProjects().subscribe(res=>{
    console.log(res);
    this.result=res;
    this.allProposedProjects = this.result.proposedProjects;
    console.log(this.allProposedProjects);
    this.allProposedProjectsLength = this.allProposedProjects.length;
    console.log(this.allProposedProjectsLength);
    this.loading = false;

    var index = 1;
    this.allProposedProjects.filter(x=>{
      x.index = index;
      index++;
    });
    this.availableRecords= this.allProposedProjects.length
    this.finalData = this.allProposedProjects;
  },
    error=>{
     console.log(error.error.message); 
    }  
  )
  console.log("text");
}
ngOnDestroy() {
  this.subscription.unsubscribe();
}
openViewModal(viewModal,projectName,projectType,proposedUserName,projectGoal,projectLocation,dateAdded,projectDescription,projectStage,proId){
  console.log(projectStage);
  this.projectDetails.projectName=projectName;
  this.projectDetails.projectType=projectType;
  this.projectDetails.proposedUserName=proposedUserName;
  this.projectDetails.projectGoal=projectGoal;
  this.projectDetails.projectLocation=projectLocation;
  this.projectDetails.dateAdded=dateAdded;
  this.projectDetails.projectDescription=projectDescription;
  this.projectDetails._id=proId;
  // this.projectDetails=this.result.proposedProjects[index];
  this.projectData.projectAction=projectStage
  this.openView(viewModal);
}
updateStage(resultModal){
  this.projectDetails.projectStage=this.projectData.projectAction;
  this.service.updateAction( this.projectDetails).subscribe(res=>{
    console.log(res);
    this.updateRes=res
    if(this.updateRes.message="Data updated Succesfully"){
      this.addSuccess=true;
      this.message="Data updated successfully"
      this.confirm(resultModal);
   }
   else{
     this.addDanger=true;
     this.message="Cannot update data,try again"
     this.confirm(resultModal);

   }
  },
    error=>{
     console.log(error.error.message); 
    }  
  )
  console.log("text");


}
viewProposedProjects(){
  this.getAllProposalProjects();
  this.resultModalRef.close();

}
search(term: string){
  console.log(term)
  if (!term) {
    this.allProposedProjects = this.finalData;
  } else {
    this.allProposedProjects = this.finalData.filter(x =>       
      x.projectName.trim().toLowerCase().includes(term.trim().toLowerCase())     
    );

   
  }
  this.availableRecords = this.allProposedProjects.length;
}

}
