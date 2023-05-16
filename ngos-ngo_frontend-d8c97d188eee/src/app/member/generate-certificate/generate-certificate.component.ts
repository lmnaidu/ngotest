import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService} from '../../core/services/user.service';
import { DatePipe } from '@angular/common';

import  jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { mainModule } from 'process';
@Component({
  selector: 'app-generate-certificate',
  templateUrl: './generate-certificate.component.html',
  styleUrls: ['./generate-certificate.component.css']
})
export class GenerateCertificateComponent implements OnInit {
  orgdataRes:any={
    orgInfo:[{}]
  }
  availableRecords = 0;
  finalData:any=[]
  loading = false;
  page  = 1;
  pageSize = 10;
  closeResult:any;
  ModalRef:any;
  generateForm:FormGroup;
  allUsers:any = {users:[]};
  allEvents:any ;
  certificateData:any = {Certificates:[]};
  addResult:any;
  resultModalRef:any;
  confirmResut:any;
  message:any;
  singleCertificateData:any ={userId:'',eventId:'',generatedDate:'',_id:''};
  sendResult:any;
  todayDate = new Date();
  error:any;
  eventsData:any = {beforeEvents:[]}
  constructor(private modalService: NgbModal,private formBuilder: FormBuilder,private service:UserService) {
  this.loading = true;
   }
  

