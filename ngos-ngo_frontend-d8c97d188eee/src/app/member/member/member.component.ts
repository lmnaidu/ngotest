import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PatternService } from '../../core/services/pattern.service';
//import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgWizardConfig, THEME, StepChangedArgs, NgWizardService } from 'ng-wizard';
import { Location, DatePipe } from '@angular/common';
import { UserService} from '../../core/services/user.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';

import { LoginService } from '../../core/services/login.service';
import csc from 'country-state-city';
import ifsc from 'ifsc-finder';
@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  userPermissions:any = {read:'',write:'',update:''};
  orgdataRes:any={
    orgInfo:[{}]
  }
  memberList:any=[];
  allMembersList:any = [];
  memberFirstName;
  memberLastName;
  memberFullName;
  memberEmail;

  loading = false;
  

  // for Pagination starts
  membersLength : number;
  page  = 1;
  pageSize = 10;
  // for Pagination ends

  // Error Messages Declaration

  errorMessageSalutationReq;
  errorMessageFirstNameReq;
  errorMessageFirstNameMinMax;
  errorMessageFirstNameInvalid;
  errorMessagelastNameReq;
  errorMessagelastNameInvalid;
  errorMessagelastNameMinMax;
  errorMessageCompanyNameReq;
  errorMessageReferedByReq;
  errorMessagePreferredPhNoReq;
  errorMessagePhnoReq;
  errorMessagePhnoInvalid;
  errorMessagePreferredEmailReq;
  errorMessageEmailReq;
  errorMessageEmailInvalid;
  errorMessageAddressReq;
  errorMessageAddressInvalid;
  errorMessageAddressMinMax;
  errorMessageCityReq;
  errorMessageCountryReq;
  errorMessageZipCodeReq;
  errorMessageZipCodeInvalid;
  errorMessageStreetReq;
  errorMessageStateReq;
  errorMessageAccountNumberReq;
  errorMessageAccountNumberInvalid;
  errorMessageAccountNameReq;
  errorMessageAccountNameInvalid;
  errorMessageBankNameReq;
  errorMessageBankNameKInvalid;
  errorMessageChapterNameReq;
  errorMessageChapterNameInvalid;
  errorMessageIFSCcodeReq;
  errorMessageIFSCcodeInvalid;
  errorMessagePasswordReq;
  errorMessageUSARoutingNumberInvalid;
  errorMessageUSAAccountNumberInvalid;

  errorMessageBranchNameInvalid:any;
  errorMessageBranchNameReq:any;



  projectsData:any = {Projects:[]};
  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.arrows,
    toolbarSettings: {
      // toolbarExtraButtons: [
      //    { text: 'Finish', class: 'btn btn-info', event: () => { alert("Finished!!!"); } } ]
      showNextButton:false,
      showPreviousButton:false
    },
   
  };
  donationTimeLine:any=true;
  activityTimeLine:any=false;
  closeResult:any;
  resultModalRef:any;
  resultModal:any;
  confirmResut:any
  message:any;
  memberModalRef:any;
  memberIndex:any;
  // Forms Declaration
  addMemberPersonalDetails : FormGroup;
  addMemberContactDetails : FormGroup;
  addMemberAccountDetails : FormGroup;
  editMemberPersonalDetails : FormGroup;
  editMemberContactDetails : FormGroup;
  editMemberAccountDetails : FormGroup;
  addPledgesForm : FormGroup;
  salutationList = [
    {
      "id" : "1",
      "name" : "Mr.",
    },
    {
      "id" : "2",
      "name" : "Ms.",
    },
    {
      "id" : "3",
      "name" : "Mrs.",
    },
    {
      "id" : "4",
      "name" : "Dr.",
    },
    {
      "id" : "5",
      "name" : "Mr.",
    },
    {
      "id" : "6",
      "name" : "Prof.",
    },
    {
      "id" : "7",
      "name" : "Mx.",
    },
  ]
  componiesList = [
    {
      "id" : "1",
      "name" : "IBQ"
    },
    {
      "id" : "2",
      "name" : "Smartzen"
    },
    {
      "id" : "3",
      "name" : "Media3"
    },
    {
      "id" : "4",
      "name" : "Wipro"
    },
    {
      "id" : "5",
      "name" : "Tech Mahindra"
    },
    {
      "id" : "6",
      "name" : "Tata Consultancy Services"
    },
    {
      "id" : "7",
      "name" : "Infosys"
    },
  ]

  referredBy = [
    {
      "id" : "1",
      "name" : "Babu"
    },
    {
      "id" : "2",
      "name" : "Nageswara Rao"
    },
    {
      "id" : "3",
      "name" : "Raghav"
    },
  ]

  preferredPhone = [
    {
      "id" : "1",
      "name" : "Home"
    },
    {
      "id" : "2",
      "name" : "Work"
    },
    {
      "id" : "3",
      "name" : "Mobile"
    },
    {
      "id" : "4",
      "name" : "Others"
    },
  ]

  preferredEmail = [
    {
      "id" : "1",
      "name" : "Personal"
    },
    {
      "id" : "2",
      "name" : "Work"
    },
    {
      "id" : "3",
      "name" : "Alternate"
    },
  
  ]

  membersList = [
    {
      "id" : "1",
      "memberName" : "Krishna Rao",
      "companyName" :  "Smartzen",
      "country" : "India",
      "referedBy" : "Babu",
      "profileBanner" : "assets/images/profileimages/helping_hands.jpg",
      "birthDate" : "07/22/1977",
      "phoneNumber" : "9685747845",
      "streetAddress" : "Prakash Nagar",
      "city" : "Prakasham",
      "state" : "Andhrapradesh",
      "description" : "Our vision is a world where those who are affected by the crisis exercise their voice, build their own solutions and take ownership of their future, and for civil society local organizations to have sufficient capacity, competence and tools to make effective change on the ground.",
      "projects" : [
        {
          "id" : "1",
          "projectName" : "Adopt a school in Khammam",
          "startDate" : "05-16-2019",
          "endDate" : "12-13-2019",
          "donatedAmount" : "$3,000"
        }
      ]

    },
    {
      "id" : "2",
      "memberName" : "Raghava",
      "companyName" : "Smart Technologies",
      "country" : "India",
      "referedBy" : "Nageswara Rao",
      "profileBanner" : "assets/images/profileimages/helpingHandsPic2.png",
      "birthDate" : "07/10/1985",
      "phoneNumber" : "8985747895",
      "streetAddress" : "Sundar Takies Road",
      "city" : "Khammam",
      "state" : "Telangana",
      "description" : "Approximately 1.5 million NGOs operate in the United States. These NGOs undertake a wide array of activities, including political advocacy on issues such as foreign policy, elections, the environment, healthcare, women's rights, economic development, and many other issues.",
      "projects" : [
        {
          "id" : "1",
          "projectName" : "Constructing a building for old age people",
          "startDate" : "12-10-2019",
          "endDate" : "06-22-2020",
          "donatedAmount" : "$5,000"
        }
      ]
      
    },

    {
      "id" : "3",
      "memberName" : "Mohan",
      "companyName" : "IBQ",
      "country" : "	India",
      "referedBy" : "Raghav",
      "profileBanner" : "assets/images/profileimages/helpingHandsPic2.png",
      "birthDate" : "07/22/1979",
      "phoneNumber" : "7575748596",
      "streetAddress" : "Kalluru road",
      "city" : "Khammam and Bhadradri Kotthagudem",
      "state" : "Telangana",
      
      "description" : "Recognizing the need for streamlined international giving, a consortium of international funders and the Council on Foundations, Foundation Center, and Independent Sector initiated a process to make equivalency determination easier.",
      "projects" : [
        {
          "id" : "1",
          "projectName" : "Books distribute for children",
          "startDate" : "01-22-2019",
          "endDate" : "12-13-2019",
          "donatedAmount" : "$1,000"
        }
      ]
      
    },

  ]

  memberEditData = [
    {
      "id" : "1",
      "salutation" : 2,
      "FirstName" : "Anita",
      "LastName" : "P",
      "isPrivate" : 1,
      "birthDay" : "07/10/1985",
      "companyName" : 3,
      "referredBy" : 2,
      "isDeceased" : false,
      "isDoNotContact" : false,
      "memberPassword" : "Pass12!@",
      "description" : "testing",
      "preferredPhone" : 1,
      "phoneNumber" : "9856858585",
      "preferredEmail" : 1,
      "email" : "ss@gmail.com",
      "address" : "D/no:25/153",
      "street" : "Sundar Takies Road",
      "city" : "Khammam",
      "state" : "Telangana",
      "country" : "India",
      "zipCode" : "507003",
      "accountNumber" : "36578414878",
      "accountholderName" : "venkat rao",
      "bankName" : "State Bank of India",
      "branchName" : "khammam",
      "IFSCcode" : "SBIN0005817"
    }
  ]
  branches=[
    {
      "_id":"1",
      "chapterName":"Nalgonda"
    },
    {
      "_id":"2",
      "chapterName":"Warangal"
    },
    {
      "_id":"3",
      "chapterName":"Khammam"
    },
    {
      "_id":"4",
      "chapterName":"Bhadradri Kotthagudem"
    },
    {
      "_id":"5",
      "chapterName":"Prakasam"
    },
  ];
  chapterSettings;
  imageChangedEvent: any = '';
  image:any;
  allCuntriesData:any = [];
  states:any = [];
  cityes:any = [];
  chaptersResult:any = {chapters:[]}
  tokenData:any;error:any;
  filterData:any = {
    index:0,
    name:'',
    email:'',
   _id:''
  };
  finalData:any = [];
  userDetails:any ={profileImage:'',firstName:'',lastName:'',role:{roleName:''},birthDay:'',phone:{phoneNumber:''},email:'',address:'',street:'',description:'',userId:'',accountHolderName:'',accountNumber:'',bankName:'',branchName:'',ifscCode:'',indiaAccountDetails:[],usaAccountDetails:[]};
  cityDetails:any = {name:''};
  stateDetails:any = {name:''};
  countryDetails:any = {name:''};
  availableRecords = 0;
  indianAccounts:any ={accountHolderName:'',accountNumber:'',bankName:'',branchName:'',ifscCode:''};
  usaAccounts:any ={accountHolderName:'',accountNumber:'',address:'',routingNumber:''};
  editMemberAccountData : FormGroup;
  editMemberUSAccountData:FormGroup;
  bankDetails:any;
  bankData:any;
  constructor(private formBuilder : FormBuilder, private patterns : PatternService, private modalService: NgbModal,private ngWizardService: NgWizardService,private service:UserService,private loginService:LoginService) {

    this.errorMessageSalutationReq = this.patterns.errorMessageSalutationReq;
    this.errorMessageFirstNameReq = this.patterns.errorMessageFirstNameReq;
    this.errorMessageFirstNameMinMax = this.patterns.errorMessageFirstNameMinMax;
    this.errorMessageFirstNameInvalid = this.patterns.errorMessageFirstNameInvalid;
    this.errorMessagelastNameReq = this.patterns.errorMessagelastNameReq;
    this.errorMessagelastNameInvalid = this.patterns.errorMessagelastNameInvalid;
    this.errorMessagelastNameMinMax =  this.patterns.errorMessagelastNameMinMax;
    this.errorMessageCompanyNameReq = this.patterns.errorMessageCompanyNameReq;
    this.errorMessageReferedByReq = this.patterns.errorMessageReferedByReq;
    this.errorMessagePreferredPhNoReq = this.patterns.errorMessagePreferredPhNoReq;
    this.errorMessagePhnoReq = this.patterns.errorMessagePhnoReq;
    this.errorMessagePhnoInvalid = this.patterns.errorMessagePhnoInvalid;
    this.errorMessagePreferredEmailReq = this.patterns.errorMessagePreferredEmailReq;
    this.errorMessageEmailReq = this.patterns.errorMessageEmailReq;
    this.errorMessageEmailInvalid = this.patterns.errorMessageEmailInvalid;
    this.errorMessageAddressReq = this.patterns.errorMessageAddressReq;
    this.errorMessageAddressInvalid = this.patterns.errorMessageAddressInvalid;
    this.errorMessageAddressMinMax = this.patterns.errorMessageAddressMinMax;
    this.errorMessageCityReq = this.patterns.errorMessageCityReq;
    this.errorMessageCountryReq =this.patterns.errorMessageCountryReq;
    this.errorMessageZipCodeReq = this.patterns.errorMessageZipCodeReq;
    this.errorMessageZipCodeInvalid = this.patterns.errorMessageZipCodeInvalid;
    this.errorMessageStreetReq = this.patterns.errorMessageStreetReq;
    this.errorMessageStateReq = this.patterns.errorMessageStateReq;
    this.errorMessageAccountNumberReq = this.patterns.errorMessageAccountNumberReq;
    this.errorMessageAccountNumberInvalid = this.patterns.errorMessageAccountNumberInvalid;
    this.errorMessageAccountNameReq = this.patterns.errorMessageAccountNameReq;
    this.errorMessageAccountNameInvalid = this.patterns.errorMessageAccountNameInvalid;
    this.errorMessageBankNameReq = this.patterns.errorMessageBankNameReq;
    this.errorMessageBankNameKInvalid = this.patterns.errorMessageBankNameKInvalid;
    this.errorMessageChapterNameReq = this.patterns.errorMessageChapterNameReq;
    this.errorMessageChapterNameInvalid = this.patterns.errorMessageChapterNameInvalid;
    this.errorMessageIFSCcodeReq = this.patterns.errorMessageIFSCcodeReq;
    this.errorMessageIFSCcodeInvalid = this.patterns.errorMessageIFSCcodeInvalid;
    this.errorMessagePasswordReq = this.patterns.errorMessagePasswordReq;
    this.errorMessageUSARoutingNumberInvalid = this.patterns.errorMessageUSARoutingNumberInvalid;
    this.errorMessageUSAAccountNumberInvalid = this.patterns.errorMessageUSAAccountNumberInvalid;
    this.loading = true;

   }
   getState(event){
    this.getStates(event.target.value); 
  }
  getStates(id){
    this.states = csc.getStatesOfCountry(id)
  }
  getCitys(event){
    this.getAllCityes(event.target.value)
  }
  getAllCityes(id){
    this.cityes = csc.getCitiesOfState(id)
  }

  getAllChapters(){
    this.service.getAllChapters().subscribe(res=>{
      this.chaptersResult = res;
      this.branches = this.chaptersResult.chapters
    },err=>{
      console.log(err.error)
    })
  }
  getMembers(){
    this.service.getAllMembers().subscribe(res=>{
     
      this.memberList=res;
      var index = 1;
  this.loading = false;
      for (let i = 0; i < this.memberList.members.length; i++) {
        this.filterData.index = index;
        this.filterData._id = this.memberList.members[i]._id;
        if (this.memberList.members[i].firstName) {
          this.filterData.name = this.memberList.members[i].firstName.trim() + ' ' + this.memberList.members[i].lastName;
        } else {
          this.filterData.name = ' ';
        }
        if (this.memberList.members[i].email) {
          this.filterData.email =this.memberList.members[i].email;
        } else {
          this.filterData.email = ' ';
        }

        this.allMembersList.push(this.filterData);
        this.filterData = {
          index:0,
          name:'',
          email:'',
         _id:''    
        };
         index++;
      } 
      this.finalData= this.allMembersList;
     this.availableRecords  =this.finalData.length;
      this.membersLength = this.finalData.length;
      })

  }

  search(term: string){
    if (!term) {
      this.allMembersList = this.finalData;
    } else {
      this.allMembersList = this.finalData.filter(x =>       
        x.name.trim().toLowerCase().includes(term.trim().toLowerCase())     
      );

      // const email= this.finalData.filter(z =>
      //   z.email.trim().toLowerCase().includes(term.trim().toLowerCase()),
      // );

      //   if(email && email.length){
      //     email.map(x=>x).filter(x=>{
      //       if(this.allMembersList && this.allMembersList.length){
      //         this.allMembersList.map(y=>y).filter(y=>{
      //           console.log(y)
      //           if(y.name===x.name && y.email===x.email)
      //           {
      //               console.log('no data')
      //           }
      //           else{
      //             this.allMembersList.push(x);
      //           }                          
      //         });
      //     }
      //     else{
      //       this.allMembersList.push(x);
      //     }
      //   });
      // }  
    }
    this.membersLength = this.allMembersList.length;
    this.availableRecords = this.allMembersList.length;
  }
  
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

   // image crop
   imageCropped(event: ImageCroppedEvent) {
    this.image = event.base64;
  }

  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  getBankDetails(event){
    if(event.target.value){
      this.bankData =  ifsc.get(event.target.value);
     ifsc.getBankName(event.target.value).then(res=>{
       this.editMemberAccountData.get('bankName').setValue(res);
     })
     ifsc.getBranchName(event.target.value).then(res=>{
      this.editMemberAccountData.get('branchName').setValue(res);
    })
    }
  }

  ngOnInit(): void {
    this.service.getOrgInfo().subscribe(res=>{
      console.log(res);
      this.orgdataRes=res
      console.log(this.orgdataRes); 
    
    },err=>{
      console.log(err.error);
     
    })
    this.tokenData = this.loginService.getToken();
    const roleIDs = this.tokenData.roles;
      this.service.getpermissions(roleIDs).subscribe(res=>{
        const role = res;
        const rolePermissions = role.permissionSet;
        console.log(rolePermissions)
        rolePermissions.forEach(element => {
          if(element.permissionsName === 'Members'){
            this.userPermissions = element.permission;
            console.log(this.userPermissions);
          }
        })
      })
    this.getAllChapters();
    this.getMembers();

    this.allCuntriesData = csc.getAllCountries();

    this.addPledgesForm = this.formBuilder.group({
      pledgeInfo : new FormControl(''),
      pledgeAmount : new FormControl(''),
      donationFrequency : new FormControl(''),
      date: new FormControl(''),

    })

    this.chapterSettings={
      singleSelection: false,
      idField: '_id',
      textField: 'chapterName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      enableCheckAll: false
    }
    this.editMemberAccountData = this.formBuilder.group({
      accountNumber : new FormControl('',[Validators.pattern(this.patterns.accountNumberPattern)]),
      accountHolderName : new FormControl('',[Validators.pattern(this.patterns.accountNamePattern)]), 
      bankName : new FormControl('', [Validators.pattern(this.patterns.bankNamePattern)]),
      branchName : new FormControl(''),
      ifscCode :  new FormControl('',[Validators.pattern(this.patterns.ifscPattern)])
    });  

    this.editMemberUSAccountData = this.formBuilder.group({
      accountNumber : new FormControl('',[Validators.pattern(this.patterns.usaaccountNumberPattern)]),
      accountHolderName : new FormControl('',[Validators.pattern(this.patterns.accountNamePattern)]), 
      routingNumber : new FormControl('',[Validators.pattern(this.patterns.usaRoutingNumberPattern)]),
      address : new FormControl('')
    });  


    // add Members Form Personal Details
    
    this.addMemberPersonalDetails = this.formBuilder.group({
      salutation : new FormControl('', [Validators.required ]),
      firstName : new FormControl( '',[ Validators.required, Validators.pattern(this.patterns.firstNamePattern),Validators.minLength(this.patterns.firstNameMinLength),Validators.maxLength(this.patterns.firstNameMaxLength) ]),
      lastName : new FormControl( '',[ Validators.required, Validators.pattern(this.patterns.lastNamePattern),Validators.minLength(this.patterns.lastNameMinLength),Validators.maxLength(this.patterns.lastNameMaxLength) ]),
      isPrivateChecked : new FormControl(''),
      birthDay: new FormControl(''),
      companyName : new FormControl(''),
      isDeceasedChecked  : new FormControl(''),
      referedBy :  new FormControl('',[Validators.required]),
      isDoNotContactChecked : new FormControl(''),
      password : new FormControl('',[Validators.required]),
      description : new FormControl(''),
      contactDetails: new FormControl(''),
      accountDetails:new FormControl(''),
      memberWithContact: new FormControl(''),
      profileImage: new FormControl(''),
      intrestLocations:new FormControl(''),
      email : new FormControl(''),
      gender: new FormControl('',[Validators.required]),
      indiaAccountDetails:new FormControl(''),
      usaAccountDetails:new FormControl('')
    });


      this.addMemberContactDetails= this.formBuilder.group({
      
      preferredPhone :  new FormControl('',[Validators.required]),
      phoneNumber : new FormControl('',[Validators.required]),
      preferredEmail :  new FormControl('',[Validators.required]),
      email : new FormControl('',[Validators.required]),
      addressGroup :this.formBuilder.group({
        address : new FormControl('',[Validators.required , Validators.pattern(this.patterns.addressPattern), Validators.minLength(this.patterns.addressMinLength), Validators.maxLength(this.patterns.addressMaxLength)]),
        street : new FormControl('',[Validators.required]),
        city : new FormControl('',[Validators.required]),
        state  : new FormControl('',[Validators.required]),
        country  : new FormControl('',[Validators.required]),
        zipCode  : new FormControl('',[Validators.required, Validators.pattern(this.patterns.zipCodePattern)]),
      }),

    });
    this.addMemberAccountDetails= this.formBuilder.group({
	    accountDetails:this.formBuilder.group({
        accountNumber : new FormControl('',[Validators.pattern(this.patterns.accountNumberPattern)]),
        accountHolderName : new FormControl('',[Validators.pattern(this.patterns.accountNamePattern)]),
        bankName : new FormControl('', [Validators.pattern(this.patterns.bankNamePattern)]),
        branchName : new FormControl(''),
        ifscCode :  new FormControl('',[Validators.pattern(this.patterns.ifscPattern)]),
        }),
      // memberWithContact:new FormControl(''),
      // password: new FormControl(''),
      // role: new FormControl(''),
    });
    
// edit Members Form Personal Details

this.editMemberPersonalDetails = this.formBuilder.group({
  salutation : new FormControl('', [Validators.required ]),
  firstName : new FormControl( '',[ Validators.required, Validators.pattern(this.patterns.firstNamePattern),Validators.minLength(this.patterns.firstNameMinLength),Validators.maxLength(this.patterns.firstNameMaxLength) ]),
  lastName : new FormControl( '',[ Validators.required, Validators.pattern(this.patterns.lastNamePattern),Validators.minLength(this.patterns.lastNameMinLength),Validators.maxLength(this.patterns.lastNameMaxLength) ]),
  isPrivateChecked : new FormControl(''),
  updateBirthDay: new FormControl(''),
  companyName : new FormControl('',[Validators.required]),
  isDeceasedChecked  : new FormControl(''),
  referedBy :  new FormControl('',[Validators.required]),
  isDoNotContactChecked : new FormControl(''),
  password : new FormControl(''),
  description : new FormControl(''),
});


  this.editMemberContactDetails= this.formBuilder.group({
  
  preferredPhone :  new FormControl('',[Validators.required]),
  phoneNumber : new FormControl('',[Validators.required]),
  preferredEmail :  new FormControl('',[Validators.required]),
  email : new FormControl('',[Validators.required]),
  addressGroup :this.formBuilder.group({
    address : new FormControl('',[Validators.required , Validators.pattern(this.patterns.addressPattern), Validators.minLength(this.patterns.addressMinLength), Validators.maxLength(this.patterns.addressMaxLength)]),
    street : new FormControl('',[Validators.required]),
    city : new FormControl('',[Validators.required]),
    state  : new FormControl('',[Validators.required]),
    country  : new FormControl('',[Validators.required]),
    zipCode  : new FormControl('',[Validators.required, Validators.pattern(this.patterns.zipCodePattern)]),
  }),

});
this.editMemberAccountDetails= this.formBuilder.group({
  accountDetails:this.formBuilder.group({
    accountNumber : new FormControl('',[Validators.pattern(this.patterns.accountNumberPattern)]),
    accountHolderName : new FormControl(''),
    bankName : new FormControl(''),
    branchName : new FormControl(''),
    ifscCode :  new FormControl('',[Validators.pattern(this.patterns.ifscPattern)]),
    }),
  // memberWithContact:new FormControl(''),
  // password: new FormControl(''),
  // role: new FormControl(''),
});

  
  }

  AddMemberPersonalDetails(resultModal) {
    if(this.addMemberPersonalDetails.value.intrestLocations){
      this.addMemberPersonalDetails.value.intrestLocations = this.addMemberPersonalDetails.value.intrestLocations
    }else{
      this.addMemberPersonalDetails.value.intrestLocations = [];
    }
    this.addMemberPersonalDetails.value.profileImage = this.image;
    this.message="Personal Details saved as draft complete all the steps to add a Member";
    this.confirm(resultModal);
  }
 

  addMemberAddress(resultModal){
    this.message="Contact Information saved as draft complete all the steps to add a Member";
    this.confirm(resultModal);
  }
   addMemberAccount(accountResult,resultErrorModal){
    this.loading = true;
    this.addMemberPersonalDetails.get('memberWithContact').setValue(true);
    this.addMemberPersonalDetails.get('contactDetails').setValue(this.addMemberContactDetails.value);
    this.addMemberPersonalDetails.get('accountDetails').setValue(this.addMemberAccountDetails.value);
    this.addMemberPersonalDetails.get('email').setValue(this.addMemberContactDetails.value.email);

    this.addMemberPersonalDetails.value.indiaAccountDetails = this.editMemberAccountData.value;
    this.addMemberPersonalDetails.value.usaAccountDetails = this.editMemberUSAccountData.value;
    this.service.addUser(this.addMemberPersonalDetails.value).subscribe(res=>{
    this.loading = false;
        this.confirm(accountResult); 
        this.message="Member Details Added Successfully.";    
    },err=>{
    this.loading = false;
      console.log(err.error);
      this.error = err.error.message;
      this.confirmError(resultErrorModal)
    })


  }
  EditMemberPersonalDetails(resultModal) {
    this.message="Personal Details saved as draft complete all the steps to Update a Member";
    this.confirm(resultModal);
  }
  editMemberAddress(resultModal){
    this.message="Contact Information saved as draft complete all the steps to update a Member";
    this.confirm(resultModal);
  }
  editMemberAccount(accountResult){
    this.message="Member Details Updated Successfully.";
    this.confirm(accountResult);

  }
