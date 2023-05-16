import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PatternService } from '../../core/services/pattern.service';
import {LoginService } from '../../core/services/login.service';
import { UserService} from '../../core/services/user.service';

@Component({
  selector: 'app-branches-dashboard',
  templateUrl: './branches-dashboard.component.html',
  styleUrls: ['./branches-dashboard.component.css']
})
export class BranchesDashboardComponent implements OnInit {
  userPermissions:any = {read:'',write:'',update:''};
  orgdataRes:any={
    orgInfo:[{}]
    
  }
  tokenData:any;
  availableRecords = 0;
  finalData:any=[]
  viewChapter:any={}
  chaptersList:any=[]
  chapters:any={}
  confirmResult:any;
  chapterAdmins:any={}
  closeResult:any;
  resultModalRef:any;
  resultModal:any;
  confirmResut:any;
  userToken;
  addChapter:FormGroup;
  updateChapter:FormGroup;
  chapterIndex: number;
  loading = false;
  // for Pagination starts
  
  page  = 1;
  pageSize = 10;
  // for Pagination ends

  chapterslist = [
    {
      "id" : "1",
      "chapterName" : "Khammam",
      "country" : "India",
      "state" : "Telangana",
      "city" : "Khammam",
      "chapterAdminUSA" : "Babu",
      "chapterAdminIndia" : "Nageswara Rao",
      "description" : "Khammam"
    },
    {
      "id" : "2",
      "chapterName" : "Khammam and Bhadradri Kotthagudem",
      "country" : "India",
      "state" : "Telangana",
      "city" : "Khammam",
      "chapterAdminUSA" : "Raghav",
      "chapterAdminIndia" : "Anita",
      "description" : "Bhadradri"
    },
    {
      "id" : "3",
      "chapterName" : "Prakasam",
      "country" : "India",
      "state" : "Andhra Pradesh",
      "city" : "Prakasam",
      "chapterAdminUSA" : "Sunita",
      "chapterAdminIndia" : "Raj Kumar",
      "description" : "Prakasam"
    },
  ]
  chaptersLength;
  //error Declaraiton
  errorMessageChapterNameReq;
  errorMessageChapterNameInvalid;
  errorMessageChapterMinMax;
  errorMessageChapterAdminUSA;
  errorMessageChapterAdminIndia;
  errorMessageLocationReq;
  errorMessageLocationInvalid;
  errorMessageLocationMinMax;
  errorMessageDescriptionReq;
  errorMessageDescriptionMinMax;
  errorMessageDescriptionInvalid;
  errorMessageCountryReq;
  errorMessageStateReq;
  errorMessageCityReq;
  addSuccess: boolean;
  addDanger: boolean;
  message: string;
  constructor(private formBuilder : FormBuilder, private patterns : PatternService, private modalService: NgbModal, private loginService:LoginService,private service:UserService) {
  this.errorMessageChapterNameReq = this.patterns.errorMessageChapterNameReq;
  this.errorMessageChapterNameInvalid = this.patterns.errorMessageChapterNameInvalid;
  this.errorMessageChapterMinMax = this.patterns.errorMessageChapterMinMax;
  this.errorMessageChapterAdminUSA = this.patterns.errorMessageChapterAdminUSA;
  this.errorMessageChapterAdminIndia = this.patterns.errorMessageChapterAdminIndia;
  this.errorMessageLocationReq = this.patterns.errorMessageLocationReq;
  this.errorMessageLocationInvalid = this.patterns.errorMessageLocationInvalid;
  this.errorMessageLocationMinMax = this.patterns.errorMessageLocationMinMax;
  this.errorMessageDescriptionReq = this.patterns.errorMessageDescriptionReq;
  this.errorMessageDescriptionInvalid = this.patterns.errorMessageDescriptionInvalid;
  this.errorMessageDescriptionMinMax = this.patterns.errorMessageDescriptionMinMax;
  this.errorMessageCountryReq = this.patterns.errorMessageCountryReq;
  this.errorMessageStateReq = this.patterns.errorMessageStateReq;
  this.errorMessageCityReq = this.patterns.errorMessageCityReq;



  this.loading = true;




  }

  ngOnInit(): void {
    this.getOrgData();
    this.tokenData = this.loginService.getToken();
    const roleIDs = this.tokenData.roles;
      this.service.getpermissions(roleIDs).subscribe(res=>{
        const role = res;
        const rolePermissions = role.permissionSet;
        // console.log(rolePermissions)
        rolePermissions.forEach(element => {
          if(element.permissionsName === 'Chapters'){
            this.userPermissions = element.permission;
            // console.log(this.userPermissions);
          }
        })
      })
    this.getChapterAdmins();
    this.getAllChapters();
    this.userToken = this.loginService.getToken();

    this.addChapter = this.formBuilder.group({
      chapterName : new FormControl('', [Validators.required,Validators.pattern(this.patterns.chapterNamePattern), Validators.minLength(this.patterns.chapterNameMinLength), Validators.maxLength(this.patterns.chapterNameMaxLength) ]),
      adminUSA : new FormControl('', [Validators.required ]),
      adminInda : new FormControl('', [Validators.required ]),
      // country : new FormControl('', [Validators.required ]),
      // state : new FormControl('', [Validators.required ]),
      // city : new FormControl('', [Validators.required ]),
      addedBy : new FormControl(''),
      description : new FormControl('', [Validators.required]),
      // Validators.minLength(this.patterns.chapterDescriptionMinLength), Validators.maxLength(this.patterns.chapterDescriptionMaxLength)  
    })


    this.updateChapter = this.formBuilder.group({
      chapterName : new FormControl('', [Validators.required,Validators.pattern(this.patterns.chapterNamePattern), Validators.minLength(this.patterns.chapterNameMinLength), Validators.maxLength(this.patterns.chapterNameMaxLength) ]),
      adminUSA : new FormControl('', [Validators.required ]),
      adminInda : new FormControl('', [Validators.required ]),
      // country : new FormControl('', [Validators.required ]),
      // state : new FormControl('', [Validators.required ]),
      // city : new FormControl('', [Validators.required ]),
      description : new FormControl('', [Validators.required ]),
      objId : new FormControl('',),
      // , Validators.minLength(this.patterns.chapterDescriptionMinLength), Validators.maxLength(this.patterns.chapterDescriptionMaxLength)
    })

    

  }

