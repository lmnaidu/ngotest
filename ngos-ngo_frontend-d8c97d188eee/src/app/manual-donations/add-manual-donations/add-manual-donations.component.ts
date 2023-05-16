import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, Form } from '@angular/forms';
import { PatternService } from '../../core/services/pattern.service';
import { UserService} from '../../core/services/user.service'

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-add-manual-donations',
  templateUrl: './add-manual-donations.component.html',
  styleUrls: ['./add-manual-donations.component.css']
})
export class AddManualDonationsComponent implements OnInit {
  orgdataRes:any={
    orgInfo:[{}]
  }
  availableRecords = 0;
  finalData:any=[]
  dollarInINR:any;
  viewDonationData:any={};
  donationsLength;
  page  = 1;
  loading = false;
  pageSize = 10;
  userInfo:any={};
  addSuccess:boolean=false;
  addDanger:boolean=false;
  project:any={
    "projectId":''
  };
  activityList:any=[]
  activitySettings:any;
  userSettings:any;
  allUsersData:any=[]
  usersList:any=[]
  manualDonationForm:FormGroup;
  editDonationForm:FormGroup;
  addNameForm:FormGroup;
  resultModal:any;
  message:any;
  resultModalRef:any;
  confirmResult:any;
  projectsList:any={}
  // error message declaration
  errorMessageAmountReq;
  errorMessageAmountInvalid;
  errorMessageDescriptionReq;
  errorMessageDescriptionMinMax;
  errorMessageDescriptionInvalid;
  errorMessageFirstNameReq;
  errorMessageFirstNameMinMax;
  errorMessageFirstNameInvalid;
  errorMessagelastNameReq;
  errorMessagelastNameInvalid;
  errorMessagelastNameMinMax;
  errorMessagePhnoReq;
  errorMessagePhnoInvalid;
  errorMessageEmailReq;
  errorMessageEmailInvalid;
  errorMessageName;
  errorMessageProjectNameReq;
  errorMessageModeOfDonations;




  manualDonationsList = [
  ];

  membersList = [
    {
      "id" : "1",
      "name" : "John"
    },
    {
      "id" : "2",
      "name" : "Andrew"
    },
    {
      "id" : "3",
      "name" : "Rakesh"
    },

  ]
  projectList = [
    {
      "id" : "1",
      "name" : "Adopt a school in Khammam"
    },
    {
      "id" : "2",
      "name" : "Cheyutha"
    },
    {
      "id" : "3",
      "name" : "Aalambana"
    },

  ]

