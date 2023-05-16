import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup,FormControl, Validators, NgModel } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import {LoginService } from '../../core/services/login.service';
import { PatternService} from '../../core/services/pattern.service';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  loading = false;
  page  = 1;
  pageSize = 10;
  confirmResut:any;
  resultModalRef:any;
  resultModal:any;
  eventData ;
  registerForm: FormGroup;
  updateEventForm:FormGroup;
  submitted = false;
  public status: string;
  message:string;
  error:any;
  result;
  projectsData:any = {Projects:[]};
  imageChangedEvent: any = '';
  image;
  eventsData:any = {Events:[]};
  cities: any = [];
  selectedItems: any = [];
  memberSettings: any = {};
  editmemberSettings:any = {};
  ShowFilter = false;
  dropdownList = [];
  memberData:any=[];
  userToken:any;
  membersResult:any;
  selectedMembers:any = [];
  singleEventData:any = {projectId:{_id:''},location:'',date:'',desc:'',getimage:'',_id:'',note:'',memberId:[]};
  updatedResult:any;
  getEvents:any;
  availableEventsRecords = 0;
  eventNamePattern:any;
  allEvents:any = [{
    index:0,
    note:'',
    projectId:'',
    image:'',
    location:'',
    memberId:'',
    desc:'',
    date:'',
    _id:''
  }];
  myEvents:any;
  eventPermissions:any = {none:'',read:'',write:'',update:''};
  finalData:any = [];
  constructor(private modalService: NgbModal,private formBuilder: FormBuilder,private http:HttpClient,private service:UserService, private loginService:LoginService,private patternService:PatternService) { 
   this.eventNamePattern = this.patternService.eventNamePattern;
  this.loading = true;
  }

  ngOnInit(): void {
    this.userToken = this.loginService.getToken();
    const roleIDs = this.userToken.roles;
      this.service.getpermissions(roleIDs).subscribe(res=>{
        const role = res;
        const rolePermissions = role.permissionSet;
        // console.log(rolePermissions);
        rolePermissions.forEach(element => {
          if(element.permissionsName === 'Events'){
            this.eventPermissions = element.permission
          }
         
        })
        // console.log(this.eventPermissions);
      })
    this.registerForm = this.formBuilder.group({
      note: ['', [Validators.required,Validators.pattern(this.patternService.eventNamePattern)]],
      projectId:['',Validators.required],
      image: ['',Validators.required],
      memberId:['',Validators.required],
      date:['',Validators.required],
      location:['',Validators.required],
      _id:[''],
      desc:['',Validators.required]
    });
    this.updateEventForm = this.formBuilder.group({
      note: new FormControl( '' ,[ Validators.required,Validators.pattern(this.patternService.eventNamePattern)]),
      lastName: new FormControl('',[ Validators.required]),
      email: new FormControl( '' ,[ Validators.required] ),
      role: new FormControl( '',[ Validators.required]),
      desc: new FormControl( '',[ Validators.required]),
      status:new FormControl('',[ Validators.required]),
      image:new FormControl(''),
      memberId:new FormControl('',[ Validators.required]),
      _id:['']
    });
  
    this.projectsData.Projects = [
      {_id:'1',projectName:'Sanitation'},
      {_id:'2',projectName:'Disaster Risk Reduction and Response'},
      {_id:'3',projectName:'Offerings Agriculture'},
      {_id:'4',projectName:'NGO Elite (As Default)'}
    ]

    this.service.allProjects().subscribe(res=>{
      // console.log(res);
      this.projectsData = res;
      // console.log(res);
    });
    
   

    

    
    this.memberSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'fullName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      enableCheckAll: false
    }
    this.editmemberSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'firstName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      enableCheckAll: false
    }
    this.getAllevents();
    this.getAllMembersData();
  }

  // get all membersdata
  getAllMembersData(){
    this.service.getAllMembers().subscribe(res=>{
      // console.log(res);
      this.membersResult = res;
      
      this.memberData = this.membersResult.members;
      this.memberData .forEach(ele => {
        ele.fullName=ele.firstName + ' ' + ele.lastName
      });
    },err=>{
      console.log(err.error)
    })
  }
  

  // get all events

  getAllevents(){
    this.service.allEvents().subscribe(res=>{
      this.eventsData = res;    
      this.allEvents = this.eventsData.Events;
  this.loading = false;
     
      var index = 1;
      this.allEvents.filter(x=>{
        x.index = index;
        index++;
      });
      this.finalData = this.allEvents
      this.availableEventsRecords =  this.finalData.length;
      // console.log(this.allEvents);
    },err=>{
      console.log(err.error);
      this.error = err.error.message;
    });
  }
  search(term: string,){
    // console.log(term)
    if (!term) {
      this.allEvents = this.finalData;
    } else {
      this.allEvents = this.finalData.filter(x =>       
        x.note.trim().toLowerCase().includes(term.trim().toLowerCase())     
      );
    } 
    this.availableEventsRecords = this.allEvents.length;
  }
  

  openModel(addData) {
    this.selectedMembers=[];
    this.modalService.open(addData, { size: 'lg' });
   
  }
  singleEvent(id){
    this.eventsData.Events.forEach(element => {
      if(id === element._id){
        // console.log(element)
      
        // this.memberData = element.memberId;
        this.singleEventData.note = element.note
        this.singleEventData._id = element._id;
        this.singleEventData.date = element.date;
        this.singleEventData.desc = element.desc;
        this.singleEventData.getimage = element.image;
        this.singleEventData.location = element.location;
        this.singleEventData.projectId = element.projectId;
        this.singleEventData.memberId = element.memberId;
      }else{
        console.log('not matched')
      }
     
    });
  }
  updateModel(updateData,id){
    this.modalService.open(updateData, { size: 'lg' });
    this.singleEvent(id);
    this.updateEventForm = this.formBuilder.group({
      note: new FormControl( this.singleEventData.note , [ Validators.required,,Validators.pattern(this.patternService.eventNamePattern)]),
      _id: new FormControl(    this.singleEventData._id),
      date: new FormControl(  this.singleEventData.date,[ Validators.required]),
      desc: new FormControl(  this.singleEventData.desc ,[ Validators.required]  ),
      location: new FormControl(this.singleEventData.location ,[ Validators.required]),
      image:new FormControl('',[ Validators.required]),
      projectId:new FormControl(  this.singleEventData.projectId,[ Validators.required]),
      memberId:new FormControl( this.singleEventData.memberId,[ Validators.required]),
    });
  }

  onItemSelect(item: any) {
    // this.memberData =  this.singleEventData.memberId;
    this.selectedMembers.push(item._id);  
  }
  onItemDeSelect(items: any) {
    this.selectedMembers.pop();
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

   // image crop
   imageCropped(event: ImageCroppedEvent) {
    this.image = event.base64;
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

  addevent(resultModal){ 
    this.loading = true;
    this.registerForm.value.date =  new DatePipe('en-US').transform( this.registerForm.value.date , 'MM-dd-yyyy');
    this.registerForm.value.image =  this.image;
    this.registerForm.value.memberId =  this.selectedMembers;
    // console.log(this.registerForm.value);
    // this.http.post('http://localhost:3000/events/addEvent',this.registerForm.value)
    this.service.addEvent(this.registerForm.value).subscribe(res=>{
      this.loading = false;
      this.result = res;
      this.message =  this.result.message;
      this.registerForm.reset();
      this.getAllevents();
      this.confirm(resultModal);
      // this.service.allEvents().subscribe(res=>{
      //   this.eventsData = res;
      //   console.log( this.eventsData);
      //   this.message="Event Added Successfully.";
      
      // },err=>{
      //   console.log(err.error);
      // });
      
      
    },err=>{
      console.log(err.error)
    });
  }

  confirm(resultModal) {
    this.resultModalRef = this.modalService.open(resultModal , { ariaLabelledBy: 'modal-basic-title', centered: true,size:'sm' });
    this.resultModalRef.result.then((result) => {
     this.confirmResut = `Closed with: ${result}`;
   }, (reason) => {
     this.confirmResut = `Dismissed with: ${reason}`;
     this.modalService.dismissAll();
     this.getAllevents();
   });
 }

 
 updateEvent(resultModal){
   this.loading = true;
   if(this.image){
    this.updateEventForm.value.image =this.image;
   }else{
    this.updateEventForm.value.image = this.singleEventData.getimage;
   }
   const updateDate = this.updateEventForm.value
    this.service.updateEvent(this.singleEventData._id,updateDate ).subscribe(res=>{
      this.loading = false;
     this.updatedResult = res;
     this.message = this.updatedResult.message;
     this.confirm(resultModal);
    },err=>{
      console.log(err.error);
    })
 }


 viewEventData(viewEventesData,id){
    this.modalService.open(viewEventesData, { size: 'lg' });
    // this.singleEvent(id);
    this.getEventById(id)
 }

 getEventById(id){
   const eventId = id
   this.service.getEventById(eventId).subscribe(res=>{
    //  console.log(res);
    this.getEvents = res;
    this.singleEventData.note = this.getEvents.note
        this.singleEventData._id = this.getEvents._id;
        this.singleEventData.date = this.getEvents.date;
        this.singleEventData.desc = this.getEvents.desc;
        this.singleEventData.getimage = this.getEvents.image;
        this.singleEventData.location = this.getEvents.location;
        this.singleEventData.projectId = this.getEvents.projectId;
        this.singleEventData.memberId = this.getEvents.memberId;
   },err=>{
     console.log(err.error);
   })
 }

//  changeevents(event){
//    console.log(event)
//    if(event.target.checked === true){
//     this.myEvents = true;
//    }else{
//     this.myEvents = false;
//    }
  
//  }
}