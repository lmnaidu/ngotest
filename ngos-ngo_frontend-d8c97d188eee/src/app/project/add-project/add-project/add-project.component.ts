import { Component, OnInit } from '@angular/core';
import { PatternService } from '../../../core/services/pattern.service'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder, Validators,FormArray  } from '@angular/forms';
import { NgWizardConfig, THEME, StepChangedArgs, NgWizardService } from 'ng-wizard';
import { Location, DatePipe } from '@angular/common';
import { UserService} from '../../../core/services/user.service'
import { exit } from 'process';
import { FileUploader } from "ng2-file-upload";
import { LoginService } from 'src/app/core/services/login.service';
import { concatAll, map } from 'rxjs/operators';


@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  userPermissions:any = {read:'',write:'',update:''};
  newAct:any=[];
  chapterId:any;
  orgdataRes:any={
    orgInfo:[{}]
  }
  finalDataFav:any=[];
  availableRecordsFav = 0;
  finalData:any=[];
  availableRecords = 0;
  selectedModal:any;
  partnerModal:any;
  team:any=[];
  partners:any=[]
  loading = false;
  dupProject:boolean=false;
  draftSaved:boolean=true;
  projectExpActivities:any=[];
  expAmount:number=0;
  getExpList:any=[];
  donatedActivitieslist:any=[];
  projectExplist:any=[];
  addedExp:boolean=false;
  expData:any={};
  expResult:any={};
  projectExpAct:any=[];
  editProjectIndex:any;
  checkEditGalleryPhoto:boolean=false;
  checkEditActivityName:boolean=false;
  checkEditActivityDates:boolean=false;
  dateError3:any;
  dateError4:any;
  addDanger:boolean=false;
  addSuccess:boolean=false;
  checkGalleryPhoto:boolean=false;
  checkActivityDates:boolean=false;
  checkActivityName:boolean=false
  showEditFinish:boolean;
  projectEditPhotos:any=[];
  projectEditActivities:any=[];
  projectEditphotos:any=[];
  allProjects;

  // in partners dropdown on others option checked starts
  selectedPartner;
    selectedSingleOption :boolean = false;
    closePartnersDropdown :boolean;
  // in partners dropdown on others option checked ends
  projectData:any={

  };
  editSuccess:boolean=false;
  editDanger:boolean=false;
  editProjectData:any={
    "projectName":'',
    "projectType":'',
    "projectProposer":'',
    "projectProposedDate":'',
    "projectStartDate":'',
    "projectEndDate":'',
    "projectGoal":'',
    "projectLeader":[],
    "projectPatners":[],
    "projectChapter":[],
    "projectDescription":'',
    "projectDetails":'',
    "projectImage":'',
    "projectActivities":[],
    "photos":[],
  }
  editData:any={
    "project":""
  };
  chapterSettings;
  projectAdded:any;
  donationAmount:number=0;
  expenditureAmount:number=0;
  donationsList:any=[]
  proejctData:any={};
  userToken:any={};
  projectActivitiesList:any=[];
  goal:any;
  startDate;
  endDate;
  proposedDate:any;
  projectName:any;
  description;
  projectsList:any={}
  proposerSettings;
  teamSettings;
  teamLeaderSettings;
  partnerSettings;
  showClose:boolean;
  expList:any=[];
  expModalRef:any;
  activityTimeLine:any=true;
  donationTimeLine:any=false;
  expenditureTimeLine:any=false;
  projectIndex:any;
  projectphotos:any=[];
  tomorrow = new Date(2017, 9, 20, 14,34);
  showFinish:boolean=false;
  message:any;
  projectActivities:FormArray;
  projectModalRef:any;
  resultModalRef:any;
  confirmResut:any
  resultModal:any;
  dateError1:any;
  dateError2:any;
  projectNamePattern:any;
  projectNameMinLength:any;
  projectNameMaxLength:any;
  goalNumberPattern:any;
  locationNamePattern:any;
  active = 1;
  isCompleted: boolean;
  data: any = {
    email: ''
  };
  closeResult:any;
  projectAddForm:FormGroup;
  projectEditForm:FormGroup;
  addPartnerForm:FormGroup;
  projectExpenditure:FormGroup;
    // for Pagination starts
    projectsLength;
    page  = 1;
    pageSize = 10;
    // for Pagination ends

  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.arrows,
    toolbarSettings: {
      // toolbarExtraButtons: [
      //   { text: 'Finish', class: 'btn btn-info', event: () => { alert("Finished!!!"); } } ]
      showNextButton:false,
      showPreviousButton:false
    }
  };
  leaders:any=[];
  activityStatus=[
    {
      "id":"1",
      "name":"In progress"
    },
    {
      "id":"2",
      "name":"Completed"
    }
  ]
  projectTypes=[
    {
      "id":"1",
      "name":"Educational"
    },
    {
      "id":"2",
      "name":"Health"
    },
    {
      "id":"3",
      "name":"Social"
    }
  ];
  proposers=[
    {
      "id":"1",
      "name":"Babu Bayyana"
    },
    {
      "id":"2",
      "name":"DNF Core Team"
    },
  ];
  teams=[
    {
      "id":"1",
      "name":" Krishna Rao D",
    },
    {
      "id":"2",
      "name":"Rajeswari B",
    },
    {
      "id":"3",
      "name":"Khadar Babu",
    },
    {
      "id":"4",
      "name":"Spandhana",
    },
    {
      "id":"5",
      "name":"Sridevi",
    },
    {
      "id":"6",
      "name":"Achyuth",
    },
    {
      "id":"7",
      "name":"Suresh Muttineni",
    },
    {
      "id":"8",
      "name":"Nageswara Rao",
    },
    {
      "id":"9",
      "name":"Anitha",
    },
    {
      "id":"10",
      "name":"Subhashini",
    },
    {
      "id":"11",
      "name":"Ranga Rao Pasumarthy"
    },
    {
      "id":"12",
      "name":"Srinivas Reddy"
    },
    {
      "id":"13",
      "name":"Sunitha"
    },

  ];
  teamLeaders=[


  ]
  statuses=[
    {
      "id":"1",
      "name":"Active"
    },
    {
      "id":"2",
      "name":"Inactive"
    },

  ];
  branches=[

  ];
  matConfigTypes=[
    {
      "id":"1",
      "name":"Percentage"
    },
    {
      "id":"2",
      "name":"Flat"
    }
  ];
  stages=[
    {
      "id":"1",
      "name":"Proposal"
    },
    {
      "id":"2",
      "name":"Open"
    },
    {
      "id":"3",
      "name":"Close"
    },
  ];

  projects=[
    {
      "id":"1",
      "projectName":"Adopt a school in Khammam",
      "startDate":"05-16-2019",
      "endDate":"12-13-2019",
      "target":"60,000$",
      "status":"open",
      "activities":[
        {
        "id":"1",
        "activityName":"Digital classrooms for primary class students",
        "startDate":"12-10-2019",
        "endDate":"12-10-2019",
        "expExpenditure":"250$"
       },
       {
        "id":"2",
        "activityName":"Digital classrooms for secondary class students",
        "startDate":"12-10-2019",
        "endDate":"12-10-2019",
        "expExpenditure":"250$"
       },
       {
        "id":"3",
        "activityName":"Playground for primary class students",
        "startDate":"12-10-2019",
        "endDate":"12-10-2019",
        "expExpenditure":"250$"
       },

    ],
    "expList":[
      {
        "id":"1",
        "activityName":"Digital classrooms for primary class students",
        "amount":"2500$",
        "description":"Bought Digital classroom kits for all the primary classes "
       },
       {
        "id":"2",
        "activityName":"Playground for primary class students",
        "amount":"3000$",
        "description":"Constructed playground for primary class students"
       },
     ]
    },
    {
      "id":"2",
      "projectName":"Constructing a building for old age people",
      "startDate":"12-10-2019",
      "endDate":"06-22-2020",
      "target":"55,000$",
      "status":"proposal",
      "activities":[
        {
        "activityName":"Buying of new cots",
        "startDate":"12-10-2019",
        "endDate":"12-10-2019",
        "expExpenditure":"250$"
       },
       {
        "activityName":"Construction of new rooms",
        "startDate":"12-10-2019",
        "endDate":"12-10-2019",
        "expExpenditure":"250$"
       },
       {
        "activityName":"Buying medicines and first aid kits",
        "startDate":"12-10-2019",
        "endDate":"12-10-2019",
        "expExpenditure":"250$"
       },

    ],
    "expList":[
      {
        "id":"1",
        "activityName":"Construction of new rooms",
        "amount":"20500$",
        "description":"Constructed new rooms for the elderly."
       },
       {
        "id":"2",
        "activityName":"Buying medicines and first aid kits",
        "amount":"3000$",
        "description":"Bought medicines and first aid kits."
       },
     ]
    },
    {
      "id":"3",
      "projectName":"Books distribute for children",
      "startDate":"01-22-2019	",
      "endDate":"12-13-2019",
      "target":"45,000$",
      "status":"open",
      "activities":[
        {
        "activityName":"Buying of new books",
        "startDate":"12-10-2019",
        "endDate":"12-10-2019",
        "expExpenditure":"250$"
       },
       {
        "activityName":"Conducting seminar on book reading",
        "startDate":"12-10-2019",
        "endDate":"12-10-2019",
        "expExpenditure":"250$"
       },
       {
        "activityName":"Buying books for secondary school students",
        "startDate":"12-10-2019",
        "endDate":"12-10-2019",
        "expExpenditure":"250$"
       },

    ],
    "expList":[
      {
        "id":"1",
        "activityName":"Buying of new books",
        "amount":"2500$",
        "description":"Bought new books and distributed in the schools by the volunteers"
       },
       {
        "id":"2",
        "activityName":"Conducting seminar on book reading",
        "amount":"3000$",
        "description":"Conducted the seminar for all the primary schools in the district,Invited education minister to address the seminar"
       },
     ]
    }
  ];

  timeline = [
    {
      "id":'1',
      "name":'John Smith',
      "amount":"$300",
      "date":"2020-03-01",
      "activity":"donated"
    },
    {
      "id":'2',
      "name":'Mark Joe',
      "amount":"$350",
      "date":"2020-02-01",
      "activity":"pledge"
    },
    {
      "id":'3',
      "name":'Mark Ruel',
      "amount":"$250",
      "date":"2020-01-30",
      "activity":"pledge"
    },
    {
      "id":'4',
      "name":'Monica Amadio',
      "amount":"$400",
      "date":"2020-01-25",
      "activity":"donated"
    },
    {
      "id":'5',
      "name":'Larry Masi',
      "amount":"$350",
      "date":"2020-01-20",
      "activity":"pledge"
    },
    {
      "id":'6',
      "name":'Geeta Konchada',
      "amount":"$1000",
      "date":"2020-01-10",
      "activity":"donated"
    }
  ]

  // Error Declarations
  errorMessageActivatyReq;
  errorMessageAmountReq;
  errorMessageAmountInvalid;
  errorMessageDescriptionReq;
  errorMessageDescriptionMinMax;
  myProjects:boolean = false;
  favoriteProjects:any = {ProjectName:'',projectId:''};
  error:any;
  favoriteResult:any;
  allFavProjects:any = [{
    index:0,
    projectId:[]
  }];
  allFavProjectsLength:any;
  allFavoriteProjects:any = {Projects:[]};
  favData:boolean = false;
  expenditureData :any;
  ExpenditureDataForm:FormGroup;
  projectActivityForm:FormGroup;
  indexofExp:any;
  duplicateExp = '';
  addedExpData :any = {
    activity:'',
    amount:'',
    description:'',
    activityName:'',
    expDate:''
  };
  expprojectName:any;
  todayDate = new Date();
  activityData:any = [];
  activityEditData:any = [];
  indexofActivity:any;
  duplicateActivity = '';
  addedActData:any = {
    activityName:'',
    activityDescription:'',
    activityEstExpenditure:'',
    activityStartDate:'',
    activityEndDate:'',
    prev:false,
    id:''
  }
  activityDateError = '';
  projectActivityEditForm:FormGroup;
  indexofActivityEdit:any;
  projectGalleryForm:FormGroup;
  gallaryData:any = [];
  galleryImage:any;
  indexofGallery:any;
  addImagesData :any = {
    photo:'',
    description:'',
    photoTest:''
  };
  photoimage:boolean = false;
  projectGalleryEditForm:FormGroup;
  gallaryEditData:any = [];
  editGalleryImage:any;
  indexofGaalleryEdit:any;
  id:any;
  constructor(public patternService: PatternService,private modalService: NgbModal,private formBuilder:FormBuilder,private ngWizardService: NgWizardService, private service:UserService,private loginService:LoginService) {

    this.errorMessageActivatyReq = this.patternService.errorMessageActivatyReq;
    this.errorMessageAmountReq = this.patternService.errorMessageAmountReq;
    this.errorMessageAmountInvalid = this.patternService.errorMessageAmountInvalid;
    this.errorMessageDescriptionReq = this.patternService.errorMessageDescriptionReq;
    this.errorMessageDescriptionMinMax = this.patternService.errorMessageDescriptionMinMax;



    this.projectNamePattern=patternService.projectNamePattern;
    this.projectNameMinLength=patternService.projectNameMin;
    this.projectNameMaxLength=patternService.projectNameMax;
    this.goalNumberPattern=patternService.goalPattern;
    this.locationNamePattern=patternService.locationName
    // this.userToken=JSON.parse(localStorage.getItem('userToken'));

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
    this.userToken = this.loginService.getToken();
    this.userToken = this.loginService.getToken();
    const roleIDs = this.userToken.roles;
      this.service.getpermissions(roleIDs).subscribe(res=>{
        const role = res;
        const rolePermissions = role.permissionSet;
        console.log(rolePermissions)
        rolePermissions.forEach(element => {
          if(element.permissionsName === 'Projects'){
            this.userPermissions = element.permission;
            console.log(this.userPermissions);
          }
        })
      })
    this.getAllVolunteersAndMembers();
    this.getAllPartners();
    this.getAllTeamLeaders();
    this.getAllChapters();
    this.getAllProjects();
    this.getallFavprojects();
    this.addPartnerForm=this.formBuilder.group({
      partnerName: new FormControl('', Validators.required),
    });
    this.ExpenditureDataForm = this.formBuilder.group({
      activity: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      description : new FormControl('', Validators.required),
      expDate : new FormControl('', Validators.required),
      chapter:new FormControl('', Validators.required)
    });

    this.projectActivityForm = this.formBuilder.group({
      activityName:new FormControl('',Validators.required),
      activityEstExpenditure: new FormControl('',Validators.required),
      activityStartDate: new FormControl(''),
      activityEndDate: new FormControl(''),
      activityDescription:new FormControl(''),
      addedDate:new FormControl(''),
      prev:false,
      actStatus:new FormControl('1',Validators.required),
      chapter:new FormControl('',Validators.required),
    });

    this.projectGalleryForm = this.formBuilder.group({
      description:new FormControl('',Validators.required),
      photo: new FormControl(''),
      photoTest:'',
      image : new FormControl('',Validators.required)
    });
    this.projectGalleryEditForm = this.formBuilder.group({
      description:new FormControl('',Validators.required),
      photo:  new FormControl(''),
      photoTest:'',
      image : new FormControl('',Validators.required),
    });
    this.projectActivityEditForm = this.formBuilder.group({
      activityName:new FormControl('',Validators.required),
      activityEstExpenditure: new FormControl('',Validators.required),
      activityStartDate: new FormControl(''),
      activityEndDate: new FormControl(''),
      activityDescription:new FormControl(''),
      addedDate:new FormControl(''),
      prev:false,
      actStatus:new FormControl('1',Validators.required),
      chapter:new FormControl('',Validators.required)
    });

    this.projectAddForm = this.formBuilder.group({
      projectName:new FormControl('',[Validators.required,Validators.pattern(this.projectNamePattern),Validators.minLength(this.projectNameMinLength),Validators.maxLength(this.projectNameMaxLength)]),
      projectType: new FormControl('', Validators.required ),
      projectGoal: new FormControl('', [Validators.required,Validators.pattern(this.goalNumberPattern)]),
      projectLeader: new FormControl(''),
      projectTeam: new FormControl(''),
      projectPatners: new FormControl('',),
      projectLocation: new FormControl('',[Validators.required,Validators.pattern(this.locationNamePattern)]),
      projectProposedDate: new FormControl('',Validators.required),
      projectProposer: new FormControl('',Validators.required),
      projectStartDate: new FormControl('',),
      projectEndDate: new FormControl('',),
      projectDescription: new FormControl(''),
      projectDetails: new FormControl(''),
      projectChapter: new FormControl('',Validators.required),
      projectStage: new FormControl('',Validators.required),
      activities: new FormControl(''),
      projectImage: new FormControl(''),
      gallery: new FormControl(''),
      beneficiary:new FormControl(''),
      // projectMatchingConfig:new FormGroup({
      //   amount:new FormControl('',[Validators.pattern(this.goalNumberPattern)]),
      //   type: new FormControl('')
      // }),
      projectActivities:this.formBuilder.array([ this.createItem()]),
      // projectSocialConnect:this.formBuilder.array([ this.createSocCnt()]),
      photos:this.formBuilder.array([ this.createPhoto()]),
    })
    this.projectEditForm = this.formBuilder.group({
      projectName:new FormControl('',[Validators.required,Validators.pattern(this.projectNamePattern),Validators.minLength(this.projectNameMinLength),Validators.maxLength(this.projectNameMaxLength)]),
      projectType: new FormControl('', Validators.required ),
      projectGoal: new FormControl('', [Validators.required,Validators.pattern(this.goalNumberPattern)]),
      projectLeader: new FormControl(''),
      projectTeam: new FormControl(''),
      projectPatners: new FormControl('',),
      projectLocation: new FormControl('',[Validators.pattern(this.locationNamePattern),Validators.required]),
      projectProposedDate: new FormControl('',Validators.required),
      projectProposer: new FormControl(Validators.required),
      projectStartDate: new FormControl('',),
      projectEndDate: new FormControl('',),
      projectDescription: new FormControl(''),
      projectDetails: new FormControl(''),
      objId: new FormControl(''),
      projectChapter: new FormControl('',Validators.required),
      projectStage: new FormControl('',Validators.required),
      projectImage: new FormControl(''),
      activities: new FormControl(''),
      gallery: new FormControl(''),
      beneficiary:new FormControl(''),
      // projectMatchingConfig:new FormGroup({
      //   amount:new FormControl('',[Validators.pattern(this.goalNumberPattern)]),
      //   type: new FormControl('')
      // }),
      projectActivities:this.formBuilder.array([ ]),
      // projectSocialConnect:this.formBuilder.array([ this.createSocCnt() ]),
      photos:this.formBuilder.array([ this.createPhoto()]),
    })
    this.projectExpenditure = this.formBuilder.group({
      projectId:new FormControl(''),
      expList:this.formBuilder.array([ this.createExpRow()]),

    })
    this.projectExpenditure.value

    this.teamSettings={
      singleSelection: false,
      idField: '_id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      enableCheckAll: false
    }
    this.teamLeaderSettings={
      singleSelection: false,
      idField: '_id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      enableCheckAll: false
    }
    this.onPartnerSelect(this.selectedOthers);
    this.selectedSingleOption
    console.log(this.selectedSingleOption)
    this.partnerSettings={
      singleSelection : this.selectedSingleOption,
      idField: '_id',
      textField: 'partnerName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      enableCheckAll: false,
      closeDropDownOnSelection :this.closePartnersDropdown

    }


    this.chapterSettings={
      singleSelection: false,
      idField: '_id',
      textField: 'chapterName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      enableCheckAll: false
    }
    this.proposerSettings={
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      enableCheckAll: false

    }
  }
  createPicture(data): FormGroup {
    return this.formBuilder.group(data);
  }

  //Help to get all photos controls as form array.
  // get photos(): FormArray {
  //     return this.projectAddForm.get('photos') as FormArray;
  // };

  createItem(): FormGroup {
    return this.formBuilder.group({
      activityName:new FormControl(),
      activityEstExpenditure: '',
      activityStartDate: '',
      activityEndDate: '',
      activityDescription:'',
      prev:false,
      id:''
    });
  }
  createPhoto():FormGroup {
    return this.formBuilder.group({
      description:'',
      photo: '',
      photoTest:''
    });
  }
  createExpRow():FormGroup {
    return this.formBuilder.group({
      activity:[''],
      amount:['', [Validators.required, Validators.pattern(this.patternService.positiveNumbersPattern), Validators.min]],
      description:['', [Validators.required,Validators.minLength(this.patternService.activityDescriptionMinLength)]],
      documents:[null, null]
    });
  }
  createSocCnt(): FormGroup {
    return this.formBuilder.group({
      activityName: '',
      activityEstExpenditure: '',
      activityStartDate: '',
      activityEndDate: '',
      activityDescription:''
    });
  }

  addPhotoRow(){
    this.projectphotos = this.projectAddForm.get('photos') as FormArray;
    // console.log(this.projectActivities);
    // this.projectActivities.value[this.projectActivities.length-1].prev=true;
    this.projectphotos.push(this.createPhoto());

  }
  deletePhotoRow(){
    this.projectphotos = this.projectAddForm.get('photos') as FormArray;
    this.projectphotos.removeAt(this.projectphotos.length - 1);

  }
  PhotoRowEdit(){
    this.projectEditPhotos = this.projectEditForm.get('photos') as FormArray;
    // console.log(this.projectActivities);
    // this.projectActivities.value[this.projectActivities.length-1].prev=true;
    this.projectEditPhotos.push(this.createPhoto());

  }
  delPhotoRowEdit(){
    this.projectEditPhotos = this.projectEditForm.get('photos') as FormArray;
    this.projectEditPhotos.removeAt(this.projectEditPhotos.length - 1);

  }

  deleteExpRow(){
    this.expList = this.projectExpenditure.get('expList') as FormArray;
    this.expList.removeAt(this.projectphotos.length - 1);

  }
  addItem(): void {
    this.projectActivities = this.projectAddForm.get('projectActivities') as FormArray;
    // console.log(this.projectActivities);
    // this.projectActivities.value[this.projectActivities.length-1].prev=true;
    this.projectActivities.push(this.createItem());

  }
  addEditItem(): void {
    this.projectEditActivities = this.projectEditForm.get('projectActivities') as FormArray;
    // console.log(this.projectActivities);
    // this.projectActivities.value[this.projectActivities.length-1].prev=true;
    this.projectEditActivities.push(this.createItem());

  }
  removeItem() {
    // this.projectActivities.pop();
    this.projectActivities.removeAt(this.projectActivities.length - 1);
    // this.projectActivities.removeAt(index);
 }
 removeEditItem() {
  this.projectEditActivities = this.projectEditForm.get('projectActivities') as FormArray;
  // this.projectActivities.pop();
  this.projectEditActivities.removeAt(this.projectEditActivities.length - 1);
  // this.projectActivities.removeAt(index);
}
 detectFiles(event) {
  let files = event.target.files;
  if (files) {
      for (let file of files) {
          let reader = new FileReader();
          reader.onload = (e: any) => {
              this.projectphotos = this.projectAddForm.get('photos') as FormArray;
              console.log(this.projectphotos);
              console.log(e);
              let base64String
              let base64Image
              base64String = e.target.result
              base64Image = base64String.split(',');
              console.log(e.target.result);
              this.galleryImage =  e.target.result;
              console.log(this.galleryImage)
              this.projectGalleryForm.value.photo = e.target.result;
              console.log( this.projectGalleryForm.value.photo)
              // this.projectphotos.at(index).patchValue({
              //   photo:e.target.result
              // })
          }
          reader.readAsDataURL(file);
      }
      // console.log(files,index);
  }
}