  modeOfDonaitons = [
    {
      "id" : "1",
      "name" : "Cheque"
    },
    {
      "id" : "2",
      "name" : "Online Payment"
    },
    {
      "id" : "3",
      "name" : "Bank Transfer"
    },
    {
      "id" : "4",
      "name" : "Hand Cash"
    },
    {
      "id" : "5",
      "name" : "Others"
    },

  ]

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder , private patternService : PatternService,private service:UserService) {
    this.errorMessageAmountReq = this.patternService.errorMessageAmountReq;
    this.errorMessageAmountInvalid = this.patternService.errorMessageAmountInvalid;
    this.errorMessageDescriptionReq = this.patternService.errorMessageDescriptionReq;
    this.errorMessageDescriptionMinMax = this.patternService.errorMessageDescriptionMinMax;
    this.errorMessageFirstNameReq = this.patternService.errorMessageFirstNameReq;
    this.errorMessageFirstNameMinMax = this.patternService.errorMessageFirstNameMinMax;
    this.errorMessageFirstNameInvalid = this.patternService.errorMessageFirstNameInvalid;
    this.errorMessagelastNameReq = this.patternService.errorMessagelastNameReq;
    this.errorMessagelastNameInvalid = this.patternService.errorMessagelastNameInvalid;
    this.errorMessagelastNameMinMax =  this.patternService.errorMessagelastNameMinMax;
    this.errorMessagePhnoReq = this.patternService.errorMessagePhnoReq;
    this.errorMessagePhnoInvalid = this.patternService.errorMessagePhnoInvalid;
    this.errorMessageEmailReq = this.patternService.errorMessageEmailReq;
    this.errorMessageEmailInvalid = this.patternService.errorMessageEmailInvalid;
    this.errorMessageName = this.patternService.errorMessageName;
    this.errorMessageProjectNameReq = this.patternService.errorMessageProjectNameReq;
    this.errorMessageModeOfDonations = this.patternService.errorMessageModeOfDonations;
    this.errorMessageDescriptionInvalid = this.patternService.errorMessageDescriptionInvalid;
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
    this.manualDonationForm = this.formBuilder.group({
      userName : new FormControl('',[Validators.required]),
      projectId : new FormControl('',[Validators.required]),
      modeOfDonations : new FormControl('',[Validators.required]),
      amount : new FormControl('',[Validators.required, Validators.pattern(this.patternService.goalPattern)]),
      description : new FormControl('', ),
      selectedActivities:new FormControl(''),
      valInDollar:[''],
      checqueNo:['']

      // [Validators.maxLength(this.patternService.activityDescriptionMaxLength), Validators.minLength(this.patternService.activityDescriptionMinLength)]
    });
    this.editDonationForm = this.formBuilder.group({
      userName : new FormControl('',[Validators.required]),
      projectId : new FormControl('',[Validators.required]),
      modeOfDonations : new FormControl('',[Validators.required]),
      amount : new FormControl('',[Validators.required, Validators.pattern(this.patternService.goalPattern)]),
      description : new FormControl('', ),
      selectedActivities:new FormControl(''),
      objId:new FormControl(''),
      valInDollar:['']

      // [Validators.maxLength(this.patternService.activityDescriptionMaxLength), Validators.minLength(this.patternService.activityDescriptionMinLength)]
    });

    this.addNameForm = this.formBuilder.group({
      firstName : new FormControl( '',[ Validators.required, Validators.pattern(this.patternService.firstNamePattern),Validators.minLength(this.patternService.firstNameMinLength),Validators.maxLength(this.patternService.firstNameMaxLength) ]),
      lastName : new FormControl( '',[ Validators.required, Validators.pattern(this.patternService.lastNamePattern),Validators.minLength(this.patternService.lastNameMinLength),Validators.maxLength(this.patternService.lastNameMaxLength) ]),
      phoneNumber : new FormControl('',[Validators.required]),
      email : new FormControl('',[Validators.required]),

    });
    this.userSettings = {
      singleSelection: true,
      idField: '_id',
      textField: 'fullName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      enableCheckAll: false
    }
    this.activitySettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'activityName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      enableCheckAll: true
    }
    this.getCurrency();
    this.getUsersData();
    this.getAllProjects();
    this.getManualDonations();
  }

  openSmModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'sm', centered: true })
    .result.then((result) => {
      console.log(result);
    }, (reason) => {
      console.log('Err!', reason);
    });
  }

  openLgModal(content) {
    // this.manualDonationForm.reset()
    this.manualDonationForm = this.formBuilder.group({
      userName : new FormControl('',[Validators.required]),
      projectId : new FormControl('',[Validators.required]),
      modeOfDonations : new FormControl('',[Validators.required]),
      amount : new FormControl('',[Validators.required, Validators.pattern(this.patternService.goalPattern)]),
      description : new FormControl('', ),
      selectedActivities:new FormControl(''),
      valInDollar:[''],
      checqueNo:['']

    });
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true })
    .result.then((result) => {
      console.log(result);
    }, (reason) => {
      console.log('Err!', reason);
    });
  }

  onManualDonate(resultModal){
    this.loading = true;
    console.log(this.manualDonationForm.value);
    let valInDollar=this.manualDonationForm.value.amount/this.dollarInINR
    valInDollar=Math.floor(valInDollar*100)/100
    this.manualDonationForm.get('valInDollar').setValue(valInDollar);
    this.service.addManualDonation(this.manualDonationForm.value).subscribe(res=>{
      console.log(res);
      this.loading = false;
      let addRes:any={
      }
      addRes=res
      if(addRes.message=="Donation added successfully"){
        this.addSuccess=true;
        this.addDanger=false;
        this.message="Donation added successfully"
        this.confirm(resultModal);

        // this.manualDonationForm = this.formBuilder.group({
        //   userName :[''],
        //   projectId : [''],
        //   modeOfDonations : [''],
        //   amount :[''],
        //   description : [''],
        //   selectedActivities:[''],
        // });
        // this.manualDonationForm.get('userName').setValue('');
        // this.manualDonationForm.get('projectId').setValue('');
        // this.manualDonationForm.get('modeOfDonations').setValue('');
        // this.manualDonationForm.get('amount').setValue('');
        // this.manualDonationForm.get('description').setValue('');
        // this.manualDonationForm.get('selectedActivities').setValue('');
        this.activityList=[];
        this.getManualDonations();

      }
      else{
        this.addSuccess=false;
        this.addDanger=true;
        this.message="Cannot add data,try again"
        this.confirm(resultModal);
      }
    })
  }
  editManualDonate(resultModal){
    this.loading = true;
    console.log(this.editDonationForm.value);
    this.service.editManualDonations(this.editDonationForm.value).subscribe(res=>{
      this.loading = false;
      console.log(res);
      let addRes:any={
      }
      addRes=res
      if(addRes.message=="Donation updated successfully"){
        this.addSuccess=true;
        this.addDanger=false;
        this.message="Donation updated successfully"
        this.confirm(resultModal);
        this.getManualDonations();
      }
      else{
        this.addSuccess=false;
        this.addDanger=true;
        this.message="Cannot add data,try again"
        this.confirm(resultModal);
      }
    })
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

 addNameManually(resultModal){
  console.log(this.addNameForm.value);
  this.message="Name Addded Successfully";
    this.confirm(resultModal);

 }
 getAllProjects(){
  this.service.getAllProjects().subscribe(res=>{
    console.log(res);
    this.projectsList=res;
  })

}
getUsersData(){
  this.service.allUsers().subscribe(res=>{
    this.allUsersData = res;

    this.usersList = this.allUsersData.users;
    this.usersList.forEach(ele => {
      ele.fullName=ele.firstName + ' ' + ele.lastName
    });

    console.log(this.usersList);
 },
  err=>{
    console.log(err.error);
    if(err.error.status === 401){
      console.log(err.error);
      // this.router.navigate(['/authorization/login']).then(() => {
      //    window.location.reload();
      // });
    }else{
      console.log(err.error);
    //   this.router.navigate(['/authorization/login']).then(() => {
    //     window.location.reload();
    // });
    }

  }
 )
}
onItemSelect(item: any) {
}
onItemDeSelect(items: any) {
}
onactivitySelect(items: any) {
}
onactivityDeSelect(items: any) {
}
addActivities(event){
  this.loading=true
  console.log(event);
  this.project.projectId=event;
  this.activityList=[];
  this.manualDonationForm.get('selectedActivities').setValue('');
  this.service.getProject(this.project).subscribe(res=>{
    this.loading=false
    console.log(res);
    let proRes:any={

    } ;
    proRes=res
    if(proRes.activities.length){
    this.activityList=proRes.activities[0].activities;
    }
  },
  err=>{
    console.log(err.error);

  }
  )
}
editActivities(event){
  this.loading=true
  console.log(event);
  this.project.projectId=event;
  this.activityList=[];
  this.editDonationForm.get('selectedActivities').setValue('');
  this.service.getProject(this.project).subscribe(res=>{
    this.loading=false
    console.log(res);
    let proRes:any={

    } ;
    proRes=res
    this.activityList=proRes.activities[0].activities;
  },
  err=>{
    console.log(err.error);

  }
  )
}
getManualDonations(){
  this.service.getManualDonations().subscribe(res=>{
    console.log(res);
    this.loading = false;
    let donRes:any={

    }
    donRes=res
    this.manualDonationsList=donRes.donation;
    this.donationsLength = this.manualDonationsList.length;
    console.log(this.donationsLength);
    var index = 1;
    this.manualDonationsList.filter(x=>{
      x.index = index;
      index++;
    });
    this.availableRecords= this.manualDonationsList.length
    this.finalData = this.manualDonationsList;
  })
}
openEditModal(openEditModal,donationData){
  console.log( donationData)
  this.editDonationForm.get('userName').setValue(donationData.userName);
  this.editDonationForm.get('projectId').setValue(donationData.projectId._id);
  this.editActivities(donationData.projectId._id)
  if(donationData.activities[0].activityName){
    console.log("enter1")
    this.editDonationForm.get('selectedActivities').setValue(donationData.activities);
  }


  this.editDonationForm.get('modeOfDonations').setValue(donationData.modeOfDonations);
  this.editDonationForm.get('amount').setValue(donationData.amount);
  this.editDonationForm.get('description').setValue(donationData.description);
  this.editDonationForm.get('objId').setValue(donationData._id);
  console.log( this.editDonationForm.value)
  this.modalService.open(openEditModal, { ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true })
  .result.then((result) => {
    console.log(result);
  }, (reason) => {
    console.log('Err!', reason);
    this.loading = false;
  });


}
openViewModal(openViewModal,donationData){
  this.viewDonationData=donationData
  this.modalService.open(openViewModal, { ariaLabelledBy: 'modal-basic-title', size: 'md', centered: true })
  .result.then((result) => {
    console.log(result);
  }, (reason) => {
    console.log('Err!', reason);
  });


}
openActivity(donatedActivities){
  this.modalService.open(donatedActivities, { ariaLabelledBy: 'modal-basic-title', size: 'md', centered: true })
  .result.then((result) => {
    console.log(result);
  }, (reason) => {
    console.log('Err!', reason);
  });


}
getCurrency(){
  this.service.getCurrency('USD').subscribe(res=>{
   console.log(res);
   let currencyResult:any={

   }=res;
   this.dollarInINR=currencyResult.rates.INR;
   this.dollarInINR=Math.floor(this.dollarInINR*100)/100
   console.log(this.dollarInINR);

  })
}
search(term: string){
  console.log(term)
  if (!term) {
    this.manualDonationsList = this.finalData;
  } else {
    this.manualDonationsList = this.finalData.filter(x =>       
      x.memberName.trim().toLowerCase().includes(term.trim().toLowerCase())     
    );

   
  }
  this.availableRecords = this.manualDonationsList.length;
}
}
