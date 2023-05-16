import { Component, OnInit } from '@angular/core';

import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { PatternService } from '../../core/services/pattern.service';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit {
  orgdataRes:any={
    orgInfo:[{}]
  }
  eventData ;
  newsDataForm:FormGroup;
  submitted = false;
  public status: string;
  message:string;
  result;
  imageChangedEvent: any = '';
  projectsData:any;
  image;
  newsData;
  resultModalRef:any;
  confirmResut:any;
  loading = false;
  //error Messages declarations starts

  errorMessageTitleReq;
  errorMessageTitleInvalid;
  errorMessageDescriptionReq;
  errorMessageDescriptionInvalid;
  errorMessageDescriptionMaxLimit;
  errorMessageImageReq;

  //error messages declarations ends
  constructor(private formBuilder: FormBuilder,private location:Location,private service:UserService,private modalService: NgbModal,private router:Router, private patterns:PatternService) { 
    this.errorMessageTitleReq = this.patterns.errorMessageTitleReq;
    this.errorMessageTitleInvalid = this.patterns.errorMessageTitleInvalid;
    this.errorMessageDescriptionReq = this.patterns.errorMessageDescriptionReq;
    this.errorMessageDescriptionInvalid = this.patterns.errorMessageDescriptionInvalid;
    this.errorMessageDescriptionMaxLimit = this.patterns.errorMessageDescriptionMaxLimit;
    this.errorMessageImageReq = this.patterns.errorMessageImageReq;
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
      title: ['',[Validators.required,Validators.pattern(this.patterns.newsTitlePattern)]],
      image: ['',[Validators.required]],
      description: ['',[Validators.required]],
      _id:[''],
    });
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

  addNews(resultModal){
    this.loading = true;
    this.newsDataForm.value.image =  this.image;
    console.log(this.newsDataForm.value);
    // this.http.post('http://localhost:3000/news/addNews',this.newsDataForm.value)
    this.service.addNews(this.newsDataForm.value).subscribe(res=>{
      console.log(res);
      this.loading = false;
      this.result = res;
      console.log(res);
      this.message = this.result.message;
      this.newsDataForm.reset();
      this.imageChangedEvent ='';
      this.image = '';
      this.confirm(resultModal);
    },err=>{
      console.log(err.error);
      this.loading = false;
    })
  };

  cancel(){
    this.location.back()
  }


  
  confirm(resultModal) {
    this.resultModalRef = this.modalService.open(resultModal , { ariaLabelledBy: 'modal-basic-title', centered: true,size:'sm' });
    this.resultModalRef.result.then((result) => {
     this.confirmResut = `Closed with: ${result}`;

   }, (reason) => {
     this.confirmResut = `Dismissed with: ${reason}`;
     this.modalService.dismissAll();
     this.router.navigate(['/news/newsList'])
   });
 }

}

