import { Component, OnInit,ViewChild} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PatternService } from '../../../core/services/pattern.service';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../../core/services/login.service';
import { UserService} from '../../../core/services/user.service'
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { ToastrService } from 'ngx-toastr';
import {HttpClient, HttpHeaders,HttpErrorResponse} from '@angular/common/http';


@Component({
  selector: 'app-member-donations-dashboard',
  templateUrl: './member-donations-dashboard.component.html',
  styleUrls: ['./member-donations-dashboard.component.css']
})

export class MemberDonationsDashboardComponent implements OnInit {
  orgdataRes:any={
    orgInfo:[{}]
  }
  finalDataDonations:any=[];
  showAmountInDollars:boolean=false;
  finalData:any=[]
  loading = false;
  projectData:any={}
  currentLocation:any;
  setPosition:any;
  currentUserCurrency:string;
  getAddress:any;
  dollarInINR:any;
  zoom:any;
  lat:any;
  lng:any;
  message:any;
  resultModal:boolean=false
  addSuccess:boolean=false;
  addDanger:boolean=false;
  donations:any="Donations"
  numberPattern;
  amount:any;
  public payPalConfig?: IPayPalConfig;
  projectActivities:any;
  projectName:any;
  chapterName:any;
  projectToDonate:any;
  projectsList:any ;
  allProjects:any;
  term: string;
  donationTimeLine:any=true;
  activityTimeLine:any=false;
  isCheckedSpecifiActivityBtn = false;
  activitesSettings: any = {};
  activitiesData=[];
  dropdownList = [];
  selectedItems=[];
  dropdownSettings : any;
  projectIndex:any;
  projectModalRef:any;
  closeResult:any;
     // for Pagination starts
     projectsLength;
     memberDonationsLength;
     page  = 1;
     pageSize = 10;
     // for Pagination ends

     // for Donations Dropdown starts
    showProjectsList = true;
    showChaptersList;
    showOrgaizationsList;
    dropdownValue;
    filter = new FormControl('');
    filterData = [];



     // for Donations Dropdown ends

  addDonations:FormGroup;
  orgnazationDonateForm:FormGroup;
  chapterDonateForm:FormGroup;
  projects=[
    {
      "id":"1",
      "projectName":"Good Will",
      "description":"Youth empowerment is a process where children and young people are encouraged to take charge of their lives. They do this by addressing their situation and then take action in order to improve their access to resources and transform their consciousness through their beliefs, values, and attitudes.",
      "proposedDate" : "10-20-2016",
      "startDate":"11-24-2016",
      "endDate":"11-29-2018",
      
      "target":"$69,213",
      "status":"planning",
      "image":"../../../../assets/images/oldage_home.jpg",
      "activities":[
        {
          "id":"1",
        "activityName":"Youth Empowerment",
        "startDate":"11-29-2018",
        "endDate":"11-29-2018",
        "expExpenditure":"$69,213"
       },
   

    ]
    },
    {
      "id":"2",
     "projectName":"Digital Class Room",
     "description" : "A digital classroom is typically one that incorporates electronic devices and software into the learning environment. A digital classroom is where a physical classroom extends into a digital space. ... These classrooms rely on educational apps and websites to enhance student learning.",
     "proposedDate" : "11-10-2019",
      "startDate":"01-15-2020",
      "endDate":"09-15-2021",
      "target":"$50,000",
      "status":"open",
      "image":"../../../../assets/images/digital_class_1.jpg",
      "activities":[
        {
        "id":"1",
        "activityName":"Digital classrooms for primary class students",
        "startDate":"01-15-2020",
        "endDate":"05-15-2020",
        "expExpenditure":"$15000"
       },
       {
        "id":"2",
        "activityName":"Digital classrooms for secondary class students",
        "startDate":"01-15-2020",
        "endDate":"03-15-2020",
        "expExpenditure":"$20000"
       },
       {
        "id":"3",
        "activityName":"Maintenance",
        "startDate":"01-15-2020",
        "endDate":"09-15-2020",
        "expExpenditure":"$15000"
       },
    

    ]
    },
   
    {
      "id":"3",
      "projectName":"Book distribution for children",
      "description" : "The books were purchased by the Toys for Tots Foundation, which distributes millions of toys to children at Christmas each year, and sent to Stanly County Partnership for Children, which distributed them to SCS. The majority of the books are geared towards elementary and middle school students, said Debbie Pressley, assistant coordinator for Stanly County Toys for Tots.",
      "proposedDate" : "04-25-2020",
      "startDate":"06-05-2020",
      "endDate":"11-05-2020",
      "target":"$20,000",
      "status":"open",
      "image":"../../../../assets/images/distribution.jpg",
      "activities":[
        {
          "id":"1",
        "activityName":"Buying of new books",
        "startDate":"06-05-2020",
        "endDate":"08-07-2020",
        "expExpenditure":"$10000"
       },
       {
        "id":"2",
        "activityName":"Conducting seminar on book reading",
        "startDate":"04-05-2020",
        "endDate":"8-05-2020",
        "expExpenditure":"$5000"
       },
       {
        "id":"3",
        "activityName":"Maintenance",
        "startDate":"06-05-2020",
        "endDate":"11-10-2019",
        "expExpenditure":"$5000"
       },

    ]
    }
  ];


