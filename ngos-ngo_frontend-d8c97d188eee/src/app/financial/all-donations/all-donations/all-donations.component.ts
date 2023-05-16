import { Component, OnInit } from '@angular/core';
import { UserService} from '../../../core/services/user.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-all-donations',
  templateUrl: './all-donations.component.html',
  styleUrls: ['./all-donations.component.css']
})
export class AllDonationsComponent implements OnInit {
  orgdataRes:any={
    orgInfo:[{}]
    
  }
  availableRecords = 0;
  donationsList:any=[];
  page  = 1;
  pageSize = 20;
  donationsLength;
  viewDonationData:any;
  showAct:boolean;
  loading = false;
  finalData:any=[];

  constructor(private service:UserService,private modalService: NgbModal) {
  this.loading = true;

  }

  ngOnInit(): void {
    this.getAllDonations();
    this.service.getOrgInfo().subscribe(res=>{
      // console.log(res);
      this.orgdataRes=res
      // console.log(this.orgdataRes); 
    
    },err=>{
      console.log(err.error);
     
    })
  }
  getAllDonations(){
    this.service.allDonationsList().subscribe(res=>{
  this.loading = false;

      let result:any={

      }
      result=res;
      console.log(result);
      this.donationsList = result.donations;
      // console.log(this.donationsList)
      this.donationsLength=this.donationsList.length;
      var index = 1;
      this.donationsList.filter(x=>{
        x.index = index;
        index++;
      });
      this.availableRecords= this.donationsList.length
      this.finalData = this.donationsList;
    },err=>{
      console.log(err.error)
    })
  }
  openViewModal(openViewModal,donationData){

    this.viewDonationData=donationData
    if(this.viewDonationData.activities){
      if(this.viewDonationData.activities[0].activityName){
        this.showAct=true;

      }
      else{
        this.showAct=false
      }
    }
    else{
      this.showAct=false
    }

    // console.log(this.showAct)
    this.modalService.open(openViewModal, { ariaLabelledBy: 'modal-basic-title', size: 'md', centered: true })
    .result.then((result) => {
      // console.log(result);
    }, (reason) => {
      console.log('Err!', reason);
    });

  }
  openActivity(donatedActivities){
    this.modalService.open(donatedActivities, { ariaLabelledBy: 'modal-basic-title', size: 'md', centered: true })
    .result.then((result) => {
      // console.log(result);
    }, (reason) => {
      console.log('Err!', reason);
    });


  }
  search(term: string){
    // console.log(term)
    if (!term) {
      this.donationsList = this.finalData;
    } else {
      this.donationsList = this.finalData.filter(x =>       
        x.memberName.trim().toLowerCase().includes(term.trim().toLowerCase())     
      );
  
     
    }
    this.availableRecords = this.donationsList.length;
  }

}
