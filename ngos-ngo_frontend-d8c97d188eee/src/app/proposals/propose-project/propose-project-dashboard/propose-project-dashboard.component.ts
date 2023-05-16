import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PatternService } from '../../../core/services/pattern.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { UserService } from '../../../core/services/user.service';
import { LoginService } from '../../../core/services/login.service';

@Component({
  selector: 'app-propose-project-dashboard',
  templateUrl: './propose-project-dashboard.component.html',
  styleUrls: ['./propose-project-dashboard.component.css']
})
export class ProposeProjectDashboardComponent implements OnInit {
  orgdataRes:any={
    orgInfo:[{}]
  }
  finalData:any=[];
  availableRecords = 0;
  loading = false;
  proposedUser:any={
    "id":""
  };
  projectProposalsList:any=[]
  proposalsList:any=[];
  currentUser:any={};
  success:any;
  danger:any;
  result:any;
  addProjectProposal : FormGroup;
  resultModalRef:any;
  confirmResut:any
  message:any;
  allUsersData:any ={users:[]};
  dropdownSettings : any;
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

  usersList = [
    {
      "id" : "1",
      "name" : "babu"
    },
    {
      "id" : "2",
      "name" : "anitha"
    },
    {
      "id" : "3",
      "name" : "ashok"
    },
    {
      "id" : "4",
      "name" : "akshay"
    },

  ];
      // for Pagination starts
      projectProposalsLength;
      page  = 1;
      pageSize = 10;
      // for Pagination ends
  // projectProposalsList = [
  //   {
  //     "id" : "1",
  //     "projectName":"Equipments for Digital Class Rooms",
  //     "projectType" : "Educational",
  //     "goal" : "45,000",
  //     "location" : "visakhapatnam"
  //   },
  //   {
  //     "id" : "2",
  //     "projectName":"Youth Empowerment",
  //     "projectType" : "Social",
  //     "goal" : "30,000",
  //     "location" : "vizayawada"
  //   },
  //   {
  //     "id" : "3",
  //     "projectName":"Health Check-ups for Senior Citizens",
  //     "projectType" : "Health",
  //     "goal" : "15,000",
  //     "location" : "Khammam"
  //   },


  // ];


  // Error Messages Declaration

  errorMessageProjectNameReq;
  errorMessageProjectNameInvalid;
  errorMessageProjectNameMinMax;
  errorMessageProjectTypeReq;
  errorMessageGoalReq;
  errorMessageLocationReq;
  errorMessageDescriptionReq;
  errorMessageDonationReq;
  praposalPermissions:any = {read:'',write:'',none:'',update:''}
  constructor(private formBuilder : FormBuilder, private patterns : PatternService, private service:UserService, private modalService: NgbModal,private loginService:LoginService) {


    this.errorMessageProjectNameReq = this.patterns.errorMessageProjectNameReq;
    this.errorMessageProjectNameInvalid = this.patterns.errorMessageProjectNameInvalid;
    this.errorMessageProjectNameMinMax = this.patterns.errorMessageProjectNameMinMax;
    this.errorMessageProjectTypeReq = this.patterns.errorMessageProjectTypeReq;
    this.errorMessageGoalReq = this.patterns.errorMessageGoalReq;
    this.errorMessageLocationReq = this.patterns.errorMessageLocationReq;
    this.errorMessageDescriptionReq = this.patterns.errorMessageDescriptionReq;
    this.errorMessageDonationReq = this.patterns.errorMessageDonationReq;
  this.loading = true;
  }

  ngOnInit(): void {
    // this.currentUser = JSON.parse(localStorage.getItem('userToken'));
    // console.log(this.currentUser);
    this.service.getOrgInfo().subscribe(res=>{
      console.log(res);
      this.orgdataRes=res
      console.log(this.orgdataRes); 
    
    },err=>{
      console.log(err.error);
     
    })
    this.currentUser = this.loginService.getToken();
    const roleIDs = this.currentUser.roles;
    console.log(roleIDs);
      this.service.getpermissions(roleIDs).subscribe(res=>{
        const role = res;
        const rolePermissions = role.permissionSet;
        rolePermissions.forEach(element => {
          if(element.permissionsName === 'Request for Proposal'){
            this.praposalPermissions = element.permission
          }
        })
      })


    this.getProposedProjects();
    // this.getUsersData();

    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'firstName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      enableCheckAll: true
    }


