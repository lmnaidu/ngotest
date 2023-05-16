import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError,BehaviorSubject} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { exit } from 'process';
import {Router} from '@angular/router';
import { UserService } from './user.service';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    loggedInSubject = new BehaviorSubject<boolean>(null);
    isLoggedIn = this.loggedInSubject.asObservable();

    
    callOnce:boolean=false;
    constructor(private toastr: ToastrService,private router: Router,private service:UserService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                if(!this.callOnce){
                //   this.toastr.error(err.error, 'Error');
                  this.service.loggedInSubject.next(false);

                  this.callOnce=true;
                }
                // this.router.navigate(['/authorization/login'])
                return;
            }
             
            // if(err.status === 404){
            //     // this.toastr.info(err.error, 'Info');
            //     console.log(err.error);
            // }
            // else{
            //     this.toastr.error(err.error, 'Error');
            // }
            // console.log(err)
            const error = err.message || err.statusText;
            // console.log(error)
            return throwError(error);
        }))
    }
}