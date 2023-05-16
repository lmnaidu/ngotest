import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PatternService } from '../../core/services/pattern.service';
//import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../core/services/login.service';
import { UserService } from '../../core/services/user.service';
import { VerticalTimelineCardComponent } from 'angular-vertical-timeline';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { ToastrService } from 'ngx-toastr';
import { Location, DatePipe } from '@angular/common';

@Component({
  selector: 'app-member-pledges-list',
  templateUrl: './member-pledges-list.component.html',
  styleUrls: ['./member-pledges-list.component.css']
})
export class MemberPledgesListComponent implements OnInit {
  orgdataRes:any={
    orgInfo:[{}]
  }
  loading = false;
   // for Pagination starts

   page  = 1;
   pageSize = 10;
   // for Pagination ends
  pledgesLength;
  todayDate;
  viewPledgeData:any={};
  remainingAmount:any;
  selectedPledgeId:any;
  projectToDonate:any;
  numberPattern
  addDonations:FormGroup;
  dollarInINR:any;
  public payPalConfig?: IPayPalConfig;
  pledgedCurrency:any;
  currentUserCurrency:string;
  getAddress:any;
  currentLocation:any;
  projectsData:any = {Projects:[]};
  memberData:any={
    "id":''
  };
  pledges:any=[];
  memberPledgeInfo : any;
  memberPledgeAmount;
  addSuccess:boolean=false;
  addDanger:boolean=false;
  currentUser:any={};
  resultModal:any;
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
  donationToPledgeForm : FormGroup;
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


pledgePermissions:any = { none:'',read:'',write:'',update:''}
constructor(private formBuilder : FormBuilder, private patterns : PatternService, private modalService: NgbModal,private _router:Router, private loginService:LoginService,private service:UserService,private toastr: ToastrService) {
  this.numberPattern=patterns.goalPattern;
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
    this.todayDate = new Date();
    // this.todayDate= new DatePipe('en-US').transform( this.todayDate,'MM-dd-yyyy')
    this.userToken = this.loginService.getToken();
    this.currentUser = this.loginService.getToken();
    this.getAllPledges();
    this.getCurrentLocation();
    this.getCurrency();
    
    this.service.allProjectss().subscribe(res=>{
      console.log(res);
      this.projectsData = res;
      console.log(res);
    });

      this.addPledgesForm = this.formBuilder.group({
        
      projectId : new FormControl('',Validators.required),
      pledgeAmount : new FormControl('',[Validators.required,Validators.pattern(this.patterns.goalPattern)]),
      donationFrequency : ['oneTime',Validators.required],
      date: new FormControl('',Validators.required),
      memberId:new FormControl(''),
      pledgedCurrency:new FormControl('')
    })
    this.addDonations = this.formBuilder.group({
      selectedActivities  : [''],
      donationAmount  : ['',[Validators.required,Validators.pattern(this.numberPattern)]],
      memberId:[''],
      projectId:[''],
      memberName:[''],
      paymentDetails:[''],
      pledgeId:[''],
      remAmount:[''],
      valInDollar:['']

    });

    this.donationToPledgeForm = this.formBuilder.group({
      pledgeinfo :  new FormControl('',Validators.required),
      donatedAmount : new FormControl('',[Validators.required,Validators.pattern(this.patterns.goalPattern)]),

    })


    const roleIDs = this.userToken.roles;
    console.log(roleIDs);
      this.service.getpermissions(roleIDs).subscribe(res=>{
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
  openDonationModal(content,pledgeinfo,pledgeamount,pledgedCurrency,pledgeId,remAmount,proId){
    console.log(content,pledgeinfo,pledgeamount,pledgedCurrency);
    this.projectToDonate=proId
    this.remainingAmount=remAmount
    this.selectedPledgeId=pledgeId
    this.memberPledgeInfo =pledgeinfo;
    this.memberPledgeAmount  = pledgeamount;
    this.pledgedCurrency=pledgedCurrency
    this.donationToPledgeForm.get('pledgeinfo').setValue(this.memberPledgeInfo);
    this.donationToPledgeForm.get('donatedAmount').setValue(this.remainingAmount);
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
    this.loading= true;
    this.addPledgesForm.get('memberId').setValue(this.userToken.id);
    this.addPledgesForm.get('pledgedCurrency').setValue(this.currentUserCurrency);
    this.service.addPledge(this.addPledgesForm.value).subscribe(res=>{
      console.log(res);
    this.loading= false;
      let addResult:any={
      }
      addResult=res;
      if(addResult.message="pledge added successfully"){
         this.getAllPledges();
         this.addSuccess=true;
         this.addDanger=false;
         this.message="Pledge added successfully"
         this.confirm(resultModal);
         this.addPledgesForm.reset();
      }
      else{
        this.addSuccess=false;
        this.addDanger=true;
        this.message="Cannot add data,try again"
        this.confirm(resultModal);
this.loading= false;
      }
    })
    // console.log(this.addPledgesForm.value);
    // this.message="Pledges Added Successfully";
    // this.confirm(resultModal);
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
 getAllPledges(){

   this.memberData.id=this.userToken.id

   var id=this.memberData.id;
   
   this.service.getPledgesByMemberIds(id).subscribe(res=>{
  this.loading = false;

    console.log(res);
    this.pledges=res;
    this.pledgesLength=this.pledges.pledges.length
    var index = 1;
  this.loading = false;
    this.pledges.pledges.filter(x=>{
      x.index = index;
      index++;
    });
  })

 }

 onDonation(){
  console.log(this.donationToPledgeForm.value);
  this.modalService.dismissAll();
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
      console.log(res);
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
  openPayement(addPayement){
    this.initConfig();
    this.modalService.open(addPayement, { ariaLabelledBy: 'modal-basic-title', size: 'md', centered: true })
    .result.then((result) => {
      console.log(result);
    }, (reason) => {
      console.log('Err!', reason);
    });
  }
  private initConfig(): void {
    console.log(this.donationToPledgeForm.value.donatedAmount);
    console.log(this.currentUserCurrency)
    if(this.pledgedCurrency=="INR"){
      console.log("enter1")
      this.payPalConfig = {
        currency: "INR",
        clientId:'ATcIKw5QGfWM8iPLytl-94xZ6Jm0B_zlct_HLcTDz_Y8cGWX9-kKfs-fn0AMcDjmVn46MjD47XOXLWBI',
        createOrderOnClient: (data) => <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'INR',
                value: this.donationToPledgeForm.value.donatedAmount,
                breakdown: {
                  item_total: {
                    currency_code: 'INR',
                    value:this.donationToPledgeForm.value.donatedAmount
                  }
                }
              },
              items: [
                {
                  name: this.memberPledgeInfo,
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                    currency_code:  'INR',
                    value: this.donationToPledgeForm.value.donatedAmount
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
          this.addDonations.get('pledgeId').setValue(this.selectedPledgeId);
          this.addDonations.get('donationAmount').setValue(this.donationToPledgeForm.value.donatedAmount);
          let valInDollar=this.donationToPledgeForm.value.donatedAmount/this.dollarInINR
          valInDollar=Math.floor(valInDollar*100)/100
          this.addDonations.get('valInDollar').setValue(valInDollar);
          let remAmount:any;
          if(this.remainingAmount==this.donationToPledgeForm.value.donatedAmount || this.remainingAmount<this.donationToPledgeForm.value.donatedAmount){
            remAmount=0;
          }
          else{
            remAmount=this.remainingAmount-this.donationToPledgeForm.value.donatedAmount
          }
          this.addDonations.get('remAmount').setValue(remAmount);
          console.log(this.addDonations.value);
          this.service.addDonationAgainstPledge(this.addDonations.value).subscribe(res=>{
            console.log(res);
            let donationResult:any={

            }=res;
            console.log(donationResult);
            console.log(this.resultModal)
            if(donationResult.message="Donation added successfully"){
              this.getAllPledges();
              console.log("enter");
              this.addSuccess=true;
              this.addDanger=false;
              this.message="Thankyou!,Amount Donated Successfully"
              this.resultModal=true
              console.log(this.resultModal)
              this.modalService.dismissAll();
              this.toastr.success("Thankyou!,Amount Donated Successfully");
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
              value: this.donationToPledgeForm.value.donatedAmount,
              breakdown: {
                item_total: {
                  currency_code:'USD',
                  value:this.donationToPledgeForm.value.donatedAmount
                }
              }
            },
            items: [
              {
                name: this.memberPledgeInfo,
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'USD',
                  value: this.donationToPledgeForm.value.donatedAmount,
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
        let donationAmount = this.donationToPledgeForm.value.donatedAmount*this.dollarInINR
        donationAmount=Math.floor(donationAmount*100)/100
        this.addDonations.get('memberId').setValue(this.currentUser.id);
          this.addDonations.get('projectId').setValue(this.projectToDonate);
          this.addDonations.get('memberName').setValue(this.currentUser.userFirstName + ' ' + this.currentUser.userLastName);
          this.addDonations.get('paymentDetails').setValue(data);
          this.addDonations.get('pledgeId').setValue(this.selectedPledgeId);
          this.addDonations.get('donationAmount').setValue(donationAmount);
          let remAmount:any;
          if(this.remainingAmount==this.donationToPledgeForm.value.donatedAmount || this.remainingAmount<this.donationToPledgeForm.value.donatedAmount){
            remAmount=0;
          }
          else{
            remAmount=this.remainingAmount-this.donationToPledgeForm.value.donatedAmount
          }
          this.addDonations.get('remAmount').setValue(remAmount);
        console.log(this.addDonations.value);
        this.service.addDonationAgainstPledge(this.addDonations.value).subscribe(res=>{
          console.log(res);
          let donationResult:any={

          }=res;
          console.log(donationResult);
          console.log(this.resultModal)
          if(donationResult.message="Donation added successfully"){
            this.getAllPledges();
            console.log("enter");
            this.addSuccess=true;
            this.addDanger=false;
            this.message="Thankyou!,Amount Donated Successfully"
            this.resultModal=true
            console.log(this.resultModal)
            this.modalService.dismissAll();
            this.toastr.success("Thankyou!,Amount Donated Successfully");
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
openViewModal(viewPledge,data){
  this.viewPledgeData=data;
  this.modalService.open(viewPledge, { ariaLabelledBy: 'modal-basic-title', size: 'md', centered: true })
  .result.then((result) => {
    console.log(result);
  }, (reason) => {
    console.log('Err!', reason);
  });

}
}