//   confirm1(accountResult) {
//     this.resultModalRef = this.modalService.open(accountResult , { ariaLabelledBy: 'modal-basic-title', centered: true,size:'sm' });
//     this.resultModalRef.result.then((result) => {
//      this.confirmResut = `Closed with: ${result}`;
//    }, (reason) => {
//      this.confirmResut = `Dismissed with: ${reason}`;
//    });
//  }
  confirm(resultModal) {
    this.resultModalRef = this.modalService.open(resultModal , { ariaLabelledBy: 'modal-basic-title', centered: true,size:'sm' });
    this.resultModalRef.result.then((result) => {
     this.confirmResut = `Closed with: ${result}`;
   }, (reason) => {
     this.confirmResut = `Dismissed with: ${reason}`;
   });
   this.getMembers();

 }

 confirmError(resultErrorModal){
  this.resultModalRef = this.modalService.open(resultErrorModal , { ariaLabelledBy: 'modal-basic-title', centered: true,size:'sm' });
  this.resultModalRef.result.then((result) => {
  this.confirmResut = `Closed with: ${result}`;
});
}

openModal(content) {
  this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl', centered: true })
  .result.then((result) => {
    console.log(result);
  }, (reason) => {
    console.log('Err!', reason);
  });
}

openViewModal(viewMemberProfile,index,name, email){
  this.service.getUserById(index).subscribe(res=>{
    this.userDetails = res;
    const inadianAccount =  this.userDetails.indiaAccountDetails;
    if(inadianAccount){
      this.indianAccounts =inadianAccount[0];
    } 
    const usaAccount = this.userDetails.usaAccountDetails;
    if(usaAccount){
      this.usaAccounts = usaAccount[0];
    }
  
    this.cityDetails = csc.getCityById(this.userDetails.city);
    this.stateDetails = csc.getStateById(this.userDetails.state)
    this.countryDetails = csc.getCountryById(this.userDetails.country)
  },err=>{
    console.log(err.error)
  })
  
  this.memberIndex=index-1
  this.memberFirstName = name;

  // this.memberLastName = lastname;
  this.memberEmail = email,
  this.memberModalRef = this.modalService.open(viewMemberProfile ,{ariaLabelledBy: 'modal-basic-title',size: 'xl'});
  this.memberModalRef.result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });

 }

 openAddPledgeModal(addMember,index,firstname, lastname,email){
  this.memberFirstName = firstname;
  this.memberLastName = lastname;
  this.memberEmail = email,
  this.memberIndex=index-1
  this.memberModalRef = this.modalService.open(addMember ,{ariaLabelledBy: 'modal-basic-title',size: 'md'});
  this.memberModalRef.result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });

 }
