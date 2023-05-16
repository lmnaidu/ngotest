import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import {Observable,of} from 'rxjs';
import {environment} from "./../../../environments/environment";
import { Router, ActivatedRoute } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class LoginService{
  
  baseUrl  = "localhost:4200";
  url = this.baseUrl + '';
  memberUrl = this.baseUrl + '/member';
  ProjectsUrl = this.baseUrl + '/projects';
  userToken:any;
  tokendata:any;
    constructor(public _http: HttpClient, private _router:Router) {
  }

  userLogin(data): Observable<any> {


    // let params = JSON.stringify(data);
    // let headers = new HttpHeaders().set('Content-Type', 'application/json');
    // return this._http.post(this.url + 'login', params, {headers: headers});
   var userName = data.username.trim();
   var password = data.password.trim();

    if (userName === 'admin@ngo.com' && password=== 'Pass12!@') {
      this._router.navigate(['dashboard/home']);
      localStorage.setItem('currentUser', JSON.stringify(data));
      localStorage.setItem('usertype',"admin");
      return this._http.get('../../assets/stubs/admin.json');
      
      
    }
    else if(userName === 'member@ngo.com' && password === 'Pass12!@'){
      this._router.navigate(['dashboard/home']);
      localStorage.setItem('currentUser', JSON.stringify(data));
      localStorage.setItem('usertype',"member");
      return this._http.get('../../assets/stubs/member.json');
    }
}

authenticateUser(){
  var Current_user = localStorage.getItem('currentUser');
  console.log("current user is :" + Current_user);

  if ( Current_user === "admin@ngo.com"){
    return of({
      json: function(){
        return { statusCode: {code : '200', message : 'Ok'}, errorMessage : null, data:
      {
        token :'',
        username: '',
        usertype:'admin',
        email: '',
        permissions : {
          'profile' : true,
          'events' : true,
          'projects' : false,
        }
      }
      }
      }
    })
  }
  else if(Current_user === "member@ngo.com"){
    return of({
      json: function(){
        return { statusCode: {code : '200', message : 'Ok'}, errorMessage : null, data:
      {
        token :'',
        username: '',
        usertype:'member',
        email: '',
        permissions : {
          'profile' : true,
          'events' : false,
          'projects' : false,
        }
      }
      }
      }
    })

  }
}


  getToken(){
    this.tokendata = JSON.parse(localStorage.getItem('userToken'));
    if( this.tokendata){
      this.userToken  = this.tokendata;
    }else{
      this.userToken = '';
    }
    return this.userToken;
  }

  logout() {
    // remove user from local storage to user log-out
    localStorage.removeItem('userToken');
    localStorage.clear();
    this._router.navigate(['/authorization/login']).then(() => {
        window.location.reload();
    });
}


}
