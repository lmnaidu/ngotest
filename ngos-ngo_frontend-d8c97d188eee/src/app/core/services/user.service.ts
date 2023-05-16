import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {News} from '../../model/news';
import {Events} from '../../model/events';
import { Magazine } from '../../model/magazine';
import { Observable,BehaviorSubject, Subject } from 'rxjs';
import { LoginService} from './login.service';
import { Router  } from '@angular/router';
import { Currency } from '../currency.model';

// @Injectable()
@Injectable({ providedIn: 'root' })
export class UserService {
    loggedInSubject = new BehaviorSubject<boolean>(true);
    isLoggedIn = this.loggedInSubject.asObservable();

    apiUrl:any;
    userToken:any;
    tokenData:any;
    headers:any;
    constructor(private http:HttpClient, private loginService:LoginService,private router:Router) {
        this.userToken = this.loginService.getToken();
        this.apiUrl = environment.Url;
        this.tokenData =  this.userToken.token;
        this.headers = new HttpHeaders().set('Content-Type', 'application/json').set("Authorization", this.tokenData);
     }

    addNews(News: News): Observable<any> {
        let params = JSON.stringify(News);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this.http.post(this.apiUrl + '/news/addNews', params,  {headers: headers});
    }

    allNewsData(): Observable<any> {
        return this.http.get(this.apiUrl + '/news/allNews');
    }

    addEvent(Events: Events): Observable<any> {
        let params = JSON.stringify(Events);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(this.apiUrl + '/events/addEvent', params, {headers: headers});
    }

    allEvents(): Observable<any> {
        return this.http.get(this.apiUrl + '/events/allEvents');
    }

    addProject(projectData): Observable<any> {
        // let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(this.apiUrl + '/project/addProject', projectData, {headers:  this.headers});
    }

    allProjects(): Observable<any> {
        return this.http.get(this.apiUrl + '/project/allprojects');
    }

    allProjectss(): Observable<any> {
        return this.http.get(this.apiUrl + '/project/allprojectss');
    }

    addMagazine(Magazine: Magazine): Observable<any> {
        let params = JSON.stringify(Magazine);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(this.apiUrl + '/magazine/addMagazine', params, {headers: headers});
    }

    allMagazines(): Observable<any> {
        return this.http.get(this.apiUrl + '/magazine/allMagazineData');
    }

    getSingleMagazine(magazineId):Observable<any>{
        return this.http.get(this.apiUrl + '/magazine/singleMagazine/'+magazineId);
    }
    addUser(userData):Observable<any>{
       
        return this.http.post(this.apiUrl + '/user/addingUser', userData,{headers:  this.headers});
    }
    
    allUsers(): Observable<any> {
      
        return this.http.get(this.apiUrl + '/user/allUsers',{headers:  this.headers});
    }
   
    userLogin(userData):Observable<any>{
        console.log(this.apiUrl);
        console.log(userData);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(this.apiUrl + '/user/users_login', userData);
    }
    
    getUserById(userId):Observable<any>{
        return this.http.get(this.apiUrl + '/user/userById/'+userId,{headers:  this.headers});
    }

    updateUser(userId,userData):Observable<any>{
        return this.http.post(this.apiUrl + '/user/updateUser/'+userId, userData,{headers:  this.headers});
    }
    getAllProjects(){
        return this.http.get(this.apiUrl + '/project/allProjects',{headers:  this.headers});
    }
    addDonation(donationData){
        return this.http.post(this.apiUrl + '/donation/addDonation',donationData,{headers:  this.headers});
    }
    getAllMembers(){
        return this.http.get(this.apiUrl + '/user/allMembers',{headers: this.headers});

    }
    getMemberDonations(memberId){
        return this.http.post(this.apiUrl + '/donation/getDonationById',memberId,{headers: this.headers});

    }
    getDonationsbyProjectId(projectData){
        return this.http.post(this.apiUrl + '/donation/getDonationById',projectData,{headers: this.headers});
    

    }
    getDonationByMemberId(memberId):Observable<any>{
        return this.http.post(this.apiUrl + '/donation/getDonationByMemberId',memberId,{headers: this.headers});
    }

    getDonationByMemberIds(id):Observable<any>{
        return this.http.get(this.apiUrl + '/donation/getDonationByMemberIds/'+id,{headers: this.headers});
    }
    getProject(project){
        return this.http.post(this.apiUrl + '/project/getSingleProject',project,{headers: this.headers});

    }
    editProject(projectData){
        return this.http.post(this.apiUrl + '/project/updateSingleProject',projectData,{headers: this.headers});

    }


    
    getEventById(eventId){
        return this.http.get(this.apiUrl + '/events/getEventById/'+eventId);
    }

    updateEvent(eventId,eventData){
        return this.http.post(this.apiUrl + '/events/updateEvent/'+eventId, eventData,{headers:  this.headers});
    }


    getAllRoles(){
        return this.http.get(this.apiUrl + '/roles/allRoles',{headers: this.headers});
    }