openAddMemberModal(content){
 
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size: 'xl'}).result.then((result) => {
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
viewMembersList(){
  this.modalService.dismissAll();
  this.service.getAllMembers().subscribe(res=>{
    this.memberList=res
  })
}

showPreviousStep(event?: Event) {
  this.ngWizardService.previous();
}

showNextStep(event?: Event) {
  this.ngWizardService.next();
}

resetWizard(event?: Event) {
  this.ngWizardService.reset();
}

setTheme(theme: THEME) {
  this.ngWizardService.theme(theme);
}

stepChanged(args: StepChangedArgs) {
  console.log(args.step);
}

viewMembers(){
  this.resultModalRef.close();
 //  this.resultModalRef.close();
  this.ngWizardService.next();
 }
 changetimeline(timeLine){
  if(timeLine=="donationTimeLine"){
    this.donationTimeLine=true;
    this.activityTimeLine=false;
  }
  else{
   this.donationTimeLine=false;
   this.activityTimeLine=true;

  }
}
 
openEditModal(editModal,index,firstname,lastname){
   this.memberFirstName = firstname;
   this.memberLastName = lastname;
   this.memberFullName =  firstname + " "+ lastname;
   
   this.editMemberPersonalDetails.get('salutation').setValue(2);
  this.editMemberPersonalDetails.get('firstName').setValue(this.memberFirstName);
  this.editMemberPersonalDetails.get('lastName').setValue(this.memberLastName);
  this.editMemberPersonalDetails.get('isPrivateChecked').setValue(this.memberEditData[0].isPrivate);

  const birthDayValue= new DatePipe('en-US').transform(this.memberEditData[0].birthDay, 'yyyy-MM-dd');
  this.editMemberPersonalDetails.get('updateBirthDay').setValue(birthDayValue);

  this.editMemberPersonalDetails.get('companyName').setValue(this.memberEditData[0].companyName);
  this.editMemberPersonalDetails.get('referedBy').setValue(this.memberEditData[0].referredBy);
  this.editMemberPersonalDetails.get('isDeceasedChecked').setValue(this.memberEditData[0].isDeceased);
  this.editMemberPersonalDetails.get('isDoNotContactChecked').setValue(this.memberEditData[0].isDoNotContact);
  this.editMemberPersonalDetails.get('password').setValue(this.memberEditData[0].memberPassword);
  this.editMemberPersonalDetails.get('description').setValue(this.memberEditData[0].description);

  this.editMemberContactDetails.get('preferredPhone').setValue(this.memberEditData[0].preferredPhone);
  this.editMemberContactDetails.get('phoneNumber').setValue(this.memberEditData[0].phoneNumber);
  this.editMemberContactDetails.get('preferredEmail').setValue(this.memberEditData[0].preferredEmail);
  this.editMemberContactDetails.get('email').setValue(this.memberEditData[0].email);
  this.editMemberContactDetails.get('addressGroup').get('address').setValue(this.memberEditData[0].address);
  this.editMemberContactDetails.get('addressGroup').get('street').setValue(this.memberEditData[0].street);
  this.editMemberContactDetails.get('addressGroup').get('city').setValue(this.memberEditData[0].city);
  this.editMemberContactDetails.get('addressGroup').get('state').setValue(this.memberEditData[0].state);
  this.editMemberContactDetails.get('addressGroup').get('country').setValue(this.memberEditData[0].country);
  this.editMemberContactDetails.get('addressGroup').get('zipCode').setValue(this.memberEditData[0].zipCode);

  this.editMemberAccountDetails.get('accountDetails').get('accountNumber').setValue(this.memberEditData[0].accountNumber);
  this.editMemberAccountDetails.get('accountDetails').get('accountHolderName').setValue(this.memberEditData[0].accountholderName);
  this.editMemberAccountDetails.get('accountDetails').get('bankName').setValue(this.memberEditData[0].bankName);
  this.editMemberAccountDetails.get('accountDetails').get('branchName').setValue(this.memberEditData[0].branchName);
  this.editMemberAccountDetails.get('accountDetails').get('ifscCode').setValue(this.memberEditData[0].IFSCcode);
  

  this.memberModalRef = this.modalService.open(editModal ,{ariaLabelledBy: 'modal-basic-title',size: 'xl'});
  this.memberModalRef.result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });

 }
 getAllMembers(){
 
  }

  onAddPledgesSubmit(resultPledgesModal){
    this.message="Pledges Added Successfully";
    this.confirm(resultPledgesModal);
  }
  
  closeAllModals(){
    this.modalService.dismissAll()
  }

  

}
