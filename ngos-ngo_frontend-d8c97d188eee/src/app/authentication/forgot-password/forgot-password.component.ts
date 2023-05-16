import { Component, OnInit } from '@angular/core';
import { UserService} from '../../core/services/user.service';
import { ActivatedRoute,Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PatternService } from '../../core/services/pattern.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  showError:boolean=false;
  confirmResut:any;
  resultModalRef:any;
  passwordForm:FormGroup;
  orgdataRes:any={
    orgInfo:[{}]
  }
  addSuccess: boolean;
  addDanger: boolean;
  message: string;
  constructor(private service:UserService,private route: ActivatedRoute, private formBuilder : FormBuilder,private modalService: NgbModal,private patternService:PatternService,private router: Router) { }

  ngOnInit(): void {
    
    this.service.getOrgInfo().subscribe(res=>{
      console.log(res);
      this.orgdataRes=res
      console.log(this.orgdataRes); 
    
    },err=>{
      console.log(err.error);
     
    })
    this.passwordForm=this.formBuilder.group({
      token:new FormControl(''),
      type:new FormControl(''),
      newPassword:new FormControl('', [Validators.pattern(this.patternService.passwordPattern)]),
      cnfPassword:new FormControl('', Validators.required),


    });
    this.route.params.subscribe(res => {
      this.passwordForm.get('token').setValue(res.id);
    });
  }
  confirm(resultModal) {
    this.resultModalRef = this.modalService.open(resultModal , { ariaLabelledBy: 'modal-basic-title', centered: true,size:'sm' });
    this.resultModalRef.result.then((result) => {
      console.log(result);
      if(result === 'cancel') {
        this.login()
      }
     this.confirmResut = `Closed with: ${result}`;
   }, (reason) => {
    if (reason === ModalDismissReasons.ESC || 
      reason === ModalDismissReasons.BACKDROP_CLICK ) {
        this.login()
  }
     this.confirmResut = `Dismissed with: ${reason}`;
   });
  }
  forgotPassword(resultModal){
    this.showError=false;
    if(this.passwordForm.value.newPassword == this.passwordForm.value.cnfPassword){
    this.passwordForm.get('type').setValue('forgot');
    this.service.updatePassword(this.passwordForm.value).subscribe(res=>{
      let passRes:any={};
      passRes=res;
     console.log(passRes);
     if(passRes.message=="Password updated succesfully"){
      this.addSuccess=true;
      this.addDanger=false;
      this.message="Password updated succesfully,You can Login";
      this.passwordForm.get('newPassword').setValue('');
      this.passwordForm.get('cnfPassword').setValue('');
      this.confirm(resultModal)
     }
     else{
      this.addSuccess=false;
      this.addDanger=true;
      this.message="Password cannot be updated, Please try again"
      this.confirm(resultModal)
     }
    });
  }
  else{
    this.showError=true;
  }

  }
  login(){
    console.log("camein")
     this.router.navigate(['/authorization/login'])
    //  this.router.navigate(['/authorization/login']).then(() => {
    //   window.location.reload();
    // });
  }


}