    addRole(roleData){
        return this.http.post(this.apiUrl + '/roles/addRole', roleData,{headers:  this.headers});
    }

    permission(){
        return this.http.get(this.apiUrl + '/permissions/allPermissionsList',{headers: this.headers});
    }

    addpermission(data){
        return this.http.post(this.apiUrl + '/permissions/addpermission', data,{headers:  this.headers});
    }

    addRolePermissions(rolesData){
        return this.http.post(this.apiUrl + '/rolePermissions/addRolePermissions', rolesData,{headers:  this.headers});
    }

    updateNews(newsId,data){
        return this.http.post(this.apiUrl + '/news/updateNews/'+newsId, data,{headers:  this.headers});
    }

    updateMagazine(magazineId,magazineData){
        return this.http.post(this.apiUrl + '/magazine/updateMagazine/'+magazineId, magazineData,{headers:  this.headers});
    }

    getpermissions(roleIds):Observable<any>{
        return this.http.post(this.apiUrl + '/user/getpermissions',roleIds,{headers:  this.headers});
    }

    getRolePermissionsById(roleId){
        return this.http.get(this.apiUrl + '/rolePermissions/getRolePermissionsById/'+roleId,{headers:  this.headers});
    }

    updateRolePermissions(roleId,data){
        return this.http.post(this.apiUrl + '/rolePermissions/updateRolePermissions/'+roleId, data,{headers:  this.headers});
    }

    addUserType(usertypeData){
        return this.http.post(this.apiUrl + '/userTypes/addUserType', usertypeData,{headers:  this.headers});
    }

    allUserTypes(){
        return this.http.get(this.apiUrl + '/userTypes/allUserTypes',{headers:  this.headers});
    }

    updateUserTypes(userTypeId,data){
        return this.http.post(this.apiUrl + '/userTypes/updateUserTypes/'+userTypeId, data,{headers:  this.headers});
    }
    addProjectPropsal(propsalData){
        return this.http.post(this.apiUrl + '/projectProposal/addProjectPropsal/', propsalData,{headers:  this.headers});
    }
    getProposedProjectsByUser(proposedUserId){
        return this.http.post(this.apiUrl + '/projectProposal/getProposalsByUser/',proposedUserId,{headers:  this.headers});
    }
    getProposedProjects(){
        return this.http.get(this.apiUrl + '/projectProposal/getAllProposals/',{headers:  this.headers});
    }
    updateAction(projectData){
        return this.http.post(this.apiUrl + '/projectProposal/updateAction/',projectData,{headers:  this.headers});
    }
    addExpenditureProject(expData){
        return this.http.post(this.apiUrl + '/expenditure/addProjectExpenditure/',expData,{headers:  this.headers});
    }
    getExpenditureProject(expData){
        return this.http.post(this.apiUrl + '/expenditure/getExpenditureByProject/',expData,{headers:  this.headers});
    }
    updateExpenditureProject(expData){
        return this.http.post(this.apiUrl + '/expenditure/updateSingleExpenditure/',expData,{headers:  this.headers});
    }
    getNewsById(id){
        return this.http.get(this.apiUrl + '/news/getNewsById/'+id,{headers:  this.headers});
    }
    checkProjectName(data){
        return this.http.post(this.apiUrl + '/project/checkProjectName/',data,{headers:  this.headers});
    }
    addPledge(data){
        return this.http.post(this.apiUrl + '/pledge/addPledge/',data,{headers:  this.headers});
    }
    getPledgesByMemberId(data){
        return this.http.post(this.apiUrl + '/pledge/getAllPledgesByMemberId/',data,{headers:  this.headers});
    }

    getPledgesByMemberIds(id){
        return this.http.get(this.apiUrl + '/pledge/getAllPledgesByMemberIds/'+id,{headers:  this.headers});
    }
    getAllChapterAdmins(){
        return this.http.get(this.apiUrl + '/user/getAllChapterAdmins',{headers:  this.headers});
    }
    getAddChapter(data){
        return this.http.post(this.apiUrl + '/chapter/addChapter',data,{headers:  this.headers});
    }
    getAllChapters(){
        return this.http.get(this.apiUrl + '/chapter/allChapters',{headers:  this.headers});
    }
    updateChapter(data){
        return this.http.post(this.apiUrl + '/chapter/updateSingleChapter',data,{headers:  this.headers});
    }

    addFavorite(data){
        return this.http.post(this.apiUrl + '/project/addFavorite',data,{headers:  this.headers});
    }

    allFavprojectsById(id){
        return this.http.get(this.apiUrl + '/project/allFavprojectsById/'+id,{headers:  this.headers});
    }
    
    allDonations(){
        return this.http.get(this.apiUrl + '/donation/allDonations',{headers:  this.headers});
    }
    addManualDonation(data){
        return this.http.post(this.apiUrl + '/donation/addManualDonation',data,{headers:  this.headers});

    }
    getManualDonations(){
        return this.http.get(this.apiUrl + '/donation/getManualDonations',{headers:  this.headers});
    }
    editManualDonations(data){
        return this.http.post(this.apiUrl + '/donation/updateSingleManualDonation',data,{headers:  this.headers});
    } 
    
