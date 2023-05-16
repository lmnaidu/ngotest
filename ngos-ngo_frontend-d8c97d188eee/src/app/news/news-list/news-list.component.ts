import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Location } from '@angular/common';
import { UserService } from '../../core/services/user.service';
import { LoginService} from '../../core/services/login.service';
import { PatternService } from '../../core/services/pattern.service';
@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  orgdataRes:any={
    orgInfo:[{}]
  }
  loading = false;
  page  = 1;
  pageSize = 10;
  newsDataForm:FormGroup;
  newsEditDataForm:FormGroup;
  imageChangedEvent: any = '';
  image:any;
  data:any = ['assets/images/add-1.jpg']
  newsData:any ={News:[
    {_id:'1',title:'Improve school facilities',discription:'An effective school facility is responsive to the changing programs of educational delivery, and at a minimum should provide a physical environment that is comfortable, safe, secure, accessible, well illuminated, well ventilated, and aesthetically pleasing.',image:'assets/images/digital_class_1.jpg'},
    {_id:'2',title:'Youth Empowerment',discription:'One of the keys to empowering the youth is with skill development. When a youth is equipped with essential skills, he can utilize them to feed, assist others, and even invest for future use, aiding the nation economically',image:'assets/images/youth_1.jpg'},
    {_id:'3',title:'Help orphanage & Oldage Home',discription:'This house will adopt the old age persons who are living on the street without familial support or care. It will provide food and shelter, minimum medical care and recreational opportunities.',image:'assets/images/oldage_home.jpg'}
  ]};
  userToken:any;
  singleNewsData:any = {_id:'',discription:'',getimage:'',title:''};
  newsDataResult:any = {_id:'',discription:'',getimage:'',title:''};
  allNewsData:any = [{
    index:0,
    _id:'',
    discription:'',
    title:'',
    image:''
  }]
 //error Messages declarations starts

   errorMessageTitleReq;
   errorMessageTitleInvalid;
   errorMessageDescriptionReq;
   errorMessageDescriptionInvalid;
   errorMessageDescriptionMaxLimit;
   errorMessageImageReq;
  updateResult:any;
  resultModalRef:any;
  confirmResut:any;
  message:any;
  error:any;
  newsPermissions:any = {none:'',read:'',write:'',update:''};
  availableNewsRecords = 0;
  finalData:any = [];
  showMore = false;
   //error messages declarations ends
  constructor(private http:HttpClient,private formBuilder: FormBuilder, private modalService:NgbModal,private location:Location, private service:UserService,private loginService:LoginService, private patterns:PatternService) {
    this.errorMessageTitleReq = this.patterns.errorMessageTitleReq;
    this.errorMessageTitleInvalid = this.patterns.errorMessageTitleInvalid;
    this.errorMessageDescriptionReq = this.patterns.errorMessageDescriptionReq;
    this.errorMessageDescriptionInvalid = this.patterns.errorMessageDescriptionInvalid;
    this.errorMessageDescriptionMaxLimit = this.patterns.errorMessageDescriptionMaxLimit;
    this.errorMessageImageReq = this.patterns.errorMessageImageReq;
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
    this.newsDataForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      image: ['',[Validators.required]],
      discription:['',[Validators.required]],
      _id:[''],
    });
    this.newsEditDataForm = this.formBuilder.group({
      title: ['',[Validators.required,Validators.pattern(this.patterns.newsTitlePattern)]],
      image: ['',[Validators.required]],
      discription:['',[Validators.required]],
      _id:[''],
    });
    // this.http.get('http://localhost:3000/news/allNews')
   
    this.userToken = this.loginService.getToken();
    const roleIDs = this.userToken.roles;
      this.service.getpermissions(roleIDs).subscribe(res=>{
        const role = res;
        const rolePermissions = role.permissionSet;
        rolePermissions.forEach(element => {
          if(element.permissionsName === 'News'){
            this.newsPermissions = element.permission
          }
        })
      })
    this.getAllnews();
  }

  getAllnews(){
    this.service.allNewsData().subscribe(res=>{
      console.log(res);
      this.newsData = res;
      this.allNewsData =  this.newsData.News;
      var index = 1;
  this.loading = false;
      this.allNewsData.filter(x=>{
        x.index = index;
        x.showMore=false
        index++;
      });
      this.finalData = this.allNewsData;
      this.availableNewsRecords = this.finalData.length;
      console.log( this.allNewsData);
    });
  }

  search(term: string,){
    console.log(term)
    if (!term) {
      this.allNewsData = this.finalData;
    } else {
      this.allNewsData = this.finalData.filter(x =>       
        x.title.trim().toLowerCase().includes(term.trim().toLowerCase())     
      );
    } 
    this.availableNewsRecords = this.allNewsData.length;
  }

  updateModel(updateData,id){
    console.log(id)
    this.loading = true;
    this.modalService.open(updateData, { size: 'lg' });
    // this.vewSingleNewsData(id);
    this.service.getNewsById(id).subscribe(res=>{
      this.newsDataResult = res;
    this.loading = false;
      // this.singleNewsData.discription =   this.newsDataResult.discription;
      this.newsDataResult.getimage =   this.newsDataResult.image;
      // this.singleNewsData.title =   this.newsDataResult.title;
      // this.singleNewsData._id =   this.newsDataResult._id;
      this.newsEditDataForm = this.formBuilder.group({
        title:new FormControl ( this.newsDataResult.title,[Validators.required,Validators.pattern(this.patterns.newsTitlePattern)]),
        image: new FormControl ('',[Validators.required]) ,
        discription:new FormControl ( this.newsDataResult.discription),
        _id: new FormControl ( this.newsDataResult._id),
      });
    },err=>{
      console.log(err.error);
      this.loading = false;
    })
   
  }

  
   
  fileChangeEvent(event: any): void {
    console.log(event)
    this.imageChangedEvent = event;
    // this.image = event.base64;
    // console.log(this.image);
  }

   // image crop
   imageCropped(event: ImageCroppedEvent) {
    this.image = event.base64;
    console.log(this.image);
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
  cancel(){
    this.location.back()
  }
  addNews(){
    this.newsDataForm.value.image =  this.image;
    console.log(this.newsDataForm.value);
    // this.http.post('http://localhost:3000/news/addNews',this.newsDataForm.value).subscribe(res=>{
    //   console.log(res);
    //   this.result = res;
    //   console.log(res);
    //   this.newsDataForm.reset();
    //   this.imageChangedEvent ='';
    //   this.image = '';
    // })
  }
  updateNews(resultModal,resultErrorModal){
    this.loading = true;
    if(this.image){
      this.newsEditDataForm.value.image =  this.image;
    }else{
      this.newsEditDataForm.value.image =  this.newsDataResult.getimage;
    }
    console.log(this.newsEditDataForm.value);
    this.service.updateNews(this.newsEditDataForm.value._id, this.newsEditDataForm.value).subscribe(res=>{
      console.log(res);
      this.loading = false;
      this.updateResult = res;
      this.message =  this.updateResult.message;
      this.confirm(resultModal);
    },err=>{
      console.log(err.error);
      this.error = err.error.message;
      this.confirmError(resultErrorModal);
      this.loading = false;
    })
  }

  confirm(resultModal) {
    this.resultModalRef = this.modalService.open(resultModal , { ariaLabelledBy: 'modal-basic-title', centered: true,size:'sm' });
    this.resultModalRef.result.then((result) => {
     this.confirmResut = `Closed with: ${result}`;
   }, (reason) => {
     this.confirmResut = `Dismissed with: ${reason}`;
     this.modalService.dismissAll();
     this.getAllnews();
   });
 }

 confirmError(resultErrorModal){
  this.resultModalRef = this.modalService.open(resultErrorModal , { ariaLabelledBy: 'modal-basic-title', centered: true,size:'sm' });
  this.resultModalRef.result.then((result) => {
  this.confirmResut = `Closed with: ${result}`;
}
//  , (reason) => {
//    this.confirmResut = `Dismissed with: ${reason}`;
//    this.modalService.open
//  }
);
}

  vewSingleNewsData(id){
    this.service.getNewsById(id).subscribe(res=>{
      this.newsDataResult = res;
      this.singleNewsData.discription =   this.newsDataResult.discription;
      this.singleNewsData.getimage =   this.newsDataResult.image;
      this.singleNewsData.title =   this.newsDataResult.title;
      this.singleNewsData._id =   this.newsDataResult._id;
    },err=>{
      console.log(err.error);
    })
  }

  viewModel(viewData,id){
    console.log(id);
    this.modalService.open(viewData, { size: 'lg' });
    this.vewSingleNewsData(id);
  }
  
}
