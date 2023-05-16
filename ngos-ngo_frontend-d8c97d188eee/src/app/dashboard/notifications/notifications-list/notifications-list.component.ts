import { Component, OnInit } from '@angular/core';
import { UserService} from '../../../core/services/user.service';
import { LoginService } from '../../../core/services/login.service';

@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.css']
})
export class NotificationsListComponent implements OnInit {
  page  = 1;
  pageSize = 10;
  notificationsList:any=[];
  notLength:any
  userToken:any;
  orgdataRes:any={
    orgInfo:[{}]
  }

  constructor(private service:UserService,private loginService:LoginService) { }

  ngOnInit(): void {
    this.service.getOrgInfo().subscribe(res=>{
      // console.log(res);
      this.orgdataRes=res
      // console.log(this.orgdataRes); 
    
    },err=>{
      console.log(err.error);
     
    })
    this.userToken= this.loginService.getToken();
    this.getAllNotifications()
  }
  getAllNotifications(){
    this.service.getNotificationList(this.userToken.id).subscribe(res=>{
      let result:any={

      }
      result=res;
      this.notificationsList = result.notifications;
      console.log(this.notificationsList)
      this.notLength=this.notificationsList.length;
      var index = 1;
      this.notificationsList.filter(x=>{
        x.index = index;
        index++;
      });
    },err=>{
      console.log(err.error)
    })
  }
  updateNot(id):void{
    // console.log(id)
    this.service.changeViewStatus(id).subscribe(res=>{
     
      
        // console.log(res);
      
    });


  }

}
