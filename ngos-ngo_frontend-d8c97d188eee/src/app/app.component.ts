import { Component,Inject ,OnInit  } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from './core/services/user.service';
import { DOCUMENT } from '@angular/common';
import { CssselectorService } from './cssselector';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  viewProviders: [Title],
})

export class AppComponent {
  title:any={
    orgInfo:[{}]
  };
  favicon;
  constructor(private titleService: Title,public service:UserService,private render:CssselectorService,@Inject(DOCUMENT) private _document: HTMLDocument,private modalService: NgbModal,private router: Router) {
  }
  ngOnInit() {
    this.service.getOrgInfo()
    .subscribe(res=>{
      this.title = res
      this.favicon = this.title.orgInfo[0].logo;
      // this.file2_input = this.title.siteFav;
      this.setTitle(this.title.orgInfo[0].title);
      this._document.getElementById('appFavicon').setAttribute('href', this.favicon);
    });
    // this.render.setStyle(this.class);  


  }
  public setTitle( newTitle: any) {
    this.titleService.setTitle( newTitle );
  }
  login(){
    this.router.navigate(['/authorization/login']).then(() => {
      window.location.reload();
    });
    // this.router.navigate(['/authorization/login'])
  }
}

