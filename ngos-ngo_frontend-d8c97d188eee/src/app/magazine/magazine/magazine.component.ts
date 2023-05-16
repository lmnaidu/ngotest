import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService} from '../../core/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
@Component({
  selector: 'app-magazine',
  templateUrl: './magazine.component.html',
  styleUrls: ['./magazine.component.css']
})
export class MagazineComponent implements OnInit {
  orgdataRes:any={
    orgInfo:[{}]
  }
  magazineForm:FormGroup;
  allProjects:any={Projects:[]};
  newsData:any = {News:[]};
  events:any = {Events:[]};
  magazinesData:any;
  projectsData:any = [];
  selectedNews:any = [];
  selectedEvents :any = [];
  projectData:any = []
  projectSettings: any = {};
  eventSettings:any = {};
  eventsData:any = [];
  newsSettings:any = {};
  newsesData:any = [];
  resultModalRef:any;
  confirmResut:any;
  message:string;
  filterForm:FormGroup;
  dateError:any;
  searchMagazines:any; todayDate = new Date();
  filterProjects:any;
  filterNews:any;
  filterEvents:any;
  nofilterEvents:any;
  nofilterNews:any;
  nofilterProjects:any;
  loading = false;
  constructor(private formBuilder: FormBuilder,private http:HttpClient,private location:Location, private service:UserService,private modalService: NgbModal,private router:Router) {

   }

  ngOnInit(): void {
    this.service.getOrgInfo().subscribe(res=>{
      console.log(res);
      this.orgdataRes=res
      console.log(this.orgdataRes); 
    
    },err=>{
      console.log(err.error);
     
    })
    this.filterForm = this.formBuilder.group({
      startDate: ['', [Validators.required]],
      endDate: ['',[Validators.required]],
    });
    this.magazineForm = this.formBuilder.group({
      projectId: ['', [Validators.required]],
      newsId: ['',[Validators.required]],
      event:['',[Validators.required]],
      adds:[''],
      _id:[''],
    });
    this.allProjects.Projects = [
      {id:'1',project_name:'Sanitation'},
      {id:'2',project_name:'Disaster Risk Reduction and Response'},
      {id:'3',project_name:'Offerings Agriculture'}
    ];

    this.newsData.News = [
      {id:'1', title:'Redemption Research for Health and Educational Development Society'},
      {id:'2', title:'Improve education through Digital lessons'},
      {id:'3', title:'Indian Women and Child Welfare Trust organizes awareness programs'}
    ];

    this.events.Events = [
      {id:'1', note:'health check-up camp'},
      {id:'2', note:'Dominations for Donations'},
      {id:'3', note:'Walk for Homeless'}
    ]


    // this.http.get('http://localhost:3000/project/allProjects')
    // this.service.allProjects().subscribe(res=>{
    //   console.log(res);
    //   this.allProjects = res;
    //   this.projectsData = this.allProjects.Projects;
    //   console.log(this.projectsData);
    // });

    // this.http.get('http://localhost:3000/news/allNews')
    // this.service.allNewsData().subscribe(res=>{
    //   console.log(res);
    //   this.newsData = res;
    //   this.newsesData =  this.newsData.News
    //   console.log(this.newsesData);
    // });
 
    // this.http.get('http://localhost:3000/events/allEvents')
    // this.service.allEvents().subscribe(res=>{
    //   console.log(res);
    //   this.events = res;
    //   this.eventsData = this.events.Events;
    //   console.log(this.eventsData);
    // });
   
    this.projectSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'projectName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      enableCheckAll: true,
      // limitSelection:4
    }

    this.eventSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'note',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      enableCheckAll: true,
      // limitSelection:3
    }
    this.newsSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'title',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      enableCheckAll: true,
      // limitSelection:3
    }
   
  }
  dateValidate(){
    //  this.filterForm.value.startDate =  new DatePipe('en-US').transform(  this.filterForm.value.startDate , 'yyyy-MM-dd H:M:S')
    // this.filterForm.value.endDate = new DatePipe('en-US').transform(  this.filterForm.value.endDate , 'yyyy-MM-dd H:M:S')
    if(this.filterForm.value.startDate  > this.filterForm.value.endDate){
      this.dateError = 'Please select a valid date range.'
    }else{
      this.dateError = ''
    }
  }

  serachFilter(){
    
    this.filterForm.value.endDate.setDate(this.filterForm.value.endDate.getDate() + 1 );
    console.log(this.filterForm.value);
    this.service.grtFilterData(this.filterForm.value).subscribe(res=>{
      this.filterProjects = res;  
      console.log(this.filterProjects)    
      if(this.filterProjects.length != 0){
        this.projectsData = this.filterProjects;
        this.nofilterProjects = '';
      }else{
        this.nofilterProjects = 'No Projects in the date range';
      }
     
      
    },err=>{
      console.log(err.error)
    })

    this.service.getNewsFilterData(this.filterForm.value).subscribe(res=>{    
      this.filterNews = res;
      console.log(this.filterNews)
      if(this.filterNews.length != 0){
        this.newsesData =   this.filterNews;
        this.nofilterNews = '';
      }else{
        this.nofilterNews = 'No News in the date range';
      }
     
    },err=>{
      console.log(err.error)
    })

    this.service.getEventsFilterData(this.filterForm.value).subscribe(res=>{
      this.filterEvents = res;
      console.log(   this.filterEvents )
      if(this.filterEvents.length != 0 ){
        this.eventsData =  this.filterEvents ;
        this.nofilterEvents = '';
      }else{
        this.nofilterEvents = 'No Events in the date range';
      }
      
    },err=>{
      console.log(err.error)
    })
      
  }

  reset(){
    this.dateError = '';
    this.nofilterEvents = '';
    this.nofilterNews = '';
    this.nofilterProjects = '';
    this.projectsData = [];
    this.newsesData = [];
    this.eventsData = [];
  }

  onItemSelect(item: any) {
    console.log(item);
    
      this.projectData.push(item._id);  
      console.log( this.projectData);
  }
  onItemDeSelect(items: any) {
    console.log(items);
    this.projectData.pop();
    console.log( this.projectData);
  }

  addmagazine(resultModal){
    this.loading = true;
    console.log(this.magazineForm.value);
    this.magazineForm.value.projectId = this.projectData;
    this.magazineForm.value.newsId = this.selectedNews;
    this.magazineForm.value.event = this.selectedEvents;
    this.service.addMagazine(this.magazineForm.value).subscribe(res=>{
      console.log(res);
      this.loading = false;
      this.events = res;
      this.message = res.message;
      this.magazineForm.reset();
      this.confirm(resultModal);
    },err=>{
      console.log(err.error);
      this.loading = false;
    });
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

  cancel(){
    this.location.back()
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
}
