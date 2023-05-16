import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../core/services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService} from '../../core/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  resultModalRef:any;
  addSuccess: boolean;
  addDanger: boolean;
  message: string;
  url:any;
  passwordForm:FormGroup;
  confirmResut:any;
  passwordModal:any;
  orgdataRes:any={
    orgInfo:[{}]
  }
  loginFunction:any;
  loginForm : FormGroup;
  error:any;
  constructor( private formBuilder : FormBuilder, private loginService : LoginService, private router: Router,private service:UserService,private modalService: NgbModal )  { 
    this.loginForm = this.formBuilder.group({
      id : ['', Validators.required ],
      password : ['', Validators.required ],
      
    });
  }
  
  onLogin() {
    console.log(this.loginForm.value);
    this.service.userLogin(this.loginForm.value).subscribe(res=>{
      this.error = '';
      console.log(res);
      localStorage.setItem('userToken', JSON.stringify(res));
      window.location.reload
      // this.router.navigate(['/dashboard/home']);
      this.router.navigate(['/dashboard/home']).then(() => {
        window.location.reload();
      });
    },
      error=>{
        this.error = error.error.message;
      }  
    )
}

  ngOnInit(): void {

    this.service.getOrgInfo().subscribe(res=>{
      console.log(res);
      this.orgdataRes=res
      console.log(this.orgdataRes); 
    
    },err=>{
      console.log(err.error);
     
    })
    this.passwordForm=this.formBuilder.group({
      userId:new FormControl('', Validators.required),
      url:new FormControl(''),

    });
 }
 forgotPassword(passModal){
  this.passwordModal = this.modalService.open(passModal , { ariaLabelledBy: 'modal-basic-title', centered: true,size:'sm' });
  this.passwordModal.result.then((result) => {
   this.confirmResut = `Closed with: ${result}`;
 }, (reason) => {
  this.confirmResut = `Dismissed with: ${reason}`;

 });

}
sendLink(resultModal){
 this.url= location.protocol + '//' + location.host;
 console.log(this.url);
 this.passwordForm.get('url').setValue(this.url);
 this.service.forgotPasswordLink(this.passwordForm.value).subscribe(res=>{
  let passRes:any={};
  passRes=res;
 console.log(passRes);
 if(passRes.message=="Password Link Sent"){
  this.addSuccess=true;
  this.addDanger=false;
  this.message="Password Link Sent";
  this.passwordForm.get('userId').setValue('');
  this.passwordModal.close()
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
confirm(resultModal) {
  this.resultModalRef = this.modalService.open(resultModal , { ariaLabelledBy: 'modal-basic-title', centered: true,size:'sm' });
  this.resultModalRef.result.then((result) => {
   this.confirmResut = `Closed with: ${result}`;
 }, (reason) => {
   this.confirmResut = `Dismissed with: ${reason}`;
 });
}



}
