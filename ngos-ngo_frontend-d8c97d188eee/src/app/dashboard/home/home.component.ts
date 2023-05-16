import { Component, OnInit,ViewEncapsulation, ElementRef, AfterViewInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../core/services/login.service';
import {UserService } from '../../core/services/user.service';
import { Meta,Title } from '@angular/platform-browser';
import {HttpClient, HttpHeaders,HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
 
})
export class HomeComponent implements OnInit {
  currentUser:any;
  checkUser;
  loading = false;
  isAdmin = false;
  isMember = false;
  userToken:any;
  date = new Date();
  upcomingEvents:any = {upcomingEvents:[]}
  displayMarquee:boolean = false;
  name = 'ngx-sharebuttons';
  metaData:any;
  // title = 'Add Song Testing';
  @Input() url = location.href;
  constructor(private _router:Router, private loginService:LoginService, private service:UserService,private meta: Meta,private titleService: Title,private http:HttpClient) {
  this.loading = true;

  this.currentUser = this.loginService.getToken();
      // this.meta.addTags([
      //   { name: 'twitter:site1', content: '@alligatorio' },
      //   { name: 'twitter:site', content: '@alligatorio' }
      // ], true);


          // initialise facebook sdk after it loads if required
        //   if (!window['fbAsyncInit']) {
        //     window['fbAsyncInit'] = function () {
        //         window['FB'].init({
        //             appId: 'your-app-id',
        //             autoLogAppEvents: true,
        //             xfbml: true,
        //             version: 'v3.0'
        //         });
        //     };
        // }

        // load facebook sdk if required
        // const url = 'https://connect.facebook.net/en_US/sdk.js';
        // if (!document.querySelector(`script[src='${url}']`)) {
        //     let script = document.createElement('script');
        //     script.src = url;
        //     document.body.appendChild(script);
        // }
    }

    ngAfterViewInit(): void {
      // render facebook button
      // window['FB'] && window['FB'].XFBML.parse();
  }

  ngOnInit(): void {
    // this.meta.addTags([
    //   { name: 'keywords', content: 'Angular SEO Integration, Music CRUD, Angular Universal' },
    //   { name: 'robots', content: 'index, follow' },
    //   { name: 'author', content: 'Digamber Singh' },
    //   { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    //   { name: 'date', content: '2019-10-31', scheme: 'YYYY-MM-DD' },
    //   { charset: 'UTF-8' }
    // ]);
    // const viewport = this.meta.getTag('name=viewport');
    //   console.log(viewport.content);


    //   this.titleService.setTitle(this.title);
    //   this.meta.updateTag(
    //     { name: 'description', content: 'Add song template' }
    //   );

    //     console.log(this.meta)
    //     this.metaData = this.meta;
    //     console.log(this.metaData._doc.title)



    this.checkUser = localStorage.getItem('usertype');
    //var currentUserType = this.checkUser;
    // console.log('check User ' + this.checkUser);
    // if( this.checkUser === "admin"){
    //   this.isAdmin =true;
  
    // }
    // else if(this.checkUser === "member"){
    //   this.isMember=true;
    // }

    this.userToken = this.loginService.getToken();
    const roleIDs = this.userToken.roles;
     this.service.getpermissions(roleIDs).subscribe(res=>{
        const role = res;
        const rolePermissions = role.permissionSet
  this.loading = false;
      },err=>{
        // console.log(err.error);
      })

      this.date.setDate(this.date.getDate() - 1 );
      const eventdate:any = {
        date:''
      }
      eventdate.date = this.date
      this.service.upcomingEvents(eventdate).subscribe(res=>{
        this.upcomingEvents = res;
        
        if( this.upcomingEvents.upcomingEvents.length !=0){
            var index = 1;
            this.upcomingEvents.upcomingEvents.filter(x=>{
              x.index = index;
              index++;
            });
            this.displayMarquee = true;
        }else{
          this.displayMarquee = false;
        }
      },err=>{
        // console.log(err.error)
      })


      // getDonationsByMemberId(){
        const memberId ={
          memberId:''
        }
         memberId.memberId = this.currentUser.id;
        // console.log( this.memberId);
        // this.loading = true;
       
        // this.service.getDonationByMemberId(memberId).subscribe(res=>{

  }



}
