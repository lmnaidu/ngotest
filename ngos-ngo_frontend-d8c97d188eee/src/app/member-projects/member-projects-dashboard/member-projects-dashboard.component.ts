import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../core/services/user.service';


@Component({
  selector: 'app-member-projects-dashboard',
  templateUrl: './member-projects-dashboard.component.html',
  styleUrls: ['./member-projects-dashboard.component.css']
})
export class MemberProjectsDashboardComponent implements OnInit {
  orgdataRes:any={
    orgInfo:[{}]
  }
  projectIndex:any;
  projectModalRef:any;
  closeResult:any;
  donationTimeLine:any=true;
  activityTimeLine:any=false;
  resultModalRef:any;
  viewModal;




  projects=[
    {
      "id":"1",
      "projectName":"Adopt a school in Khammam",
      "startDate":"05-16-2019",
      "endDate":"12-13-2019",
      "target":"$60,000",
      "status":"open",
      "activities":[
        {
        "id":"1",
        "activityName":"Digital classrooms for primary class students",
        "startDate":"12-10-2019",
        "endDate":"12-10-2019",
        "expExpenditure":"$250"
       },
       {
        "id":"2",
        "activityName":"Digital classrooms for secondary class students",
        "startDate":"12-10-2019",
        "endDate":"12-10-2019",
        "expExpenditure":"$250"
       },
       {
        "id":"3",
        "activityName":"Playground for primary class students",
        "startDate":"12-10-2019",
        "endDate":"12-10-2019",
        "expExpenditure":"$250"
       },

    ]
    },
    {
      "id":"2",
      "projectName":"Constructing a building for old age people",
      "startDate":"12-10-2019",
      "endDate":"06-22-2020",
      "target":"$55,000",
      "status":"planning",
      "activities":[
        {
          "id":"1",
        "activityName":"Buying of new cots",
        "startDate":"12-10-2019",
        "endDate":"12-10-2019",
        "expExpenditure":"250$"
       },
       {
        "id":"2",
        "activityName":"Construction of new rooms",
        "startDate":"12-10-2019",
        "endDate":"12-10-2019",
        "expExpenditure":"250$"
       },
       {
        "id":"3",
        "activityName":"Buying medicines and first aid kits",
        "startDate":"12-10-2019",
        "endDate":"12-10-2019",
        "expExpenditure":"250$"
       },

    ]
    },
    {
      "id":"3",
      "projectName":"Books distribute for children",
      "startDate":"	01-22-2019",
      "endDate":"12-13-2019",
      "target":"$45,000",
      "status":"open",
      "activities":[
        {
          "id":"1",
        "activityName":"Buying of new books",
        "startDate":"12-10-2019",
        "endDate":"12-10-2019",
        "expExpenditure":"250$"
       },
       {
        "id":"2",
        "activityName":"Conducting seminar on book reading",
        "startDate":"12-10-2019",
        "endDate":"12-10-2019",
        "expExpenditure":"250$"
       },

    ]
    }
  ];
  constructor( private modalService: NgbModal,private service:UserService) { }

  ngOnInit(): void {
    this.service.getOrgInfo().subscribe(res=>{
      console.log(res);
      this.orgdataRes=res
      console.log(this.orgdataRes); 
    
    },err=>{
      console.log(err.error);
     
    })
  }

  openViewModal(viewModal,index){
    this.projectIndex=index-1
    this.projectModalRef = this.modalService.open(viewModal ,{ariaLabelledBy: 'modal-basic-title',size: 'xl'});
    this.projectModalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  
   }
   viewProjects(){
    this.resultModalRef.close();
    this.projectModalRef.close();
    // this.ngWizardService.next();
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
 changetimeline(timeLine){
  if(timeLine=="donationTimeLine"){
    this.donationTimeLine=true;
    this.activityTimeLine=false;
  }
  else{
   this.donationTimeLine=false;
   this.activityTimeLine=true;

  }
  console.log(this.donationTimeLine);
  console.log(this.activityTimeLine);
}
}
