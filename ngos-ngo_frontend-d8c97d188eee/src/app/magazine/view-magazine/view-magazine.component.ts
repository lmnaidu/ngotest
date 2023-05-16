import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService} from '../../core/services/user.service';
import { SwiperOptions } from 'swiper';
import { Location } from '@angular/common';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';
@Component({
  selector: 'app-view-magazine',
  templateUrl: './view-magazine.component.html',
  styleUrls: ['./view-magazine.component.css']
})
export class ViewMagazineComponent implements OnInit {
  orgdataRes:any={
    orgInfo:[{}]
  }
  id:any;
  loading = false;
  magazinesData:any ={
    newsId:{},
    projectId:{},
    event:{}
  };
  date= new Date();
  projectLength:any;
  closeResult:any; 
  expModalRef:any;
  projectsarray:any;
  projects:any = {_id:'',projectName:'',endDate:'',projectDescription:'',startDate:'',goal:'',projectImage:'',projectLocation:'',projectType:''};
  newsArray:any;
  singleNewsData:any = {_id:'',title:'',image:'',discription:''};
  eventsArray:any;
  singleEvent:any = {_id:'',desc:'',image:'',location:'',note:'',date:''};
  updatedMagazineForm:FormGroup;
  
  allProjects:any={Projects:[]};
  projectsData:any = [];
  newsData:any = {News:[]};
  newsesData:any = [];
  events:any = {Events:[]};
  eventsData:any = [];
  projectSettings: any = {};
  eventSettings:any = {};
  newsSettings:any = {};
  projectData:any = [];  
  selectedNews:any = [];
  selectedEvents :any = [];
  message:any;
  resultModalRef:any;
  confirmResut:any;
  updatedResult:any;
  userToken:any;
  magazinePermissions:any = {none:'',read:'',write:'',update:''} ;
  donationsList:any ;
  finalResult = [];
  constructor(private service:UserService,private formBuilder: FormBuilder,private route: ActivatedRoute,private location:Location,private modalService: NgbModal,private router:Router,private loginService:LoginService) {
  this.loading = true;
   }
  config: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30
  };
  ngOnInit(): void {
    this.service.getOrgInfo().subscribe(res=>{
      console.log(res);
      this.orgdataRes=res
      console.log(this.orgdataRes); 
    
    },err=>{
      console.log(err.error);
     
    })
    this.userToken = this.loginService.getToken();
    const roleIDs = this.userToken.roles;
      this.service.getpermissions(roleIDs).subscribe(res=>{
        const role = res;
        const rolePermissions = role.permissionSet;
        rolePermissions.forEach(element => {
          if(element.permissionsName === 'News'){
            this.magazinePermissions = element.permission
          }
        })
      })
    this.route.paramMap.subscribe(
      param => {
        this.id = param.get('id');
      }
    );
    this.service.getSingleMagazine(this.id ).subscribe(res=>{
    this.loading = false;
      this.magazinesData = res;
      this.projectsarray = this.magazinesData.projectId;
      this.projectLength= this.magazinesData.projectId.length;
      this.newsArray= this.magazinesData.newsId;
      this.eventsArray = this.magazinesData.event;
    });

    this.updatedMagazineForm = this.formBuilder.group({
      projectId: new FormControl('', [Validators.required]),
      newsId: new FormControl ('', [Validators.required]),
      event:new FormControl ('', [Validators.required]),
      adds:new FormControl (''),
      _id:new FormControl (''),
    })

    //  get list of data
    this.service.allProjects().subscribe(res=>{
      this.allProjects = res;
      this.projectsData = this.allProjects.Projects;
    });

    this.service.allNewsData().subscribe(res=>{
      this.newsData = res;
      this.newsesData =  this.newsData.News
    });
 
    this.service.allEvents().subscribe(res=>{
      this.events = res;
      this.eventsData = this.events.Events;
    });

    this.projectSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'projectName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      enableCheckAll: true
    }

    this.eventSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'note',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      enableCheckAll: true
    }
    this.newsSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'title',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      enableCheckAll: true
    }

    this.getAllDonations();
  }

  getAllDonations(){
    this.service.allDonations().subscribe(res=>{   
      this.donationsList = res;
      var unique = {};
      this.donationsList.donations.forEach(function(d) {
        if (unique.hasOwnProperty(d.memberName)) {
          unique[d.memberName] = unique[d.memberName] + d.amount;
        } else {
          unique[d.memberName] = d.amount;
        }
      });
      this.finalResult = [];     
      for (var prop in unique) {
        this.finalResult.push({ name: prop, totalAmount: unique[prop]  });
      }
      this.finalResult.sort((a, b) => {
        return <any>(b.totalAmount) - <any>(a.totalAmount);
      });   
    },err=>{
      console.log(err.error)
    })
  }

  cancel(){
    this.location.back()
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

  openExpModal(expModal,index){
   
    this.expModalRef = this.modalService.open(expModal ,{ariaLabelledBy: 'modal-basic-title',size: 'lg'});
    this.projectsarray.forEach(element => {
      if(element._id === index){
        this.projects._id =element._id;
        this.projects.projectName =element.projectName;
        this.projects.projectDescription = element.projectDescription;
        this.projects.startDate = element.startDate;
        this.projects.endDate = element.endDate;
        this.projects.goal = element.goal;
        this.projects.projectImage = element.projectImage;
        this.projects.projectLocation = element.projectLocation;
        this.projects.projectType = element.projectType
        console.log(this.projects);
      }else{
        console.log('Un matched');
      }
    });
  }

  openNewsModal(newsModel,id){
    this.expModalRef = this.modalService.open(newsModel ,{ariaLabelledBy: 'modal-basic-title',size: 'lg'});
    this.newsArray.forEach(element => {
      if(element._id === id){
        this.singleNewsData._id =element._id;
        this.singleNewsData.title =element.title;
        this.singleNewsData.discription = element.discription;
        this.singleNewsData.image = element.image;
      }else{
        console.log('Un matched');
      }
    });
  }

  openEventsModal(eventsModel,id){
    this.expModalRef = this.modalService.open(eventsModel ,{ariaLabelledBy: 'modal-basic-title',size: 'lg'});
    this.eventsArray.forEach(element => {
      if(element._id === id){
        this.singleEvent._id =element._id;
        this.singleEvent.desc =element.desc;
        this.singleEvent.location = element.location;
        this.singleEvent.image = element.image;
        this.singleEvent.note = element.note;
        this.singleEvent.date = element.date;
      }else{
        console.log('Un matched');
      }
    });
  }
  modalClose(){
    this.expModalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  
  onItemSelect(item: any) {
    this.projectData.push(item._id);  
  }
  onItemDeSelect(items: any) {
    this.projectData.pop();
  }
  onItemNewsSelect(item: any){
    this.selectedNews.push(item._id);
  }
  onNewsDeSelect(item:any){
    this.selectedNews.pop();
  }
  onItemEventSelect(item: any){
    this.selectedEvents.push(item._id);
  }

  onEventsDeSelect(item:any){
    this.selectedEvents.pop();
  }


  editMagazine(editingMagazine){
    this.expModalRef = this.modalService.open(editingMagazine ,{ariaLabelledBy: 'modal-basic-title',size: 'lg'});
    this.updatedMagazineForm = this.formBuilder.group({
      projectId: new FormControl(this.magazinesData.projectId,  [Validators.required]),
      newsId: new FormControl (this.magazinesData.newsId, [Validators.required]),
      event:new FormControl (this.magazinesData.event, [Validators.required]),
      adds:new FormControl (''),
      _id:new FormControl (this.magazinesData._id),
    })
  }

  updateMagazine(resultModal){
    this.loading = true;
    this.service.updateMagazine(this.updatedMagazineForm.value._id,this.updatedMagazineForm.value).subscribe(res=>{
      this.updatedResult = res;
      this.loading = false;
      this.message = this.updatedResult.message;   
      this.confirm(resultModal)
    },err=>{
      console.log(err.error)
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
     this.router.navigate(['/magazine/magazine-list'])
   });
 }


}
