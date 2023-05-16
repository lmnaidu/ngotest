import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatternService } from '../../core/services/pattern.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgWizardConfig, THEME, StepChangedArgs, NgWizardService } from 'ng-wizard';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Location, DatePipe } from '@angular/common';
import { UserService} from '../../core/services/user.service';
import { LoginService } from 'src/app/core/services/login.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import csc from 'country-state-city';
import ifsc from 'ifsc-finder';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {
  orgdataRes:any={
    orgInfo:[{}]
  }
  loading = false;
  userId:any;
   editForm:boolean = false;
  draftSaved:boolean=true;
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
  errorMessageUSAAccountNumberInvalid;
  errorMessageBankNameReq;
  errorMessageBankNameKInvalid:any;
  errorMessageBranchNameReq:any;
  errorMessageBranchNameInvalid:any;
  errorMessageIFSCcodeReq:any;
  errorMessageIFSCcodeInvalid:any;
  errorMessagePasswordReq:any;
  errorMessageUSARoutingNumberInvalid;
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
  tokenData:any;
  editMemberPersonalDetails : FormGroup;
  editMemberContactDetails : FormGroup;
  editMemberAccountDetails : FormGroup;
  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.arrows,
    toolbarSettings: {
      // toolbarExtraButtons: [
      //    { text: 'Finish', class: 'btn btn-info', event: () => { alert("Finished!!!"); } } ]
      showNextButton:true,
      showPreviousButton:true
    },
   
  };
  userDetails:any ={  
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
    "role":"",
    "accountNumber" : "36578414878",
    "accountholderName" : "venkat rao",
    "bankName" : "State Bank of India",
    "branchName" : "khammam",
    "IFSCcode" : "SBIN0005817",
    "status":"1"
  };
  imageChangedEvent: any = '';
  image:any;
  message:any;
  closeResult:any;
  resultModalRef:any;
  resultModal:any;
  confirmResut:any;
  roleSettings: any = {};
  rolesData:any = [];
  rolesResult:any;
  error:any;
  allCuntriesData:any = [];
  states:any = [];
  cityes:any = [];
  eidtUserId:any;
  chaptersResult:any = {chapters:[]};
  editMemberAccountData : FormGroup;
  editMemberUSAccountData:FormGroup;
  bankDetails:any;
  bankData:any;
  constructor(private route: ActivatedRoute,private paternService:PatternService,private formBuilder : FormBuilder, private modalService: NgbModal,private ngWizardService: NgWizardService,private service:UserService,private loginService:LoginService,private router:Router,private location:Location) { 
    this.errorMessageSalutationReq = this.paternService.errorMessageSalutationReq;
    this.errorMessageFirstNameReq = this.paternService.errorMessageFirstNameReq;
    this.errorMessageFirstNameMinMax = this.paternService.errorMessageFirstNameMinMax;
    this.errorMessageFirstNameInvalid = this.paternService.errorMessageFirstNameInvalid;
    this.errorMessagelastNameReq = this.paternService.errorMessagelastNameReq;
    this.errorMessagelastNameInvalid = this.paternService.errorMessagelastNameInvalid;
    this.errorMessagelastNameMinMax =  this.paternService.errorMessagelastNameMinMax;
    this.errorMessageCompanyNameReq = this.paternService.errorMessageCompanyNameReq;
    this.errorMessageReferedByReq = this.paternService.errorMessageReferedByReq;
    this.errorMessagePreferredPhNoReq = this.paternService.errorMessagePreferredPhNoReq;
    this.errorMessagePhnoReq = this.paternService.errorMessagePhnoReq;
    this.errorMessagePhnoInvalid = this.paternService.errorMessagePhnoInvalid;
    this.errorMessagePreferredEmailReq = this.paternService.errorMessagePreferredEmailReq;
    this.errorMessageEmailReq = this.paternService.errorMessageEmailReq;
    this.errorMessageEmailInvalid = this.paternService.errorMessageEmailInvalid;
    this.errorMessageAddressReq = this.paternService.errorMessageAddressReq;
    this.errorMessageAddressInvalid = this.paternService.errorMessageAddressInvalid;
    this.errorMessageAddressMinMax = this.paternService.errorMessageAddressMinMax;
    this.errorMessageCityReq = this.paternService.errorMessageCityReq;
    this.errorMessageCountryReq =this.paternService.errorMessageCountryReq;
    this.errorMessageZipCodeReq = this.paternService.errorMessageZipCodeReq;
    this.errorMessageZipCodeInvalid = this.paternService.errorMessageZipCodeInvalid;
    this.errorMessageStreetReq = this.paternService.errorMessageStreetReq;
    this.errorMessageStateReq = this.paternService.errorMessageStateReq;
    this.errorMessageAccountNumberReq = this.paternService.errorMessageAccountNumberReq;
    this.errorMessageAccountNumberInvalid = this.paternService.errorMessageAccountNumberInvalid;
    this.errorMessageAccountNameReq = this.paternService.errorMessageAccountNameReq;
    this.errorMessageAccountNameInvalid = this.paternService.errorMessageAccountNameInvalid;
    this.errorMessageBankNameReq = this.paternService.errorMessageBankNameReq;
    this.errorMessageBankNameKInvalid = this.paternService.errorMessageBankNameKInvalid;
    this.errorMessageUSARoutingNumberInvalid = this.paternService.errorMessageUSARoutingNumberInvalid;
    // this.errorMessageBranchNameInvalid = this.paternService.errorMessageBranchNameInvalid;
    this.errorMessageIFSCcodeReq = this.paternService.errorMessageIFSCcodeReq;
    this.errorMessageIFSCcodeInvalid = this.paternService.errorMessageIFSCcodeInvalid;
    this.errorMessagePasswordReq = this.paternService.errorMessagePasswordReq;
    this.errorMessageUSAAccountNumberInvalid = this.paternService.errorMessageUSAAccountNumberInvalid;
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
  getifscDetails(){
    console.log(this.userDetails.ifscCode)
 
  }
  changeZip(){
    console.log('clicked')
    this.editMemberContactDetails.get('addressGroup').get('zipCode').setValue('');
  }
  ngOnInit(): void {
    this.service.getOrgInfo().subscribe(res=>{
      console.log(res);
      this.orgdataRes=res
      console.log(this.orgdataRes); 
    
    },err=>{
      console.log(err.error);
     
    })
    this.getifscDetails()
    this.getAllChapters();
    this.allCuntriesData = csc.getAllCountries();
    this.route.params.subscribe(res => {
      this.userId = res.id;  
    });

      // get roles 
      this.service.getAllRoles().subscribe(res=>{
        this.rolesResult = res;
        this.rolesData = this.rolesResult.Roles;
      },err=>{
        console.log(err.error);
        this.error = err.error.message;
      });
     
     
      this.chapterSettings={
        singleSelection: false,
        idField: '_id',
        textField: 'chapterName',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        allowSearchFilter: true,
        enableCheckAll: false
      }
      this.roleSettings = {
        singleSelection: true,
        idField: '_id',
        textField: 'roleName',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        allowSearchFilter: true,
        enableCheckAll: false,
      }
    this.editMemberAccountData = this.formBuilder.group({
      accountNumber : new FormControl('',[Validators.pattern(this.paternService.accountNumberPattern)]),
      accountHolderName : new FormControl('',[Validators.pattern(this.paternService.accountNamePattern)]), 
      bankName : new FormControl('', [Validators.pattern(this.paternService.bankNamePattern)]),
      branchName : new FormControl(''),
      ifscCode :  new FormControl('',[Validators.pattern(this.paternService.ifscPattern)])
    });  

    this.editMemberUSAccountData = this.formBuilder.group({
      accountNumber : new FormControl('',[Validators.pattern(this.paternService.usaaccountNumberPattern)]),
      accountHolderName : new FormControl('',[Validators.pattern(this.paternService.accountNamePattern)]), 
      routingNumber : new FormControl('',[Validators.pattern(this.paternService.usaRoutingNumberPattern)]),
      address : new FormControl(''),
      // ifscCode :  new FormControl('',[Validators.pattern(this.paternService.ifscPattern)])
    });  



    this.editMemberPersonalDetails = this.formBuilder.group({
      salutation : new FormControl('', [Validators.required ]),
      firstName : new FormControl( '',[ Validators.required, Validators.pattern(this.paternService.firstNamePattern),Validators.minLength(this.paternService.firstNameMinLength),Validators.maxLength(this.paternService.firstNameMaxLength) ]),
      lastName : new FormControl( '',[ Validators.required, Validators.pattern(this.paternService.lastNamePattern),Validators.minLength(this.paternService.lastNameMinLength),Validators.maxLength(this.paternService.lastNameMaxLength) ]),
      isPrivateChecked : new FormControl(''),
      updateBirthDay: new FormControl(''),
      companyName : new FormControl(''),
      isDeceasedChecked  : new FormControl(''),
      referedBy :  new FormControl('',[Validators.required]),
      isDoNotContactChecked : new FormControl(''),
      password : new FormControl(''),
      description : new FormControl(''),
      profileImage: new FormControl(''),
      intrestLocations:new FormControl(''),
      contactDetails: new FormControl(''),
      accountDetails:new FormControl(''),
      memberWithContact: new FormControl(''),
      status:new FormControl('', [Validators.required]),
      role: new FormControl('' ,[Validators.required]),
      _id: new FormControl(''),
      gender: new FormControl('',[Validators.required]),
      indiaAccountDetails:new FormControl(''),
      usaAccountDetails:new FormControl('')
    });


    this.editMemberContactDetails= this.formBuilder.group({
      
      preferredPhone :  new FormControl('',[Validators.required]),
      phoneNumber : new FormControl('',[Validators.required]),
      preferredEmail :  new FormControl('',[Validators.required]),
      email : new FormControl('',[Validators.required]),
      addressGroup :this.formBuilder.group({
        address : new FormControl('',[Validators.required , Validators.pattern(this.paternService.addressPattern), Validators.minLength(this.paternService.addressMinLength), Validators.maxLength(this.paternService.addressMaxLength)]),
        street : new FormControl('',[Validators.required]),
        city : new FormControl('',[Validators.required]),
        state  : new FormControl('',[Validators.required]),
        country  : new FormControl('',[Validators.required]),
        zipCode  : new FormControl('',[Validators.required, Validators.pattern(this.paternService.zipCodePattern)]),
      }),

    });
    this.editMemberAccountDetails= this.formBuilder.group({
      accountDetails:this.formBuilder.group({
        accountNumber : new FormControl('',[Validators.pattern(this.paternService.accountNumberPattern)]),
        accountHolderName : new FormControl('',[Validators.pattern(this.paternService.accountNamePattern)]), 
        bankName : new FormControl('', [Validators.pattern(this.paternService.bankNamePattern)]),
        branchName : new FormControl(''),
        ifscCode :  new FormControl('',[Validators.pattern(this.paternService.ifscPattern)]),
        })
    });
   
    // this.singleUserDetails( this.userId)
    this.service.getUserById( this.userId).subscribe(res=>{
      this.userDetails = res;

      if(this.userDetails){
       
        const roles  = [];
        roles.push(this.userDetails.role);
        this.editMemberPersonalDetails.value.role = roles;
        this.getStates(this.userDetails.country);
        this.getAllCityes(this.userDetails.state);
        this.editMemberPersonalDetails.get('intrestLocations').setValue(this.userDetails.intrestLocations);
        this.editMemberPersonalDetails.get('role').setValue(roles);
        this.editMemberPersonalDetails.get('salutation').setValue(this.userDetails.salutation);
        this.editMemberPersonalDetails.get('firstName').setValue( this.userDetails.firstName);
        this.editMemberPersonalDetails.get('lastName').setValue(this.userDetails.lastName);
        this.editMemberPersonalDetails.get('isPrivateChecked').setValue(this.userDetails.privateChecked);
        this.editMemberPersonalDetails.get('updateBirthDay').setValue(this.userDetails.birthDay);
        this.editMemberPersonalDetails.get('companyName').setValue(this.userDetails.companyName);
        this.editMemberPersonalDetails.get('referedBy').setValue(this.userDetails.referedBy);
        this.editMemberPersonalDetails.get('description').setValue(this.userDetails.description);
        this.editMemberPersonalDetails.get('status').setValue(this.userDetails.status);
        this.editMemberPersonalDetails.get('gender').setValue(this.userDetails.gender);
  this.loading = false;

        // this.editMemberPersonalDetails = this.formBuilder.group({
        //   salutation : new FormControl(this.userDetails.salutation, [Validators.required ]),
        //   firstName : new FormControl( this.userDetails.firstName,[ Validators.required, Validators.pattern(this.paternService.firstNamePattern),Validators.minLength(this.paternService.firstNameMinLength),Validators.maxLength(this.paternService.firstNameMaxLength) ]),
        //   lastName : new FormControl( this.userDetails.lastName,[ Validators.required, Validators.pattern(this.paternService.lastNamePattern),Validators.minLength(this.paternService.lastNameMinLength),Validators.maxLength(this.paternService.lastNameMaxLength) ]),
        //   isPrivateChecked : new FormControl(this.userDetails.privateChecked),
        //   updateBirthDay: new FormControl(this.userDetails.birthDay),
        //   companyName : new FormControl(this.userDetails.companyName,[Validators.required]),
        //   isDeceasedChecked  : new FormControl(''),
        //   referedBy :  new FormControl(this.userDetails.referedBy,[Validators.required]),
        //   isDoNotContactChecked : new FormControl(''),
        //   description : new FormControl(this.userDetails.description),
        //   profileImage: new FormControl(''),
        //   // intrestLocations:new FormControl(''),
        //   status:new FormControl(this.userDetails.status, [Validators.required]),
        //   role: new FormControl(''),
        //   _id: new FormControl(this.userDetails._id)
        // });
        this.editMemberContactDetails= this.formBuilder.group({      
          preferredPhone :  new FormControl(this.userDetails.phone.preferredPhone,[Validators.required]),
          phoneNumber : new FormControl(this.userDetails.phone.phoneNumber,[Validators.required]),
          preferredEmail :  new FormControl(this.userDetails.preferredEmail,[Validators.required]),
          email : new FormControl(this.userDetails.email,[Validators.required]),
          addressGroup :this.formBuilder.group({
            address : new FormControl(this.userDetails.address,[Validators.required , Validators.pattern(this.paternService.addressPattern), Validators.minLength(this.paternService.addressMinLength), Validators.maxLength(this.paternService.addressMaxLength)]),
            street : new FormControl(this.userDetails.street,[Validators.required]),
            city : new FormControl(this.userDetails.city,[Validators.required]),
            state  : new FormControl(this.userDetails.state,[Validators.required]),
            country  : new FormControl(this.userDetails.country,[Validators.required]),
            zipCode  : new FormControl(this.userDetails.zipcode,[Validators.required, Validators.pattern(this.paternService.zipCodePattern)]),
          }), 
        });
        const indianAccounts = this.userDetails.indiaAccountDetails;
        if(indianAccounts.length != 0){
          this.editMemberAccountData = this.formBuilder.group({
            accountNumber : new FormControl(indianAccounts[0].accountNumber,[Validators.pattern(this.paternService.accountNumberPattern)]),
            accountHolderName : new FormControl(indianAccounts[0].accountHolderName,[Validators.pattern(this.paternService.accountNamePattern)]), 
            bankName : new FormControl(indianAccounts[0].bankName, [Validators.pattern(this.paternService.bankNamePattern)]),
            branchName : new FormControl(indianAccounts[0].branchName),
            ifscCode :  new FormControl(indianAccounts[0].ifscCode,[Validators.pattern(this.paternService.ifscPattern)])
          });  
        }
      
        const usaAccounts = this.userDetails.usaAccountDetails;
        if(usaAccounts.length != 0){
          this.editMemberUSAccountData = this.formBuilder.group({
            accountNumber : new FormControl(usaAccounts[0].accountNumber,[Validators.pattern(this.paternService.usaaccountNumberPattern)]),
            accountHolderName : new FormControl(usaAccounts[0].accountHolderName,[Validators.pattern(this.paternService.accountNamePattern)]), 
            routingNumber : new FormControl(usaAccounts[0].routingNumber,[Validators.pattern(this.paternService.usaRoutingNumberPattern)]),
            address : new FormControl(usaAccounts[0].address),
          });  
        }
       
        // this.editMemberAccountDetails= this.formBuilder.group({
        //   accountDetails:this.formBuilder.group({
        //     accountNumber : new FormControl(indianAccounts[0].accountNumber,[Validators.pattern(this.paternService.accountNumberPattern)]),
        //     accountHolderName : new FormControl(indianAccounts[0].accountHolderName,[Validators.pattern(this.paternService.accountNamePattern)]),
        //     bankName : new FormControl(indianAccounts[0].bankName, [Validators.pattern(this.paternService.bankNamePattern)]),
        //     branchName : new FormControl(indianAccounts[0].branchName),
        //     ifscCode :  new FormControl(indianAccounts[0].ifscCode,[Validators.pattern(this.paternService.ifscPattern)]),
        //     })
        // });
    
        this.editForm = true;
      }else{
        this.editForm = false;
      }
     
      // window.location.reload();
    },err=>{
      console.log(err.error);
    })
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
  singleUserDetails(id){
    this.eidtUserId = id;
  
  }
  stepChanged(args: StepChangedArgs) {
    console.log(args.step);
  
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


  EditMemberPersonalDetail(resultModal) {

    if(this.image){
      this.editMemberPersonalDetails.value.profileImage= this.image;
    }else{
      this.editMemberPersonalDetails.value.profileImage= this.userDetails.profileImage;
    }
    
    this.editMemberPersonalDetails.value.updateBirthDay =  new DatePipe('en-US').transform(  this.editMemberPersonalDetails.value.updateBirthDay, 'yyyy-MM-dd');
   
    this.message="Personal Details saved as draft complete all the steps to Update a Member";
    this.confirm(resultModal);
  }
  editMemberAddress(resultModal){
    this.draftSaved=true
    console.log(this.editMemberPersonalDetails.value);
    this.message="Contact Information saved as draft complete all the steps to update a Member";
    this.confirm(resultModal);
  }
  editMemberAccount(accountResult){
    this.loading = true;
    this.draftSaved=true
    this.message="User Details Updated Successfully.";
    console.log(this.editMemberAccountData.value);
    this.editMemberPersonalDetails.value.role = this.editMemberPersonalDetails.value.role[0]._id;
    console.log(this.editMemberUSAccountData.value);
    
    this.editMemberPersonalDetails.value.contactDetails = this.editMemberContactDetails.value;
    this.editMemberPersonalDetails.value.accountDetails = this.editMemberAccountDetails.value;
    this.editMemberPersonalDetails.value.indiaAccountDetails = this.editMemberAccountData.value;
    this.editMemberPersonalDetails.value.usaAccountDetails = this.editMemberUSAccountData.value;
    this.service.updateUser(this.userDetails._id,this.editMemberPersonalDetails.value).subscribe(res=>{
    this.loading = false;
      console.log(res)
      this.confirm(accountResult);
    },err=>{
      console.log(err.error)
       this.loading = false;
    })
    
    

  }
  viewMembers(){
    this.resultModalRef.close();
   //  this.resultModalRef.close();
    this.ngWizardService.next();
   }

  confirm(resultModal) {
    this.resultModalRef = this.modalService.open(resultModal , { ariaLabelledBy: 'modal-basic-title', centered: true,size:'sm' });
    this.resultModalRef.result.then((result) => {
     this.confirmResut = `Closed with: ${result}`;
   }, (reason) => {
     this.confirmResut = `Dismissed with: ${reason}`;
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
  cancel(){
    this.location.back();
  }
  viewMembersList(){
    this.modalService.dismissAll();
    this.location.back();
    // this.router.navigate(['/member'])
  }


}