  donatedProjectsList = [
    { 
      "id": "1",
      "projectName" : "Adopt a school in Khammam",
      "dateTime" : "16-06-2020  10:25:00 hrs",
      "amount" : "$15000",
      "activities":[
        {
          "id":"1",
        "activityName":"Digital classrooms for primary class students",
        "startDate":"03/25/2020",
        "endDate":"08/27/2020",
        "expExpenditure":"$20,000",
        "description" : "A digital classroom is a classroom that is fully immersed in technology. Each students has access to an Internet connected device, whether it be a laptop, tablet, Chromebook, or other device, and the majority (or all of) the curriculum is delivered via an online, engaging, interactive platform."
        },
        {
          "id":"2",
        "activityName":"Playground for primary class students",
        "startDate":"01/15/2020",
        "endDate":"09/24/2020",
        "expExpenditure":"$30,000",
        "description" : "The ground is covered with huge boundary walls. My school playground is divided into three sections. One section is for playing football and other sports and the other two are the basketball and tennis court. My school playground also has many trees under which students sit and study sometimes or take rest."
        },
        {
          "id":"3",
        "activityName":"Provision of water and toilet facilities",
        "startDate":"02/25/2019",
        "endDate":"09/23/2020",
        "expExpenditure":"$40,000",
        "description" : "Drinking water and toilet facilities in Government schools. ... All States and UTs have been advised to comply with the provision of the RTE Act, 2020 which interalia states that every school building should have safe and adequate drinking water facilities to all children"
        },
      ]
    },
    { 
      "id": "2",
      "projectName" : "Cheyutha",
      "dateTime" : "05-04-2017  17:45:00 hrs",
      "amount" : "$30000",
      "activities":[
        {
          "id":"1",
        "activityName":"Help orphanage & Oldage Home",
        "startDate":"10/29/2014",
        "endDate":"10/27/2017",
        "expExpenditure":"$4,21,876",
        "description" : "This house will adopt the old age persons who are living on the street without familial support or care. It will provide food and shelter, minimum medical care and recreational opportunities."
        },
        {
          "id":"2",
        "activityName":"Constructing a building for oldage people",
        "startDate":"01/12/2018",
        "endDate":"06/27/2019",
        "expExpenditure":"$5,78,543",
        "description" : "Old age homes are meant for senior citizens who suffer with a problem in staying with their children at home or are destitute. These homes are for older people who have nowhere to go and no one to depend on? These homes create a friendly and family like atmosphere for the elderly people where they can share their joys and sorrows and live happily. Old Age Homes are pretty developed in United States, United Kingdom and there is recent development seen in the construction of Old Age Homes in India."
        },
        {
          "id":"3",
        "activityName":"Medical Care Facilities in Old Age Homes",
        "startDate":"11/21/2014",
        "endDate":"08/17/2017",
        "expExpenditure":"$3,32,198",
        "description" : "There are certain instruments that are necessary for the medical treatment such as Oxygen cylinders, suction apparatus and intra-venous sets should be readily available. Drugs should be replaced periodically, considering their expiry date."
        },
      ]
    },
    { 
      "id": "3",
      "projectName" : "Rural Development",
      "dateTime" : "21-06-2020  18:50:00 hrs",
      "amount" : "$5000",
      "activities":[
        {
          "id":"1",
        "activityName":"Provision of Health Awareness",
        "startDate":"02/20/2020",
        "endDate":"10/22/2020",
        "expExpenditure":"$60,000",
        "description" : "Awareness plays a key role in our approach to improving access to healthcare. We seek to empower communities, medical professionals and patients with appropriate tools, information and skills so that they can make high-quality, informed decisions on prevention, diagnosis, treatment, care, and support."
        },
        {
          "id":"2",
        "activityName":"Provisions of Plantation",
        "startDate":"04/27/2019",
        "endDate":"09/22/2020",
        "expExpenditure":"$50,000",
        "description" : "The State Government may make rules requiring that in every plantation the employer shall provide the workers with such number and type of unbrellas, blankets, rain coats or other like amenities for the protection of workers from rain or cold as may be prescribed"
        },
  
      ]

    }
  ]

