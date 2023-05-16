
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PatternService } from '../../../core/services/pattern.service';
//import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../../core/services/login.service';

@Component({
  selector: 'app-member-pledges-dashboard',
  templateUrl: './member-pledges-dashboard.component.html',
  styleUrls: ['./member-pledges-dashboard.component.css']
})
export class MemberPledgesDashboardComponent implements OnInit {
  checkUser;
  isAdmin = false;
  isMember = false;
  closeResult:any;
  resultModalRef:any;
  resultModal:any;
  confirmResut:any
  constructor(private formBuilder : FormBuilder, private patterns : PatternService, private modalService: NgbModal,private _router:Router, private loginService:LoginService) {

   }

  ngOnInit(): void {
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
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  
  }

}