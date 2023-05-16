import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SwiperOptions } from 'swiper';
import { UserService} from '../../core/services/user.service';
import { LoginService } from '../../core/services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-magazine-list',
  templateUrl: './magazine-list.component.html',
  styleUrls: ['./magazine-list.component.css']
})
export class MagazineListComponent implements OnInit {
  orgdataRes:any={
    orgInfo:[{}]
  }
  loading = false;
  todayDate = new Date();
  magazinesData:any ={Magazines:[]};
  date= new Date();
  magazinePermissions:any = {none:'',read:'',write:'',update:''};
  donationsList:any ;
  filterForm:FormGroup;
  dateError:any;
  constructor(private http:HttpClient, private service:UserService,private loginService:LoginService,private formBuilder: FormBuilder) { 
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
  userToken:any;
  finalResult = [];
  searchMagazines:any ={Magazines:[]};
  search:boolean = false;
  searchError:any;
  ngOnInit(): void {
    this.service.getOrgInfo().subscribe(res=>{
      console.log(res);
      this.orgdataRes=res
      console.log(this.orgdataRes); 
    
    },err=>{
      console.log(err.error);
     
    })
    this.service.allMagazines().subscribe(res=>{
      this.magazinesData = res;
    });

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
      });


      this.filterForm = this.formBuilder.group({
        startDate: ['', [Validators.required]],
        endDate: ['',[Validators.required]],
      });

      this.getAllDonations();
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
    // this.filterForm.value.startDate =  new DatePipe('en-US').transform(  this.filterForm.value.startDate , 'yyyy-MM-dd H:M:S')
    // this.filterForm.value.endDate = new DatePipe('en-US').transform(  this.filterForm.value.endDate , 'yyyy-MM-dd H:M:S')
    // console.log( new Date(this.filterForm.value.endDate + (1000 * 60 * 60 * 24)))
    // this.filterForm.value.endDate.getDate() + 3
    this.filterForm.value.endDate.setDate(this.filterForm.value.endDate.getDate() + 1 );
    // console.log(this.filterForm.value);
    this.service.serachMagazines(this.filterForm.value).subscribe(res=>{
      this.searchMagazines = res;
      if( this.searchMagazines){
        if( this.searchMagazines.count === 0){
          this.searchError = 'No Magazines are avilable between dates';
          this.search = true;
        }else{
          this.search = true;
          this.searchError = '';
          console.log(this.searchMagazines)
        }
       
      }
      
    },err=>{
      this.search = false;
      console.log(err.error)
    })
  }
  reset(){
    this.search = false;
    this.searchError = '';
    this.dateError = '';
  }
  getAllDonations(){
    this.service.allDonations().subscribe(res=>{
     
      this.donationsList = res;
      var unique = {};
  this.loading = false;

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

}