  public captureScreen() {
    const data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      console.log(imgWidth + ',' + imgHeight + ',' + position);
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, pageHeight);
      pdf.save(   ' certificate.pdf');
      // pdf.save(this.candidateInfo.firstName + ' ' + this.candidateInfo.lastName + ' certificate.pdf'); // Generated PDF
    });
  }
  ngOnInit(): void {
    this.loading = true;
     // get all evvents data
     const befordate:any = {
      date:''
    }
    befordate.date =this.todayDate

    var id= befordate.date


    this.service.completedEventss(id).subscribe(res=>{

      this.eventsData = res
      this.allEvents = this.eventsData.beforeEvents;

      this.loading = false;

   
    },err=>{
      console.log(err.error);
    });


    this.generateForm = this.formBuilder.group({
      userId: ['', [Validators.required]],
      eventId: ['',[Validators.required]],
      generatedDate:['',[Validators.required]],
      _id:[''],
    });

    // get all users data

    this.service.allUsers().subscribe(res=>{
      this.allUsers = res;
  this.loading = false;
    },err=>{
      console.log(err.error)
    });

 


    this.getallCertificates();
    this.service.getOrgInfo().subscribe(res=>{
      console.log(res);
      this.orgdataRes=res
      console.log(this.orgdataRes); 
    
    },err=>{
      console.log(err.error);
     
    })
  }


  
  getallCertificates(){
    this.service.allCertificates().subscribe(res=>{
      console.log(res)
      this.certificateData = res;
      var index = 1;
      var count =0;
      this.certificateData.Certificates.filter(x=>{
        x.index = index;
        x.name =  this.certificateData.Certificates[count].userId.firstName.trim()+ ' ' + this.certificateData.Certificates[count].userId.lastName;
        index++;
        count++;
      });
      this.finalData= this.certificateData.Certificates
      this.availableRecords = this.finalData.length;
    },err=>{
      console.log(err.error);
    })
  }
  openCertificateModal(content){
    // console.log("enter the home");
    // this.projectModalRef = this.modalService.open(content ,{ariaLabelledBy: 'modal-basic-title',size: 'xl'});
    // this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size: 'lg'}).result.then((result) => {
    //   this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });
    this.ModalRef = this.modalService.open(content ,{ariaLabelledBy: 'modal-basic-title',size: 'xl'});
    this.ModalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

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
  addgen(genCert,resultErrorModal){
    console.log( this.generateForm.value)
    this.loading = true;
    this.service.addCertificateData( this.generateForm.value).subscribe(res=>{
      console.log(res);
      this.addResult = res;
      this.loading = false;
      this.confirm(genCert);
      this.message =  this.addResult.message;
      this.generateForm.reset();
    },err=>{
      console.log(err.error);
      this.error = err.error.message;
      this.confirmError(resultErrorModal)
    })
    // this.ModalRef.close();
    // console.log("enter the home");
    // this.modalService.open(genCert, {ariaLabelledBy: 'modal-basic-title',size: 'sm'}).result.then((result) => {
    //   this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });

  }

  confirmError(resultErrorModal){
    this.resultModalRef = this.modalService.open(resultErrorModal , { ariaLabelledBy: 'modal-basic-title', centered: true,size:'sm' });
    this.resultModalRef.result.then((result) => {
    this.confirmResut = `Closed with: ${result}`;
  }
   , (reason) => {
     this.confirmResut = `Dismissed with: ${reason}`;
     this.modalService.open
   }
  );
 }
  openpreviewModel(content){
    // this.ModalRef = this.modalService.open(content ,{ariaLabelledBy: 'modal-basic-title',size: 'xl'});
    this.modalService.open(content, { size: 'xl' });
    this.ModalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openPreview(previewCertificate,id){

    console.log(id);
    this.service.getCertificateById(id).subscribe(res=>{
      console.log(res)
      this.singleCertificateData =res;
      this.openCertificateModal(previewCertificate)
    },err=>{
      console.log(err.error)
    })
  }

  sendMail(sendData,genCert){

    const mailDate = {
      fullName:'',
      userEmail:'',
      eventName:'',
      eventDate:'',
      eventLocation:'',
      genDate:''
    }
    mailDate.fullName = sendData.userId.firstName + ' ' + sendData.userId.lastName;
    mailDate.userEmail = sendData.userId.email;
    mailDate.eventName = sendData.eventId.note;
    mailDate.eventLocation = sendData.eventId.location;
    mailDate.eventDate =  new DatePipe('en-US').transform( sendData.eventId.date , 'dd-MMM-yyyy');
    mailDate.genDate =  new DatePipe('en-US').transform( sendData.generatedDate , 'dd-MMM-yyyy');
    console.log(mailDate)
    this.service.sendCertificateToUser(sendData._id,mailDate).subscribe(res=>{
      console.log(res)
      this.sendResult = res;
      this.confirm(genCert);
      this.message =  this.sendResult.message;
    },err=>{
      console.log(err.error)
    })
  }



  confirm(resultModal) {
    this.resultModalRef = this.modalService.open(resultModal , { ariaLabelledBy: 'modal-basic-title', centered: true,size:'sm' });
    this.resultModalRef.result.then((result) => {
     this.confirmResut = `Closed with: ${result}`;

   }, (reason) => {
     this.confirmResut = `Dismissed with: ${reason}`;
     this.modalService.dismissAll();
    this.getallCertificates()
   });
 }
 search(term: string){
  console.log(term)
  if (!term) {
    this.certificateData.Certificates = this.finalData;
  } else {
    this.certificateData.Certificates = this.finalData.filter(x =>       
      x.name.trim().toLowerCase().includes(term.trim().toLowerCase())     
    );

    // const email= this.finalData.filter(x =>
    //   x.email.trim().toLowerCase().includes(term.trim().toLowerCase()),
    // );
    
    //   if(email && email.length){
    //     email.map(x=>x).filter(x=>{
    //       if(this.usersList && this.usersList.length){
    //         this.usersList.map(y=>y).filter(y=>{
    //           if(y.name===x.name && y.email===x.email)
    //           {
    //               console.log('no data')
    //           }
    //           else{
    //             this.usersList.push(x);
    //           }                          
    //         });
    //     }
    //     else{
    //       this.usersList.push(x);
    //     }
    //   });
    // } 
  }
  this.availableRecords = this.certificateData.Certificates.length;
}


}