// removePhoto(i){
//   this.photos.removeAt(i);
// }

openProjectModal(content){
  this.projectActivityForm.get('activityName').setValue("Operational Expenditure");
    const actList = this.projectAddForm.get('projectActivities') as FormArray;
    actList.at(0).patchValue({
                activityName:"Operational Expenditure"
              })
    this.projectAddForm
    this.projectModalRef = this.modalService.open(content ,{ariaLabelledBy: 'modal-basic-title',size: 'xl'});
    this.projectModalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  onChapterChange(event){
    console.log(event.target.value);
    this.chapterId=event.target.value
    this.newAct = this.projectExpAct.filter(x =>       
      x.chapter.includes(this.chapterId)     
    );
    
  }
openExpModal(expModal,activities,projectId,projectName){
  console.log( activities);
  this.expprojectName = projectName;
    this.addedExp=false;
    this.projectExplist=[];
    this.expData.projectId=projectId;
    this.projectExpenditure.value.projectId = projectId;
    this.service.getProject(this.expData).subscribe(res=>{
      console.log(res);
      let actRes:any={

      }
      actRes=res
      console.log(this.chapterId);
      this.projectExpAct=actRes.activities[0].activities.reverse() 
     
      console.log(this.projectExpAct);
    })
    this.expenditureData=[]
    this.service.getExpenditureProject(this.expData).subscribe(res=>{
      console.log(res);
      this.expResult=res;
      console.log( this.expResult);
      this.expResult.expenditure.forEach(element => {
          this.expenditureData = (element.expList)
      });
      console.log( this.expenditureData)
      this.expenditureData.forEach(element => {
        this.projectExpAct.forEach(x => {
          if(x.id === parseInt(element.activity) ){
            element.activityName = x.activityName
          }
        });

      });
      console.log( this.expenditureData)
       if(this.expenditureData.length>0){
        this.addedExp=true
      }
      // this.projectExplist = this.projectExpenditure.get('expList') as FormArray;
      // console.log( this.projectExplist)
      // console.log( this.projectExplist.value)
      // while (this.projectExplist.length) {
      //   this.projectExplist.removeAt(0);
      // }
      // // add form array values in a loop

      // if(this.expResult.expenditure.length>0){
      //   this.addedExp=true
      // }
      // this.expResult.expenditure[0].expList.forEach(exp => this.projectExplist.push(this.formBuilder.group(exp)));


      // this.projectExpenditure.get('expList').patchValue(this.expResult.expenditure[0].expList);

    })




    // this.projectExpenditure.get('projectId').setValue(projectId);
    this.expModalRef = this.modalService.open(expModal ,{ariaLabelledBy: 'modal-basic-title',size: 'xl'});
    this.expModalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }



  addExpRow(){
    this.expList = this.projectExpenditure.get('expList') as FormArray;
    // console.log(this.projectActivities);
    // this.projectActivities.value[this.projectActivities.length-1].prev=true;
    this.expList.push(this.createExpRow());

  }
  addGalleryRowTable(){
    this.projectGalleryForm.value.photo  = this.galleryImage
    console.log(this.projectGalleryForm.value);
    const addGalleryData = this.projectGalleryForm.value;
    console.log(addGalleryData)
    if (this.indexofGallery != null || this.indexofGallery == 0 || this.indexofGallery != undefined) {
      let invalid = false;
      for (let index = 0; index < this.gallaryData.length; index++) {
        if (index != this.indexofGallery) {
            if (this.gallaryData[index].description === addGalleryData.description ) {
              invalid = true;
            }
        }
      }
      if (invalid) {
        this.duplicateActivity = 'Duplicate Activity data cannot be added';
      }
      else {

        this.duplicateActivity = "";
        this.addImagesData = {
          photo:addGalleryData.photo,
          description:addGalleryData.description,
          photoTest:addGalleryData.photoTest
        };
        this.gallaryData.splice(this.indexofGallery, 1, this.addImagesData);
        this.addImagesData = {
          photo:'',
          description:'',
          photoTest:''
        };
        this.projectGalleryForm.reset();
        this.indexofGallery = null;
        this.galleryImage = '';
      }
    }else if (this.indexofGallery === null || this.indexofGallery == undefined) {
      let invalid = false;
      for (let index = 0; index < this.gallaryData.length; index++) {
        if (index != this.indexofGallery) {
            if (this.gallaryData[index].description === addGalleryData.description ) {
              invalid = true;
            }
        }
      }
      if (invalid) {
        this.duplicateActivity = 'Duplicate Activity data cannot be added';
      }
      else {
        this.duplicateActivity = "";
        this.addImagesData = {
          photo:addGalleryData.photo,
          description:addGalleryData.description,
          photoTest:addGalleryData.photoTest
        };
        this.gallaryData.push(this.addImagesData)
        this.projectGalleryForm.reset();
        this.galleryImage = '';

      }
    }
  }
  editGalrow(gallery){
    console.log(gallery);
    this.galleryImage = gallery.photo
    // this.projectActivityForm.get('activityName').setValue(gallery.activityName);
    this.projectGalleryForm.get('description').setValue(gallery.description);
  }
  removeGalrow(gallery){
    console.log(gallery)
    const index = this.gallaryEditData.indexOf(gallery);
    this.gallaryEditData.splice(index, 1);
  }
  addGalleryEditRowTable(){
    this.projectGalleryEditForm.value.photo=  this.editGalleryImage
    console.log(this.projectGalleryEditForm.value)
    const editGalleryData = this.projectGalleryEditForm.value;
    if (this.indexofGaalleryEdit != null || this.indexofGaalleryEdit == 0 || this.indexofGaalleryEdit != undefined) {
      let invalid = false;
      for (let index = 0; index < this.gallaryEditData.length; index++) {
        if (index != this.indexofGaalleryEdit) {
            if (this.gallaryEditData[index].description === editGalleryData.description ) {
              invalid = true;
            }
        }
      }
      if (invalid) {
        this.duplicateActivity = 'Duplicate Activity data cannot be added';
      }
      else {

        this.duplicateActivity = "";
        this.addImagesData = {
          photo:editGalleryData.photo,
          description:editGalleryData.description,
          photoTest:editGalleryData.photoTest
        };
        this.gallaryEditData.splice(this.indexofGaalleryEdit, 1, this.addImagesData);
        this.addImagesData = {
          photo:'',
          description:'',
          photoTest:''
        };
        this.projectGalleryEditForm.reset();
        this.indexofGaalleryEdit = null;
        this.editGalleryImage = '';
      }
    }else if (this.indexofGaalleryEdit === null || this.indexofGaalleryEdit == undefined) {
      let invalid = false;
      for (let index = 0; index < this.gallaryEditData.length; index++) {
        if (index != this.indexofGaalleryEdit) {
            if (this.gallaryEditData[index].description === editGalleryData.description ) {
              invalid = true;
            }
        }
      }
      if (invalid) {
        this.duplicateActivity = 'Duplicate Activity data cannot be added';
      }
      else {
        this.duplicateActivity = "";
        this.addImagesData = {
          photo:editGalleryData.photo,
          description:editGalleryData.description,
          photoTest:editGalleryData.photoTest
        };
        this.gallaryEditData.push(this.addImagesData)
        this.projectGalleryEditForm.reset();
        this.editGalleryImage = '';

      }
    }

  }
  activityDateValidate(){
    const startDate = new DatePipe('en-US').transform(this.projectActivityForm.value.activityStartDate, 'MM-dd-yyyy');
    const endDate = new DatePipe('en-US').transform(this.projectActivityForm.value.activityEndDate, 'MM-dd-yyyy');
    if(startDate > endDate){
      this.activityDateError = 'Activity start date should be less than activity end date'
    }else{
      this.activityDateError = ''
    }

  }
  editactivityDateValidate(){
    const startDate = new DatePipe('en-US').transform(this.projectActivityEditForm.value.activityStartDate, 'MM-dd-yyyy');
    const endDate = new DatePipe('en-US').transform(this.projectActivityEditForm.value.activityEndDate, 'MM-dd-yyyy');
    if(startDate > endDate){
      this.activityDateError = 'Activity start date should be less than activity end date'
    }else{
      this.activityDateError = ''
    }

  }
  addActivityRowTable(){
    console.log(this.projectActivityForm.value);
    const addedActivityData = this.projectActivityForm.value
    console.log(this.activityData)
    const startDate = new DatePipe('en-US').transform(addedActivityData.activityStartDate, 'MM-dd-yyyy');
    const endDate = new DatePipe('en-US').transform(addedActivityData.activityEndDate, 'MM-dd-yyyy');
    const addedDate = new DatePipe('en-US').transform(addedActivityData.addedDate, 'MM-dd-yyyy');
    if (this.indexofActivity != null || this.indexofActivity == 0 || this.indexofActivity != undefined) {
      let invalid = false;
      for (let index = 0; index < this.activityData.length; index++) {
        if (index != this.indexofActivity) {
            if (this.activityData[index].activityName === addedActivityData.activityName && this.activityData[index].activityEstExpenditure === addedActivityData.activityEstExpenditure ) {
              invalid = true;
            }
        }
      }
      if (invalid) {
        this.duplicateActivity = 'Duplicate Activity data cannot be added';
      }
      else {
        this.duplicateActivity = "";
        this.addedActData = {
          activityName:addedActivityData.activityName,
          activityDescription:addedActivityData.activityDescription,
          activityEstExpenditure:addedActivityData.activityEstExpenditure,
          activityStartDate:startDate,
          activityEndDate:endDate,
          addedDate:addedDate,
          prev:false,
          actStatus:addedActivityData.actStatus,
          chapter:addedActivityData.chapter
        }
        this.activityData.splice(this.indexofActivity, 1, this.addedActData)
        this.addedActData = {
          activityName:'',
          activityDescription:'',
          activityEstExpenditure:'',
          activityStartDate:'',
          activityEndDate:'',
          prev:false,
          actStatus:'',
          chapter:''
        }
        this.projectActivityForm.reset();
        this.indexofActivity = null;
      }
    }else if (this.indexofActivity === null || this.indexofActivity == undefined) {
      let invalid = false;
      for (let index = 0; index < this.activityData.length; index++) {
        if (index != this.indexofActivity) {
            if (this.activityData[index].activityName === addedActivityData.activityName && this.activityData[index].activityEstExpenditure === addedActivityData.activityEstExpenditure ) {
              invalid = true;
            }
        }
      }
      if (invalid) {
        this.duplicateActivity = 'Duplicate Activity data cannot be added';
      }
      else {
        this.duplicateActivity = "";
        this.addedActData = {
          activityName:addedActivityData.activityName,
          activityDescription:addedActivityData.activityDescription,
          activityEstExpenditure:addedActivityData.activityEstExpenditure,
          activityStartDate:startDate,
          activityEndDate:endDate,
          addedDate:addedDate,
          prev:false,
          actStatus:addedActivityData.actStatus,
          chapter:addedActivityData.chapter
        }
        this.activityData.push(this.addedActData)
        this.projectActivityForm.reset();


      }
    }
  }
  editActrow(activity){
    console.log(activity);
    this.projectActivityForm.get('chapter').setValue(activity.chapter);
    this.projectActivityForm.get('actStatus').setValue(activity.actStatus);
    this.projectActivityForm.get('activityName').setValue(activity.activityName);
    this.projectActivityForm.get('activityDescription').setValue(activity.activityDescription);
    this.projectActivityForm.get('activityEstExpenditure').setValue(activity.activityEstExpenditure);
    if(activity.activityEndDate){
      this.projectActivityForm.get('activityEndDate').setValue(new Date(activity.activityEndDate));
    }else{
      this.projectActivityForm.get('activityEndDate').setValue('');
    }
    if(activity.activityStartDate){
      this.projectActivityForm.get('activityStartDate').setValue(new Date(activity.activityStartDate));
    }else{
      this.projectActivityForm.get('activityStartDate').setValue('');
    }
    if(activity.addedDate){
      this.projectActivityForm.get('addedDate').setValue(new Date(activity.addedDate));
    }else{
      this.projectActivityForm.get('addedDate').setValue('');
    }


    let index = this.activityData.indexOf(activity);
    this.indexofActivity = index;
  }
  addActivityEditRowTable(){
    console.log(this.projectActivityEditForm.value);

    const editedActivityData = this.projectActivityEditForm.value
    const startDate = new DatePipe('en-US').transform(editedActivityData.activityStartDate, 'MM-dd-yyyy');
    const endDate = new DatePipe('en-US').transform(editedActivityData.activityEndDate, 'MM-dd-yyyy');
    const addedDate = new DatePipe('en-US').transform(editedActivityData.addedDate, 'MM-dd-yyyy');
    if (this.indexofActivityEdit != null || this.indexofActivityEdit == 0 || this.indexofActivityEdit != undefined) {
      let invalid = false;
      for (let index = 0; index < this.activityEditData.length; index++) {
        if (index != this.indexofActivityEdit) {
            if (this.activityEditData[index].activityName === editedActivityData.activityName && this.activityEditData[index].activityEstExpenditure === editedActivityData.activityEstExpenditure ) {
              invalid = true;
            }
        }
      }
      if (invalid) {
        this.duplicateActivity = 'Duplicate Activity data cannot be added';
      }
      else {

        this.duplicateActivity = "";

        this.addedActData = {
          activityName:editedActivityData.activityName,
          activityDescription:editedActivityData.activityDescription,
          activityEstExpenditure:editedActivityData.activityEstExpenditure,
          activityStartDate:startDate,
          activityEndDate:endDate,
          prev:false,
          addedDate:addedDate,
          actStatus:editedActivityData.actStatus,
          chapter:editedActivityData.chapter
        }
        this.activityEditData.splice(this.indexofActivityEdit, 1, this.addedActData)
        console.log( this.activityEditData)
        this.addedActData = {
          activityName:'',
          activityDescription:'',
          activityEstExpenditure:'',
          activityStartDate:'',
          activityEndDate:'',
          prev:false,
          actStatus:'',
          chapter:''
        }
        this.projectActivityEditForm.reset();
        this.indexofActivityEdit = null;
      }
    }else if (this.indexofActivityEdit === null || this.indexofActivityEdit == undefined) {
      let invalid = false;
      for (let index = 0; index < this.activityEditData.length; index++) {
        if (index != this.indexofActivityEdit) {
            if (this.activityEditData[index].activityName === editedActivityData.activityName && this.activityEditData[index].activityEstExpenditure === editedActivityData.activityEstExpenditure ) {
              invalid = true;
            }
        }
      }
      if (invalid) {
        this.duplicateActivity = 'Duplicate Activity data cannot be added';
      }
      else {
        this.duplicateActivity = "";
        this.addedActData = {
          activityName:editedActivityData.activityName,
          activityDescription:editedActivityData.activityDescription,
          activityEstExpenditure:editedActivityData.activityEstExpenditure,
          activityStartDate:startDate,
          activityEndDate:endDate,
          prev:false,
          addedDate:addedDate,
          actStatus:editedActivityData.actStatus,
          chapter:editedActivityData.chapter
        }
        this.activityEditData.push(this.addedActData)
        console.log(  this.activityEditData)
        this.projectActivityEditForm.reset();
      console.log(  this.activityEditData)

      }
    }
  }
  editActEditrow(activity){
    console.log(activity);
    this.projectActivityEditForm.get('chapter').setValue(activity.chapter);
    this.projectActivityEditForm.get('actStatus').setValue(activity.actStatus);
    this.projectActivityEditForm.get('activityName').setValue(activity.activityName);
    this.projectActivityEditForm.get('activityDescription').setValue(activity.activityDescription);
    this.projectActivityEditForm.get('activityEstExpenditure').setValue(activity.activityEstExpenditure);
    if(activity.activityEndDate){
      this.projectActivityEditForm.get('activityEndDate').setValue(new Date(activity.activityEndDate));
    }else{
      this.projectActivityEditForm.get('activityEndDate').setValue('');
    }
    if(activity.activityStartDate){
      this.projectActivityEditForm.get('activityStartDate').setValue(new Date(activity.activityStartDate));
    }else{
      this.projectActivityEditForm.get('activityStartDate').setValue('');
    }
    if(activity.addedDate){
      this.projectActivityEditForm.get('addedDate').setValue(new Date(activity.addedDate));
    }else{
      this.projectActivityEditForm.get('addedDate').setValue('');
    }


    let index = this.activityEditData.indexOf(activity);
    this.indexofActivityEdit = index;
  }
  removeActrow(activity){
    console.log(activity)
    const index = this.activityData.indexOf(activity);
    this.activityData.splice(index, 1);
  }
  removeEditActrow(activity){
    console.log(activity)
    const index = this.activityEditData.indexOf(activity);
    this.activityEditData.splice(index, 1);
  }

  addExpRowTable(){
    console.log(this.ExpenditureDataForm.value);
    // this.indexofExp.push(this.ExpenditureDataForm.value);
    const addedData = this.ExpenditureDataForm.value;
    addedData.expDate = new DatePipe('en-US').transform(addedData.expDate, 'MM-dd-yyyy');
    if (this.indexofExp != null || this.indexofExp == 0 || this.indexofExp != undefined) {
      let invalid = false;
      for (let index = 0; index < this.expenditureData.length; index++) {
        if (index != this.indexofExp) {
            if (this.expenditureData[index].activity === addedData.activity && this.expenditureData[index].amount === addedData.amount && this.expenditureData[index].description === addedData.description &&this.expenditureData[index].expDate === addedData.expDate) {
              invalid = true;
              console.log(invalid)
            }
        }
      }
      if (invalid) {
        this.duplicateExp = 'Duplicate Expenditure data cannot be added';
      }
      else {
        this.duplicateExp = "";
        this.projectExpAct.forEach(element => {
          if(element.id ===  parseInt(addedData.activity)){
            this.addedExpData.activityName = element.activityName
          }
        });
        this.addedExpData = {
          activity:addedData.activity,
          amount:addedData.amount,
          description:addedData.description,
          activityName:this.addedExpData.activityName,
          expDate:addedData.expDate,
          chapter:addedData.chapter
        }
        this.expenditureData.splice(this.indexofExp, 1, this.addedExpData)
        this.addedExpData = {
          activity:'',
          amount:'',
          description:'',
          activityName:'',
          expDate:'',
          chapter:''
        }
        this.ExpenditureDataForm.reset();
        this.indexofExp = null;
        if(this.expenditureData.length>0){
          this.addedExp=true
        }
      }
    }
    else if (this.indexofExp === null || this.indexofExp == undefined) {
      let invalid = false;
      for (let index = 0; index < this.expenditureData.length; index++) {
        if (index != this.indexofExp) {
            if (this.expenditureData[index].activity === addedData.activity && this.expenditureData[index].amount === addedData.amount && this.expenditureData[index].description === addedData.description &&this.expenditureData[index].expDate === addedData.expDate) {
              invalid = true;
            }
        }
      }
      if (invalid) {
        this.duplicateExp = 'Duplicate Expenditure data cannot be added';
      }
      else {
        this.duplicateExp = "";
        this.projectExpAct.forEach(element => {
          if(element.id ===  parseInt(addedData.activity)){
            this.addedExpData.activityName = element.activityName
          }
        });
        this.addedExpData = {
          activity:addedData.activity,
          amount:addedData.amount,
          description:addedData.description,
          activityName: this.addedExpData.activityName,
          expDate:addedData.expDate,
          chapter:addedData.chapter
        }
        this.expenditureData.push(this.addedExpData)
        this.ExpenditureDataForm.reset();
        if(this.expenditureData.length>0){
          this.addedExp=true
        }

      }
    }

  }

  reset(){
    this.duplicateExp = '';
    this.indexofExp = null;
    this.ExpenditureDataForm.reset();
    this.duplicateActivity = '';
    this.projectActivityForm.reset();
    this.indexofActivity = null;
    this.activityDateError = '';
    this.indexofActivityEdit = null;
    this.projectActivityEditForm.reset();
    this.projectGalleryForm.reset();
    this.galleryImage = '';
    this.editGalleryImage= '';
    this.projectGalleryEditForm.reset();
  }

  editExp(expdata){
    this.ExpenditureDataForm.get('chapter').setValue(expdata.chapter);
    this.ExpenditureDataForm.get('activity').setValue(expdata.activity);
    this.ExpenditureDataForm.get('amount').setValue(expdata.amount);
    this.ExpenditureDataForm.get('description').setValue(expdata.description);
    this.ExpenditureDataForm.get('expDate').setValue(new Date(expdata.expDate));
    let index = this.expenditureData.indexOf(expdata);
    this.indexofExp = index;
  }
  removeExp(expdata){
    const index = this.expenditureData.indexOf(expdata);
    this.expenditureData.splice(index, 1);
    if(this.expenditureData.length>0){
      this.addedExp=true
    }else{
      this.addedExp=false
    }
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
 showPreviousStep(event?: Event) {
  this.ngWizardService.previous();
}

showNextStep(event?: Event) {
  this.ngWizardService.next();
}

resetWizard(event?: Event) {
  this.ngWizardService.reset();
}

setTheme(theme: THEME) {
  this.ngWizardService.theme(theme);
}

stepChanged(args: StepChangedArgs) {
  console.log(args.step);
}
// stepEditChanged(args: StepChangedArgs){
//  if(!this.draftSaved){
//   this.projectEditActivities=[];
//   this.projectEditphotos=[];
//   this.editData.photos=[];
//   this.editData.activities=[];


//    this.projectData.projectId=this.editProjectIndex;
//    console.log(this.projectData.projectId);
//    this.service.getProject(this.projectData).subscribe(res=>{
//    console.log(res);
//    this.editData=res;
//    this.editProjectData=this.editData.project;
//    console.log(this.editProjectData);
//    this.projectEditForm.get('objId').setValue(this.projectData.projectId);
//    this.projectEditForm.get('projectName').setValue(this.editProjectData.projectName);
//    this.projectEditForm.get('projectType').setValue(this.editProjectData.projectType);
//    this.projectEditForm.get('projectProposer').setValue(this.editProjectData.projectProposer);
//    this.projectEditForm.get('projectLocation').setValue(this.editProjectData.projectLocation);


//    const proposerDate= new DatePipe('en-US').transform(this.editProjectData.projectProposedDate, 'yyyy-MM-dd');
//    this.projectEditForm.get('projectProposedDate').setValue(proposerDate);

//    if(this.editProjectData.projectStartDate){
//      const startDate= new DatePipe('en-US').transform(this.editProjectData.projectStartDate, 'yyyy-MM-dd');
//      this.projectEditForm.get('projectStartDate').setValue(startDate);
//    }

//  console.log(this.editProjectData.endDate);

//  if(this.editProjectData.projectEndDate){
//    const endDate= new DatePipe('en-US').transform(this.editProjectData.projectEndDate, 'yyyy-MM-dd');
//    console.log(endDate);
//    this.projectEditForm.get('projectEndDate').setValue(endDate);
//  }

//  this.projectEditForm.get('projectGoal').setValue(this.editProjectData.projectGoal);
//  this.projectEditForm.get('projectStage').setValue(this.editProjectData.projectStage);
//  this.projectEditForm.get('projectTeam').setValue(this.editProjectData.projectTeam);
//  this.projectEditForm.get('projectLeader').setValue(this.editProjectData.projectLeader);
//  this.projectEditForm.get('projectPatners').setValue(this.editProjectData.projectPatners);
//  this.projectEditForm.get('projectChapter').setValue(this.editProjectData.projectChapter);
//  this.projectEditForm.get('projectDescription').setValue(this.editProjectData.projectDescription);
//  this.projectEditForm.get('projectDetails').setValue(this.editProjectData.projectDetails);
//  this.projectEditForm.get('projectImage').setValue(this.editProjectData.projectImage);



// this.projectEditActivities = this.projectEditForm.get('projectActivities') as FormArray;

//        while (this.projectEditActivities.length) {
//          this.projectEditActivities.removeAt(0);
//        }
//        this.projectEditForm.patchValue(this.editProjectData.projectActivities);

//        this.editProjectData.projectActivities.forEach(activity => this.projectEditActivities.push(this.formBuilder.group(activity)));


//       this.projectEditForm.get('projectActivities').patchValue(this.editProjectData.projectActivities);

//       this.projectEditPhotos = this.projectEditForm.get('photos') as FormArray;

//        while (this.projectEditPhotos.length) {
//          this.projectEditPhotos.removeAt(0);
//        }
//        this.projectEditForm.patchValue(this.editProjectData.photos);

//        this.editProjectData.photos.forEach(photo => this.projectEditPhotos.push(this.formBuilder.group(photo)));

//        this.projectEditForm.get('photos').patchValue(this.editProjectData.photos);
//       })
//  }
//  this.draftSaved=false;

// }
stepEditChanged(args: StepChangedArgs){}
onDateSelect(){
  console.log("checked");
}
// addLeaders(ind){
//   console.log(this.projectAddForm.value.projectTeam);
//   this.projectAddForm.value.projectLeader="";
//   this.leaders=[];
//   if(ind){
//     this.leaders = this.teams[ind-1].team;
//   }
//   else{
//   this.leaders = this.teams[this.projectAddForm.value.projectTeam-1].team;
//   }
// }
dateValidate(){
  this.dateError1="";
  this.dateError2="";
  console.log("dateentered");
  const proposedDate = new DatePipe('en-US').transform(this.projectAddForm.value.projectProposedDate, 'yyyy-MM-dd');
  const startDate = new DatePipe('en-US').transform(this.projectAddForm.value.projectStartDate, 'yyyy-MM-dd');
  const endDate = new DatePipe('en-US').transform(this.projectAddForm.value.projectEndDate, 'yyyy-MM-dd');
  console.log(proposedDate,startDate,endDate)
  if(proposedDate && startDate && endDate){
     if((endDate < proposedDate) || (startDate<proposedDate)){
       this.dateError1= "The proposed date should be less than the end date, less than or equal to start date."
     }
     else if(endDate<startDate){
      this.dateError2= "Please select a valid date range."
     }
  }
  else if(startDate && endDate){
    if(endDate<startDate){
      this.dateError2= "Please select a valid date range."
     }
  }
  else if(startDate && proposedDate){
    if(startDate < proposedDate){
      this.dateError1= "The proposed date should be less than or equal to start date."
     }
  }
  else if(proposedDate && endDate){
    if(endDate < proposedDate){
      this.dateError1= "The proposed date should be less than the end date."
     }
  }
}
dateValidateEdit(){
  this.dateError3="";
  this.dateError4="";
  console.log("dateentered");
  const proposedDate = new DatePipe('en-US').transform(this.projectEditForm.value.projectProposedDate, 'yyyy-MM-dd');
  const startDate = new DatePipe('en-US').transform(this.projectEditForm.value.projectStartDate, 'yyyy-MM-dd');
  const endDate = new DatePipe('en-US').transform(this.projectEditForm.value.projectEndDate, 'yyyy-MM-dd');
  console.log(proposedDate,startDate,endDate)
  if(proposedDate && startDate && endDate){
     if((endDate < proposedDate) || (startDate<proposedDate)){
       this.dateError3= "The proposed date should be less than the end date, less than or equal to start date."
     }
     else if(endDate<startDate){
      this.dateError4= "Please select a valid date range."
     }
  }
  else if(startDate && endDate){
    if(endDate<startDate){
      this.dateError4= "Please select a valid date range."
     }
  }
  else if(startDate && proposedDate){
    if(startDate < proposedDate){
      this.dateError3= "The proposed date should be less than or equal to start date."
     }
  }
  else if(proposedDate && endDate){
    if(endDate < proposedDate){
      this.dateError3= "The proposed date should be less than the end date."
     }
  }
}
addProject(resultModal){
  this.showFinish=false;
  this.addSuccess=true;
  this.addDanger=false;
  this.confirm(resultModal);
  this.message="Details are saved as draft,Complete all the steps to add the project.";
  console.log(this.projectAddForm.value);
}
ediProject(resultModal,showFinish){
  // this.message="Project Updated Successfully.";
  if(showFinish){
    this.showEditFinish=true;
  }
  else{
    this.showEditFinish=false;
  }
  console.log(this.projectEditForm.value);
  this.service.editProject(this.projectEditForm.value).subscribe(res=>{
    console.log(res);
    let editResult:any={
    }
    editResult=res;
    if(editResult.message="Data updated Succesfully"){
       this.editSuccess=true;
       this.message="Data updated successfully"
       this.confirm(resultModal);
    }
    else{
      this.editDanger=true;
      this.message="Cannot update data,try again"
      this.confirm(resultModal);

    }
  })

}
detectFilesData(event) {
  console.log("triggered")
  let files = event.target.files;
  if (files) {
      for (let file of files) {
          let reader = new FileReader();
          reader.onload = (e: any) => {
              this.projectEditphotos = this.projectEditForm.get('photos') as FormArray;
              console.log(this.projectEditphotos);
              console.log(e);
              console.log(e.target.result);
              this.editGalleryImage = e.target.result
              // this.projectEditphotos.at(index).patchValue({
              //   photo:e.target.result
              // })
          }
          reader.readAsDataURL(file);
      }

      // console.log(files,index);
  }
}
addActivities(resultModal){

  console.log(this.activityData)
  let index = 0;
  this.activityData.filter(x=>{
    x.id = index;
    index++;
  });
  this.projectAddForm.get('activities').setValue(this.activityData);
  console.log(this.projectAddForm.value);
  this.message="Activities are saved as draft,Complete all the steps to add the project";
  this.confirm(resultModal);
  // this.checkActivityName=false;
  // this.checkActivityDates=false;
  // this.addSuccess=false;
  // this.addDanger=false;
  // // const checkActList = this.projectAddForm.get('projectActivities') as FormArray;
  // // checkActList.forEach(element => {

  // // });
  // for (let control of this.projectAddForm.get('projectActivities')['controls']) {

  //  console.log(control.controls);
  //  if(control.controls.activityName.value==null){
  //    console.log("enter1")
  //    this.checkActivityName=true;
  //    break;
  //  }
  // }
  // for (let control of this.projectAddForm.get('projectActivities')['controls']) {
  //   console.log(control.controls);
  //   if(control.controls.activityStartDate.value!=null && control.controls.activityEndDate.value!=null){

  //     const actStartDate = new DatePipe('en-US').transform(control.controls.activityStartDate.value, 'yyyy-MM-dd');
  //     const actEndDate = new DatePipe('en-US').transform(control.controls.activityEndDate.value, 'yyyy-MM-dd');
  //     if(actStartDate> actEndDate){
  //       this.checkActivityDates=true;
  //       break;
  //     }
  //   }

  //  }
  // if(this.checkActivityName){
  //   console.log("entered");
  //   this.showFinish=false;
  //   this.addDanger=true;
  //   this.addSuccess=false;
  //   this.message="Activity name cannot be null";
  //   console.log(this.projectAddForm.value);
  //   this.confirm(resultModal);
  // }
  // else if(this.checkActivityDates){
  //   this.addDanger=true;
  //   this.addSuccess=false;
  //   this.showFinish=false;
  //   this.message="Activity start date should be less than activity end date";
  //   console.log(this.projectAddForm.value);
  //   this.confirm(resultModal);
  // }
  // else{
  //   this.addDanger=false;
  //   this.addSuccess=true;
  // this.showFinish=false;
  // this.message="Activities are saved as draft,Complete all the steps to add the project";
  // console.log(this.projectAddForm.value);
  // this.confirm(resultModal);

  // }


}
addGallery(resultModal){
  this.loading = true;

  console.log(this.gallaryData)
  if(this.gallaryData.length === 0){
    this.showFinish=false;
    this.addDanger=true;
    this.addSuccess=false;
  this.loading = false;

    this.message="Add atleast one image";
    this.confirm(resultModal);
  }else{
    this.checkGalleryPhoto=false;
    this.addSuccess=false;
    this.addDanger=false;
    this.projectAddForm.value.gallery =this.gallaryData;
    console.log(this.projectAddForm.value)
    this.service.addProject(this.projectAddForm.value).subscribe(res=>{
  this.loading = false;

      console.log(res);
      if(res.message=="project added successfully"){
        this.message="Project Added Successfully.";
        this.showFinish=true;
        this.addDanger=false;
        this.addSuccess=true;
        // this.showFinish=false;
        // this.addDanger=true;
        // this.addSuccess=false;
        // this.message="Gallery image cannot be null";
        console.log(this.projectAddForm.value);
        console.log(this.projectAddForm.value);
        this.confirm(resultModal);
        this.getAllProjects();
        this.projectAddForm = this.formBuilder.group({
          projectName:new FormControl('',[Validators.required,Validators.pattern(this.projectNamePattern),Validators.minLength(this.projectNameMinLength),Validators.maxLength(this.projectNameMaxLength)]),
          projectType: new FormControl('', Validators.required ),
          projectGoal: new FormControl('', [Validators.required,Validators.pattern(this.goalNumberPattern)]),
          projectLeader: new FormControl(''),
          projectTeam: new FormControl(''),
          projectPatners: new FormControl(''),
          projectLocation: new FormControl('',[Validators.required,Validators.pattern(this.locationNamePattern)]),
          projectProposedDate: new FormControl('',Validators.required),
          projectProposer: new FormControl('',Validators.required),
          projectStartDate: new FormControl('',),
          projectEndDate: new FormControl('',),
          projectDescription: new FormControl(''),
          projectDetails: new FormControl(''),
          projectChapter: new FormControl('',Validators.required),
          projectStage: new FormControl('',Validators.required),
          projectImage: new FormControl(''),
          // projectMatchingConfig:new FormGroup({
          //   amount:new FormControl('',[Validators.pattern(this.goalNumberPattern)]),
          //   type: new FormControl('')
          // }),
          projectActivities:this.formBuilder.array([ this.createItem()]),
          // projectSocialConnect:this.formBuilder.array([ this.createSocCnt()]),
          photos:this.formBuilder.array([ this.createPhoto()]),
        })
        // this.projectModalRef.close();


      }
      // else{
      //   this.message="Cannot add the project, try again"
      // }
    })
  }


  // for (let control of this.projectAddForm.get('photos')['controls']) {
  //   console.log(control.controls);
  //   if(control.controls.photo.value==""){
  //       this.checkGalleryPhoto=true;
  //       break;
  //   }
  //  }
  //  if(this.checkGalleryPhoto){
  //     console.log("entered");
  //     this.showFinish=false;
  //     this.addDanger=true;
  //     this.addSuccess=false;
  //     this.message="Gallery image cannot be null";
  //     console.log(this.projectAddForm.value);
  //     this.confirm(resultModal);
  //  }
  //  else{
    // const activities = this.projectAddForm.get('projectActivities') as FormArray;
    // let index=0
    // while(index<activities.length){
    //   activities.at(index).patchValue({
    //     id:index
    //   })
    //   index++;
    // }


  //  }


}
confirm(resultModal) {
   this.resultModalRef = this.modalService.open(resultModal , { ariaLabelledBy: 'modal-basic-title', centered: true,size:'sm' });
   this.resultModalRef.result.then((result) => {
    this.confirmResut = `Closed with: ${result}`;
  }, (reason) => {
    this.confirmResut = `Dismissed with: ${reason}`;
  });
}
viewNext(){
 this.resultModalRef.close();
//  this.projectModalRef.close();
 this.ngWizardService.next();
}
viewProjects(){
  if(this.resultModalRef){
    this.resultModalRef.close();
  }
  if( this.projectModalRef){
    this.projectModalRef.close();
  }
  if( this.expModalRef){
    this.expModalRef.close();
  }

  this.getAllProjects();
 }
 openViewModal(viewModal,index,projectName,description,proposedDate,goal,startDate,activities,dateAdded){
  this.activityTimeLine=true;
  this.donationTimeLine=false;
  this.donationAmount=0
  this.expAmount=0
   console.log(index,projectName,description,proposedDate,goal,startDate,activities,dateAdded)
  this.projectAdded= dateAdded;


  this.startDate=startDate
  this.projectIndex=index,
  this.proejctData.projectId=index
  this.projectName=projectName,
  this.description=description,
  this.proposedDate=proposedDate,
  this.goal=goal;
  this.service.getProject(this.proejctData).subscribe(res=>{
    console.log(res);
    let actRes:any={

    }
    actRes=res

    this.projectActivitiesList=actRes.activities[0].activities
    console.log(this.sortData());
    console.log(this.projectActivitiesList)
    this.projectActivitiesList=this.sortData();
    // this.projectExpActivities=actRes.activities[0].activities
    // this.projectExpActivities=this.sortDataExp();
    // this.editData=res;
    // this.editProjectData=this.editData.project;
  })
  this.service.getDonationsbyProjectId(this.proejctData).subscribe(res=>{
    console.log(res);
    this.donationsList=res;
    this.donationsList.donation=this.donationsList.donation
    this.donationsList.donation.forEach(element => {
      this.donationAmount=element.amount+this.donationAmount

    });
  })
  this.service.getExpenditureProject(this.proejctData).subscribe(res=>{
    console.log(res);
    this.getExpList=res;
    console.log(this.getExpList);

    if(this.getExpList.expenditure.length){
      this.getExpList.expList=this.getExpList.expenditure[0].expList
      this.getExpList.expList=this.sortDataExp()
      console.log(this.getExpList.expList)
      this.getExpList.expList.forEach(element => {
        this.expAmount=element.amount+this.expAmount
      });
    }
  })
  this.projectModalRef = this.modalService.open(viewModal ,{ariaLabelledBy: 'modal-basic-title',size: 'xl'});
  this.projectModalRef.result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });

 }
 openEditModal(editModal,projectId){
  this.loading = true;
   this.editProjectIndex=projectId;
   console.log(projectId);
   this.projectEditActivities=[];
   this.projectEditphotos=[];
   this.editData.photos=[];
   this.editData.activities=[];


    this.projectData.projectId=projectId;
    console.log(this.projectData.projectId);
    this.service.getProject(this.projectData).subscribe(res=>{
    console.log(res);
    this.editData=res;
    this.loading = false;
    this.editProjectData=this.editData.project;
    console.log(this.editProjectData);

    this.projectEditForm.get('objId').setValue(this.projectData.projectId);
    this.projectEditForm.get('projectName').setValue(this.editProjectData.projectName);
    this.projectEditForm.get('projectType').setValue(this.editProjectData.projectType);
    this.projectEditForm.get('projectProposer').setValue(this.editProjectData.projectProposer);
    this.projectEditForm.get('projectLocation').setValue(this.editProjectData.projectLocation);
    this.projectEditForm.get('beneficiary').setValue(this.editProjectData.beneficiary);


    const proposerDate= new DatePipe('en-US').transform(this.editProjectData.projectProposedDate, 'yyyy-MM-dd');
    this.projectEditForm.get('projectProposedDate').setValue(proposerDate);

    if(this.editProjectData.projectStartDate){
      const startDate= new DatePipe('en-US').transform(this.editProjectData.projectStartDate, 'yyyy-MM-dd');
      this.projectEditForm.get('projectStartDate').setValue(startDate);
    }

  console.log(this.editProjectData.endDate);

  if(this.editProjectData.projectEndDate){
    const endDate= new DatePipe('en-US').transform(this.editProjectData.projectEndDate, 'yyyy-MM-dd');
    console.log(endDate);
    this.projectEditForm.get('projectEndDate').setValue(endDate);
  }

  this.projectEditForm.get('projectGoal').setValue(this.editProjectData.projectGoal);
  this.projectEditForm.get('projectStage').setValue(this.editProjectData.projectStage);
  this.projectEditForm.get('projectTeam').setValue(this.editProjectData.projectTeam);

  // this.addLeaders(1)
  this.projectEditForm.get('projectLeader').setValue(this.editProjectData.projectLeader);
  this.projectEditForm.get('projectPatners').setValue(this.editProjectData.projectPatners);
  this.projectEditForm.get('projectChapter').setValue(this.editProjectData.projectChapter);
  this.projectEditForm.get('projectDescription').setValue(this.editProjectData.projectDescription);
  this.projectEditForm.get('projectDetails').setValue(this.editProjectData.projectDetails);
  this.projectEditForm.get('projectImage').setValue(this.editProjectData.projectImage);

  this.projectModalRef = this.modalService.open(editModal ,{ariaLabelledBy: 'modal-basic-title',size: 'xl'});


  console.log(this.editData.activities.length)
  if(this.editData.activities.length != 0){
    const activityDetails = this.editData.activities;
    this.activityEditData =  activityDetails[0].activities;
  }else{
    this.activityEditData = [];
  }

  console.log(this.activityEditData);
  if(this.editData.gallery.length != 0){
    const gallerydetails = this.editData.gallery;
    this.gallaryEditData = gallerydetails[0].gallery
  }else{
    this.gallaryEditData = [];
  }
  console.log( this.gallaryEditData)
  // this.service.getprojectGalleryData(this.projectData.projectId).subscribe(res=>{
  //   console.log(res);
  // },err=>{
  //   console.log(err.error)
  // })
//  this.projectEditActivities = this.projectEditForm.get('projectActivities') as FormArray;

        // while (this.projectEditActivities.length) {
        //   this.projectEditActivities.removeAt(0);
        // }
        // this.projectEditForm.patchValue(this.editProjectData.projectActivities);
        // add form array values in a loop

        // this.editProjectData.projectActivities.forEach(activity => this.projectEditActivities.push(this.formBuilder.group(activity)));


  // this.projectEditForm.get('projectActivities').patchValue(this.editProjectData.projectActivities);

//  this.projectEditPhotos = this.projectEditForm.get('photos') as FormArray;

//         while (this.projectEditPhotos.length) {
//           this.projectEditPhotos.removeAt(0);
//         }
//         this.projectEditForm.patchValue(this.editProjectData.photos);

//         this.editProjectData.photos.forEach(photo => this.projectEditPhotos.push(this.formBuilder.group(photo)));

//         this.projectEditForm.get('photos').patchValue(this.editProjectData.photos);

        this.projectModalRef.result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
  })
  console.log(this.projectEditForm.value.chapter);





 }
 changetimeline(timeLine){
   if(timeLine=="donationTimeLine"){
     this.donationTimeLine=true;
     this.activityTimeLine=false;
     this.expenditureTimeLine=false;
   }
   else if(timeLine=="activityTimeLine"){
    this.donationTimeLine=false;
    this.activityTimeLine=true;
    this.expenditureTimeLine=false;

   }
   else{
    this.donationTimeLine=false;
    this.activityTimeLine=false;
    this.expenditureTimeLine=true;

   }
   console.log(this.donationTimeLine);
   console.log(this.activityTimeLine);
   console.log(this.expenditureTimeLine);
 }
 addExpenditure(resultModal){
  //  this.showClose=true;
  //  this.message="Expenditure Added Succesfully"
  //  console.log(this.projectExpenditure)
  //  this.confirm(resultModal);

   this.service.addExpenditureProject(this.projectExpenditure.value).subscribe(res=>{
    console.log(res);
    let expResult:any={
    }
    expResult=res;
    if(expResult.message="Expenditure added successfully"){
       this.addSuccess=true;
       this.addDanger=false;
       this.showFinish=true;
       this.message="Data added successfully"
       this.confirm(resultModal);
    }
    else{
      this.addDanger=true;
      this.addSuccess=false;
      this.showFinish=true;
      this.message="Cannot add data,try again"
      this.confirm(resultModal);

    }
  })


 }
 detectProjectImage(event){
  let files = event.target.files;
  if (files) {
      for (let file of files) {
          let reader = new FileReader();
          reader.onload = (e: any) => {
              console.log(e.target.result);
              const proImage=e.target.result
              this.projectAddForm.get('projectImage').setValue(e.target.result);
          }
          reader.readAsDataURL(file);
      }

  }

 }
 detectProjectImageEdit(event){
  let files = event.target.files;
  if (files) {
      for (let file of files) {
          let reader = new FileReader();
          reader.onload = (e: any) => {
              console.log(e.target.result);
              const proImage=e.target.result
              this.projectEditForm.get('projectImage').setValue(e.target.result);
          }
          reader.readAsDataURL(file);
      }

  }

 }
 getAllProjects(){
  this.service.getAllProjects().subscribe(res=>{
    console.log(res);

    this.projectsList=res;
    this.projectsLength = this.projectsList.Projects.length;
    this.allProjects = this.projectsList.Projects;
    var index = 1;
  this.loading = false;
    this.allProjects.filter(x=>{
      x.index = index;
      index++;
    });
    this.finalData=this.allProjects;
    this.availableRecords=this.allProjects.length;
  })

}
editProjectDetails(resultModal,showFinish){
  this.draftSaved=true
  this.editSuccess=true;
  this.editDanger=false
  this.showEditFinish=false
  this.message="Changes saved as draft,Complete all the steps to update the project"
  this.confirm(resultModal);

}
editProjectActivities(resultModal,showFinish){

  this.showEditFinish=false
  this.draftSaved=true
  this.checkEditActivityName=false;
  this.checkEditActivityDates=false;
  this.editSuccess=true;
  this.editDanger=false;
  let index = 0;
  this.activityEditData.filter(x=>{
    x.id = index;
    index++;
  });
  console.log(this.activityEditData)
  this.projectEditForm.get('activities').setValue(this.activityEditData);
  console.log(this.projectEditForm.value);
  this.showFinish=false;
  this.message="Activities are saved as draft,Complete all the steps to update the project";
  // console.log(this.projectAddForm.value);
  this.confirm(resultModal);
  // const checkActList = this.projectAddForm.get('projectActivities') as FormArray;
  // checkActList.forEach(element => {

  // });
  // for (let control of this.projectEditForm.get('projectActivities')['controls']) {

  //  console.log(control.controls);
  //  if(control.controls.activityName.value==null){
  //    console.log("enter1")
  //    this.checkEditActivityName=true;
  //    break;
  //  }
  // }
  // for (let control of this.projectEditForm.get('projectActivities')['controls']) {
  //   console.log(control.controls);
  //   if(control.controls.activityStartDate.value!=null && control.controls.activityEndDate.value!=null){

  //     const actStartDate = new DatePipe('en-US').transform(control.controls.activityStartDate.value, 'yyyy-MM-dd');
  //     const actEndDate = new DatePipe('en-US').transform(control.controls.activityEndDate.value, 'yyyy-MM-dd');
  //     if(actStartDate> actEndDate){
  //       this.checkEditActivityDates=true;
  //       break;
  //     }
  //   }

  //  }
  // if(this.checkEditActivityName){
  //   console.log("entered");
  //   this.showFinish=false;
  //   this.editDanger=true;
  //   this.editSuccess=false;
  //   this.message="Activity name cannot be null";
  //   console.log(this.projectAddForm.value);
  //   this.confirm(resultModal);
  // }
  // else if(this.checkEditActivityDates){
  //   this.editDanger=true;
  //   this.editSuccess=false;
  //   this.showFinish=false;
  //   this.message="Activity start date should be less than activity end date";
  //   console.log(this.projectAddForm.value);
  //   this.confirm(resultModal);
  // }
  // else{
  //   this.editDanger=false;
  //   this.editSuccess=true;
  // this.showFinish=false;
  // this.message="Activities are saved as draft,Complete all the steps to update the project";
  // console.log(this.projectAddForm.value);
  // this.confirm(resultModal);

  // }

}
editGallery(resultModal){
  this.loading = true;

  if(this.gallaryEditData.length === 0){
    console.log("entered");
        this.showEditFinish=false;
        this.editDanger=true;
        this.editSuccess=false;
  this.loading = false;

        this.message="Add atleast one image";
        this.confirm(resultModal);
  }else{

    // this.draftSaved=true
    // this.checkEditGalleryPhoto=false;
    console.log(this.gallaryEditData)
    this.projectEditForm.value.gallery = this.gallaryEditData;
    console.log(this.projectEditForm.value)
    this.service.editProject(this.projectEditForm.value).subscribe(res=>{
  this.loading = false;

      console.log(res);
      let editResult:any={
      }
      editResult=res;
      if(editResult.message="Data updated Succesfully"){
         this.editSuccess=true;
         this.editDanger=false;
         this.message="Data updated successfully"
         this.confirm(resultModal);
         this.showEditFinish=true;
      }
      else{
        this.editSuccess=false;
        this.editDanger=true;
        this.message="Cannot update data,try again"
        this.confirm(resultModal);

      }
    })
  }



  // for (let control of this.projectEditForm.get('photos')['controls']) {
  //   console.log(control.controls);
  //   if(control.controls.photo.value==""){
  //       this.checkEditGalleryPhoto=true;
  //       break;
  //   }
  //  }
  //  if(this.checkEditGalleryPhoto){
  //     console.log("entered");
  //     this.showEditFinish=false;
  //     this.editDanger=true;
  //     this.editSuccess=false;
  //     this.message="Gallery image cannot be null";
  //     console.log(this.projectAddForm.value);
  //     this.confirm(resultModal);
  //  }
  //  else{
    // const activities = this.projectEditForm.get('projectActivities') as FormArray;
    // let index=0
    // while(index<activities.length){
    //   activities.at(index).patchValue({
    //     id:index
    //   })
    //   index++;
    // }



// }

}