  openAddChapterModal(content){
 
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  
  }

  openEditChapterModal(chapter,index,content){
    // console.log(index)
    
    this.updateChapter.get('chapterName').setValue(chapter.chapterName);
    this.updateChapter.get('adminUSA').setValue(chapter.adminUSA._id);
    this.updateChapter.get('adminInda').setValue(chapter.adminInda._id);
    // this.updateChapter.get('country').setValue(this.chapterslist[this.chapterIndex].country);
    // this.updateChapter.get('state').setValue(this.chapterslist[this.chapterIndex].state);
    // this.updateChapter.get('city').setValue(this.chapterslist[this.chapterIndex].city);
    this.updateChapter.get('description').setValue(chapter.description);
    this.updateChapter.get('objId').setValue(chapter._id);


 
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size: 'lg'}).result.then((result) => {
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

  onAddChapterSubmit(resultModal){
    this.loading = true;
    // console.log(this.addChapter.value);
    this.addChapter.get('addedBy').setValue(this.userToken.id);
    this.service.getAddChapter(this.addChapter.value).subscribe(res=>{
      // console.log(res);
    this.loading = false;
      let addRes:any={
      }
      addRes=res
      if(addRes.message=="Chapter added successfully"){
        this.addSuccess=true;
        this.addDanger=false;
        this.message="Chapter added successfully"
        this.confirm(resultModal);
        this.addChapter.reset();
        this.getAllChapters()
      }
      else{
        this.addSuccess=false;
        this.addDanger=true;
        this.message="Cannot add data,try again"
        this.confirm(resultModal);
  
      }
      // else{
      //   this.message="Cannot add the project, try again"
      // }
    })
    // this.modalService.dismissAll();
  }

  onUpdateChapterSubmit(resultModal){
this.loading = true;
    // console.log(this.updateChapter.value);
    this.service.updateChapter(this.updateChapter.value).subscribe(res=>{
      // console.log(res);
      this.loading = false;
      let updateRes:any={
      }
      updateRes=res
      if(updateRes.message=="Chapter updated successfully"){
        this.addSuccess=true;
        this.addDanger=false;
        this.message="Chapter updated successfully"
        this.confirm(resultModal);
        this.getAllChapters()
      }
      else{
        this.addSuccess=false;
        this.addDanger=true;
        this.message="Cannot update data,try again"
        this.confirm(resultModal);
  
      }
      // else{
      //   this.message="Cannot add the project, try again"
      // }
    })
    
    
    // this.modalService.dismissAll();
  }
  getChapterAdmins(){
    this.service.getAllChapterAdmins().subscribe(res=>{
    //  console.log(res);
     this.chapterAdmins=res;
    },
      error=>{
      }  
    )
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
 getAllChapters(){
  this.service.getAllChapters().subscribe(res=>{
    // console.log(res);
    this.chapters=res;
    this.chaptersList=this.chapters.chapters;
    this.chaptersLength=this.chaptersList.length;
    var index = 1;
    this.loading = false;
    this.chaptersList.filter(x=>{
      x.index = index;
      index++;
    });
    this.finalData= this.chaptersList
    this.availableRecords = this.chaptersList.length;
   },
     error=>{
     }  
   )

 }
 openViewModal(chapter,viewModal){

  this.viewChapter=chapter

  this.modalService.open(viewModal, {ariaLabelledBy: 'modal-basic-title',size: 'lg'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });


 }
 search(term: string){
  // console.log(term)
  if (!term) {
    this.chaptersList = this.finalData;
  } else {
    this.chaptersList = this.finalData.filter(x =>       
      x.chapterName.trim().toLowerCase().includes(term.trim().toLowerCase())     
    );

    
  }
  this.availableRecords = this.chaptersList.length;
}
getOrgData(){
  this.service.getOrgInfo().subscribe(res=>{
    // console.log(res);
    this.orgdataRes=res
    // console.log(this.orgdataRes); 
    // if(this.orgdataRes.count>0){
    //   this.dataPresent=true;
    // }
    // else{
    //   this.dataPresent=false
    // }
  },err=>{
    // console.log(err.error);
    // this.error = err.error.message;
    // this.confirmError(resultErrorModal);
    // this.loading = false;
  })

 }
}
