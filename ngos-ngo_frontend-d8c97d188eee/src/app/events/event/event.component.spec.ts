import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { EventComponent } from './event.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { UserService } from 'src/app/core/services/user.service';
import { UserServiceStub } from 'src/app/mocks/UserServiceStub';
import { LocationStub } from 'src/app/mocks/LocationStub';
import { ImageCropperModule,ImageCroppedEvent } from 'ngx-image-cropper';
import { LayoutModule } from 'src/app/layout/layout.module';
import {  ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

describe('EventComponent', () => {
  let component: EventComponent;
  let fixture: ComponentFixture<EventComponent>;
  const userServiceStub = new UserServiceStub();
  const mdoeslService = NgbModal;

  const event: ImageCroppedEvent = {
    base64: '',
    // file: null,
    width: 0,
    height: 0,
    cropperPosition: {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
    },
    imagePosition: {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventComponent ],
      providers: [
        { provide: UserService, useValue: userServiceStub }
      ],
      imports: [
        HttpClientModule,
        FormsModule,
        LayoutModule,
        ReactiveFormsModule,
        ImageCropperModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit',fakeAsync(()=>{
    component.ngOnInit();
  }));

  // it('#getAllevents', ()=>{
  //   component.getAllevents();
  //   tick();
  //   // component.eventsData
  //   // expect(component.eventsData).
  // });
  // it('#getAllMembersData', ()=>{
  //   component.getAllMembersData();
  //   tick();
  // });
  it('#getAllevents', fakeAsync(()=>{
    component.getAllevents();
    tick();
  }))
  it('#getAllMembersData', fakeAsync(()=>{
    component.getAllMembersData();
    tick();
  }))

  // it('#ngOnInit',fakeAsync(()=>{
  //   component.ngOnInit();
  //   component.getAllevents();
  //   component.getAllMembersData()
  // }));

  it('#confirm',()=>{
    component.resultModal = true;
    component.confirm(component.resultModal);

    expect(component.resultModalRef).toBe('Closed');
  });

  it('#openModel',fakeAsync(()=>{
    const addData = '';
    component.openModel(addData);
    
  }));

  it('#viewEventData', fakeAsync(()=>{
    const viewEventesData = {test:''};
    const id = '1'
    component.viewEventData(viewEventesData,id);
    component.getEventById(id)
  }))

  it('#singleEvent', fakeAsync(()=>{
    const id = '1'
    component.singleEvent(id);
    expect(component.singleEventData).toBe('')
  }));

  it('getEventById',fakeAsync(()=>{
    const iddata = {
      id:''
    }
    iddata.id = '5f19239fb6f1150524d27e8a';
    component.getEventById(iddata);
  }));

  it('#updateEvent' ,fakeAsync(()=>{
    
    const updateEventData = {note:'test',desc:'test',location:'test',image:''};
    // component.updateEventForm.value.image =component.image;
    component.updateEvent(updateEventData);
  }));

  it('#onItemSelect', fakeAsync(()=>{
    const item = ''
    component.onItemSelect(item);
    // tick();
    // component.selectedMembers.pop();
    // expect
  }));

  it('#onItemDeSelect', fakeAsync(()=>{
    const item = '';
    component.onItemDeSelect(item);
  }));

  it('#updateModel', fakeAsync(()=>{
    const id = '1';
    const data = {};
    component.updateModel(data, id);
    component.singleEvent(id);
  }));


  it('#addevent', fakeAsync(()=>{
    const eventData = {desc:'',note:'',location:'',image:'',memberId:''}
    component.addevent(eventData);
    tick();
  }));

  it('#imageCropped', fakeAsync(() => {
    component.image = '';
    spyOn(component, 'imageCropped');
    component.imageCropped(event);
    tick();
    expect(component.imageCropped).toHaveBeenCalled();
    expect(component.image).toEqual('');
  }));

  it('#fileChangeEvent', fakeAsync(() => {
    component.fileChangeEvent(event);
    tick();
    expect(component.imageChangedEvent).toEqual(event);
  }));
  // imageLoaded
  it('#imageLoaded', fakeAsync(() => {
    spyOn(component, 'imageLoaded');
    component.imageLoaded();
    tick();
    expect(component.imageLoaded).toHaveBeenCalled();
  }));
  it('#cropperReady', fakeAsync(() => {
    spyOn(component, 'cropperReady');
    component.cropperReady();
    tick();
    expect(component.cropperReady).toHaveBeenCalled();
  }));
  // loadImageFailed
  it('#loadImageFailed', fakeAsync(() => {
    spyOn(component, 'loadImageFailed');
    component.loadImageFailed();
    tick();
    expect(component.loadImageFailed).toHaveBeenCalled();
  }));


  it("#search", fakeAsync(() => {
    component.allEvents = [];
    let term = null;
    // let key = null;
    component.search(term);
    tick();
    expect(component.finalData.length).toEqual(component.allEvents.length);


    term = 'testTerm';
    component.search(term);
    tick();
    component.allEvents = [];
    expect(component.finalData.length).toEqual(component.allEvents.length);

  }));
});