  chaptersList = [
    {
      "id" : "1",
      "chapterName" : "Khammam",
      "location" : "Telangana",
      "country" : "India"
    },
    {
      "id" : "2",
      "chapterName" : "Khammam and Bhadradri Kotthagudem",
      "location" : "Khammam",
      "country" : "India"
    },
    {
      "id" : "3",
      "chapterName" : "Prakasam",
      "location" : "Andhrapradesh",
      "country" : "India"
    },
  ]

  checkUser;
  isAdmin = false;
  isMember = false;
  userToken:any;
  currentUser;
  memberId:any = {memberId:''};
  memberDonationsData:any =[];
  donationDetails:any = {_id:'',amount:'',projectId:'',dateAdded:''};
  donationPermissions:any = {read:'',write:'',none:'',update:''}
  financialPermissions:any = {read:'',write:'',none:'',update:''}
  constructor(private _router:Router, private loginService:LoginService,private modalService: NgbModal, private formBuilder:FormBuilder,private service:UserService,public patternService: PatternService,private toastr: ToastrService,private http:HttpClient) {
    this.numberPattern=patternService.goalPattern;
   
      this.isMember = true;
  this.loading = false;

  }
 
  openViewModal(viewModal,index){
    // console.log(index);
    this.projectModalRef = this.modalService.open(viewModal ,{ariaLabelledBy: 'modal-basic-title',size: 'lg'});
    this.projectModalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    this.memberDonationsData.forEach(element => {
      if(element._id === index){
        // console.log('matched');
        this.donationDetails._id =element._id;
        this.donationDetails.amount =element.amount;
        this.donationDetails.projectId = element.projectId;
       this.donationDetails.dateAdded = element.dateAdded;
        // console.log(this.donationDetails);
      }else{
        console.log('Un matched');
      }
    });
  
   }
   openModal(donate,index,projectName,activities) {
   // this.modalService.dismissAll();
    this.projectIndex=index-1
    this.projectModalRef = this.modalService.open(donate ,{ ariaLabelledBy: 'modal-basic-title', size: 'md', centered: true });
    //this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'md', centered: true })
    this.projectModalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.modalService.dismissAll(this.isCheckedSpecifiActivityBtn = false);
    });
    this.projectToDonate=index;
    this.projectName=projectName;
    this.projectActivities=activities;
    this.projectData.projectId = index;
    this.service.getProject(this.projectData).subscribe(res=>{
      // console.log(res);
      let actRes:any={
  
      }
      actRes=res
      this.projectActivities=actRes.activities[0].activities
    })
    // this.service.get().subscribe(res=>{
    //   console.log(res);
     
    //   this.projectsList=res;
    // })

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
  ngOnInit(): void {
    // this.memberDonationsData =JSON.parse(localStorage.getItem('donationdata'));

    // console.log(this.memberDonationsData);
 
    this.service.getOrgInfo().subscribe(res=>{

      this.orgdataRes=res
      // console.log(this.orgdataRes); 
    
    },err=>{
      console.log(err.error);
     
    })
    this.currentUser = this.loginService.getToken();
    const roleIDs = this.currentUser.roles;
    // console.log(roleIDs);
      this.service.getpermissions(roleIDs).subscribe(res=>{
        const role = res;
        const rolePermissions = role.permissionSet;
        rolePermissions.forEach(element => {
          if(element.permissionsName === 'Donations'){
            this.donationPermissions = element.permission
          }
        })
      })

    this.getCurrentLocation();
    this.getAllProjects();

    this.zoom = 16;
    this.getCurrency()
    this.initConfig()

  
this.showDonationsDropdowns(this.dropdownValue);
//this.showProjectsList = true;
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'activityName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      enableCheckAll: true
    }
   

    this.addDonations = this.formBuilder.group({
      selectedActivities  : [''],
      donationAmount  : ['',[Validators.required,Validators.pattern(this.numberPattern)]],
      memberId:[''],
      projectId:[''],
      memberName:[''],
      paymentDetails:[''],
      donatedCurrency:[''],
      valInDollar:['']

    });
    
    // this.orgnazationDonateForm = this.formBuilder.group({
    //   donationName:'Organization Donation',
    //   orgDonationAmount:['']
    // });

    // this.chapterDonateForm= this.formBuilder.group({
    //   chapterDonationAmount:['']
    // });
    this.checkUser = localStorage.getItem('usertype');
    //var currentUserType = this.checkUser;
    // console.log('check User ' + this.checkUser);
    if( this.checkUser === "admin"){
      this.isAdmin =true;
  
    }
    else if(this.checkUser === "member"){
      this.isMember=true;
    }
     
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  isCheckedSpecifiActivity(){
    this.isCheckedSpecifiActivityBtn = !this.isCheckedSpecifiActivityBtn;
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
    // console.log(this.donationTimeLine);
    // console.log(this.activityTimeLine);
  }

  onAddDonations(){
    // console.log(this.addDonations.value);
    this.addDonations.get('memberId').setValue(this.currentUser.id);
    this.addDonations.get('projectId').setValue(this.projectToDonate);
    this.addDonations.get('memberName').setValue(this.currentUser.userFirstName + ' ' + this.currentUser.userLastName);
    // this.addDonations.get('activitiesList').setValue(this.currentUser.userFirstName + ' ' + this.currentUser.userLastName);
    // console.log(this.addDonations.value);
    this.service.addDonation(this.addDonations.value).subscribe(res=>{
      // console.log(res);
    })
    
    this.modalService.dismissAll();

  }
  getAllProjects(){
    this.loading = true
    this.service.getAllProjects().subscribe(res=>{
      // console.log(res);
     
      this.projectsList=res;
      this.allProjects =   this.projectsList.Projects;
      var index = 1;
      this.allProjects.filter(x=>{
        x.index = index;
        index++;
      // console.log( this.allProjects);
      this.loading = false;
    });
    this.projectsLength = this.allProjects.length;
    this.finalData= this.allProjects
    // console.log(this.projectsLength);
  });
}


  // getMemberDonations(){
  //   this.service.getMemberDonations(this.currentUser).subscribe(res=>{
  //     console.log(res);
     
  //     this.donationList=res;
  //   })

  // }



  showDonationsDropdowns(value){
    
    this.dropdownValue = value;
    if(this.dropdownValue === "showProjects")
    {
      this.showProjectsList = true;
      this.showChaptersList = false;
      this.showOrgaizationsList = false;

    }
    else if(this.dropdownValue === "showChapters")
    {
      this.showChaptersList = true;
      this.showProjectsList = false;
      this.showOrgaizationsList = false;
    }
    else if(this.dropdownValue === "showOrgnaizations"){
      this.showOrgaizationsList = true;
      this.showChaptersList = false;
      this.showProjectsList = false;
      
    }
  }

  openMdModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'md', centered: true })
    .result.then((result) => {
      // console.log(result);
    }, (reason) => {
      console.log('Err!', reason);
    });
  }

  openChapterModal(content,chapterName) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'md', centered: true })
    .result.then((result) => {
      // console.log(result);
    }, (reason) => {
      console.log('Err!', reason);
    });
    this.chapterName = chapterName;
  }

  onOrganizationDonate(){
    // console.log(this.orgnazationDonateForm.value);
    this.modalService.dismissAll();
  }

  onChapterDonate(){
    // console.log(this.chapterDonateForm.value);
    console.log("chapter name :" + this.chapterName )
    this.modalService.dismissAll();
  }
  private initConfig(): void {
      // console.log(this.currentUserCurrency)
      if(this.currentUserCurrency=="INR"){
        // console.log("enter1")
        this.payPalConfig = {
          currency: "INR",
          clientId: 'ATcIKw5QGfWM8iPLytl-94xZ6Jm0B_zlct_HLcTDz_Y8cGWX9-kKfs-fn0AMcDjmVn46MjD47XOXLWBI',
          createOrderOnClient: (data) => <ICreateOrderRequest>{
            intent: 'CAPTURE',
            purchase_units: [
              {
                amount: {
                  currency_code: 'INR',
                  value: this.addDonations.value.donationAmount,
                  breakdown: {
                    item_total: {
                      currency_code: 'INR',
                      value:this.addDonations.value.donationAmount
                    }
                  }
                },
                items: [
                  {
                    name: this.projectName,
                    quantity: '1',
                    category: 'DIGITAL_GOODS',
                    unit_amount: {
                      currency_code:  'INR',
                      value: this.addDonations.value.donationAmount,
                    },
                  }
                ]
              }
            ]
          },
          advanced: {
            commit: 'true'
          },
          style: {
            label: 'paypal',
            layout: 'vertical'
          },
          onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then(details => {
              console.log('onApprove - you can get full order details inside onApprove: ', details);
            });
          },
          onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            console.log(this.dollarInINR);
          
            this.addDonations.get('memberId').setValue(this.currentUser.id);
            this.addDonations.get('projectId').setValue(this.projectToDonate);
            this.addDonations.get('memberName').setValue(this.currentUser.userFirstName + ' ' + this.currentUser.userLastName);
            this.addDonations.get('paymentDetails').setValue(data);
            let valInDollar=this.addDonations.value.donationAmount/this.dollarInINR
            valInDollar=Math.floor(valInDollar*100)/100
            this.addDonations.get('donatedCurrency').setValue('INR');
            this.addDonations.get('valInDollar').setValue(valInDollar);

            console.log(this.addDonations.value);
            this.service.addDonation(this.addDonations.value).subscribe(res=>{
              console.log(res);
              let donationResult:any={
                
              }=res;
              console.log(donationResult);
              console.log(this.resultModal)
              if(donationResult.message="Donation added successfully"){
                this.getDonationsByMemberId()
                console.log("enter");
                this.addSuccess=true;
                this.addDanger=false;
                this.message="Thankyou!,Amount Donated Successfully"
                this.resultModal=true
                console.log(this.resultModal)
                this.modalService.dismissAll();
                this.toastr.success("Thankyou!,Amount Donated Successfully");
                this.addDonations.reset();
              }
              else{
                console.log("enter2");
                this.addSuccess=false;
                this.addDanger=true;
                this.message="Amount deducted,but cannot be added to our records.Please contact the adminstrator"
                this.toastr.error("Amount deducted,but cannot be added to our records.Please contact the adminstrator",);
                this.resultModal=true
      
              }
            })
            
            this.modalService.dismissAll();
      
          },
          onCancel: (data, actions) => {
          
            console.log('OnCancel', data, actions);
          },
          onError: err => {
            this.addSuccess=false;
            this.addDanger=true;
            this.message="Payement failed,try again later"
            console.log('OnError', err);
          },
          onClick: (data, actions) => {
            console.log('onClick', data, actions);
          },
        
        };
      }
      else{
        console.log("enter2")
        this.payPalConfig = {
        currency: "USD",
        clientId: 'ATcIKw5QGfWM8iPLytl-94xZ6Jm0B_zlct_HLcTDz_Y8cGWX9-kKfs-fn0AMcDjmVn46MjD47XOXLWBI',
        createOrderOnClient: (data) => <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: this.addDonations.value.donationAmount,
                breakdown: {
                  item_total: {
                    currency_code:'USD',
                    value:this.addDonations.value.donationAmount
                  }
                }
              },
              items: [
                {
                  name: this.projectName,
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                    currency_code: 'USD',
                    value: this.addDonations.value.donationAmount,
                  },
                }
              ]
            }
          ]
        },
        advanced: {
          commit: 'true'
        },
        style: {
          label: 'paypal',
          layout: 'vertical'
        },
        onApprove: (data, actions) => {
          console.log('onApprove - transaction was approved, but not authorized', data, actions);
          actions.order.get().then(details => {
            console.log('onApprove - you can get full order details inside onApprove: ', details);
          });
        },
        onClientAuthorization: (data) => {
          console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
          console.log(this.dollarInINR);
          let donationAmount = this.addDonations.value.donationAmount*this.dollarInINR
          donationAmount=Math.floor(donationAmount*100)/100
          this.addDonations.get('donationAmount').setValue(donationAmount);
          this.addDonations.get('memberId').setValue(this.currentUser.id);
          this.addDonations.get('projectId').setValue(this.projectToDonate);
          this.addDonations.get('memberName').setValue(this.currentUser.userFirstName + ' ' + this.currentUser.userLastName);
          this.addDonations.get('paymentDetails').setValue(data);
          this.addDonations.get('donatedCurrency').setValue('USD');
          console.log(this.addDonations.value);
          this.service.addDonation(this.addDonations.value).subscribe(res=>{
            console.log(res);
            let donationResult:any={
              
            }=res;
            console.log(donationResult);
            console.log(this.resultModal)
            if(donationResult.message="Donation added successfully"){
              this.getDonationsByMemberId()
              console.log("enter");
              this.addSuccess=true;
              this.addDanger=false;
              this.message="Thankyou!,Amount Donated Successfully"
              this.resultModal=true
              console.log(this.resultModal)
              this.modalService.dismissAll();
              this.toastr.success("Thankyou!,Amount Donated Successfully");
              this.addDonations.reset();
            }
            else{
              console.log("enter2");
              this.addSuccess=false;
              this.addDanger=true;
              this.message="Amount deducted,but cannot be added to our records.Please contact the adminstrator"
              this.toastr.error("Amount deducted,but cannot be added to our records.Please contact the adminstrator",);
              this.resultModal=true
    
            }
          })
          
          this.modalService.dismissAll();
    
        },
        onCancel: (data, actions) => {
        
          console.log('OnCancel', data, actions);
        },
        onError: err => {
          this.addSuccess=false;
          this.addDanger=true;
          this.message="Payement failed,try again later"
          console.log('OnError', err);
        },
        onClick: (data, actions) => {
          console.log('onClick', data, actions);
        },
      
      };
      }
  }
  getConfigDetails(){
    console.log(this.addDonations.value.donationAmount)
    this.amount=this.addDonations.value.donationAmount;
    this.initConfig();
  }
  openPayement(addPayement){
    this.modalService.open(addPayement, { ariaLabelledBy: 'modal-basic-title', size: 'md', centered: true })
    .result.then((result) => {
      console.log(result);
    }, (reason) => {
      console.log('Err!', reason);
    });

  }
  closeResultModal(){
    this.resultModal=false;
  }
  getCurrency(){
    this.service.getCurrency('USD').subscribe(res=>{
    //  console.log(res);
     let currencyResult:any={

     }=res;
     this.dollarInINR=currencyResult.rates.INR;
     this.dollarInINR=Math.floor(this.dollarInINR*100)/100
     console.log(this.dollarInINR);
     
    })
  }
  getCurrentLocation(){
  //   if (navigator.geolocation) {
  //     console.log("enter1")
  //     navigator.geolocation.getCurrentPosition((position: Position) => {
  //       console.log(position)
  //       if (position) {
  //         console.log("enter2")
  //       this.lat = position.coords.latitude;
  //       this.lng = position.coords.longitude;
  //       this.getAddress=(this.lat,this.lng)
  //       console.log(position)
  //       console.log("enter3")
  //       this.apiloader.load().then(() => {
  //         let geocoder = new google.maps.Geocoder;
  //         let latlng = {lat: this.lat, lng: this.lng};
  //         console.log("enter4")
  //         geocoder.geocode({'location': latlng}, function(results) {
  //             if (results[0]) {
  //               results.forEach(element => {
  //                   if(element.types.includes('country')){
  //                     this.currentLocation= element.formatted_address;
  //                   }
  //               });
  //               // this.currentLocation= results;
  //               if(this.currentLocation=="India"){
  //                 this.currentUserCurrency="INR"
  //               }
  //               console.log(this.currentUserCurrency);
  //               console.log(this.currentLocation)
  //             console.log(this.assgin);
  //             } else {
  //               console.log('Not found');
  //             }
  //         });
  //       });
  
  //     }
  //   })
  // }
     this.service.getCurrentLocation().subscribe(res=>{
      // console.log(res);
      let locResult:any={

      }
      locResult=res;
      this.currentLocation= locResult.country;
      console.log(this.currentLocation);
      if(this.currentLocation=="India"){
        console.log("enter1")
        this.currentUserCurrency="INR"
      }
      else{
        console.log("enter2")
        this.currentUserCurrency="USD"
      }
    })
  }
  onClick(){
    this.getDonationsByMemberId()

  }


 
    
  getDonationsByMemberId(){
    this.loading = true;


    this.memberId.memberId = this.currentUser.id;

     var id=this.memberId.memberId
    this.service.getDonationByMemberIds(id).subscribe(res=>{
 

     this.memberDonationsData = res.donation;
     this.memberDonationsLength = this.memberDonationsData.length;

    //console.log(this.memberDonationsLength);
    var index = 1;

    this.memberDonationsData.filter(x=>{
     
      x.index = index;
      index++;
      this.loading = false;

    });
    this.finalDataDonations = this.memberDonationsData;
    this.loading = false;
  },err=>{
    this.loading = false;
    console.log(err.error);
  });
  }
  search(term: string){
    // console.log(term)
    if (!term) {
      this.allProjects = this.finalData;
    } else {
      this.allProjects = this.finalData.filter(x =>       
        x.projectName.trim().toLowerCase().includes(term.trim().toLowerCase())     
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
    this.projectsLength = this.allProjects.length;
  }
  search2(term: string){
    // console.log(term)
    if (!term) {
      this.memberDonationsData = this.finalDataDonations;
    } else {
      this.memberDonationsData = this.finalDataDonations.filter(x =>       
        x.projectName.trim().toLowerCase().includes(term.trim().toLowerCase())     
      );

    
    }
    this.memberDonationsLength = this.memberDonationsData.length;
  }
  
  changeAmountCurrency(val){
    console.log(val.target.checked)
    if(val.target.checked==true){
      this.showAmountInDollars=true;
    }
    else{
      this.showAmountInDollars=false;
    }
  }
  }
  

