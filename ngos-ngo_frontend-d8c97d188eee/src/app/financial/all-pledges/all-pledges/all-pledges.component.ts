import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-all-pledges',
  templateUrl: './all-pledges.component.html',
  styleUrls: ['./all-pledges.component.css']
})
export class AllPledgesComponent implements OnInit {
  orgdataRes:any={
    orgInfo:[{}]
  }
  availableRecords = 0;
  finalData:any=[]
  viewPledgeData:any={};
  pledges:any=[];
  pledgesLength;
   // for Pagination starts
   page  = 1;
   pageSize = 10;
   // for Pagination ends
  loading = false;
  constructor(private service:UserService,private modalService: NgbModal) {
  this.loading = true;

  }

  ngOnInit(): void {
    this.getAllPledges();
    this.service.getOrgInfo().subscribe(res=>{
      // console.log(res);
      this.orgdataRes=res
      // console.log(this.orgdataRes); 
    
    },err=>{
      console.log(err.error);
     
    })
  }
  getAllPledges(){
    this.service.allPledgesList().subscribe(res=>{
    //  console.log(res);
  this.loading = false;

     this.pledges=res;
     this.pledgesLength=this.pledges.pledges.length
     var index = 1;
     var count =0;
     this.pledges.pledges.filter(x=>{
       x.index = index;
       x.name=this.pledges.pledges[count].firstName.trim()+' '+this.pledges.pledges[count].lastName
       index++;
       count++
     });
     this.finalData= this.pledges.pledges;
     this.availableRecords=this.pledges.pledges.length
   })

  }
  openViewModal(viewPledge,data){
    this.viewPledgeData=data;
    this.modalService.open(viewPledge, { ariaLabelledBy: 'modal-basic-title', size: 'md', centered: true })
    .result.then((result) => {
      // console.log(result);
    }, (reason) => {
      console.log('Err!', reason);
    });

  }
  search(term: string){
    // console.log(term)
    if (!term) {
      this.pledges.pledges = this.finalData;
    } else {
      this.pledges.pledges = this.finalData.filter(x =>       
        x.name.trim().toLowerCase().includes(term.trim().toLowerCase())     
      );
     
    }
    this.availableRecords = this.pledges.pledges.length;
  }


}