    serachMagazines(data){
        return this.http.post(this.apiUrl + '/magazine/serachMagazines', data,{headers:  this.headers});
    }

    upcomingEvents(data){
        return this.http.post(this.apiUrl + '/events/upcomingEvents',data,{headers:  this.headers});
    }

    grtFilterData(data){
        return this.http.post(this.apiUrl + '/news/grtFilterData', data,{headers:  this.headers});
    }

    getNewsFilterData(data){
        return this.http.post(this.apiUrl + '/news/getNewsFilterData', data,{headers:  this.headers});
    }

    getEventsFilterData(data){
        return this.http.post(this.apiUrl + '/news/getEventsFilterData', data,{headers:  this.headers});
    }

    addCertificateData(data){
        return this.http.post(this.apiUrl + '/events/addCertificateData',data,{headers:  this.headers});
    }

    allCertificates(){
        return this.http.get(this.apiUrl + '/events/allCertificates',{headers:  this.headers});
    }

    getCertificateById(id){
        return this.http.get(this.apiUrl + '/events/getCertificateById/'+id,{headers:  this.headers});
    }

    sendCertificateToUser(id,data){
        return this.http.post(this.apiUrl + '/events/sendCertificateToUser/'+id, data,{headers:  this.headers});
    }

    completedEvents(data){
        return this.http.post(this.apiUrl + '/events/completedEvents',data,{headers:  this.headers});
    }

    
    completedEventss(id){
        return this.http.get(this.apiUrl + '/events/completedEventss/'+id,{headers:  this.headers});
    }

    getCertificateByUserId(id){
        return this.http.get(this.apiUrl + '/events/getCertificateByUserId/'+id,{headers:  this.headers});
    }
    getCurrency(fromCurrency: string): Observable<Currency> {
        return this.http.get<Currency>('https://api.ratesapi.io/api/latest?base=' + fromCurrency);
    }
    getDonationByDonationId(id){
        return this.http.get(this.apiUrl + '/donation/getDonationByDonationId/'+id,{headers:  this.headers});
    }
    getCurrentLocation(){
        return this.http.get('http://ip-api.com/json');
    }

    getprojectActivities(id){
        return this.http.get(this.apiUrl + '/project/getprojectActivities/'+id,{headers: this.headers});
    }

    getprojectGalleryData(id){
        return this.http.get(this.apiUrl + '/project/getprojectGalleryData/'+id,{headers: this.headers});
    }
    addDonationAgainstPledge(data){
        return this.http.post(this.apiUrl + '/pledge/addDonationAgainstPledge/',data,{headers:  this.headers});
    }
    getAllTeamLeaders(){
        return this.http.get(this.apiUrl + '/project/getAllTeamLeaders',{headers:  this.headers});
    }
    allDonationsList(){
        return this.http.get(this.apiUrl + '/donation/allDonationsList',{headers:  this.headers});
    }
    allPledgesList(){
        return this.http.get(this.apiUrl + '/pledge/getAllPledges',{headers:  this.headers});
    }
    getNewNotifications(id){
        return this.http.get(this.apiUrl + '/notification/getLatestNotifications/'+id,{headers:  this.headers});
    }
    changeViewStatus(id){
        return this.http.get(this.apiUrl + '/notification/updateNotification/'+id,{headers:  this.headers});
    }
    getNotificationList(id){
        return this.http.get(this.apiUrl + '/notification/getAllNotificationByMemberId/'+id,{headers:  this.headers});
    }
    addPartner(data){
        return this.http.post(this.apiUrl + '/project/addPartner/',data,{headers:  this.headers});
    }
    getAllPartners(){
        return this.http.get(this.apiUrl + '/donation/getAllPartners/',{headers:  this.headers});
    }
    getAllVolunteers(){
        return this.http.get(this.apiUrl + '/donation/getAllVolunteers/',{headers:  this.headers});
    }
    updateOrgInfo(data){
        return this.http.post(this.apiUrl + '/notification/updateOrgInfo/',data,{headers:  this.headers});
    }
    getOrgInfo(){
        return this.http.get(this.apiUrl + '/notification/getOrgInfo/');
    }
    updatePassword(data){
        console.log("called");
        return this.http.post(this.apiUrl + '/user/updateUserPassword/',data);
    }
    forgotPasswordLink(data){
        return this.http.post(this.apiUrl + '/project/forgotPasswordLink/',data);
    }
    getAllOcassionsByMemberId(data){
        return this.http.post(this.apiUrl + '/user/getOcassionByMemberId/',data);
    }
    addOcassion(data){
        return this.http.post(this.apiUrl + '/user/addOcassion/',data);
    }
    editOcassion(data){
        return this.http.post(this.apiUrl + '/user/updateSingleOcassion/',data);
    }
    
}