openMdModal(content,activities) {
  this.donatedActivitieslist=activities
  console.log(this.donatedActivitieslist);
  this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'md', centered: true })
  .result.then((result) => {
    console.log(result);
  }, (reason) => {
    console.log('Err!', reason);
  });
}
updateExpenditure(resultModal){
  console.log("called");
  console.log(this.expenditureData)
  this.projectExpenditure.value.expList = this.expenditureData
  console.log(this.projectExpenditure.value);
  this.service.updateExpenditureProject(this.projectExpenditure.value).subscribe(res=>{
    console.log(res);
    let expResult:any={
    }
    expResult=res;
    if(expResult.message="Data updated Succesfully"){
       this.addSuccess=true;
       this.showFinish=true
       this.message="Data updated successfully"
       this.confirm(resultModal);
    }
    else{
      this.addDanger=true;
      this.showFinish=true
      this.message="Cannot update data,try again"
      this.confirm(resultModal);

    }
  })

}
checkProjectName(){
  console.log("entered")
  this.dupProject=false;
  this.service.checkProjectName(this.projectAddForm.value).subscribe(res=>{
    console.log(res);
    let checkNameResult:any={
    }
    checkNameResult=res;
    if(checkNameResult.Project.length!=0){
      this.dupProject=true;
    }
    else{
      this.dupProject=false;

    }
    console.log(this.dupProject);
  })
}
public uploader: FileUploader = new FileUploader({
  disableMultipart : false,
  itemAlias: 'documents',
  allowedFileType: ['image', 'pdf']
});