    this.addProjectProposal = this.formBuilder.group({
      projectName:new FormControl('',[Validators.required,Validators.pattern(this.patterns.projectNamePattern),Validators.minLength(this.patterns.projectNameMin),Validators.maxLength(this.patterns.projectNameMax)]),
      projectType : new FormControl('',[Validators.required]),
      goal: new FormControl('', [Validators.required,Validators.pattern(this.patterns.goalPattern)]),
      location : new FormControl('',[Validators.pattern(this.patterns.locationName),Validators.required]),
      description : new FormControl('',[Validators.required]),
      details : new FormControl(''),
      proposedUser:new FormControl(''),
      proposedUserName:new FormControl(''),
      // donatedAmount : new FormControl('',[Validators.required]),
      // sourceOfFund : new FormControl(''),
    });

  }



  // getUsersData(){
  //   this.service.allUsers().subscribe(res=>{
  //     this.allUsersData = res;
  //     console.log(this.allUsersData);
  //  },
  //   err=>{
  //     console.log(err.error);
  //     if(err.error.status === 401){
  //       console.log(err.error);

  //     }else{
  //       console.log(err.error);

  //     }

  //   }
  //  )
  // }

  submitProjectProposal(resultModal){
    console.log(this.addProjectProposal.value);
    this.message="Project Proposal Submitted Successfully";
    this.confirm(resultModal);
  }
  openModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl', centered: true })
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
     this.getProposedProjects();
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

 onItemSelect(item: any) {
  console.log(item);
}
onSelectAll(items: any) {
  console.log(items);
}
addProjectProposalData(resultModal){
  this.loading = true;
  this.addProjectProposal.get('proposedUser').setValue( this.currentUser.id);
  this.addProjectProposal.get('proposedUserName').setValue( this.currentUser.userFirstName +' '+ this.currentUser.userLastName);
  console.log(this.currentUser);
  console.log(this.addProjectProposal.value);
  this.service.addProjectPropsal(this.addProjectProposal.value).subscribe(res=>{
  this.loading = false;
    console.log(res);
    this.result=res;
    if(this.result.message="project proposal added successfully"){
      this.success=true;
      this.danger=false;
      this.message="Project proposal added successfully"
this.loading = false;
      this.addProjectProposal.reset();
      this.confirm(resultModal);
   }
    else{
      this.success=false;
      this.danger=true;
      this.message="Cannot add data,try again"
      this.confirm(resultModal);
	  this.loading = false;

    }
  },
    error=>{
     console.log(error.error.message);
    }
  )
}
getProposedProjects(){
  console.log("entered");
  this.proposedUser.id=this.currentUser.id
  this.service.getProposedProjectsByUser(this.proposedUser).subscribe(res=>{
    console.log(res);
    this.proposalsList=res;
    this.projectProposalsList = this.proposalsList.proposedProjects;
    this.projectProposalsLength = this.proposalsList.proposedProjects.length;
  this.loading = false;
  var index = 1;
    this.projectProposalsList.filter(x=>{
      x.index = index;
      index++;
    });
    this.availableRecords= this.projectProposalsList.length
    this.finalData = this.projectProposalsList;
  },
    error=>{
     console.log(error.error.message);
  this.loading = false;

    }
  )
}
search(term: string){
  console.log(term)
  if (!term) {
    this.projectProposalsList = this.finalData;
  } else {
    this.projectProposalsList = this.finalData.filter(x =>       
      x.projectName.trim().toLowerCase().includes(term.trim().toLowerCase())     
    );
   
  }
  this.availableRecords = this.projectProposalsList.length;
}
}