uploadAttachments(){
  for (let i = 0; i < this.uploader.queue.length; i++) {
    let fileItem = this.uploader.queue[i]._file;
    if(fileItem.size > 2000000){
      // alert("Each File should be less than 2 MB of size.");
      return;
    }
  }
  for (let j = 0; j < this.uploader.queue.length; j++) {
    let data = new FormData();
    let fileItem = this.uploader.queue[j]._file;
    data.append('file', fileItem);
    data.append('fileSeq', 'seq'+j);
    // this.uploadFile(data).subscribe(data => alert(data.message));
  }
  this.uploader.clearQueue();
}

onItemSelect(selectedItem){
  console.log(selectedItem)
  this.selectedPartner = selectedItem.name;
  console.log(this.selectedPartner);
  // if (this.selectedPartner == "Others"){
  //   this.onPartnerSelect(true);
  //   console.log(this.selectedSingleOption)
  // }
  // else{
  //   this.onPartnerSelect(false);
  // }

}
selectedOthers;
  onPartnerSelect(selectedOthers){
    this.selectedSingleOption = selectedOthers;


  }


  changeevents(event){
    console.log(event)
    if(event.target.checked === true){
     this.myProjects = true;
    }else{
     this.myProjects = false;
    }

  }
  // add to faavorite projects
  addFavorites(addFavorite,projectId,Pname){
    console.log(projectId)
    this.favoriteProjects.projectId = projectId
    this.favoriteProjects.ProjectName = Pname;
    this.modalService.open(addFavorite, { size: 'md' });
    this.error = '';

  }

  confirmFavResult(resultModal) {
    this.resultModalRef = this.modalService.open(resultModal , { ariaLabelledBy: 'modal-basic-title', centered: true,size:'sm' });
    this.resultModalRef.result.then((result) => {
     this.confirmResut = `Closed with: ${result}`;
   }, (reason) => {
    this.confirmResut = `Dismissed with: ${reason}`;
    this.modalService.dismissAll()
   });
   this.getallFavprojects();

 }

  addToFavoriteList(Pid,FavresultModal){
    const projectData = {projectId:'',userId:''}
    projectData.projectId = Pid;
    projectData.userId = this.userToken.id
    console.log(projectData)
    this.service.addFavorite(projectData).subscribe(res=>{
      console.log(res)
      this.favoriteResult = res;
      this.addSuccess=true;
      this.addDanger=false;
      this.confirmFavResult(FavresultModal);
      this.message=this.favoriteResult.message;
      this.error = '';
    },err=>{
      console.log(err.error)
      this.error = err.error.message;
    })
  }

  getallFavprojects(){

    this.service.allFavprojectsById(this.userToken.id).subscribe(res=>{
      console.log(res)
      this.allFavoriteProjects = res
      this.allFavProjectsLength = this.allFavoriteProjects.Projects.length;
      console.log(this.allFavProjectsLength)
      this.allFavProjects = this.allFavoriteProjects.Projects;
      var index = 1;
  this.loading = false;
      this.allFavProjects.filter(x=>{
        x.index = index;
        index++;
      });
      this.finalDataFav=this.allFavProjects;
      this.availableRecordsFav=this.allFavProjects.length
      console.log(this.allFavProjects)
    },err=>{
      console.log(err.error)
    })
  }
  getAllChapters(){
    this.service.getAllChapters().subscribe(res=>{
      console.log(res);
      let chapRes:any={

      }
      chapRes=res;
      this.branches=chapRes.chapters;

     },
       error=>{
       }
     )

   }
   getAllTeamLeaders(){
    this.service.getAllTeamLeaders().subscribe(res=>{
      console.log(res);
      let teamLeaderRes:any={

      }
      teamLeaderRes=res;
      this.teamLeaders=teamLeaderRes.teamLeaders;
      for (let i = 0; i < this.teamLeaders.length; i++) {
        if (this.teamLeaders[i].firstName) {
          this.teamLeaders[i].name = this.teamLeaders[i].firstName.trim()+ ' ' + this.teamLeaders[i].lastName;
        } else {
          this.teamLeaders[i].name = ' ';
        }
      }
     },
       error=>{
       }
     )

   }
   sortData() {
    return this.projectActivitiesList.sort((a, b) => {
      return <any>new Date(b.addedDate) - <any>new Date(a.addedDate);
    });
  }
  sortDataExp() {
    return this.getExpList.expList.sort((a, b) => {
      return <any>new Date(b.expDate) - <any>new Date(a.expDate);
    });
  }
  openPartnersModal(partnerModal,selModal){
    this.selectedModal=selModal;
    this.partnerModal = this.modalService.open(partnerModal , { ariaLabelledBy: 'modal-basic-title', centered: true,size:'sm' });
    this.partnerModal.result.then((result) => {
     this.confirmResut = `Closed with: ${result}`;
   }, (reason) => {
    this.confirmResut = `Dismissed with: ${reason}`;

   });

  }
  addPartner(){
    this.service.addPartner(this.addPartnerForm.value).subscribe(res=>{
      console.log(res);
      let actRes:any={

      }
      actRes=res
     if(actRes.message=="partner added successfully"){
      this.service.getAllPartners().subscribe(res=>{
        console.log(res);
        let partnerRes:any={

        }
        partnerRes=res
        if(partnerRes.message=="Data retrieved Succesfully"){
          this.partners=partnerRes.partners
          console.log(this.projectAddForm.value.projectPatners)
          let patchRes:any={
            _id:"",
            partnerName:""
          }
          patchRes._id=actRes.addedPartner._id
          patchRes.partnerName=actRes.addedPartner.partnerName
          console.log(patchRes);
          if(this.selectedModal=="add"){
            console.log(this.projectAddForm.value.projectPatners)
            let prtnersdata:any=[]
            if(this.projectAddForm.value.projectPatners){
              prtnersdata=this.projectAddForm.value.projectPatners
            }
            prtnersdata.push(patchRes)
            this.projectAddForm.patchValue({
              projectPatners:prtnersdata
            });
          }
          else{
            console.log(this.projectEditForm.value.projectPatners)
            let prtnersdata:any=[]
            if(this.projectEditForm.value.projectPatners){
              prtnersdata=this.projectEditForm.value.projectPatners
            }
            prtnersdata.push(patchRes)
            this.projectEditForm.patchValue({
              projectPatners:prtnersdata
            });

          }

          this.partnerModal.close();
          this.addPartnerForm.reset();

        }

      })


     }
    })

  }
  getAllPartners(){
    this.service.getAllPartners().subscribe(res=>{
      console.log(res);
      let partnerRes:any={

      }
      partnerRes=res
      this.partners=partnerRes.partners
    })

  }
  getAllVolunteersAndMembers(){
    this.team=[];
    this.service.getAllVolunteers().subscribe(res=>{
      console.log(res);
      let volunteerRes:any={

      }
      volunteerRes=res
      for (let i = 0; i < volunteerRes.volunteers.length; i++) {
        if(volunteerRes.volunteers[i].role=="5f19460f8701293051c22180"){
        volunteerRes.volunteers[i].name= volunteerRes.volunteers[i].firstName.trim()+ ' ' + volunteerRes.volunteers[i].lastName + '- Volunteer'
        this.team.push(volunteerRes.volunteers[i])
        }
        else{
          volunteerRes.volunteers[i].name= volunteerRes.volunteers[i].firstName.trim()+ ' ' + volunteerRes.volunteers[i].lastName + '- Member'
          this.team.push(volunteerRes.volunteers[i])

        }
      }

      console.log(this.team);
    })

  }
  search1(term: string){
    console.log(term)
    if (!term) {
      this.allProjects = this.finalData;
    } else {
      this.allProjects = this.finalData.filter(x =>       
        x.projectName.trim().toLowerCase().includes(term.trim().toLowerCase())     
      );
  
     
    }
    this.availableRecords = this.allProjects.length;
  }
  search2(term: string){
    console.log(term)
    if (!term) {
      this.allFavProjects = this.finalDataFav;
    } else {
      this.allFavProjects = this.finalDataFav.filter(x =>       
        x.projectName.trim().toLowerCase().includes(term.trim().toLowerCase())     
      );
  
     
    }
    this.availableRecordsFav = this.allFavProjects.length;
  }
  


}
